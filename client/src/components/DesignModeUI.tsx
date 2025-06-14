import React, { useRef } from 'react';
import { ArenaType } from './DesignMode';

interface Asset {
  path: string;
  name: string;
  category: string;
}

interface PlacedObject {
  id: string;
  assetPath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  name: string;
}

interface DesignModeUIProps {
  showAssetPalette: boolean;
  setShowAssetPalette: (show: boolean) => void;
  selectedAsset: string | null;
  setSelectedAsset: (asset: string | null) => void;
  transformMode: 'translate' | 'rotate' | 'scale';
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  selectedObjectId: string | null;
  placedObjects: PlacedObject[];
  duplicateObject: (id: string) => void;
  deleteObject: (id: string) => void;
  saveLayout: () => void;
  loadLayout: (data: string) => void;
  clearAll: () => void;
  availableAssets: Asset[];
  currentArena: ArenaType;
  setCurrentArena: (arena: ArenaType) => void;
}

export const DesignModeUI: React.FC<DesignModeUIProps> = ({
  showAssetPalette,
  setShowAssetPalette,
  selectedAsset,
  setSelectedAsset,
  transformMode,
  setTransformMode,
  selectedObjectId,
  placedObjects,
  duplicateObject,
  deleteObject,
  saveLayout,
  loadLayout,
  clearAll,
  availableAssets,
  currentArena,
  setCurrentArena
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get unique categories from available assets
  const categories = [...new Set(availableAssets.map(asset => asset.category))].sort();

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        loadLayout(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Asset Palette */}
      {showAssetPalette && (
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          width: '300px',
          maxHeight: '80vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          overflowY: 'auto',
          zIndex: 1000,
          border: '1px solid #555'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>🏛️ Asset Palette</h3>
          <button
            onClick={() => setShowAssetPalette(false)}
            style={{ 
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
          
          {categories.map(category => (
            <div key={category}>
              <h4 style={{ color: '#ffd700', marginTop: '15px', marginBottom: '8px' }}>
                {category}
              </h4>
              {availableAssets
                .filter(asset => asset.category === category)
                .map(asset => (
                  <button
                    key={asset.path}
                    onClick={() => setSelectedAsset(asset.path)}
                    style={{
                      display: 'block',
                      width: '100%',
                      margin: '2px 0',
                      padding: '8px 12px',
                      backgroundColor: selectedAsset === asset.path ? '#4CAF50' : '#444',
                      color: 'white',
                      border: selectedAsset === asset.path ? '2px solid #66BB6A' : '1px solid #666',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {asset.name}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Control Panel */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000,
        border: '1px solid #555',
        minWidth: '200px'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>🔧 Design Controls</h3>
        
        {/* Arena Selector */}
        <div style={{ margin: '10px 0' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Arena Type:</label>
          <select
            value={currentArena}
            onChange={(e) => setCurrentArena(e.target.value as ArenaType)}
            style={{ 
              width: '100%', 
              padding: '5px',
              backgroundColor: '#444',
              color: 'white',
              border: '1px solid #666',
              borderRadius: '4px'
            }}
          >
            <option value="colosseum">🏛️ Colosseum</option>
            <option value="jungle">🌿 Jungle Arena</option>
          </select>
        </div>
        
        {/* Placement Mode Indicator */}
        {selectedAsset && (
          <div style={{
            margin: '10px 0',
            padding: '10px',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            borderRadius: '4px',
            border: '1px solid #2196F3',
            textAlign: 'center'
          }}>
            <div style={{ color: '#2196F3', fontSize: '12px', fontWeight: 'bold' }}>
              🎯 PLACEMENT MODE
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px' }}>
              Ready to place: <strong>{availableAssets.find(a => a.path === selectedAsset)?.name}</strong>
            </div>
            <div style={{ fontSize: '10px', color: '#bbb', marginTop: '4px' }}>
              Click in empty space to place
            </div>
            <button
              onClick={() => setSelectedAsset(null)}
              style={{
                marginTop: '6px',
                padding: '4px 8px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              Cancel Placement
            </button>
          </div>
        )}
        
        {!showAssetPalette && (
          <button 
            onClick={() => setShowAssetPalette(true)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📦 Show Asset Palette
          </button>
        )}
        
        <div style={{ margin: '10px 0' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Transform Mode:</label>
          <select
            value={transformMode}
            onChange={(e) => setTransformMode(e.target.value as any)}
            style={{ 
              width: '100%', 
              padding: '5px',
              backgroundColor: '#444',
              color: 'white',
              border: '1px solid #666',
              borderRadius: '4px'
            }}
          >
            <option value="translate">🔄 Move</option>
            <option value="rotate">🔁 Rotate</option>
            <option value="scale">📏 Scale</option>
          </select>
        </div>

        {selectedObjectId && (
          <div style={{ 
            margin: '10px 0', 
            padding: '10px', 
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderRadius: '4px',
            border: '1px solid #4CAF50'
          }}>
            <strong>✅ Selected:</strong><br/>
            {placedObjects.find(o => o.id === selectedObjectId)?.name}
            <div style={{ marginTop: '8px' }}>
              <button 
                onClick={() => duplicateObject(selectedObjectId)} 
                style={{ 
                  marginRight: '5px',
                  padding: '5px 10px',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                📋 Duplicate
              </button>
              <button 
                onClick={() => deleteObject(selectedObjectId)}
                style={{ 
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '15px' }}>
          <button 
            onClick={saveLayout}
            style={{ 
              width: '100%',
              marginBottom: '5px',
              padding: '8px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            💾 Save Layout
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              width: '100%',
              marginBottom: '5px',
              padding: '8px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📁 Load Layout
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileLoad}
            style={{ display: 'none' }}
          />
          <button 
            onClick={clearAll}
            style={{ 
              width: '100%',
              padding: '8px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🗑️ Clear All
          </button>
        </div>

        <div style={{ 
          marginTop: '15px', 
          fontSize: '11px', 
          color: '#bbb',
          lineHeight: '1.3'
        }}>
          <div><strong>How to use:</strong></div>
          <div>• Select asset from palette</div>
          <div>• Click ground to place</div>
          <div>• Click object to select</div>
          <div>• Use transform controls</div>
          <div>• Press Delete to remove</div>
        </div>
      </div>
    </>
  );
}; 