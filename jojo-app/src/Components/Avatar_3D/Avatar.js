import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import Model from "./Model/Model";
import ModelLoading from "./ModelLoading/ModelLoading";
import "./Avatar.less";

export default function Avatar() {
  const { progress } = useProgress();

  return (
    <div className="avatar_3D">
      <Canvas camera={{ position: [0.4, 2, 1.9], fov: 90 }}>
        <Suspense fallback={null}>
          <Model />
          <directionalLight color="#0ff" position={[-6, 0, 4]} />
          <directionalLight color="white" position={[6, 0, 4]} />
        </Suspense>
      </Canvas>
      {progress < 100 && <ModelLoading progress={progress} />}
    </div>
  );
}
