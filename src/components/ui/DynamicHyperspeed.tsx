import { useEffect, useRef, useState } from 'react';
import { getCachedDeviceCapabilities } from '@/utils/deviceCapabilities';

interface DynamicHyperspeedProps {
  effectOptions?: any;
}

const DynamicHyperspeed = ({ effectOptions }: DynamicHyperspeedProps) => {
  const hyperspeed = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderCSS, setShouldRenderCSS] = useState(false);

  useEffect(() => {
    const capabilities = getCachedDeviceCapabilities();
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRenderCSS(true);
      setIsLoading(false);
      return;
    }

    // If device can't handle 3D, use CSS fallback
    if (!capabilities.canHandle3D || capabilities.performanceLevel === 'low') {
      setShouldRenderCSS(true);
      setIsLoading(false);
      return;
    }

    let isComponentMounted = true;

    // Dynamic import of Three.js and postprocessing
    const loadHyperspeed = async () => {
      try {
        const [
          THREE,
          { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset }
        ] = await Promise.all([
          import('three'),
          import('postprocessing')
        ]);

        if (!isComponentMounted || !hyperspeed.current) return;

        // Adapt quality based on device capabilities
        const quality = {
          antialias: capabilities.performanceLevel === 'high',
          shadowMapSize: capabilities.performanceLevel === 'high' ? 2048 : 1024,
          bloomIntensity: capabilities.performanceLevel === 'high' ? 1.0 : 0.5,
          particleCount: capabilities.performanceLevel === 'high' ? 1000 : 500,
        };

        // Hyperspeed App Class with dynamic imports
        class HyperspeedApp {
          scene: any;
          camera: any;
          renderer: any;
          composer: any;
          tunnelMaterial: any;
          isAccelerating: () => boolean;
          
          constructor(container: HTMLElement) {
            this.isAccelerating = () => false; // Initialize method
            this.init(container, THREE, { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset }, quality);
          }

          init(container: HTMLElement, THREE: any, postprocessing: any, quality: any) {
            // Scene setup with quality adjustments
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
              effectOptions?.fov || 90,
              container.clientWidth / container.clientHeight,
              0.1,
              1000
            );

            this.renderer = new THREE.WebGLRenderer({ 
              antialias: quality.antialias,
              powerPreference: capabilities.performanceLevel === 'high' ? 'high-performance' : 'default'
            });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, capabilities.performanceLevel === 'high' ? 2 : 1.5));
            
            container.appendChild(this.renderer.domElement);

            // Post-processing setup
            const renderPass = new postprocessing.RenderPass(this.scene, this.camera);
            const bloomEffect = new postprocessing.BloomEffect({
              intensity: quality.bloomIntensity,
              luminanceThreshold: 0.1,
              luminanceSmoothing: 0.2,
            });

            const effectPass = new postprocessing.EffectPass(this.camera, bloomEffect);
            if (capabilities.performanceLevel === 'high') {
              const smaaEffect = new postprocessing.SMAAEffect();
              effectPass.effects.push(smaaEffect);
            }

            this.composer = new postprocessing.EffectComposer(this.renderer);
            this.composer.addPass(renderPass);
            this.composer.addPass(effectPass);

            // Create simplified hyperspeed geometry for better performance
            this.createHyperspeedTunnel(THREE, quality);
            this.setupControls();
            this.animate();
          }

          createHyperspeedTunnel(THREE: any, quality: any) {
            // Simplified tunnel geometry based on device capabilities
            const segments = capabilities.performanceLevel === 'high' ? 100 : 50;
            const radius = 5;
            const length = effectOptions?.length || 400;

            // Create tunnel geometry
            const geometry = new THREE.CylinderGeometry(radius, radius, length, segments, 1, true);
            
            // Shader material for hyperspeed effect
            const material = new THREE.ShaderMaterial({
              uniforms: {
                time: { value: 0 },
                speed: { value: 1.0 },
                color1: { value: new THREE.Color(0x03b3c3) },
                color2: { value: new THREE.Color(0x6750a2) },
              },
              vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                  vUv = uv;
                  vPosition = position;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                uniform float time;
                uniform float speed;
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                  float movement = time * speed;
                  vec2 uv = vUv;
                  uv.y += movement;
                  
                  float pattern = sin(uv.y * 20.0 + time) * 0.5 + 0.5;
                  vec3 color = mix(color1, color2, pattern);
                  
                  float alpha = smoothstep(0.8, 1.0, abs(sin(uv.y * 10.0 + time)));
                  gl_FragColor = vec4(color, alpha * 0.8);
                }
              `,
              transparent: true,
              side: THREE.DoubleSide,
            });

            const tunnel = new THREE.Mesh(geometry, material);
            tunnel.rotation.x = Math.PI / 2;
            this.scene.add(tunnel);
            
            this.tunnelMaterial = material;
          }

          setupControls() {
            // Simple mouse/touch controls for speed
            let isAccelerating = false;
            
            const onPointerDown = () => { isAccelerating = true; };
            const onPointerUp = () => { isAccelerating = false; };
            
            this.renderer.domElement.addEventListener('mousedown', onPointerDown);
            this.renderer.domElement.addEventListener('mouseup', onPointerUp);
            this.renderer.domElement.addEventListener('touchstart', onPointerDown);
            this.renderer.domElement.addEventListener('touchend', onPointerUp);
            
            this.isAccelerating = () => isAccelerating;
          }

          animate = () => {
            if (!isComponentMounted) return;
            
            requestAnimationFrame(this.animate);
            
            const time = Date.now() * 0.001;
            const speed = this.isAccelerating() ? 2.0 : 1.0;
            
            if (this.tunnelMaterial) {
              this.tunnelMaterial.uniforms.time.value = time;
              this.tunnelMaterial.uniforms.speed.value = speed;
            }
            
            this.composer.render();
          }

          dispose() {
            if (this.renderer) {
              this.renderer.dispose();
              if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
              }
            }
            if (this.composer) {
              this.composer.dispose();
            }
          }
        }

        // Initialize the app
        appRef.current = new HyperspeedApp(hyperspeed.current);
        setIsLoading(false);

      } catch (error) {
        console.warn('Hyperspeed WebGL failed, falling back to CSS:', error);
        if (isComponentMounted) {
          setShouldRenderCSS(true);
          setIsLoading(false);
        }
      }
    };

    loadHyperspeed();

    return () => {
      isComponentMounted = false;
      if (appRef.current) {
        appRef.current.dispose();
      }
    };
  }, [effectOptions]);

  // CSS Fallback for low-end devices
  if (shouldRenderCSS) {
    return (
      <div className="hyperspeed-css-fallback fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--primary))_70%)] opacity-20 animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
      </div>
    );
  }

  return (
    <>
      <div ref={hyperspeed} className="fixed inset-0 pointer-events-none" />
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-hero opacity-30 pointer-events-none" />
      )}
    </>
  );
};

export default DynamicHyperspeed;