#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

BACKUP_DIR="./backups"

echo -e "${BLUE}🔄 Data Restore Utility for ${PROJECT_NAME}${NC}"
echo ""

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${RED}❌ Backup directory not found: $BACKUP_DIR${NC}"
    echo -e "${YELLOW}💡 Make sure you have run the shutdown script first${NC}"
    exit 1
fi

# List available backups
echo -e "${CYAN}📋 Available backups:${NC}"
echo ""

# Find all backup summaries
BACKUP_SUMMARIES=($(find "$BACKUP_DIR" -name "backup_summary_*.txt" | sort -r))

if [ ${#BACKUP_SUMMARIES[@]} -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No backup summaries found${NC}"
    echo -e "${YELLOW}💡 Check the backup directory manually: $BACKUP_DIR${NC}"
    exit 1
fi

# Display backup options
for i in "${!BACKUP_SUMMARIES[@]}"; do
    BACKUP_FILE="${BACKUP_SUMMARIES[$i]}"
    BACKUP_NAME=$(basename "$BACKUP_FILE" .txt)
    BACKUP_DATE=$(echo "$BACKUP_NAME" | sed 's/backup_summary_//')
    
    echo -e "${GREEN}[$((i+1))]${NC} $BACKUP_DATE"
    
    # Show backup details
    if [ -f "$BACKUP_FILE" ]; then
        echo "   📁 $(grep "Project Backup:" "$BACKUP_FILE" | cut -d' ' -f3-)"
        echo "   💾 $(grep "Data Backup:" "$BACKUP_FILE" | cut -d' ' -f3-)"
        echo ""
    fi
done

# Get user selection
echo -e "${CYAN}Select a backup to restore (1-${#BACKUP_SUMMARIES[@]}), or 'q' to quit:${NC}"
read -r selection

if [[ "$selection" == "q" || "$selection" == "Q" ]]; then
    echo -e "${YELLOW}👋 Restore cancelled${NC}"
    exit 0
fi

# Validate selection
if ! [[ "$selection" =~ ^[0-9]+$ ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt ${#BACKUP_SUMMARIES[@]} ]; then
    echo -e "${RED}❌ Invalid selection${NC}"
    exit 1
fi

SELECTED_BACKUP="${BACKUP_SUMMARIES[$((selection-1))]}"
BACKUP_NAME=$(basename "$SELECTED_BACKUP" .txt)
BACKUP_DATE=$(echo "$BACKUP_NAME" | sed 's/backup_summary_//')

echo ""
echo -e "${BLUE}🔄 Restoring from backup: $BACKUP_DATE${NC}"
echo ""

# Confirm restoration
echo -e "${YELLOW}⚠️  Warning: This will overwrite current data!${NC}"
read -p "Are you sure you want to restore from this backup? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}👋 Restore cancelled${NC}"
    exit 0
fi

# Find the data backup file
DATA_BACKUP_FILE="$BACKUP_DIR/data_backup_${BACKUP_DATE}.json"
if [ ! -f "$DATA_BACKUP_FILE" ]; then
    echo -e "${RED}❌ Data backup file not found: $DATA_BACKUP_FILE${NC}"
    exit 1
fi

# Find iOS Simulator data directory
SIMULATOR_DATA_DIR=""
if [ -d "/Users/scottdaniel/Library/Developer/CoreSimulator/Devices" ]; then
    SIMULATOR_DATA_DIR=$(find /Users/scottdaniel/Library/Developer/CoreSimulator/Devices -name "*com.scott.arfid*" -type d 2>/dev/null | head -1)
fi

if [ -z "$SIMULATOR_DATA_DIR" ]; then
    echo -e "${RED}❌ iOS Simulator data directory not found${NC}"
    echo -e "${YELLOW}💡 Make sure the iOS Simulator is running and the app is installed${NC}"
    exit 1
fi

ASYNC_STORAGE_DIR="$SIMULATOR_DATA_DIR/Library/Application Support/com.scott.arfid/RCTAsyncLocalStorage_V1"

# Create backup of current data before restoring
echo -e "${BLUE}💾 Creating backup of current data...${NC}"
CURRENT_BACKUP="$BACKUP_DIR/current_data_before_restore_$(date +"%Y%m%d_%H%M%S").json"
if [ -f "$ASYNC_STORAGE_DIR/manifest.json" ]; then
    cp "$ASYNC_STORAGE_DIR/manifest.json" "$CURRENT_BACKUP"
    echo -e "${GREEN}✅ Current data backed up to: $CURRENT_BACKUP${NC}"
fi

# Restore the data
echo -e "${BLUE}🔄 Restoring data...${NC}"
mkdir -p "$ASYNC_STORAGE_DIR"
cp "$DATA_BACKUP_FILE" "$ASYNC_STORAGE_DIR/manifest.json"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Data restored successfully!${NC}"
    echo ""
    echo -e "${CYAN}=== Restored Data Summary ===${NC}"
    echo -e "📅 Backup Date: $BACKUP_DATE"
    echo -e "📁 Restored to: $ASYNC_STORAGE_DIR"
    echo -e "💾 Current backup: $CURRENT_BACKUP"
    echo ""
    echo -e "${GREEN}✅ You can now start your app and the data should be restored${NC}"
    echo -e "${YELLOW}💡 Use 'npm run dev:ios:safe' to start development with preserved data${NC}"
else
    echo -e "${RED}❌ Failed to restore data${NC}"
    exit 1
fi
