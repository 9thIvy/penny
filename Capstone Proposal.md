# A surprising lack of pennitence

## Overview

Penny is a character sheet editor for TTRPGs. While eventually aiming to be system agnostic, YAGS (Yet Another Game System) will be used for testing purposes due to it's GPL License.

### Problem Space

Many other character sheet creators only support 5th edition of dungeons and dragons, and are used soley with their associated VTT. Penny will not depend on any VTT for usage, or internet connection.

### User Profile

- TTRPG Players:
    - wanting a character sheet editor that works offline
    - wanting a character sheet editor without using a VTT
    - those dissatisfied with WoTC, Hasbro, and their many poor choices

### Features

- As a player, I want to create, view, edit, and delete my characters.
- As a player, I want to be the only one to create, edit, or delete my characters.
- As a player, I want my stats and actions to reflect my gear choices.
- As a user, I want to click on a stat or action, and have the relevant dice be rolled, and relevant statuses applied.
- As a user, I want to see player rolls.

## Implementation

### Tech Stack

- Preact
- Typescript
- Rust
- Client Libraries:
    - preact
    - preact-router
    - tauri
    - serde
- Server Libraries:
    - rs-express
    - tokio

### APIs

- None, just optional for dice broadcasting using the server

### Sitemap

- Landing page - select system (just YAGS for now)
- Character select page
- character edit/create page
- character view page

### Data

The core of almost all TTRPGs are attributes. These points are the basis for all other stats, damage, and effects. Attributes will be defined, and all other components of the character sheet will calculate themselves based off of these attributes. The formulas for these will be defined in the ruleset file, with each component referring to them as needed. Since items can affect certain rolls, all components will have an array which defines what can modify them. A dependency change will trigger a recalculation.

### Endpoints

**POST** /rolls
```
[
    {
        "characterName":"Barb Arien",
        "skillName":"Athletics",
        "rollValue":16
    }
]
```

## Roadmap

- Create client with attributes that listens on the optional server
- Create server that sends dice rolls to all clients

- Add inventory with test item to demonstrate skill modifiers changing based on equipment
    - this is going to take most of the time^

- Add rest of YAGS content

- Styling

---

## Future Implementations
- Add special resources, such as components that refresh on a rest/new day
- As a GM, I want to view my players' characters.
- As a user, I want to use a system other then YAGS.
- As a user, I want to customise my sheet theme.
- As a user, I want to download game setting files from some repository rather than writing it myself.

