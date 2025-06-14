import React, { useState, useRef, useCallback } from 'react';
import { useGLTF, TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

// Arena type definition
export type ArenaType = 'colosseum' | 'jungle';

// Available assets for the colosseum
export const COLOSSEUM_ASSETS = [
  { name: 'Floor', path: '/models/environments/colosseum/floor.glb', category: 'Structure' },
  { name: 'Wall', path: '/models/environments/colosseum/wall.glb', category: 'Structure' },
  { name: 'Wall Corner', path: '/models/environments/colosseum/wall-corner.glb', category: 'Structure' },
  { name: 'Wall Gate', path: '/models/environments/colosseum/wall-gate.glb', category: 'Structure' },
  { name: 'Column', path: '/models/environments/colosseum/column.glb', category: 'Structure' },
  { name: 'Column Damaged', path: '/models/environments/colosseum/column-damaged.glb', category: 'Structure' },
  { name: 'Stairs', path: '/models/environments/colosseum/stairs.glb', category: 'Structure' },
  { name: 'Stairs Corner', path: '/models/environments/colosseum/stairs-corner.glb', category: 'Structure' },
  { name: 'Stairs Corner Inner', path: '/models/environments/colosseum/stairs-corner-inner.glb', category: 'Structure' },
  { name: 'Block', path: '/models/environments/colosseum/block.glb', category: 'Cover' },
  { name: 'Bricks', path: '/models/environments/colosseum/bricks.glb', category: 'Cover' },
  { name: 'Border Corner', path: '/models/environments/colosseum/border-corner.glb', category: 'Decoration' },
  { name: 'Border Straight', path: '/models/environments/colosseum/border-straight.glb', category: 'Decoration' },
  { name: 'Statue', path: '/models/environments/colosseum/statue.glb', category: 'Decoration' },
  { name: 'Banner', path: '/models/environments/colosseum/banner.glb', category: 'Decoration' },
  { name: 'Trophy', path: '/models/environments/colosseum/trophy.glb', category: 'Decoration' },
  { name: 'Tree', path: '/models/environments/colosseum/tree.glb', category: 'Decoration' },
  { name: 'Weapon Rack', path: '/models/environments/colosseum/weapon-rack.glb', category: 'Interactive' },
  { name: 'Weapon Spear', path: '/models/environments/colosseum/weapon-spear.glb', category: 'Interactive' },
  { name: 'Weapon Sword', path: '/models/environments/colosseum/weapon-sword.glb', category: 'Interactive' },
  { name: 'Floor Detail', path: '/models/environments/colosseum/floor-detail.glb', category: 'Decoration' },
  { name: 'Character Soldier', path: '/models/environments/colosseum/character-soldier.glb', category: 'Reference' },
];

// Available assets for the jungle arena
export const JUNGLE_ASSETS = [
  // Jungle Platform Assets
  { name: 'Platform', path: '/models/environments/jungle-arena/jungle-platform/platform.gltf', category: 'Structure' },
  { name: 'Platform Ramp', path: '/models/environments/jungle-arena/jungle-platform/platform-ramp.gltf', category: 'Structure' },
  { name: 'Platform Overhang', path: '/models/environments/jungle-arena/jungle-platform/platform-overhang.gltf', category: 'Structure' },
  { name: 'Platform Fortified', path: '/models/environments/jungle-arena/jungle-platform/platform-fortified.gltf', category: 'Structure' },
  { name: 'Ladder', path: '/models/environments/jungle-arena/jungle-platform/ladder.gltf', category: 'Structure' },
  { name: 'Ladder Long', path: '/models/environments/jungle-arena/jungle-platform/ladder-long.gltf', category: 'Structure' },
  { name: 'Ladder Broken', path: '/models/environments/jungle-arena/jungle-platform/ladder-broken.gltf', category: 'Structure' },
  { name: 'Poles', path: '/models/environments/jungle-arena/jungle-platform/poles.gltf', category: 'Structure' },
  
  // Trees and Vegetation
  { name: 'Tree', path: '/models/environments/jungle-arena/jungle-platform/tree.gltf', category: 'Vegetation' },
  { name: 'Tree Snow', path: '/models/environments/jungle-arena/jungle-platform/tree-snow.gltf', category: 'Vegetation' },
  { name: 'Tree Pine', path: '/models/environments/jungle-arena/jungle-platform/tree-pine.gltf', category: 'Vegetation' },
  { name: 'Tree Pine Snow', path: '/models/environments/jungle-arena/jungle-platform/tree-pine-snow.gltf', category: 'Vegetation' },
  { name: 'Tree Pine Small', path: '/models/environments/jungle-arena/jungle-platform/tree-pine-small.gltf', category: 'Vegetation' },
  { name: 'Tree Pine Snow Small', path: '/models/environments/jungle-arena/jungle-platform/tree-pine-snow-small.gltf', category: 'Vegetation' },
  { name: 'Plant', path: '/models/environments/jungle-arena/jungle-platform/plant.gltf', category: 'Vegetation' },
  { name: 'Flowers', path: '/models/environments/jungle-arena/jungle-platform/flowers.gltf', category: 'Vegetation' },
  { name: 'Flowers Tall', path: '/models/environments/jungle-arena/jungle-platform/flowers-tall.gltf', category: 'Vegetation' },
  { name: 'Grass', path: '/models/environments/jungle-arena/jungle-platform/grass.gltf', category: 'Vegetation' },
  { name: 'Mushrooms', path: '/models/environments/jungle-arena/jungle-platform/mushrooms.gltf', category: 'Vegetation' },
  { name: 'Hedge', path: '/models/environments/jungle-arena/jungle-platform/hedge.gltf', category: 'Vegetation' },
  { name: 'Hedge Corner', path: '/models/environments/jungle-arena/jungle-platform/hedge-corner.gltf', category: 'Vegetation' },
  
  // Cover and Obstacles
  { name: 'Crate', path: '/models/environments/jungle-arena/jungle-platform/crate.gltf', category: 'Cover' },
  { name: 'Crate Strong', path: '/models/environments/jungle-arena/jungle-platform/crate-strong.gltf', category: 'Cover' },
  { name: 'Crate Item', path: '/models/environments/jungle-arena/jungle-platform/crate-item.gltf', category: 'Cover' },
  { name: 'Rocks', path: '/models/environments/jungle-arena/jungle-platform/rocks.gltf', category: 'Cover' },
  { name: 'Stones', path: '/models/environments/jungle-arena/jungle-platform/stones.gltf', category: 'Cover' },
  { name: 'Spike Block', path: '/models/environments/jungle-arena/jungle-platform/spike-block.gltf', category: 'Cover' },
  { name: 'Spike Block Wide', path: '/models/environments/jungle-arena/jungle-platform/spike-block-wide.gltf', category: 'Cover' },
  
  // Interactive Elements
  { name: 'Door Open', path: '/models/environments/jungle-arena/jungle-platform/door-open.gltf', category: 'Interactive' },
  { name: 'Door Large Open', path: '/models/environments/jungle-arena/jungle-platform/door-large-open.gltf', category: 'Interactive' },
  { name: 'Door Rotate', path: '/models/environments/jungle-arena/jungle-platform/door-rotate.gltf', category: 'Interactive' },
  { name: 'Door Rotate Large', path: '/models/environments/jungle-arena/jungle-platform/door-rotate-large.gltf', category: 'Interactive' },
  { name: 'Lever', path: '/models/environments/jungle-arena/jungle-platform/lever.gltf', category: 'Interactive' },
  { name: 'Key', path: '/models/environments/jungle-arena/jungle-platform/key.gltf', category: 'Interactive' },
  { name: 'Lock', path: '/models/environments/jungle-arena/jungle-platform/lock.gltf', category: 'Interactive' },
  
  // Traps and Hazards
  { name: 'Trap Spikes', path: '/models/environments/jungle-arena/jungle-platform/trap-spikes.gltf', category: 'Hazards' },
  { name: 'Trap Spikes Large', path: '/models/environments/jungle-arena/jungle-platform/trap-spikes-large.gltf', category: 'Hazards' },
  { name: 'Saw', path: '/models/environments/jungle-arena/jungle-platform/saw.gltf', category: 'Hazards' },
  
  // Fencing and Barriers
  { name: 'Fence Straight', path: '/models/environments/jungle-arena/jungle-platform/fence-straight.gltf', category: 'Barriers' },
  { name: 'Fence Corner', path: '/models/environments/jungle-arena/jungle-platform/fence-corner.gltf', category: 'Barriers' },
  { name: 'Fence Corner Curved', path: '/models/environments/jungle-arena/jungle-platform/fence-corner-curved.gltf', category: 'Barriers' },
  { name: 'Fence Broken', path: '/models/environments/jungle-arena/jungle-platform/fence-broken.gltf', category: 'Barriers' },
  { name: 'Fence Low Straight', path: '/models/environments/jungle-arena/jungle-platform/fence-low-straight.gltf', category: 'Barriers' },
  { name: 'Fence Low Corner', path: '/models/environments/jungle-arena/jungle-platform/fence-low-corner.gltf', category: 'Barriers' },
  { name: 'Fence Low Corner Curved', path: '/models/environments/jungle-arena/jungle-platform/fence-low-corner-curved.gltf', category: 'Barriers' },
  { name: 'Fence Low Broken', path: '/models/environments/jungle-arena/jungle-platform/fence-low-broken.gltf', category: 'Barriers' },
  
  // Decorative Items
  { name: 'Flag', path: '/models/environments/jungle-arena/jungle-platform/flag.gltf', category: 'Decoration' },
  { name: 'Sign', path: '/models/environments/jungle-arena/jungle-platform/sign.gltf', category: 'Decoration' },
  { name: 'Heart', path: '/models/environments/jungle-arena/jungle-platform/heart.gltf', category: 'Decoration' },
  { name: 'Jewel', path: '/models/environments/jungle-arena/jungle-platform/jewel.gltf', category: 'Decoration' },
  
  // Main Tree Assets from gltf folder (selection)
  { name: 'Forest Tree 1A', path: '/models/environments/jungle-arena/gltf/Tree_1_A_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 1B', path: '/models/environments/jungle-arena/gltf/Tree_1_B_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 1C', path: '/models/environments/jungle-arena/gltf/Tree_1_C_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 2A', path: '/models/environments/jungle-arena/gltf/Tree_2_A_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 2B', path: '/models/environments/jungle-arena/gltf/Tree_2_B_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 2C', path: '/models/environments/jungle-arena/gltf/Tree_2_C_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 3A', path: '/models/environments/jungle-arena/gltf/Tree_3_A_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 3B', path: '/models/environments/jungle-arena/gltf/Tree_3_B_Color1.gltf', category: 'Trees' },
  { name: 'Forest Tree 3C', path: '/models/environments/jungle-arena/gltf/Tree_3_C_Color1.gltf', category: 'Trees' },
  { name: 'Rock Formation 1A', path: '/models/environments/jungle-arena/gltf/Rock_1_O_Color1.gltf', category: 'Rocks' },
  { name: 'Rock Formation 1B', path: '/models/environments/jungle-arena/gltf/Rock_1_P_Color1.gltf', category: 'Rocks' },
  { name: 'Rock Formation 1C', path: '/models/environments/jungle-arena/gltf/Rock_1_Q_Color1.gltf', category: 'Rocks' },
  { name: 'Rock Formation 2A', path: '/models/environments/jungle-arena/gltf/Rock_2_A_Color1.gltf', category: 'Rocks' },
  { name: 'Rock Formation 2B', path: '/models/environments/jungle-arena/gltf/Rock_2_B_Color1.gltf', category: 'Rocks' },
  { name: 'Rock Formation 2C', path: '/models/environments/jungle-arena/gltf/Rock_2_C_Color1.gltf', category: 'Rocks' },
];

// Helper function to get assets for current arena
export const getAssetsForArena = (arena: ArenaType) => {
  return arena === 'colosseum' ? COLOSSEUM_ASSETS : JUNGLE_ASSETS;
};

// For backward compatibility
export const AVAILABLE_ASSETS = COLOSSEUM_ASSETS;

export interface PlacedObject {
  id: string;
  assetPath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  name: string;
}

export interface DesignModeState {
  showAssetPalette: boolean;
  setShowAssetPalette: (show: boolean) => void;
  selectedAsset: string | null;
  setSelectedAsset: (asset: string | null) => void;
  transformMode: 'translate' | 'rotate' | 'scale';
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  selectedObjectId: string | null;
  setSelectedObjectId: (id: string | null) => void;
  placedObjects: PlacedObject[];
  addObject: (object: PlacedObject) => void;
  updateObject: (id: string, updates: Partial<PlacedObject>) => void;
  duplicateObject: (id: string) => void;
  deleteObject: (id: string) => void;
  saveLayout: () => void;
  loadLayout: (data: string) => void;
  clearAll: () => void;
  currentArena: ArenaType;
  setCurrentArena: (arena: ArenaType) => void;
}

interface DesignModeProps {
  isDesignMode: boolean;
  onSaveLayout: (objects: PlacedObject[]) => void;
  onLoadLayout?: (objects: PlacedObject[]) => void;
  designState: DesignModeState; // Pass the shared state
  orbitControlsRef?: React.RefObject<any>; // Add OrbitControls ref
}

// Custom hook to manage design mode state
export const useDesignModeState = (isDesignMode: boolean, onSaveLayout: (objects: PlacedObject[]) => void): DesignModeState => {
  // Separate object collections for each arena
  const [colosseumObjects, setColosseumObjects] = useState<PlacedObject[]>([]);
  const [jungleObjects, setJungleObjects] = useState<PlacedObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const [showAssetPalette, setShowAssetPalette] = useState(true);
  const [currentArena, setCurrentArena] = useState<ArenaType>('colosseum');

  // Get current arena's objects
  const placedObjects = currentArena === 'colosseum' ? colosseumObjects : jungleObjects;
  const setPlacedObjects = currentArena === 'colosseum' ? setColosseumObjects : setJungleObjects;

  const updateObject = useCallback((id: string, updates: Partial<PlacedObject>) => {
    setPlacedObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    ));
  }, [setPlacedObjects]);

  const deleteObject = useCallback((id: string) => {
    setPlacedObjects(prev => prev.filter(obj => obj.id !== id));
    setSelectedObjectId(null);
  }, [setPlacedObjects]);

  const duplicateObject = useCallback((id: string) => {
    const original = placedObjects.find(obj => obj.id === id);
    if (original) {
      const newObject: PlacedObject = {
        ...original,
        id: `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        position: [
          original.position[0] + 2,
          original.position[1],
          original.position[2] + 2
        ]
      };
      setPlacedObjects(prev => [...prev, newObject]);
      setSelectedObjectId(newObject.id);
    }
  }, [placedObjects, setPlacedObjects]);

  const clearAll = useCallback(() => {
    if (window.confirm(`Clear all objects in ${currentArena} arena? This cannot be undone.`)) {
      setPlacedObjects([]);
      setSelectedObjectId(null);
    }
  }, [currentArena, setPlacedObjects]);

  const saveLayout = useCallback(() => {
    onSaveLayout(placedObjects);
    const layoutData = JSON.stringify({
      arena: currentArena,
      objects: placedObjects
    }, null, 2);
    console.log('Generated Layout Code:');
    console.log(layoutData);
    
    // Create and trigger download
    const blob = new Blob([layoutData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentArena}-arena-layout.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Layout saved! JSON file downloaded.');
  }, [placedObjects, onSaveLayout, currentArena]);

  const loadLayout = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      
      // Support both old format (just objects array) and new format (with arena)
      if (Array.isArray(parsed)) {
        // Old format - just objects, load into current arena
        setPlacedObjects(parsed);
        alert(`Layout loaded successfully into ${currentArena} arena!`);
      } else if (parsed.objects && Array.isArray(parsed.objects)) {
        // New format - with arena info
        const targetArena = parsed.arena && (parsed.arena === 'colosseum' || parsed.arena === 'jungle') 
          ? parsed.arena 
          : currentArena;
        
        // Switch to target arena and load objects
        setCurrentArena(targetArena);
        
        // Set objects for the target arena
        if (targetArena === 'colosseum') {
          setColosseumObjects(parsed.objects);
        } else {
          setJungleObjects(parsed.objects);
        }
        
        alert(`Layout loaded successfully! Switched to ${targetArena} arena.`);
      } else {
        throw new Error('Invalid JSON format');
      }
      
      setSelectedObjectId(null);
      setSelectedAsset(null);
    } catch (error) {
      alert('Error loading layout: Invalid JSON format');
      console.error('Load error:', error);
    }
  }, [currentArena, setColosseumObjects, setJungleObjects]);

  const addObject = useCallback((object: PlacedObject) => {
    setPlacedObjects(prev => [...prev, object]);
    setSelectedObjectId(object.id);
  }, [setPlacedObjects]);

  // Custom arena setter that clears selection when switching
  const handleArenaChange = useCallback((arena: ArenaType) => {
    setCurrentArena(arena);
    setSelectedObjectId(null); // Clear selection when switching arenas
    setSelectedAsset(null); // Clear selected asset too
  }, []);

  return {
    showAssetPalette,
    setShowAssetPalette,
    selectedAsset,
    setSelectedAsset,
    transformMode,
    setTransformMode,
    selectedObjectId,
    setSelectedObjectId,
    placedObjects,
    addObject,
    updateObject,
    duplicateObject,
    deleteObject,
    saveLayout,
    loadLayout,
    clearAll,
    currentArena,
    setCurrentArena: handleArenaChange
  };
};

// Individual placed object component
const PlacedObjectComponent: React.FC<{
  object: PlacedObject;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<PlacedObject>) => void;
  onDelete: () => void;
  transformMode: 'translate' | 'rotate' | 'scale';
  orbitControlsRef?: React.RefObject<any>; // Add OrbitControls ref
}> = ({ object, isSelected, onSelect, onUpdate, onDelete, transformMode, orbitControlsRef }) => {
  const { scene } = useGLTF(object.assetPath);
  const meshRef = useRef<THREE.Object3D>(null);
  
  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    onSelect();
  }, [onSelect]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      onDelete();
    }
  }, [isSelected, onDelete]);

  React.useEffect(() => {
    if (isSelected) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelected, handleKeyDown]);

  return (
    <>
      {/* Main object group */}
      <group 
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
      >
        {/* Add a selection outline/glow effect when selected */}
        {isSelected && (
          <primitive
            object={scene.clone()}
            scale={[1.05, 1.05, 1.05]}
          >
            <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
          </primitive>
        )}
        
        {/* Invisible larger hit area for easier clicking */}
        <mesh
          scale={[Math.max(1.5, 2), Math.max(1.5, 2), Math.max(1.5, 2)]}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'default';
          }}
          visible={false}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        
        <primitive
          ref={meshRef}
          object={scene.clone()}
        />
      </group>
      
      {/* Transform Controls - OUTSIDE the group to prevent recursion */}
      {isSelected && meshRef.current && (
        <TransformControls
          object={meshRef.current.parent} // Control the parent group, not the primitive
          mode={transformMode}
          size={0.8}
          space="world"
          onMouseDown={() => {
            // Disable OrbitControls when starting to drag transform controls
            if (orbitControlsRef?.current) {
              orbitControlsRef.current.enabled = false;
            }
          }}
          onMouseUp={() => {
            // Re-enable OrbitControls when done dragging
            if (orbitControlsRef?.current) {
              orbitControlsRef.current.enabled = true;
            }
          }}
          onChange={() => {
            if (meshRef.current?.parent) {
              const parent = meshRef.current.parent;
              onUpdate({
                position: [parent.position.x, parent.position.y, parent.position.z],
                rotation: [parent.rotation.x, parent.rotation.y, parent.rotation.z],
                scale: [parent.scale.x, parent.scale.y, parent.scale.z]
              });
            }
          }}
        />
      )}
    </>
  );
};

export const DesignMode: React.FC<DesignModeProps> = ({ isDesignMode, onSaveLayout, designState, orbitControlsRef }) => {
  // Use the shared design state instead of local state
  const {
    placedObjects,
    selectedObjectId,
    selectedAsset,
    transformMode
  } = designState;

  // Mouse tracking for click vs drag detection
  const mouseDownPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  // Track mouse events to differentiate click from drag
  const handleMouseDown = useCallback((e: any) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: any) => {
    if (mouseDownPos.current) {
      const dx = e.clientX - mouseDownPos.current.x;
      const dy = e.clientY - mouseDownPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // If mouse moved more than 5 pixels, consider it a drag
      if (distance > 5) {
        isDragging.current = true;
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseDownPos.current = null;
    // Reset dragging flag after a short delay to allow click events to process
    setTimeout(() => {
      isDragging.current = false;
    }, 10);
  }, []);

  // Handle clicking in empty space to place objects
  const handleSceneClick = useCallback((e: any) => {
    // Don't place if no asset selected, not in design mode, or if user was dragging
    if (!selectedAsset || !isDesignMode || isDragging.current) {
      return;
    }
    
    // Get click position in world space
    const point = e.point;
    if (point) {
      const currentAssets = getAssetsForArena(designState.currentArena);
      const newObject: PlacedObject = {
        id: `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        assetPath: selectedAsset,
        position: [point.x, point.y, point.z],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        name: currentAssets.find(a => a.path === selectedAsset)?.name || 'Unknown'
      };
      
      designState.addObject(newObject);
    }
  }, [selectedAsset, isDesignMode, designState]);

  // Clear selection when clicking empty space (but not placing)
  const handleEmptySpaceClick = useCallback((e: any) => {
    // Only clear selection if not placing an object and not dragging
    if (!selectedAsset && !isDragging.current && isDesignMode) {
      designState.setSelectedObjectId(null);
    }
  }, [selectedAsset, isDesignMode, designState]);

  if (!isDesignMode) {
    // Render placed objects in play mode
    return (
      <group name="designed-colosseum">
        {placedObjects.map(object => {
          const { scene } = useGLTF(object.assetPath);
          return (
            <primitive
              key={object.id}
              object={scene.clone()}
              position={object.position}
              rotation={object.rotation}
              scale={object.scale}
            />
          );
        })}
      </group>
    );
  }

  // Set up mouse event listeners for drag detection
  React.useEffect(() => {
    if (isDesignMode) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDesignMode, handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <>
      {/* Invisible plane for click detection */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        onClick={(e) => {
          handleSceneClick(e);
          handleEmptySpaceClick(e);
        }}
        visible={false}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial />
      </mesh>

      {/* Render all placed objects */}
      {placedObjects.map(object => (
        <PlacedObjectComponent
          key={object.id}
          object={object}
          isSelected={selectedObjectId === object.id}
          onSelect={() => designState.setSelectedObjectId(object.id)}
          onUpdate={(updates) => designState.updateObject(object.id, updates)}
          onDelete={() => designState.deleteObject(object.id)}
          transformMode={transformMode}
          orbitControlsRef={orbitControlsRef}
        />
      ))}

    </>
  );
};

// Preload all assets
AVAILABLE_ASSETS.forEach(asset => {
  useGLTF.preload(asset.path);
}); 