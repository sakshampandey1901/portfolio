"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function ProfileCard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationProxy = useRef({ y: 0 });
  const { viewport } = useThree();

  const texture = useTexture("/images/profile.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const img = texture.image as HTMLImageElement | undefined;
  const aspect = img ? img.width / img.height : 3 / 4;

  const cardHeight = Math.min(viewport.height * 0.48, 3.8);
  const cardWidth = cardHeight * aspect;
  const cardDepth = 0.1;

  useEffect(() => {
    const proxy = rotationProxy.current;

    const ctx = gsap.context(() => {
      /*
       * SCROLL-LINKED 360° ROTATION
       * Math.PI * 2 = one full 360° turn.
       * Adjust `scrub` for tighter/looser scroll coupling.
       */
      gsap.to(proxy, {
        y: Math.PI * 2,
        ease: "none",
        scrollTrigger: {
          trigger: "#portfolio-scroll-root",
          scroller: window,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = rotationProxy.current.y;
    meshRef.current.position.y =
      Math.sin(clock.getElapsedTime() * 0.7) * 0.05;
  });

  const edgeMat = (
    <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.22} />
  );

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[cardWidth, cardHeight, cardDepth]} />
      {[
        /* +x */ edgeMat,
        /* -x */ edgeMat,
        /* +y */ edgeMat,
        /* -y */ edgeMat,
        /* +z front */
        <meshStandardMaterial
          key="front"
          map={texture}
          metalness={0.08}
          roughness={0.4}
          envMapIntensity={0.25}
        />,
        /* -z back */
        <meshStandardMaterial
          key="back"
          map={texture}
          metalness={0.08}
          roughness={0.4}
          envMapIntensity={0.25}
        />,
      ]}
    </mesh>
  );
}

export default function SceneCanvas() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.95,
        }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 7, 13]} />

        <ambientLight intensity={0.5} color="#e8e4dc" />
        <directionalLight
          castShadow
          position={[3, 4.5, 4]}
          intensity={2.0}
          shadow-mapSize={[1024, 1024]}
          color="#fff8ee"
        />
        <spotLight
          position={[-3, 3, 5]}
          angle={0.4}
          penumbra={0.85}
          intensity={1.2}
          color="#c8ee44"
        />
        <pointLight position={[0, -2.5, 3]} intensity={0.3} color="#e0ddd4" />

        <Suspense fallback={null}>
          <ProfileCard />
          <Environment preset="night" environmentIntensity={0.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
