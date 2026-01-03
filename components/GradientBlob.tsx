"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { useMousePosition } from "@/hooks/useMousePosition";

// Noise function for organic deformation
const noise = `
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const GradientBlobMaterial = shaderMaterial(
  {
    time: 0,
    mousePos: new THREE.Vector2(0, 0),
    gradientColors: [
      new THREE.Vector3(168 / 255, 85 / 255, 247 / 255), // purple
      new THREE.Vector3(59 / 255, 130 / 255, 246 / 255), // blue
      new THREE.Vector3(96 / 255, 165 / 255, 250 / 255), // light blue
    ],
  },
  // Vertex shader
  `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    ${noise}
    
    uniform float time;
    uniform vec2 mousePos;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Apply noise-based deformation for organic look
      vec3 pos = position;
      float noiseValue = snoise(pos * 0.5 + time * 0.1);
      float noiseValue2 = snoise(pos * 0.8 + time * 0.15);
      
      pos += normal * (noiseValue * 0.3 + noiseValue2 * 0.2);
      
      // Mouse influence - subtle attraction
      vec2 mouseInfluence = (mousePos - vec2(pos.x, pos.y)) * 0.1;
      pos.xy += mouseInfluence * 0.05;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vPosition = mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader - Glassmorphism effect
  `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    uniform float time;
    uniform vec2 mousePos;
    uniform vec3 gradientColors[3];
    
    ${noise}
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      // Gradient based on position
      float gradientMix = (vPosition.y + 1.0) * 0.5;
      vec3 color1 = mix(gradientColors[0], gradientColors[1], gradientMix);
      vec3 color2 = mix(gradientColors[1], gradientColors[2], gradientMix);
      vec3 baseColor = mix(color1, color2, sin(time * 0.5) * 0.5 + 0.5);
      
      // Add noise-based color variation
      float noiseColor = snoise(vPosition * 0.3 + time * 0.2) * 0.1;
      baseColor += noiseColor;
      
      // Fresnel effect for glass-like edges
      vec3 viewDirection = normalize(-vPosition);
      float fresnel = pow(1.0 - dot(viewDirection, normal), 2.0);
      
      // Glassmorphism: transparent with subtle color
      float opacity = 0.4 + fresnel * 0.3;
      vec3 finalColor = baseColor * (0.6 + fresnel * 0.4);
      
      // Add glow
      float glow = fresnel * 0.5;
      finalColor += glow * baseColor;
      
      gl_FragColor = vec4(finalColor, opacity);
    }
  `
);

extend({ GradientBlobMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientBlobMaterial: any;
    }
  }
}

function BlobMesh({ mousePos, targetPos }: { mousePos: { x: number; y: number }; targetPos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  const timeRef = useRef(0);

  // Smooth mouse tracking with easing
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    timeRef.current += delta;

    // Smooth interpolation for mouse position
    const easing = 0.05;
    smoothMouseRef.current.x += (targetPos.x - smoothMouseRef.current.x) * easing;
    smoothMouseRef.current.y += (targetPos.y - smoothMouseRef.current.y) * easing;

    if (materialRef.current) {
      materialRef.current.time = timeRef.current;
      materialRef.current.mousePos = new THREE.Vector2(
        smoothMouseRef.current.x * viewport.width * 0.5,
        smoothMouseRef.current.y * viewport.height * 0.5
      );
    }

    // Rotate blob slowly
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 3);
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <gradientBlobMaterial ref={materialRef} />
    </mesh>
  );
}

export default function GradientBlob() {
  const { x, y } = useMousePosition();

  // Normalize mouse position to -1 to 1 range
  const targetPos = useMemo(() => {
    if (typeof window !== "undefined") {
      return {
        x: (x / window.innerWidth) * 2 - 1,
        y: -(y / window.innerHeight) * 2 + 1,
      };
    }
    return { x: 0, y: 0 };
  }, [x, y]);

  return (
    <BlobMesh
      mousePos={{ x, y }}
      targetPos={targetPos}
    />
  );
}
