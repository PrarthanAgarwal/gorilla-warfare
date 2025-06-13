import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Component to load and display the colosseum environment
export const ColosseumEnvironment: React.FC = () => {
  // Load basic structural elements
  const floor = useGLTF('/models/environments/colosseum/floor.glb');
  const wall = useGLTF('/models/environments/colosseum/wall.glb');
  const wallCorner = useGLTF('/models/environments/colosseum/wall-corner.glb');
  const wallGate = useGLTF('/models/environments/colosseum/wall-gate.glb');
  const column = useGLTF('/models/environments/colosseum/column.glb');
  const stairs = useGLTF('/models/environments/colosseum/stairs.glb');
  const block = useGLTF('/models/environments/colosseum/block.glb');
  const bricks = useGLTF('/models/environments/colosseum/bricks.glb');
  
  // Load decorative elements
  const statue = useGLTF('/models/environments/colosseum/statue.glb');
  const banner = useGLTF('/models/environments/colosseum/banner.glb');
  const weaponRack = useGLTF('/models/environments/colosseum/weapon-rack.glb');
  const weapon = useGLTF('/models/environments/colosseum/weapon-spear.glb');

  return (
    <group name="colosseum-environment">
      {/* Simple starting arena - just a floor for you to build on */}
      <primitive 
        object={floor.scene.clone()} 
        position={[0, 0, 0]} 
        scale={[2, 1, 2]} 
      />
    </group>
  );
};

// Preload all models for better performance
useGLTF.preload('/models/environments/colosseum/floor.glb');
useGLTF.preload('/models/environments/colosseum/wall.glb');
useGLTF.preload('/models/environments/colosseum/wall-corner.glb');
useGLTF.preload('/models/environments/colosseum/wall-gate.glb');
useGLTF.preload('/models/environments/colosseum/column.glb');
useGLTF.preload('/models/environments/colosseum/stairs.glb');
useGLTF.preload('/models/environments/colosseum/block.glb');
useGLTF.preload('/models/environments/colosseum/bricks.glb');
useGLTF.preload('/models/environments/colosseum/statue.glb');
useGLTF.preload('/models/environments/colosseum/banner.glb');
useGLTF.preload('/models/environments/colosseum/weapon-rack.glb');
useGLTF.preload('/models/environments/colosseum/weapon-spear.glb'); 