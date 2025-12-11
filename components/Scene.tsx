import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Configuration for each section's visual state
const SECTION_CONFIGS = [
  { // Hero (0)
    position: new THREE.Vector3(0, 0, 8),
    lookAt: new THREE.Vector3(0, 0, 0),
    mainColor: "#6366f1", // Indigo
    secColor: "#a855f7",
    distort: 0.3
  },
  { // Services (1) - Side view
    position: new THREE.Vector3(4, 0, 4),
    lookAt: new THREE.Vector3(-1, 0, 0),
    mainColor: "#3b82f6", // Blue
    secColor: "#60a5fa",
    distort: 0.5
  },
  { // Work (2) - Other side, high angle
    position: new THREE.Vector3(-4, 2, 5),
    lookAt: new THREE.Vector3(1, -0.5, 0),
    mainColor: "#ec4899", // Pink
    secColor: "#f472b6",
    distort: 0.8
  },
  { // Contact (3) - Close up, low angle
    position: new THREE.Vector3(0, -1, 4),
    lookAt: new THREE.Vector3(0, 1, 0),
    mainColor: "#10b981", // Emerald
    secColor: "#34d399",
    distort: 0.2
  }
];

// Handles camera movement smoothly between sections
const CameraController = ({ currentSection }: { currentSection: number }) => {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // Safe guard index
    const index = Math.min(Math.max(currentSection, 0), SECTION_CONFIGS.length - 1);
    const config = SECTION_CONFIGS[index];

    // Slower lerp for heavier, more cinematic feel (0.04 -> 0.02)
    state.camera.position.lerp(config.position, 0.02);
    
    // Smooth LookAt transition
    lookAtVec.current.lerp(config.lookAt, 0.02);
    state.camera.lookAt(lookAtVec.current);
  });

  return null;
};

// Handles lighting color transitions
const SceneLights = ({ currentSection }: { currentSection: number }) => {
    const lightRef = useRef<THREE.PointLight>(null);
    const index = Math.min(Math.max(currentSection, 0), SECTION_CONFIGS.length - 1);
    const config = SECTION_CONFIGS[index];
    const targetColor = new THREE.Color(config.secColor);

    useFrame(() => {
        if (lightRef.current) {
            // Slower color transition
            lightRef.current.color.lerp(targetColor, 0.02);
        }
    });

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight ref={lightRef} position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
        </group>
    )
}

const FloatingShape = ({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slower rotation multipliers
      meshRef.current.rotation.x = state.clock.getElapsedTime() * (speed * 0.2);
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (speed * 0.1);
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.5}
          distort={distort}
          speed={1} // Slower distortion speed
        />
      </mesh>
    </Float>
  );
};

const MainCrystal = ({ currentSection }: { currentSection: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
    
    const index = Math.min(Math.max(currentSection, 0), SECTION_CONFIGS.length - 1);
    const config = SECTION_CONFIGS[index];
    const targetColor = new THREE.Color(config.mainColor);

    useFrame((state) => {
        if(meshRef.current && materialRef.current) {
            // Very slow, majestic rotation
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.z += 0.0005;

            // Smooth Color Transition
            materialRef.current.color.lerp(targetColor, 0.02);
            
            // Transition Emissive Color
            materialRef.current.emissive.lerp(targetColor.clone().multiplyScalar(0.2), 0.02);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshPhysicalMaterial
                    ref={materialRef}
                    color={config.mainColor} // Initial
                    emissive="#312e81"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    transmission={0.2}
                    thickness={2}
                    clearcoat={1}
                />
            </mesh>
        </Float>
    )
}

interface SceneProps {
    currentSection: number;
}

const BackgroundScene: React.FC<SceneProps> = ({ currentSection = 0 }) => {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <CameraController currentSection={currentSection} />
        
        <SceneLights currentSection={currentSection} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
        
        <group position={[3, -1, -2]}>
            <FloatingShape position={[0, 2, 0]} color="#a855f7" speed={1.5} distort={0.4} />
        </group>

        <group position={[-3, 2, -4]}>
            <FloatingShape position={[0, 0, 0]} color="#3b82f6" speed={1.2} distort={0.3} />
        </group>
        
        {/* Centerpiece */}
        <group position={[0, 0, 0]}>
            <MainCrystal currentSection={currentSection} />
        </group>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;