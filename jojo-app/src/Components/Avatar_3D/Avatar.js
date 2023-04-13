import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Model from "./Model/Model";
import "./Avatar.less";

export default function Avatar() {
  return (
    <div className="avatar_3D">
      <Canvas camera={{ position: [0.4, 2, 1.9], fov: 90 }}>
        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" />
          <directionalLight color="#0ff" position={[-6, 0, 4]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
