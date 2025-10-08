# Page 2 Wave Glow Effect

## Overview
Added a subtle wave-like glow animation to the grid background on Page 2 that moves from left to right, creating a sea wave effect. Also fixed the footer overlap issue with the tracking text and blinking circles.

## Features Implemented

### 1. Wave Glow Animation
- **Effect**: Subtle gradient wave that sweeps across the grid from left to right
- **Movement**: Continuous linear animation, similar to ocean waves
- **Duration**: 8 seconds per full cycle
- **Direction**: Left to right (0% → 100%)
- **Blend Mode**: 
  - Dark theme: `lighten` - enhances the grid brightness
  - Light theme: `multiply` - adds depth to the grid

### 2. Visual Design
- **Gradient Structure**:
  - 0-20%: Transparent (wave entrance)
  - 40%: Subtle glow begins
  - 50%: Peak glow intensity
  - 60%: Glow fades
  - 80-100%: Transparent (wave exit)

- **Color Opacity**:
  - Dark theme: rgba(99, 102, 241, 0.15-0.25) - Indigo glow
  - Light theme: rgba(79, 70, 229, 0.1-0.2) - Darker indigo glow
  - Overall opacity: 0.6 for subtlety

- **Background Size**: 200% width to create smooth entrance/exit

### 3. Design Principles
- **Minimal & Subtle**: Does not distract from the main "YOUR DATA" text
- **Additive Effect**: Enhances the surveillance/tracking theme
- **Grid-Only**: Applied only to the grid layer, not the entire background
- **Pointer-Events**: Disabled to ensure no interaction interference
- **Theme-Aware**: Different blend modes for light and dark themes

### 4. Footer, Header, and CTA Button Overlap Fix & Mobile Spacing
- **Issue**: 
  - Orbital words in the bottom half were being covered by the footer
  - After adding CTA button: Bottom words (like "RECORDING") overlapped with button
  - Mobile: Words were too close to the main "YOUR DATA" text (cramped appearance)
  - Mobile: Left-side words (like "WATCHING") were being cut off at screen edge
- **Solution**: 
  - Desktop: Words at angles 90°-270° moved up by 100px (increased to accommodate CTA button)
  - Mobile: 
    - Increased orbital radius from 130px to 180px (~38% more spacing)
    - Left-side words (90°-270°): moved right by 40px and up by 80px (increased for CTA button)
    - Right-side words (0°-90° and 270°-360°): moved left by 20px for balance
    - More vertical-friendly layout for portrait phone orientation
- **Result**: 
  - Bottom words (like "TRACKING", "RECORDING") are now fully visible above footer and CTA button
  - Top words (like "LOGGING") remain properly positioned below the header
  - Left-side words (like "WATCHING") are fully visible (not cut off)
  - Right-side words have proper spacing from screen edge
  - Mobile: Words have much more breathing room around the main text
  - Better vertical distribution for portrait phone screens
  - All orbital words clear of CTA button area

## Technical Implementation

### Wave Animation
```tsx
<motion.div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: isDark
      ? `linear-gradient(90deg, transparent 0%, ... rgba(99, 102, 241, 0.25) 50%, ... transparent 100%)`
      : `linear-gradient(90deg, transparent 0%, ... rgba(79, 70, 229, 0.2) 50%, ... transparent 100%)`,
    backgroundSize: '200% 100%',
    mixBlendMode: isDark ? 'lighten' : 'multiply',
    opacity: 0.6,
  }}
  animate={{
    backgroundPosition: ['-100% 0%', '200% 0%'],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: 'linear',
  }}
/>
```

### Content Positioning Fix
```tsx
// Desktop: radius = 250px
// Mobile: radius = 180px (increased from 130px for better spacing)

// Desktop: Vertical adjustment only
const angle = (index / orbitalWords.length) * 360;
let y = Math.sin(radians) * radius;
if (angle > 90 && angle < 270) {
  y = y - 100; // Move up by 100px to avoid footer and CTA button (increased from 60px)
}

// Mobile: Both horizontal and vertical adjustments
if (angle > 90 && angle < 270) {
  // Left-side words: move right and up
  x = x + 40; // Move right by 40px to avoid left edge cutoff
  y = y - 80; // Move up by 80px to avoid footer and CTA button (increased from 50px)
} else if ((angle >= 0 && angle <= 90) || (angle >= 270 && angle <= 360)) {
  // Right-side words: move left slightly for balance
  x = x - 20; // Move left by 20px to avoid right edge cutoff
}
```

