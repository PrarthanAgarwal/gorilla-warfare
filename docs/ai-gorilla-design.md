# AI Gorilla Design Document - Simplified MVP

## Overview
The AI-controlled gorilla is the centerpiece of the game, designed to provide a challenging opponent for up to 100 human players. The gorilla AI uses pre-programmed behaviors with simple decision trees to create an engaging opponent. Advanced learning features can be added in later phases.

## Core AI Architecture

### Simple Behavior System
The gorilla AI uses a straightforward decision tree with:
- **Basic Combat**: Attack nearest player or group
- **Simple Movement**: Chase targets, avoid getting surrounded
- **Rage Mode**: Activated at 30% health - increased damage and speed

### Basic State Machine
The gorilla has three main states:
- **Hunting**: Actively pursuing the nearest player
- **Attacking**: In combat with players in range
- **Raging**: High-damage state at low health

## Scientific Accuracy
The gorilla's abilities and behaviors are based on scientifically accurate silverback gorilla capabilities, with some game-appropriate enhancements:

### Realistic Gorilla Traits
- **Strength**: Can lift/throw objects weighing up to 10x a human's capacity
- **Speed**: Short bursts of speed up to 25mph
- **Climbing**: Excellent climbing abilities despite size
- **Intelligence**: Problem-solving capabilities, environmental awareness
- **Intimidation Displays**: Chest beating, vocalizations to intimidate opponents

### Game-Enhanced Abilities
- **Health Pool**: Significantly larger than human players (able to withstand coordinated attacks)
- **Damage Resistance**: Natural armor reducing damage
- **Leap Attack**: Enhanced jumping capability for gameplay
- **Ground Pound**: Area-of-effect attack based on actual gorilla behavior
- **Rage Mode**: Increased capabilities when health is low

## AI Decision Making (Future Enhancement)

### Phase 1: Basic AI
- Simple target selection (closest/weakest player)
- Fixed attack patterns based on range and player count
- Basic health scaling with number of players

### Phase 2: Enhanced AI (Future)
- Gemini API integration for strategic decisions
- Pattern recognition for player behaviors
- Dynamic difficulty adjustment
- Always maintain local fallback behavior

## Gorilla Abilities & Attacks

### Basic Attacks
1. **Swipe**
   - Wide arc damage affecting multiple players
   - High damage with knockback effect
   - Fast execution with short cooldown

2. **Charge**
   - Linear rushing attack with devastating damage
   - Damages all players in path
   - Has recovery period if missed

3. **Grab**
   - Single target high damage attack
   - Can throw grabbed player at others
   - Vulnerable during execution

4. **Ground Pound**
   - Area-of-effect attack
   - Damages and staggers all nearby players
   - Creates minor terrain destruction

### Special Abilities (MVP)
1. **Rage Mode**
   - Activated at 30% health
   - Increased speed and damage (1.5x multiplier)
   - Visual indicators (red effect, faster animations)
   - Lasts for 30 seconds

2. **Basic Environmental Interaction**
   - Can break through simple destructible barriers
   - Picks up and throws basic objects (rocks, logs)

Future abilities to add later:
- Intimidation displays
- Advanced environmental usage

## Difficulty Scaling (Simplified)

### Player Count Scaling
- **Health**: Base health × (player_count / 20) - Simple linear scaling
- **Damage**: Fixed damage regardless of player count  
- **Attack Speed**: Slightly faster with more players (up to 20% increase)

### Basic Time Progression
- Every 2 minutes, gorilla gains 10% damage boost (caps at 50%)
- Rage mode becomes available earlier as time progresses

Future enhancements:
- Performance-based difficulty adjustment
- Complex tactical awareness

## Technical Implementation (MVP)

### Simple Pathfinding
- **Basic Navigation**: Use existing game pathfinding system
- **Obstacle Handling**: Simple collision avoidance, no complex planning

### Basic Target Selection
- Target closest player within range
- If multiple players equally close, target one with lowest health
- Simple line-of-sight checks

### Performance Considerations
- Update AI decision making every 100ms (not every frame)
- Limit sight range to reduce computation
- Simple state machine transitions

### Debug Tools (Essential)
- Console logging of AI state changes
- Visual indicators for current AI state
- Basic health/damage tracking