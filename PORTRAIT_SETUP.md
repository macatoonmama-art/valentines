# 🎨 Portrait Painting Setup Guide

## Overview
A new **"My Painting"** folder has been added to your Love System! This feature displays a portrait using an innovative CSS technique where text characters are layered over a background image to create an ASCII art-like effect.

## How It Works
The portrait is created using CSS `background-clip: text` property:
- Text characters form a pattern on the black background
- A background image shows through the text
- The result is a beautiful portrait created from text and image together
- A subtle glow animation makes it feel alive and magical

## Setup Instructions

### Step 1: Prepare Your Portrait Image
1. Choose a portrait photo of you or your girlfriend
2. Recommended specifications:
   - **Format**: JPG or PNG
   - **Aspect Ratio**: Square (1:1) works best
   - **Resolution**: 400x400px or higher
   - **File Size**: Keep under 500KB for web loading

### Step 2: Add the Image File
1. Place your portrait image in the same folder as `index.html`
2. **Name it exactly**: `portrait.jpg` (or change the extension to `.png` if using PNG)
3. If your file is named differently, you can edit `script.js`:
   - Find: `portraitDisplay.style.backgroundImage = \`url('portrait.jpg')\`;`
   - Replace with: `portraitDisplay.style.backgroundImage = \`url('your-filename.jpg')\`;`

### Step 3: Customize (Optional)

#### Change Portrait Dimensions
Edit `script.js` line ~572:
```javascript
const portraitText = generatePortraitText(45, 35);
//                                        ^^  ^^
//                                     width  height
```
- Increase numbers for **more detail** (denser text pattern)
- Decrease for **cleaner look** (sparser pattern)
- Recommended: 40-50 width, 30-40 height

#### Modify Text Pattern
Edit the `generatePortraitText()` function in `script.js` (around line 444):
```javascript
const chars = ['█', '▓', '▒', '░', ' ', '•', '◯'];
```
These Unicode characters create the text pattern. You can change them to:
- `['#', '@', 'o', '.', ' ']` for ASCII art style
- `['█', '▓', '▒', '░', ' ']` for block style (default)
- `['*', '+', '.', ' ']` for minimal style

#### Adjust Glow Animation
In `style.css` (around line 760), modify:
```css
@keyframes portraitGlow {
    0%, 100% {
        filter: brightness(1);
    }
    50% {
        filter: brightness(1.2);  /* Change 1.2 to 1.5 for stronger glow */
    }
}
```

#### Change Display Size
In `style.css`, find `.portrait-display`:
```css
.portrait-display {
    height: 300px;  /* Adjust this value */
}
```

## File Structure After Setup
```
c:\xampp\htdocs\val\
├── index.html
├── style.css
├── script.js
├── portrait.jpg          ← Add your image here
├── assets/
├── PORTRAIT_SETUP.md     ← This file
└── [other documentation files]
```

## Testing

### View the Portrait
1. Open the Love System in your browser
2. Click on the **🎨 My Painting** desktop icon
3. The portrait window will open with your image displayed through text

### Mobile Testing
The portrait is fully responsive:
- **Desktop**: 300px height display
- **Tablet**: 250px height display
- **Mobile**: 200px height display

## Troubleshooting

### Portrait Not Showing
- ✓ Check that `portrait.jpg` is in the same folder as `index.html`
- ✓ Verify the filename matches exactly (case-sensitive on some systems)
- ✓ Try PNG format if JPG doesn't work: `portrait.png`
- ✓ Check browser console for errors (F12 → Console tab)

### Image Doesn't Look Right
- ✓ Try a higher resolution portrait (800x800px minimum)
- ✓ Use a portrait with good contrast
- ✓ Adjust the text character density (width/height parameters)
- ✓ Increase glow animation brightness

### Text Pattern is Too Dense/Sparse
- Edit `generatePortraitText(45, 35)` values
- Increase width/height for more characters (denser)
- Decrease for fewer characters (sparser)

### Wrong File Format
- The system supports both JPG and PNG
- Update the filename in `script.js` if needed
- Example: `portrait.png` or `portrait.jpg`

## Features
✅ Text-based portrait display with background image  
✅ Smooth glow animation  
✅ Fully responsive (desktop, tablet, mobile)  
✅ Achievement unlocked: "Art Lover" 🎨  
✅ Sound effect when window opens  
✅ Customizable text characters and display size  

## Tips for Best Results
1. **Portrait Selection**: Use clear, well-lit headshot photos
2. **File Size**: Optimize image to ~100-200KB for fast loading
3. **Contrast**: High contrast portraits work better with text overlay
4. **Colors**: The glow effect works best with portrait images
5. **Testing**: Try different character sets to find your favorite look

## Customization Ideas
- Change text characters to emojis (modify `chars` array)
- Create multiple portraits for different moods
- Combine with music from Playlist window
- Add animated transitions between portraits
- Use different character sets for seasons or themes

Enjoy your personalized portrait! 💗
