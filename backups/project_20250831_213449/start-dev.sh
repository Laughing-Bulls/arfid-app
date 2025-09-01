#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting React Native Development Environment${NC}"

# Function to check if Metro is running
check_metro() {
    if curl -s http://localhost:8081/status > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to wait for Metro to be ready
wait_for_metro() {
    echo -e "${YELLOW}⏳ Waiting for Metro bundler to be ready...${NC}"
    local attempts=0
    local max_attempts=30
    
    while [ $attempts -lt $max_attempts ]; do
        if check_metro; then
            echo -e "${GREEN}✅ Metro bundler is ready!${NC}"
            return 0
        fi
        sleep 2
        attempts=$((attempts + 1))
        echo -e "${YELLOW}⏳ Attempt $attempts/$max_attempts...${NC}"
    done
    
    echo -e "${RED}❌ Metro bundler failed to start within 60 seconds${NC}"
    return 1
}

# Start Metro bundler in background
echo -e "${BLUE}📦 Starting Metro bundler...${NC}"
npx expo start --dev-client -c &
METRO_PID=$!

# Wait for Metro to be ready
if wait_for_metro; then
    echo -e "${GREEN}🎯 Metro is ready! Starting iOS Simulator...${NC}"
    
    # Start iOS Simulator
    npx expo run:ios &
    IOS_PID=$!
    
    echo -e "${GREEN}✅ Development environment started successfully!${NC}"
    echo -e "${BLUE}📱 iOS Simulator is starting...${NC}"
    echo -e "${BLUE}🔄 Metro bundler is running on http://localhost:8081${NC}"
    echo -e "${YELLOW}💡 Press Ctrl+C to stop both processes${NC}"
    
    # Wait for user to stop
    wait $METRO_PID $IOS_PID
else
    echo -e "${RED}❌ Failed to start Metro bundler${NC}"
    kill $METRO_PID 2>/dev/null
    exit 1
fi
