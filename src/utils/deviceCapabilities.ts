// Device capabilities detection for optimal 3D loading
export interface DeviceCapabilities {
  canHandle3D: boolean;
  performanceLevel: 'high' | 'medium' | 'low';
  connectionSpeed: 'fast' | 'medium' | 'slow';
  shouldLoadEffects: boolean;
  memoryLimit: number;
}

export const detectDeviceCapabilities = (): DeviceCapabilities => {
  // Hardware detection
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const hasWebGL = !!gl;
  
  // Performance indicators
  const memory = (navigator as any).deviceMemory || 4; // GB, fallback to 4GB
  const cores = navigator.hardwareConcurrency || 2;
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Connection speed detection
  const connection = (navigator as any).connection || { effectiveType: '4g' };
  const connectionSpeed = getConnectionSpeed(connection.effectiveType);
  
  // Device type detection
  const isMobile = /mobile|android|iphone|ipad|tablet/.test(userAgent);
  const isLowEndDevice = memory < 4 || cores < 4;
  const isHighEndDevice = memory >= 8 && cores >= 8 && !isMobile;
  
  // Performance level calculation
  let performanceLevel: 'high' | 'medium' | 'low' = 'medium';
  
  if (isHighEndDevice && hasWebGL && connectionSpeed === 'fast') {
    performanceLevel = 'high';
  } else if (isLowEndDevice || !hasWebGL || connectionSpeed === 'slow') {
    performanceLevel = 'low';
  }
  
  const canHandle3D = hasWebGL && memory >= 2 && !isLowEndDevice;
  const shouldLoadEffects = canHandle3D && connectionSpeed !== 'slow';
  
  // Memory limits for bundle loading
  const memoryLimit = Math.min(memory * 0.3, 2); // 30% of device memory, max 2GB
  
  // Cleanup
  if (gl && gl.getExtension) {
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
  
  return {
    canHandle3D,
    performanceLevel,
    connectionSpeed,
    shouldLoadEffects,
    memoryLimit
  };
};

const getConnectionSpeed = (effectiveType: string): 'fast' | 'medium' | 'slow' => {
  switch (effectiveType) {
    case '4g':
    case '5g':
      return 'fast';
    case '3g':
      return 'medium';
    default:
      return 'slow';
  }
};

// Cache the result to avoid multiple detections
let cachedCapabilities: DeviceCapabilities | null = null;

export const getCachedDeviceCapabilities = (): DeviceCapabilities => {
  if (!cachedCapabilities) {
    cachedCapabilities = detectDeviceCapabilities();
  }
  return cachedCapabilities;
};