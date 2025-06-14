import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Component to load and display the jungle arena environment
export const JungleEnvironment: React.FC = () => {
  // Load basic jungle elements - using a platform as base
  const platform = useGLTF('/models/environments/jungle-arena/jungle-platform/platform.gltf');
  const tree = useGLTF('/models/environments/jungle-arena/jungle-platform/tree.gltf');
  const rocks = useGLTF('/models/environments/jungle-arena/jungle-platform/rocks.gltf');

  return (
    <group name="jungle-environment">
      {/* Simple starting jungle arena - just a platform for you to build on */}
      <primitive 
        object={platform.scene.clone()} 
        position={[0, 0, 0]} 
        scale={[2, 1, 2]} 
      />
      
      {/* Add a few basic elements for atmosphere */}
      <primitive 
        object={tree.scene.clone()} 
        position={[8, 0, 8]} 
        scale={[1, 1, 1]} 
      />
      <primitive 
        object={tree.scene.clone()} 
        position={[-8, 0, 8]} 
        scale={[0.8, 0.8, 0.8]} 
      />
      <primitive 
        object={rocks.scene.clone()} 
        position={[5, 0, -5]} 
        scale={[1.2, 1.2, 1.2]} 
      />
      <primitive 
        object={rocks.scene.clone()} 
        position={[-6, 0, -4]} 
        scale={[0.9, 0.9, 0.9]} 
      />
    </group>
  );
}; 