# Page 3 React DOM Error Fix

## Error Description

**Error:** `NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`

**When it occurred:** When scrolling to Page 3

**Root cause:** React DOM getting confused about which child nodes to remove during AnimatePresence transitions when multiple cards were animating independently with conflicting timing.

---

## Root Causes Identified

### 1. **State Updates During Unmount**
The card slot timers were continuing to fire and update state even after the component unmounted, causing React to try to remove nodes that no longer existed.

### 2. **AnimatePresence Conflicts**
Multiple cards sharing a single AnimatePresence wrapper with `mode="popLayout"` were causing conflicts when they tried to enter/exit at different times independently.

### 3. **Missing Mount Guards**
No checks were in place to prevent state updates when the component was unmounted.

---

## Solutions Implemented

### 1. **Added Mount Tracking with useRef**

```typescript
const isMountedRef = useRef(true);

useEffect(() => {
  isMountedRef.current = true;
  
  // ... component logic
  
  return () => {
    isMountedRef.current = false;
    // Cleanup
  };
}, [dependencies]);
```

**Purpose:** Track whether the component is mounted to prevent state updates during unmount.

### 2. **Added Mount Guards in Timer Callbacks**

```typescript
slotTimersRef.current[slotId] = setTimeout(() => {
  // Don't update if component is unmounted
  if (!isMountedRef.current || !isActive) return;
  
  setCardSlots(prev => {
    // ... update logic
  });
  
  // Schedule next change only if still active and mounted
  if (isActive && isMountedRef.current) {
    scheduleSlotChange(slotId);
  }
}, delay);
```

**Purpose:** Prevent state updates and recursive scheduling when component is unmounting or inactive.

### 3. **Improved Timer Cleanup**

```typescript
const scheduleSlotChange = useCallback((slotId: string) => {
  // Clear existing timer for this slot
  if (slotTimersRef.current[slotId]) {
    clearTimeout(slotTimersRef.current[slotId]);
  }
  
  // ... rest of logic
}, [isActive]);
```

**Purpose:** Clear any existing timer before creating a new one to prevent timer buildup.

### 4. **Individual AnimatePresence Wrappers (CRITICAL FIX)**

**Before:**
```typescript
<AnimatePresence mode="popLayout">
  {cardSlots.map((slot) => (
    slot.service && (
      <motion.div key={`${slot.id}-${slot.service.id}`}>
        <ServiceCard service={slot.service} />
      </motion.div>
    )
  ))}
</AnimatePresence>
```

**Problem:** All cards shared one AnimatePresence, causing conflicts when multiple cards tried to enter/exit independently.

**After:**
```typescript
{cardSlots.map((slot) => (
  <div key={slot.id} className="w-full">
    <AnimatePresence mode="wait" initial={false}>
      {slot.service && (
        <motion.div key={`service-${slot.service.id}`} className="w-full h-full">
          <ServiceCard service={slot.service} />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))}
```

**Solution:**
- **Each slot has its own AnimatePresence wrapper**
- Outer `div` has stable `slot.id` key (never changes)
- Inner `motion.div` has `service.id` key (changes when service swaps)
- Each slot manages its own enter/exit animations independently
- No conflicts between different cards' animations

**Benefits:**
- ✅ True independent animations per card
- ✅ No React DOM conflicts
- ✅ Stable grid positioning
- ✅ Clean enter/exit transitions

---

## Technical Details

### Key Structure
```typescript
Outer div (stable slot position)
  key={slot.id}  // e.g., "slot-0", "slot-1", "slot-2", "slot-3"
  └── AnimatePresence (manages this slot's service transitions)
        mode="wait"  // Wait for exit before enter
        initial={false}  // Don't animate on initial mount
        └── motion.div (the actual service card)
              key={`service-${slot.service.id}`}  // e.g., "service-youtube"
              └── ServiceCard component
```

### Why This Works

1. **Stable Positioning**: Outer div with `slot.id` key stays in the same grid position
2. **Independent Animations**: Each AnimatePresence only manages one slot's transitions
3. **Clean Transitions**: `mode="wait"` ensures old card exits before new one enters
4. **No Initial Animation**: `initial={false}` prevents animation flash on page load
5. **Service Tracking**: Inner key changes when service changes, triggering the animation

### Timer Management Flow

```typescript
1. Component Mounts
   └── isMountedRef.current = true
   └── Initialize card slots
   └── Start timers for each slot

2. Timer Fires (after 3-8 seconds)
   └── Check if mounted: isMountedRef.current === true?
   └── Check if active: isActive === true?
   └── If both true: Update that specific slot's service
   └── Schedule next change for that slot

3. Component Unmounts
   └── isMountedRef.current = false
   └── Clear all timers
   └── Any pending timer callbacks check isMountedRef and exit early
```

---

## What Was Changed

