/**
 * GameScene.tsx
 * 
 * Core component that manages the 3D multiplayer game environment:
 * 
 * Key functionality:
 * - Acts as the primary container for all 3D game elements
 * - Manages the game world environment (terrain, lighting, physics)
 * - Instantiates and coordinates player entities
 * - Handles multiplayer synchronization across clients
 * - Manages game state and lifecycle (start, join, disconnect)
 * - Maintains socket connections for real-time gameplay
 * 
 * Props:
 * - username: The local player's display name
 * - playerClass: The selected character class for the local player
 * - roomId: Unique identifier for the multiplayer game session
 * - onDisconnect: Callback function when player disconnects from game
 * 
 * Technical implementation:
 * - Uses React Three Fiber (R3F) for 3D rendering within React
 * - Implements physics system with Rapier for realistic interactions
 * - Manages socket.io connections for multiplayer state synchronization
 * - Handles dynamic loading and instantiation of 3D assets
 * 
 * Related files:
 * - Player.tsx: Individual player entity component
 * - JoinGameDialog.tsx: UI for joining a game session
 * - PlayerUI.tsx: In-game user interface elements
 * - Socket handlers for network communication
 */

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Plane, Grid, Sky, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { DirectionalLightHelper, CameraHelper } from 'three'; // Import the helper
// Import generated types
import { PlayerData, InputState } from '../generated';
import { Identity } from '@clockworklabs/spacetimedb-sdk';
import { Player } from './Player';
import { ColosseumEnvironment } from './ColosseumEnvironment';
import { JungleEnvironment } from './JungleEnvironment';
import { DesignMode, DesignModeState } from './DesignMode';

interface GameSceneProps {
  players: ReadonlyMap<string, PlayerData>; // Receive the map
  localPlayerIdentity: Identity | null;
  onPlayerRotation?: (rotation: THREE.Euler) => void; // Optional callback for player rotation
  currentInputRef?: React.MutableRefObject<InputState>; // Add input state ref prop
  isDebugPanelVisible?: boolean; // Prop to indicate if the debug panel is visible
  isDesignMode?: boolean; // Prop to enable design mode
  designState?: DesignModeState; // Design mode state
}

export const GameScene: React.FC<GameSceneProps> = ({ 
  players, 
  localPlayerIdentity,
  onPlayerRotation,
  currentInputRef, // Receive input state ref
  isDebugPanelVisible = false, // Destructure the new prop
  isDesignMode = false, // Destructure design mode prop
  designState // Design mode state
}) => {
  // Ref for the main directional light
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!); 
  // Ref for OrbitControls to allow DesignMode to control it
  const orbitControlsRef = useRef<any>(null);

  return (
    <Canvas 
      camera={{ position: [0, 10, 20], fov: 60 }} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} 
      shadows // Enable shadows
    >
      {/* Remove solid color background */}
      {/* <color attach="background" args={['#add8e6']} /> */}
      
      {/* Environment-appropriate sky and lighting */}
      {designState?.currentArena === 'jungle' ? (
        <>
          {/* Jungle-appropriate sky */}
          <Sky distance={450000} sunPosition={[2, 1, 3]} inclination={0.3} azimuth={0.25} />
          
          {/* Softer ambient light for jungle atmosphere */}
          <ambientLight intensity={0.7} color="#e6f7e6" />
          
          {/* Filtered sunlight through canopy */}
          <directionalLight 
            ref={directionalLightRef}
            position={[15, 30, 10]} 
            intensity={1.5} 
            castShadow 
            color="#f0f8e6"
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048} 
            shadow-bias={-0.0001} 
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
            shadow-camera-near={0.1} 
            shadow-camera-far={120} 
          />
          
          {/* Green-tinted fill light */}
          <directionalLight 
            position={[-8, 12, 8]} 
            intensity={0.6} 
            color="#d4f4d4"
          />
        </>
      ) : (
        <>
          {/* Colosseum-appropriate sky */}
          <Sky distance={450000} sunPosition={[3, 2, 5]} inclination={0.1} azimuth={0.15} />

          {/* Warm ambient light for arena atmosphere */}
          <ambientLight intensity={0.6} color="#fff5e6" />
          
          {/* Main sun light for dramatic shadows */}
          <directionalLight 
            ref={directionalLightRef}
            position={[20, 25, 15]} 
            intensity={2.0} 
            castShadow 
            color="#fff8dc"
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048} 
            shadow-bias={-0.0001} 
            shadow-camera-left={-40}
            shadow-camera-right={40}
            shadow-camera-top={40}
            shadow-camera-bottom={-40}
            shadow-camera-near={0.1} 
            shadow-camera-far={120} 
          />
          
          {/* Additional warm fill light */}
          <directionalLight 
            position={[-10, 15, 10]} 
            intensity={0.8} 
            color="#ffebcd"
          />
        </>
      )}

      {/* Conditionally render Light and Shadow Camera Helpers */}
      {isDebugPanelVisible && directionalLightRef.current && (
        <>
          <primitive object={new DirectionalLightHelper(directionalLightRef.current, 5)} />
          {/* Add CameraHelper for the shadow camera */}
          <primitive object={new CameraHelper(directionalLightRef.current.shadow.camera)} /> 
        </>
      )}
      
      {/* Environment - Show DesignMode or appropriate arena environment */}
      {isDesignMode && designState ? (
        <DesignMode 
          isDesignMode={isDesignMode}
          onSaveLayout={(objects) => {
            console.log(`Saved ${designState.currentArena} layout:`, objects);
          }}
          designState={designState}
          orbitControlsRef={orbitControlsRef}
        />
      ) : (
        // Show appropriate environment based on current arena in design state or default to colosseum
        designState?.currentArena === 'jungle' ? (
          <JungleEnvironment />
        ) : (
          <ColosseumEnvironment />
        )
      )}
      
      {/* Ground plane for areas outside the arena */}
      <Plane 
        args={[100, 100]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]} 
        receiveShadow={true} 
      >
        <meshStandardMaterial 
          color={designState?.currentArena === 'jungle' ? "#2d5016" : "#8B7355"} 
          transparent 
          opacity={0.7} 
        />
      </Plane>

      {/* Render Players */}
      {Array.from(players.values()).map((player) => {
        const isLocal = localPlayerIdentity?.toHexString() === player.identity.toHexString();
        return (
          <Player 
            key={player.identity.toHexString()} 
            playerData={player}
            isLocalPlayer={isLocal}
            onRotationChange={isLocal ? onPlayerRotation : undefined}
            currentInput={isLocal ? currentInputRef?.current : undefined}
            isDebugArrowVisible={isLocal ? isDebugPanelVisible : false} // Pass down arrow visibility
            isDebugPanelVisible={isDebugPanelVisible} // Pass down general debug visibility
            isDesignMode={isDesignMode} // Pass down design mode state
          />
        );
      })}

      {/* Add OrbitControls only in design mode for free camera movement */}
      {isDesignMode && (
        <OrbitControls
          ref={orbitControlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          panSpeed={0.5}
          zoomSpeed={0.5}
          rotateSpeed={0.5}
          minDistance={5}
          maxDistance={100}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          makeDefault
        />
      )}
    </Canvas>
  );
};
