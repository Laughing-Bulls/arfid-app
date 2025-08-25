# Testing the New Tasting Flow

## Expected Behavior:

1. **New Tasting Form:**
   - User fills out form including "Date Tried" field (defaults to today)
   - User taps "Save"
   - Item is created AND first try is automatically logged with the specified date

2. **Detail Screen:**
   - Shows "Times tried: 1" (immediately, not 0)
   - Shows "Last tried: [date from form]"
   - User can tap "Log Try" to add more tries

3. **Home Screen:**
   - Shows the new item in the list
   - Streak is updated if applicable

## Technical Flow:

1. `NewTastingScreen.save()` calls `addItemWithFirstTry(item, dateTried)`
2. `addItemWithFirstTry()` calls:
   - `addItem()` to create the item
   - `logTry(id, dateTried)` to log the first try with custom date
3. Navigation returns to Home, which refreshes via `useFocusEffect`
4. When user taps item to view details:
   - `RecipeScreen` loads item via `getItem(id)`
   - `getItem()` includes the tries array from events
   - Display shows "Times tried: 1" and the correct date

## Key Changes Made:

- Added `dateTried` state to NewTastingScreen (defaults to today)
- Added "Date Tried" input field in the form
- Created `addItemWithFirstTry()` function
- Enhanced `logTry()` to support custom dates
- Updated save logic to use new function with date

## Files Modified:

- `src/screens/NewTastingScreen.js` - Added date field and updated save logic
- `src/storage/tastings.js` - Added `addItemWithFirstTry()` and enhanced `logTry()`
- `src/screens/Recipe/RecipeScreen.js` - Already supports try display (no changes needed)