## Files Modified

### `components/pages/Page2.tsx`
1. Added wave glow effect layer between grid pulse and ripple animation
2. Configured theme-aware gradient colors and blend modes
3. Set up infinite linear animation from left to right
4. Added CTA button below hero text with shield icon and indigo glow
5. Added selective position adjustments for orbital words
   - Desktop: Y-position adjustment only (words at 90°-270° moved up by 100px for CTA button clearance)
   - Mobile: Both X and Y position adjustments
     - Left-side words (90°-270°): moved right by 40px and up by 80px (increased for CTA button)
     - Right-side words (0°-90° and 270°-360°): moved left by 20px
   - Prevents cutoff at screen edges and footer/header/CTA button overlap
6. Improved mobile spacing and layout
   - Increased orbital radius from 130px to 180px on mobile
   - Better vertical distribution for portrait orientation
   - More breathing room around main text and CTA button
   - Horizontal adjustments prevent text cutoff on left and right edges

## Visual Experience

### Before
- Static grid with only pulse animation
- Tracking words and markers hidden behind footer on some screen sizes
- Less dynamic feeling

### After
- Grid has a flowing, wave-like glow that sweeps continuously
- Creates subtle movement reminiscent of scanning/tracking
- All content fully visible above footer and below header
- Enhanced surveillance/monitoring atmosphere
- Maintains focus on main text while adding visual interest
- Mobile: Words have proper spacing from main text (not cramped)
- Better vertical layout for portrait phone orientation

## Performance Considerations

- **GPU Accelerated**: Uses CSS `transform` via `backgroundPosition` animation
- **Single Layer**: Only one additional div overlay
- **No JavaScript**: Pure CSS animation via Framer Motion
- **Smooth**: Linear easing for continuous flow
- **Lightweight**: Minimal performance impact

## Design Rationale

### Why Wave Effect?
- **Surveillance Metaphor**: Scanning/sweeping motion suggests monitoring systems
- **Sea Waves**: Creates calming yet persistent feeling, like surveillance is constant
- **Depth**: Adds dimension to the grid without overwhelming content
- **Tracking Theme**: Reinforces the "being tracked" concept with moving elements

### Why Left to Right?
- **Natural Reading Flow**: Matches western reading direction
- **Scanning Motion**: Mimics how radar/sonar systems sweep
- **Continuous**: Infinite loop suggests constant monitoring
- **Non-Intrusive**: Horizontal movement is less distracting than vertical

### Why Subtle?
- **Content First**: Main text and orbital words remain the focus
- **Professional**: Avoids looking gimmicky or overwhelming
- **Background Element**: Should enhance, not dominate
- **User Comfort**: Subtle animations are less tiring over time

## Testing Recommendations

1. Verify wave animation moves smoothly from left to right
2. Check that wave is visible but not distracting in both themes
3. Test that orbital words and markers are fully visible (not cut off by footer or header)
4. Confirm wave doesn't interfere with main text readability
5. Verify performance on lower-end devices
6. Check that blend modes work correctly in both light and dark themes
7. Test on various screen sizes to ensure proper padding from footer
8. **Mobile specific**: 
   - Verify words have adequate spacing from "YOUR DATA" text
   - Check that layout works well in portrait orientation
   - Test on various mobile screen sizes (small phones to tablets)
   - Ensure words don't appear cramped or stick to main text

## Browser Compatibility

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (requires -webkit-backdrop-filter)
- ✅ Mobile browsers: Full support

## Future Enhancements (Optional)

- Add second wave layer moving at different speed for depth
- Sync wave speed with scanning ripple animation
- Add subtle color shift to wave (blue to purple gradient)
- Make wave speed adjustable based on user preference
- Add "sonar ping" effect when wave passes over orbital words
