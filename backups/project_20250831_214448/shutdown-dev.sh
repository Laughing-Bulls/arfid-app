#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="BraveBites"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="${PROJECT_NAME}_backup_${TIMESTAMP}"

echo -e "${BLUE}🔄 Starting Safe Shutdown Process for ${PROJECT_NAME}${NC}"
echo -e "${CYAN}⏰ Timestamp: ${TIMESTAMP}${NC}"
echo ""

# Function to check if a process is running
is_process_running() {
    pgrep -f "$1" > /dev/null 2>&1
}

# Function to kill process gracefully
kill_process() {
    local process_name="$1"
    local process_id="$2"
    
    if [ -n "$process_id" ]; then
        echo -e "${YELLOW}🔄 Stopping $process_name (PID: $process_id)...${NC}"
        kill "$process_id" 2>/dev/null
        
        # Wait for graceful shutdown
        local attempts=0
        while [ $attempts -lt 10 ] && is_process_running "$process_name"; do
            sleep 1
            attempts=$((attempts + 1))
        done
        
        # Force kill if still running
        if is_process_running "$process_name"; then
            echo -e "${YELLOW}⚠️  Force stopping $process_name...${NC}"
            kill -9 "$process_id" 2>/dev/null
        fi
        
        echo -e "${GREEN}✅ $process_name stopped${NC}"
    fi
}

# Step 1: Create backup directory
echo -e "${BLUE}📁 Creating backup directory...${NC}"
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✅ Backup directory ready${NC}"

# Step 2: Backup AsyncStorage data from iOS Simulator
echo -e "${BLUE}💾 Backing up AsyncStorage data...${NC}"
SIMULATOR_DATA_DIR=""
if [ -d "/Users/scottdaniel/Library/Developer/CoreSimulator/Devices" ]; then
    # Find the most recent BraveBites app data
    SIMULATOR_DATA_DIR=$(find /Users/scottdaniel/Library/Developer/CoreSimulator/Devices -name "*com.scott.arfid*" -type d 2>/dev/null | head -1)
fi

if [ -n "$SIMULATOR_DATA_DIR" ]; then
    ASYNC_STORAGE_DIR="$SIMULATOR_DATA_DIR/Library/Application Support/com.scott.arfid/RCTAsyncLocalStorage_V1"
    if [ -d "$ASYNC_STORAGE_DIR" ]; then
        cp -r "$ASYNC_STORAGE_DIR" "$BACKUP_DIR/async_storage_${TIMESTAMP}"
        echo -e "${GREEN}✅ AsyncStorage data backed up to $BACKUP_DIR/async_storage_${TIMESTAMP}${NC}"
        
        # Also create a readable JSON backup
        if [ -f "$ASYNC_STORAGE_DIR/manifest.json" ]; then
            cp "$ASYNC_STORAGE_DIR/manifest.json" "$BACKUP_DIR/data_backup_${TIMESTAMP}.json"
            echo -e "${GREEN}✅ Data backup created: $BACKUP_DIR/data_backup_${TIMESTAMP}.json${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  AsyncStorage directory not found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  iOS Simulator data directory not found${NC}"
fi

# Step 3: Backup project files (excluding node_modules and build artifacts)
echo -e "${BLUE}📦 Creating project backup...${NC}"
PROJECT_BACKUP_DIR="$BACKUP_DIR/project_${TIMESTAMP}"
mkdir -p "$PROJECT_BACKUP_DIR"

# Copy important project files
cp -r src "$PROJECT_BACKUP_DIR/"
cp -r assets "$PROJECT_BACKUP_DIR/"
cp package.json "$PROJECT_BACKUP_DIR/"
cp app.json "$PROJECT_BACKUP_DIR/"
cp App.js "$PROJECT_BACKUP_DIR/"
cp *.sh "$PROJECT_BACKUP_DIR/"
cp README.md "$PROJECT_BACKUP_DIR/" 2>/dev/null || true

echo -e "${GREEN}✅ Project files backed up to $PROJECT_BACKUP_DIR${NC}"

