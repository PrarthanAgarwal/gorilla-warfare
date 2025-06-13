# Environment Design Document

## Jungle Arena

### Overview
The Jungle Arena is a lush, tropical environment featuring dense vegetation, ancient ruins, and varied terrain. This arena emphasizes vertical gameplay, stealth mechanics, and environmental hazards, giving both the gorilla and human players various tactical options.

### Visual Elements
- **Color Palette**: 
  - Primary: Various shades of green (#2E8B57, #3CB371, #90EE90)
  - Secondary: Earth tones (#8B4513, #A0522D, #CD853F)
  - Accent: Vibrant tropical flower colors (#FF4500, #FFD700, #4169E1)

- **Lighting**:
  - Dappled sunlight filtering through canopy
  - Dynamic time of day cycle (optional feature)
  - Fog effects for atmospheric depth

- **Terrain Features**:
  - Varied elevation with hills and valleys
  - River cutting through the map with crossings
  - Rocky outcroppings and cliffs
  - Muddy areas that slow movement

### Key Features

#### Ancient Temple Ruins
- Central multi-level stone structure
- Crumbling walls providing partial cover
- Hidden chambers with power-ups or weapons
- Climbable exterior for both gorilla and humans
- Top platform offering strategic vantage point

#### Dense Canopy
- Network of interconnected tree branches
- Vine swinging mechanics for faster traversal
- Falling damage from heights
- Leaf cover providing partial concealment
- Breakable branches that collapse under gorilla's weight

#### River System
- Flowing water with current effects
- Shallow areas for wading
- Deeper sections requiring swimming
- Fallen log bridges
- Waterfall creating visual and audio cover

#### Undergrowth and Vegetation
- Tall grass for hiding (humans only)
- Breakable bamboo forests
- Thorny areas causing minor damage when rushed through
- Fruit trees with collectible healing items
- Camouflaged traps that players can activate

### Gameplay Considerations

#### For Human Players
- Multiple hiding spots throughout the map
- Elevated platforms for ranged attacks
- Narrow passages that the gorilla can't fit through
- Environmental tools (rolling logs, collapsible bridges)
- Resource gathering nodes (weapon materials, healing plants)

#### For Gorilla Player
- Trees and structures that support climbing mechanics
- Destructible environment elements
- Ambush points overlooking common paths
- Terrain that showcases the gorilla's jumping ability
- Sound-based tracking (breaking branches, water splashing)

#### Dynamic Elements
- Destructible trees that create new paths when knocked down
- Rock slides that can be triggered
- Flash flood events in the river (rare occurrence)
- Disturbed wildlife indicating player positions
- Weather effects altering visibility and movement speed

### Technical Implementation Notes
- Foliage system using instanced meshes
- Water shader with realistic flow and reflection
- Procedural generation for certain vegetation elements
- Ambient sound system with positional audio
- Particle effects for environmental interactions

## Roman Colosseum

### Overview
The Roman Colosseum arena is an ancient battle stadium with a simple, focused layout. This environment emphasizes open combat, strategic positioning, and resource management, creating intense confrontations between the gorilla and human players.

### Visual Elements
- **Color Palette**:
  - Primary: Stone and marble tones (#D2B48C, #F5F5DC, #E6E6FA)
  - Secondary: Weathered metal and wood (#8B4513, #B87333, #CD853F)
  - Accent: Blood red and gold (#8B0000, #DAA520)

- **Lighting**:
  - Dramatic torchlight creating dynamic shadows
  - Shafts of sunlight through openings in the ceiling
  - Fire pits and braziers casting orange glow

- **Architectural Features**:
  - Single-level open arena with sand-covered ground
  - Simple surrounding walls with basic entryways
  - Scattered debris and battle remnants
  - Strategic pillars and broken structures for cover
  - Weapon racks and environmental items

### Key Features

#### Central Arena
- Open sand-covered fighting pit
- Blood stains and battle debris
- Scattered weapons and shields
- Strategic cover points
- Various terrain textures affecting movement speed

#### Arena Perimeter
- Low walls around the arena edge
- Simple entry/exit points
- Decorative elements (banners, torches)
- Spectator area (visual only, not accessible)

#### Mechanical Elements
- Simple trap mechanisms
- Spike pits in key locations
- Oil pots that can be ignited
- Breakable environmental objects
- Weapon racks with period-appropriate items

### Gameplay Considerations

#### For Human Players
- Weapon racks with traditional weapons (spears, shields, etc.)
- Defensive positions behind pillars and structures
- Simple trap triggers
- Resource management (limited weapons)
- Strategic positioning for group attacks

#### For Gorilla Player
- Destructible cover elements
- Heavy objects for throwing/crushing
- Climbing points on arena walls
- Clear sound-based tracking
- Intimidation mechanics

#### Dynamic Elements
- Collapsing structures during battle
- Environmental hazards (fire, spikes)
- Dynamic lighting changes
- Weather effects (optional)
- Debris accumulation based on destruction

### Technical Implementation Notes
- Modular architecture system for varied layouts
- Dynamic lighting system for torches and shadows
- Ambient occlusion for realistic stone environment
- Particle effects for dust, debris, and blood
- Sound reflection system for realistic echo effects

## Combined Environmental Interactions

### Shared Mechanics
- **Physics-Based Destruction**:
  - Both environments feature destructible elements
  - Persistent destruction affecting tactical options
  - Debris that can cause damage
  
- **Traversal Systems**:
  - Simple climbing mechanics
  - Environmental movement options
  - Jump mechanics for gorilla
  
- **Concealment Systems**:
  - Different visibility models for each environment
  - Sound propagation unique to environment
  - Tracking mechanics (footprints in sand/mud)
  
- **Resource Distribution**:
  - Strategic placement of weapons and health items
  - Environment-specific items
  - Risk/reward balance for item collection