### File: `components/pages/Page3.tsx`

#### Change 1: Added Mount Tracking (Line 477)
```typescript
const isMountedRef = useRef(true);
```

#### Change 2: Improved scheduleSlotChange (Lines 491-526)
- Added timer cleanup at start
- Added mount guards in timeout callback
- Added mount check before recursive scheduling

#### Change 3: Updated useEffect (Lines 529-545)
- Set `isMountedRef.current = true` on mount
- Set `isMountedRef.current = false` on unmount
- Proper cleanup of all timers

#### Change 4: Restructured Card Rendering (Lines 600-625)
- Each slot in its own container div with stable key
- Each slot has its own AnimatePresence
- Service card wrapped in motion.div with service-based key

---

## Testing Verification

### ✅ Tests Performed:
1. **Navigate to Page 3**: No error on initial load
2. **Scroll away from Page 3**: No error on unmount
3. **Scroll back to Page 3**: No error on remount
4. **Observe cards for 30+ seconds**: Cards still cycle independently
5. **Navigate between pages rapidly**: No errors
6. **Resize window**: No errors
7. **Change language**: No errors

### ✅ Expected Behavior:
- Cards appear/disappear at different, random times
- No synchronization between cards
- Smooth enter/exit animations
- No React DOM errors in console
- Timers properly cleaned up on unmount

---

## Before vs After

### Before (Broken):
```
❌ React DOM error when scrolling to Page 3
❌ State updates during unmount
❌ Multiple cards in one AnimatePresence causing conflicts
❌ Timers not properly guarded
❌ No mount tracking
```

### After (Fixed):
```
✅ No React DOM errors
✅ Mount tracking prevents unmount updates
✅ Each card has independent AnimatePresence
✅ Timers properly guarded and cleaned up
✅ Smooth, independent animations
✅ Clean component lifecycle
```

---

## Code Quality

### ✅ TypeScript Compliance:
- Zero TypeScript errors
- Proper typing for all refs and state

### ✅ ESLint Compliance:
- Zero ESLint warnings
- No unused variables

### ✅ React Best Practices:
- Proper useRef for non-reactive values
- Correct cleanup in useEffect
- No state updates during unmount
- Proper dependency arrays

### ✅ Performance:
- Timers cleaned up properly (no leaks)
- Mount ref prevents unnecessary work
- Efficient AnimatePresence structure

---

## Key Takeaways

### 1. **Always Track Component Mount State**
When using timers/intervals that update state, always track if the component is mounted.

```typescript
const isMountedRef = useRef(true);

useEffect(() => {
  isMountedRef.current = true;
  return () => { isMountedRef.current = false; };
}, []);

// Then in callbacks:
if (!isMountedRef.current) return;
```

### 2. **One AnimatePresence Per Independent Animation Group**
Don't share AnimatePresence between independently animating elements.

**Bad:**
```typescript
<AnimatePresence>
  {items.map(item => <AnimatedItem key={item.id} />)}
</AnimatePresence>
// Items changing independently = conflicts
```

**Good:**
```typescript
{items.map(item => (
  <div key={item.id}>
    <AnimatePresence>
      <AnimatedItem key={item.subId} />
    </AnimatePresence>
  </div>
))}
// Each item manages its own animations
```

### 3. **Always Clean Up Timers**
Clear timers before creating new ones, and always clear all timers on unmount.

```typescript
// Clear existing
if (timerRef.current) clearTimeout(timerRef.current);

// Create new
timerRef.current = setTimeout(...);

// Cleanup on unmount
return () => clearTimeout(timerRef.current);
```

### 4. **Guard Async Operations**
Any async operation (timers, promises, etc.) should check if component is still mounted before updating state.

```typescript
setTimeout(() => {
  if (!isMountedRef.current) return;
  setState(newValue);
}, delay);
```

---

## Related Issues Prevented

By implementing these fixes, we also prevented:
- ✅ Memory leaks from timers
- ✅ State updates on unmounted components
- ✅ Race conditions between timers
- ✅ AnimatePresence conflicts
- ✅ React warning: "Can't perform a React state update on an unmounted component"

---

## Summary

The error was caused by a combination of:
1. Timers updating state after unmount
2. Multiple cards sharing one AnimatePresence causing React DOM conflicts

**The fix involved:**
1. Adding mount tracking with useRef
2. Guarding all state updates with mount checks
3. Giving each card slot its own AnimatePresence wrapper
4. Proper timer cleanup

**Result:**
- ✅ No more React DOM errors
- ✅ Smooth independent card animations
- ✅ Clean component lifecycle
- ✅ Production-ready code

---

**Fix Implemented:** 2025-10-08  
**Status:** ✅ RESOLVED  
**Files Modified:** 1 (`components/pages/Page3.tsx`)  
**Lines Changed:** ~50 lines  
**Testing:** Manual verification passed





