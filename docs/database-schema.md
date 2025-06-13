# Database Schema - Simplified MVP

## Core Game Tables

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| username | String | Unique username |
| created_at | Timestamp | Account creation time |
| last_login | Timestamp | Last login time |

### User_Stats Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to Users |
| games_played | Integer | Total games participated in |
| games_won | Integer | Games won as human team |
| total_survival_time | Integer | Total survival time in seconds |
| total_damage_dealt | Integer | Total damage dealt to gorillas |
| favorite_character_class | String | Most used character class |
| created_at | Timestamp | Stats record creation |
| updated_at | Timestamp | Last stats update |

## Game Data

### Character_Classes Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | String | Class name (Tank, Scout, Balanced) |
| base_health | Integer | Base health value |
| base_speed | Float | Base movement speed |
| base_damage | Integer | Base attack damage |
| description | String | Class description |

### Maps Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | String | Map name |
| environment | String | "jungle" or "colosseum" |
| max_players | Integer | Maximum players supported (100) |
| is_active | Boolean | Whether map is in rotation |

## Gameplay Tracking

### Game_Sessions Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| map_id | UUID | Foreign key to Maps |
| start_time | Timestamp | Session start time |
| end_time | Timestamp | Session end time |
| winner | String | "gorilla" or "humans" |
| total_players | Integer | Number of players who joined |
| game_duration | Integer | Game length in seconds |

### Player_Sessions Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| game_session_id | UUID | Foreign key to Game_Sessions |
| user_id | UUID | Foreign key to Users |
| character_class | String | Selected character class |
| join_time | Timestamp | When player joined |
| death_time | Timestamp | When player died (null if survived) |
| damage_dealt | Integer | Damage dealt to gorilla |
| survival_time | Integer | Time survived in seconds |

## Multiplayer Management

### Lobbies Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | String | Lobby name |
| host_id | UUID | Foreign key to Users |
| map_id | UUID | Foreign key to Maps |
| max_players | Integer | Maximum players (100) |
| current_players | Integer | Current player count |
| is_private | Boolean | Whether lobby needs invite |
| invite_code | String | Code for private lobbies |
| status | String | "waiting", "in_progress", "completed" |
| created_at | Timestamp | Lobby creation time |

### Lobby_Players Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| lobby_id | UUID | Foreign key to Lobbies |
| user_id | UUID | Foreign key to Users |
| character_class | String | Selected character class |
| is_ready | Boolean | Player ready status |
| join_time | Timestamp | When player joined lobby |

## Simple Analytics (Optional for Later)

### Daily_Stats Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| date | Date | Date of stats |
| total_games | Integer | Games played that day |
| gorilla_wins | Integer | Number of gorilla victories |
| human_wins | Integer | Number of human victories |
| avg_players_per_game | Float | Average player count |
| avg_game_duration | Integer | Average game length in seconds |