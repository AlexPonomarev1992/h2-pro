import { useEffect, useRef, useState } from 'react';
import { getCachedDeviceCapabilities } from '@/utils/deviceCapabilities';

interface DynamicAuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

export default function DynamicAurora(props: DynamicAuroraProps) {
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5 } = props;
  const ctnDom = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderCSS, setShouldRenderCSS] = useState(false);
  
  useEffect(() => {
    const capabilities = getCachedDeviceCapabilities();
    
    // If device can't handle 3D, use CSS fallback
    if (!capabilities.canHandle3D || capabilities.performanceLevel === 'low') {
      setShouldRenderCSS(true);
      setIsLoading(false);
      return;
    }

    let isComponentMounted = true;
    
    // Dynamic import of OGL library
    const loadAurora = async () => {
      try {
        const { Renderer, Program, Mesh, Color, Triangle } = await import('ogl');
        
        if (!isComponentMounted || !ctnDom.current) return;

        const ctn = ctnDom.current;
        
        const renderer = new Renderer({
          alpha: true,
          premultipliedAlpha: true,
          antialias: capabilities.performanceLevel === 'high'
        });
        
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = 'transparent';

        let program: any;

        function resize() {
          if (!ctn || !isComponentMounted) return;
          const width = ctn.offsetWidth;
          const height = ctn.offsetHeight;
          renderer.setSize(width, height);
          if (program) {
            program.uniforms.uResolution.value = [width, height];
          }
        }

        const resizeHandler = () => resize();
        window.addEventListener('resize', resizeHandler);

        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) {
          delete geometry.attributes.uv;
        }

        const colorStopsArray = colorStops.map(hex => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });

        // Aurora shader code
        const VERT = `#version 300 es
        in vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }`;

        const FRAG = `#version 300 es
        precision ${capabilities.performanceLevel === 'high' ? 'highp' : 'mediump'} float;
        
        uniform float uTime;
        uniform float uAmplitude;
        uniform vec3 uColorStops[3];
        uniform vec2 uResolution;
        uniform float uBlend;
        
        out vec4 fragColor;
        
        vec3 permute(vec3 x) {
          return mod(((x * 34.0) + 1.0) * x, 289.0);
        }
        
        float snoise(vec2 v){
          const vec4 C = vec4(
              0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439
          );
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
        
          vec3 p = permute(
              permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0)
          );
        
          vec3 m = max(
              0.5 - vec3(
                  dot(x0, x0),
                  dot(x12.xy, x12.xy),
                  dot(x12.zw, x12.zw)
              ), 
              0.0
          );
          m = m * m;
          m = m * m;
        
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        struct ColorStop {
          vec3 color;
          float position;
        };
        
        #define COLOR_RAMP(colors, factor, finalColor) {              \\
          int index = 0;                                            \\
          for (int i = 0; i < 2; i++) {                               \\
             ColorStop currentColor = colors[i];                    \\
             bool isInBetween = currentColor.position <= factor;    \\
             index = int(mix(float(index), float(i), float(isInBetween))); \\
          }                                                         \\
          ColorStop currentColor = colors[index];                   \\
          ColorStop nextColor = colors[index + 1];                  \\
          float range = nextColor.position - currentColor.position; \\
          float lerpFactor = (factor - currentColor.position) / range; \\
          finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
        }
        
        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution;
          
          ColorStop colors[3];
          colors[0] = ColorStop(uColorStops[0], 0.0);
          colors[1] = ColorStop(uColorStops[1], 0.5);
          colors[2] = ColorStop(uColorStops[2], 1.0);
          
          vec3 rampColor;
          COLOR_RAMP(colors, uv.x, rampColor);
          
          float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
          height = exp(height);
          height = (uv.y * 2.0 - height + 0.2);
          float intensity = 0.6 * height;
          
          float midPoint = 0.20;
          float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
          
          vec3 auroraColor = intensity * rampColor;
          
          fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
        }`;

        program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTime: { value: 0 },
            uAmplitude: { value: amplitude },
            uColorStops: { value: colorStopsArray },
            uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
            uBlend: { value: blend }
          }
        });

        const mesh = new Mesh(gl, { geometry, program });
        ctn.appendChild(gl.canvas);

        let animateId = 0;
        const update = (t: number) => {
          if (!isComponentMounted) return;
          
          animateId = requestAnimationFrame(update);
          const { time = t * 0.01, speed: currentSpeed = 1.0 } = props;
          program.uniforms.uTime.value = time * currentSpeed * 0.1;
          program.uniforms.uAmplitude.value = amplitude;
          program.uniforms.uBlend.value = blend;
          
          const stops = colorStops.map(hex => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
          });
          program.uniforms.uColorStops.value = stops;
          renderer.render({ scene: mesh });
        };
        
        animateId = requestAnimationFrame(update);
        resize();
        setIsLoading(false);

        return () => {
          isComponentMounted = false;
          cancelAnimationFrame(animateId);
          window.removeEventListener('resize', resizeHandler);
          if (ctn && gl.canvas.parentNode === ctn) {
            ctn.removeChild(gl.canvas);
          }
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
      } catch (error) {
        console.warn('Aurora WebGL failed, falling back to CSS:', error);
        if (isComponentMounted) {
          setShouldRenderCSS(true);
          setIsLoading(false);
        }
      }
    };

    loadAurora();

    return () => {
      isComponentMounted = false;
    };
  }, [amplitude, blend]);

  // CSS Fallback for low-end devices
  if (shouldRenderCSS) {
    return (
      <div className="aurora-css-fallback absolute inset-0 overflow-hidden">
        <div 
          className="aurora-gradient absolute inset-0 opacity-70 animate-pulse"
          style={{
            background: `linear-gradient(45deg, ${colorStops[0]}20, ${colorStops[1]}30, ${colorStops[2]}20)`,
            animation: 'aurora-wave 4s ease-in-out infinite alternate',
          }}
        />
        <style>
          {`
            @keyframes aurora-wave {
              0% { transform: translateX(-10%) scale(1.0); }
              100% { transform: translateX(10%) scale(1.1); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <>
      <div ref={ctnDom} className="aurora-container absolute inset-0" />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
      )}
    </>
  );
}