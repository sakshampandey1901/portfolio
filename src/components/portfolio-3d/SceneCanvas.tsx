"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Html, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = "";
// Add your file to /public/models, then set:
// const MODEL_PATH = "/models/your-model.glb";

type SceneModelProps = {
  modelPath?: string;
};

function LoadedModel({ modelPath }: Required<SceneModelProps>) {
  const gltf = useGLTF(modelPath);

  return <primitive object={gltf.scene} scale={1.4} />;
}

function FallbackModel() {
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[0.28, 0.7, -0.18]}>
        <boxGeometry args={[2.4, 1.35, 0.18]} />
        <meshStandardMaterial color="#d8cec0" metalness={0.25} roughness={0.38} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.82, 0.28]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[2.7, 0.18, 1.65]} />
        <meshStandardMaterial color="#1a1614" metalness={0.5} roughness={0.31} />
      </mesh>
      <mesh position={[0, 0.02, 0.11]}>
        <planeGeometry args={[2.05, 1.05]} />
        <meshStandardMaterial color="#4a6fa5" emissive="#18263c" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function PortfolioModel({ modelPath }: SceneModelProps) {
  return modelPath ? <LoadedModel modelPath={modelPath} /> : <FallbackModel />;
}

function ScrollRig() {
  const modelRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!modelRef.current) return;

    const idle = clock.getElapsedTime();
    modelRef.current.rotation.y += 0.004;
    modelRef.current.position.y += Math.sin(idle * 1.4) * 0.0015;
  });

  useEffect(() => {
    if (!modelRef.current) return;

    const model = modelRef.current;
    const ctx = gsap.context(() => {
      gsap.set(model.position, { x: 0, y: -0.08, z: 0 });
      gsap.set(model.rotation, { x: 0.12, y: -0.35, z: 0 });
      gsap.set(model.scale, { x: 1, y: 1, z: 1 });
      gsap.set(camera.position, { x: 0, y: 0.15, z: 6 });

      const transitions = [
        {
          trigger: "#about",
          position: { x: 1.45, y: -0.08, z: -0.25 },
          rotation: { x: 0.05, y: -0.95, z: 0.08 },
          scale: { x: 0.92, y: 0.92, z: 0.92 },
          camera: { x: 0.18, y: 0.2, z: 6.2 },
        },
        {
          trigger: "#projects",
          position: { x: 0.05, y: -0.12, z: -1.1 },
          rotation: { x: 1.15, y: 0.2, z: -0.2 },
          scale: { x: 0.68, y: 0.68, z: 0.68 },
          camera: { x: 0, y: 1.05, z: 7.1 },
        },
        {
          trigger: "#contact",
          position: { x: -0.15, y: 0.1, z: 0.75 },
          rotation: { x: -0.08, y: 0.9, z: 0.02 },
          scale: { x: 1.18, y: 1.18, z: 1.18 },
          camera: { x: -0.14, y: 0.04, z: 5.25 },
        },
      ];

      transitions.forEach(({ trigger, position, rotation, scale, camera: cameraPosition }) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 62%",
            end: "bottom 42%",
            scrub: 1.15,
          },
        });

        // Adjust these coordinates to art-direct each section's model pose.
        timeline
          .to(model.position, { ...position, ease: "none" }, 0)
          .to(model.rotation, { ...rotation, ease: "none" }, 0)
          .to(model.scale, { ...scale, ease: "none" }, 0)
          .to(camera.position, { ...cameraPosition, ease: "none" }, 0);
      });
    });

    return () => ctx.revert();
  }, [camera]);

  return (
    <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.22}>
      <group ref={modelRef}>
        <Suspense
          fallback={
            <Html center className="font-sans text-xs uppercase tracking-[0.4em] text-espresso/60">
              Loading model
            </Html>
          }
        >
          <PortfolioModel modelPath={MODEL_PATH} />
        </Suspense>
      </group>
    </Float>
  );
}

export default function SceneCanvas() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.15, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#f7f5f0"]} />
        <fog attach="fog" args={["#f7f5f0", 7, 12]} />
        <ambientLight intensity={1.15} />
        <directionalLight
          castShadow
          position={[3.8, 4.2, 4.4]}
          intensity={3.2}
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight position={[-3.5, 2.4, 3]} angle={0.42} penumbra={0.8} intensity={2.1} color="#fff3df" />
        <ScrollRig />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
