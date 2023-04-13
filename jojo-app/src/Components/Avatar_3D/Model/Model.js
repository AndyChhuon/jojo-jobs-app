import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./avatar_glt.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    //Play the animation
    actions["Armature|mixamo.com|Layer0.003"].play();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="EyeLeft002"
            geometry={nodes.EyeLeft002.geometry}
            material={materials["Wolf3D_Eye.003"]}
            skeleton={nodes.EyeLeft002.skeleton}
            morphTargetDictionary={nodes.EyeLeft002.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft002.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight002"
            geometry={nodes.EyeRight002.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight002.skeleton}
            morphTargetDictionary={nodes.EyeRight002.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight002.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Body002"
            geometry={nodes.Wolf3D_Body002.geometry}
            material={materials["Wolf3D_Body.003"]}
            skeleton={nodes.Wolf3D_Body002.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Hair002"
            geometry={nodes.Wolf3D_Hair002.geometry}
            material={materials["Wolf3D_Hair.003"]}
            skeleton={nodes.Wolf3D_Hair002.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom002"
            geometry={nodes.Wolf3D_Outfit_Bottom002.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom002.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top002"
            geometry={nodes.Wolf3D_Outfit_Top002.geometry}
            material={materials["Wolf3D_Outfit_Top.003"]}
            skeleton={nodes.Wolf3D_Outfit_Top002.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear002"
            geometry={nodes.Wolf3D_Outfit_Footwear002.geometry}
            material={materials["Wolf3D_Outfit_Footwear.003"]}
            skeleton={nodes.Wolf3D_Outfit_Footwear002.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Teeth002"
            geometry={nodes.Wolf3D_Teeth002.geometry}
            material={materials["Wolf3D_Teeth.003"]}
            skeleton={nodes.Wolf3D_Teeth002.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth002.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth002.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Head002"
            geometry={nodes.Wolf3D_Head002.geometry}
            material={materials["Wolf3D_Skin.003"]}
            skeleton={nodes.Wolf3D_Head002.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head002.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head002.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./avatar_glt.glb");