# Step 4: Create a summary report
echo -e "${BLUE}📋 Creating backup summary...${NC}"
SUMMARY_FILE="$BACKUP_DIR/backup_summary_${TIMESTAMP}.txt"
{
    echo "=== ${PROJECT_NAME} Backup Summary ==="
    echo "Timestamp: $TIMESTAMP"
    echo "Backup Name: $BACKUP_NAME"
    echo ""
    echo "=== Files Backed Up ==="
    echo "• Project source code: $PROJECT_BACKUP_DIR"
    echo "• AsyncStorage data: $BACKUP_DIR/async_storage_${TIMESTAMP}"
    echo "• Data backup: $BACKUP_DIR/data_backup_${TIMESTAMP}.json"
    echo ""
    echo "=== Development Environment ==="
    echo "• Node.js version: $(node --version 2>/dev/null || echo 'Not found')"
    echo "• npm version: $(npm --version 2>/dev/null || echo 'Not found')"
    echo "• Expo CLI version: $(npx expo --version 2>/dev/null || echo 'Not found')"
    echo ""
    echo "=== System Info ==="
    echo "• macOS version: $(sw_vers -productVersion 2>/dev/null || echo 'Unknown')"
    echo "• Available disk space: $(df -h . | tail -1 | awk '{print $4}')"
    echo ""
    echo "Backup completed successfully!"
} > "$SUMMARY_FILE"

echo -e "${GREEN}✅ Backup summary created: $SUMMARY_FILE${NC}"

# Step 5: Stop development processes
echo -e "${BLUE}🛑 Stopping development processes...${NC}"

# Stop Metro bundler
METRO_PID=$(pgrep -f "expo start" | head -1)
if [ -n "$METRO_PID" ]; then
    kill_process "Metro bundler" "$METRO_PID"
else
    echo -e "${GREEN}✅ Metro bundler not running${NC}"
fi

# Stop iOS Simulator
SIMULATOR_PID=$(pgrep -f "Simulator" | head -1)
if [ -n "$SIMULATOR_PID" ]; then
    kill_process "iOS Simulator" "$SIMULATOR_PID"
else
    echo -e "${GREEN}✅ iOS Simulator not running${NC}"
fi

# Stop any remaining Expo processes
EXPO_PIDS=$(pgrep -f "expo")
if [ -n "$EXPO_PIDS" ]; then
    echo -e "${YELLOW}🔄 Stopping remaining Expo processes...${NC}"
    echo "$EXPO_PIDS" | xargs kill 2>/dev/null
    echo -e "${GREEN}✅ Expo processes stopped${NC}"
fi

# Stop any React Native processes
RN_PIDS=$(pgrep -f "react-native")
if [ -n "$RN_PIDS" ]; then
    echo -e "${YELLOW}🔄 Stopping React Native processes...${NC}"
    echo "$RN_PIDS" | xargs kill 2>/dev/null
    echo -e "${GREEN}✅ React Native processes stopped${NC}"
fi

# Step 6: Clean up temporary files
echo -e "${BLUE}🧹 Cleaning up temporary files...${NC}"
rm -rf .expo/web-build 2>/dev/null || true
rm -rf .expo/packager-info.json 2>/dev/null || true
echo -e "${GREEN}✅ Temporary files cleaned${NC}"

# Step 7: Final status check
echo -e "${BLUE}🔍 Final status check...${NC}"
REMAINING_PROCESSES=$(pgrep -f "expo\|react-native\|Simulator" | wc -l)
if [ "$REMAINING_PROCESSES" -eq 0 ]; then
    echo -e "${GREEN}✅ All development processes stopped${NC}"
else
    echo -e "${YELLOW}⚠️  $REMAINING_PROCESSES development processes still running${NC}"
fi

# Step 8: Display backup information
echo ""
echo -e "${PURPLE}🎉 Shutdown Complete! 🎉${NC}"
echo ""
echo -e "${CYAN}=== Backup Information ===${NC}"
echo -e "📁 Backup Directory: $BACKUP_DIR"
echo -e "📦 Project Backup: $PROJECT_BACKUP_DIR"
echo -e "💾 Data Backup: $BACKUP_DIR/data_backup_${TIMESTAMP}.json"
echo -e "📋 Summary: $SUMMARY_FILE"
echo ""
echo -e "${GREEN}✅ You can safely close Cursor and your development environment${NC}"
echo -e "${GREEN}✅ Your project and data are safely backed up${NC}"
echo ""
echo -e "${YELLOW}💡 To restore data later, check the backup directory for instructions${NC}"
echo ""

# Optional: Open backup directory in Finder
read -p "Would you like to open the backup directory in Finder? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "$BACKUP_DIR"
fi
