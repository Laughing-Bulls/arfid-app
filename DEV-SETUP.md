# Development Setup Guide

## Quick Start

### Option 1: One-Command Setup (Recommended)
```bash
npm run dev:ios:full
```
This will:
1. Start Metro bundler with clean cache
2. Wait for Metro to be ready
3. Launch iOS Simulator
4. Connect the app to Metro automatically

### Option 2: Manual Two-Step Process
```bash
# Terminal 1: Start Metro
npm run dev:ios:clean

# Terminal 2: After Metro is ready, launch iOS
npm run run:ios
```

### Option 3: VS Code Tasks
1. Open Command Palette (`Cmd+Shift+P`)
2. Run "Tasks: Run Task"
3. Select "Full iOS Dev Setup"

## Troubleshooting

### If you get "No bundle URL present":
1. Make sure Metro is running: `curl http://localhost:8081/status`
2. Reload the app in simulator: `Cmd+R`
3. Or restart with clean cache: `npm run dev:ios:clean`

### If Metro won't start:
1. Kill any existing Metro processes: `pkill -f metro`
2. Clear cache: `npx expo start --dev-client -c`
3. Try the full setup script: `npm run dev:ios:full`

### If iOS Simulator won't connect:
1. Check Metro is running on `http://localhost:8081`
2. Reload app in simulator: `Cmd+R`
3. Or shake device (`Cmd+Ctrl+Z`) and select "Reload"

## Available Scripts

- `npm run dev:ios` - Start Metro only
- `npm run dev:ios:clean` - Start Metro with clean cache
- `npm run dev:ios:tunnel` - Start Metro with tunnel mode
- `npm run run:ios` - Launch iOS Simulator only
- `npm run dev:ios:full` - Complete setup (Metro + iOS)

## Development Workflow

1. **Start development**: `npm run dev:ios:full`
2. **Edit code** in Cursor
3. **Save files** - app will auto-reload
4. **Manual reload** if needed: `Cmd+R` in simulator
5. **Stop development**: `Ctrl+C` in terminal

## Notes

- The `start-dev.sh` script ensures Metro is ready before launching iOS
- Always use `dev:ios:clean` if you encounter cache issues
- The app will automatically connect to Metro once both are running
