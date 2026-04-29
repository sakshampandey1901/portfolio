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

  const cardHeight = Math.min(viewport.height * 0.55, 4.2);
  const cardWidth = cardHeight * aspect;
  const cardDepth = 0.12;

  useEffect(() => {
    const proxy = rotationProxy.current;

    const ctx = gsap.context(() => {
      /*
       * SCROLL-LINKED 360° ROTATION
       * trigger / scroller — the HTML scroll container
       * start / end        — full document scroll range
       * scrub               — 1:1 tie between scroll position and rotation
       *
       * To change the rotation speed, adjust the `y` value in the tween.
       * Math.PI * 2 = one full 360° turn. Use Math.PI * 4 for two full turns, etc.
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
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.06;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[cardWidth, cardHeight, cardDepth]} />
      {/*
        Six faces of the box: +x, -x, +y, -y, +z (front), -z (back).
        We map the profile texture to the front (+z) and back (-z) faces
        and give the remaining four edge faces a dark material.
      */}
      {[
        <meshStandardMaterial
          key="edge-right"
          color="#1a1614"
          metalness={0.6}
          roughness={0.28}
        />,
        <meshStandardMaterial
          key="edge-left"
          color="#1a1614"
          metalness={0.6}
          roughness={0.28}
        />,
        <meshStandardMaterial
          key="edge-top"
          color="#1a1614"
          metalness={0.6}
          roughness={0.28}
        />,
        <meshStandardMaterial
          key="edge-bottom"
          color="#1a1614"
          metalness={0.6}
          roughness={0.28}
        />,
        <meshStandardMaterial
          key="front"
          map={texture}
          metalness={0.05}
          roughness={0.45}
          envMapIntensity={0.3}
        />,
        <meshStandardMaterial
          key="back"
          map={texture}
          metalness={0.05}
          roughness={0.45}
          envMapIntensity={0.3}
        />,
      ]}
    </mesh>
  );
}

export default function SceneCanvas() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 36 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={["#f7f5f0"]} />
        <fog attach="fog" args={["#f7f5f0", 8, 14]} />

        <ambientLight intensity={0.8} />
        <directionalLight
          castShadow
          position={[4, 5, 4]}
          intensity={2.4}
          shadow-mapSize={[1024, 1024]}
          color="#fffaf0"
        />
        <spotLight
          position={[-3, 3, 5]}
          angle={0.4}
          penumbra={0.9}
          intensity={1.6}
          color="#fff8ee"
        />
        <pointLight position={[0, -3, 3]} intensity={0.4} color="#e8ddd0" />

        <Suspense fallback={null}>
          <ProfileCard />
          <Environment preset="city" environmentIntensity={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}
