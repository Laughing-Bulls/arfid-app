# Brave Bites - Backup & Shutdown System

This document explains the backup and shutdown system for the Brave Bites React Native app.

## 🚀 Quick Start

### Daily Development Workflow

1. **Start Development (Data-Preserving):**
   ```bash
   npm run dev:ios:safe
   ```

2. **End of Day Shutdown:**
   ```bash
   npm run shutdown
   ```

3. **Restore Data (if needed):**
   ```bash
   npm run restore
   ```

## 📋 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Safe Development** | `npm run dev:ios:safe` | Start development preserving AsyncStorage data |
| **Cache-Clearing Development** | `npm run dev:ios:full` | Start development with cache clearing (may delete data) |
| **Safe Shutdown** | `npm run shutdown` | Backup data, stop processes, clean shutdown |
| **Data Restore** | `npm run restore` | Restore data from previous backups |

## 🔄 Shutdown Process

The shutdown script (`shutdown-dev.sh`) performs the following steps:

### 1. Data Backup
- **AsyncStorage Data**: Backs up all app data from iOS Simulator
- **Project Files**: Backs up source code, configuration, and scripts
- **Backup Summary**: Creates detailed report of what was backed up

### 2. Process Management
- **Metro Bundler**: Gracefully stops the development server
- **iOS Simulator**: Closes the simulator
- **Expo Processes**: Stops all related Expo processes
- **React Native**: Stops any remaining RN processes

### 3. Cleanup
- **Temporary Files**: Removes build artifacts and cache files
- **Status Check**: Verifies all processes are stopped

### 4. Backup Summary
- **Backup Location**: Shows where backups are stored
- **File List**: Lists all backed up files
- **System Info**: Records development environment details

## 📁 Backup Structure

Backups are stored in the `./backups/` directory with the following structure:

```
backups/
├── project_20250831_190200/          # Project source code backup
│   ├── src/                          # Source code
│   ├── assets/                       # Assets
│   ├── package.json                  # Dependencies
│   ├── app.json                      # App configuration
│   └── *.sh                          # Scripts
├── async_storage_20250831_190200/    # AsyncStorage data
│   └── manifest.json                 # App data
├── data_backup_20250831_190200.json  # Readable data backup
└── backup_summary_20250831_190200.txt # Backup report
```

## 🔧 Data Restore Process

The restore script (`restore-data.sh`) provides:

### 1. Backup Selection
- Lists all available backups with timestamps
- Shows backup details (project files, data files)
- Interactive selection menu

### 2. Safety Measures
- **Current Data Backup**: Creates backup of existing data before restore
- **Confirmation**: Requires user confirmation before overwriting
- **Validation**: Checks backup file integrity

### 3. Restoration
- **Data Restore**: Copies backup data to iOS Simulator
- **Directory Creation**: Ensures proper directory structure
- **Status Report**: Shows restoration results

## 🛡️ Data Protection Features

### Automatic Backup
- **Timestamped Backups**: Each backup has unique timestamp
- **Multiple Formats**: Both raw AsyncStorage and readable JSON
- **Complete Project**: Source code and configuration included

### Safety Features
- **Current Data Protection**: Backs up existing data before restore
- **Process Verification**: Ensures clean shutdown
- **Error Handling**: Graceful failure with helpful messages

### Development Environment
- **Safe Mode**: Development without cache clearing
- **Cache Mode**: Development with cache clearing (use carefully)
- **Process Management**: Automatic cleanup of development processes

## 🚨 Important Notes

### Data Loss Prevention
- **Always use `npm run dev:ios:safe`** for normal development
- **Use `npm run dev:ios:full`** only when you need a fresh start
- **Run `npm run shutdown`** before closing Cursor

### Backup Management
- Backups are stored locally in `./backups/`
- Each backup includes timestamp for easy identification
- Old backups are not automatically deleted (manage manually)

### iOS Simulator
- Backups work with iOS Simulator data
- Physical device data is not automatically backed up
- Simulator data persists between app launches

## 🔍 Troubleshooting

### Backup Issues
- **No Backup Directory**: Run shutdown script first
- **Missing Data**: Check if iOS Simulator is running
- **Permission Errors**: Ensure script has execute permissions

### Restore Issues
- **No Backups Found**: Check backup directory exists
- **Simulator Not Found**: Start iOS Simulator first
- **Data Not Restored**: Restart app after restore

### Development Issues
- **Processes Not Stopping**: Use `kill -9` manually if needed
- **Cache Problems**: Use cache-clearing mode occasionally
- **Data Persistence**: Use safe mode for normal development

## 📞 Support

If you encounter issues:

1. Check the backup summary files for details
2. Verify iOS Simulator is running
3. Ensure scripts have execute permissions
4. Check console output for error messages

## 🔄 Daily Workflow Example

```bash
# Start development (preserving data)
npm run dev:ios:safe

# ... work on your app ...

# End of day shutdown
npm run shutdown

# Next day - restore if needed
npm run restore

# Start development again
npm run dev:ios:safe
```

This system ensures your data is always protected and your development environment is clean and organized.
