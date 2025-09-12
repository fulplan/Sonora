# BYOB-Lab Design Guidelines

## Design Approach
**Cyberpunk Military Opsec Theme** - Inspired by military command centers, cyberpunk aesthetics, and tactical operations interfaces. Combines the technical precision of military systems with the futuristic edge of cyberpunk design.

## Core Design Elements

### Color Palette
**Cyberpunk Military Theme**:
- Background: 220 25% 4% (deep tactical black)
- Surface: 220 20% 8% (command center dark)
- Primary: 180 100% 45% (cyberpunk cyan for active states)  
- Secondary: 130 70% 45% (matrix green for success/online)
- Accent: 15 100% 50% (tactical red for alerts/critical)
- Warning: 45 100% 50% (amber warning for compromised)
- Text Primary: 180 20% 95% (cyan-tinted white)
- Text Secondary: 180 15% 70% (muted cyan-gray)

### Typography
- **Primary**: 'JetBrains Mono' (monospace for terminal/code authenticity)
- **Secondary**: 'Inter' (clean sans-serif for UI elements)
- Terminal text: 14px regular weight
- UI text: 14-16px medium weight
- Headers: 18-24px semibold

### Layout System
**Tailwind spacing units**: 2, 4, 6, 8, 12, 16
- Consistent 4-unit (1rem) grid system
- 8-unit margins for major sections
- 2-unit padding for tight spacing

### Component Library

**Navigation**: Fixed sidebar with collapsible sections
- Lab environments, target machines, terminal, resources, progress

**Dashboard Cards**: Glass-morphism effect with subtle borders
- Status indicators using color-coded dots
- Progress bars with gradient fills
- Hover states with subtle glow effects

**Terminal Interface**: Full-screen overlay capability
- Authentic command prompt styling
- Syntax highlighting for commands
- Scrollable history with timestamps

**Target Machine Grid**: Card-based layout
- OS icons and vulnerability badges
- Status indicators (online/offline/compromised)
- Difficulty level visualization

**Network Topology**: Interactive SVG-based visualization
- Node connections with animated data flow
- Clickable nodes revealing machine details
- Zoom and pan capabilities

## Key Design Principles

1. **Authenticity**: Interface should feel like professional cybersecurity tools
2. **Educational Clarity**: Complex concepts presented with clear visual hierarchy
3. **Controlled Environment**: Visual cues that reinforce this is simulation/training
4. **Progressive Disclosure**: Advanced features accessible but not overwhelming for beginners

## Visual Treatment
- **Background**: Dark gradient from deep navy to black
- **Borders**: Subtle cyan glows on interactive elements
- **Shadows**: Soft, dark shadows for depth without distraction
- **Icons**: Line-style icons from Heroicons for consistency

## Unique Features
- **Simulation Badge**: Persistent "SIMULATION" indicator in header
- **Progress Visualization**: Skill tree showing technique mastery
- **Replay Controls**: Video-like controls for scenario playback
- **Network Health**: Real-time simulated network status monitoring

This design balances professional cybersecurity aesthetics with educational accessibility, ensuring users feel they're working with realistic tools while maintaining clear learning objectives.