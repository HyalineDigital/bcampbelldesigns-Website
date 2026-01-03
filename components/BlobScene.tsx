"use client";

import { Canvas } from "@react-three/fiber";
import GradientBlob from "./GradientBlob";
import { Suspense } from "react";

export default function BlobScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <GradientBlob />
        </Suspense>
      </Canvas>
    </div>
  );
}
