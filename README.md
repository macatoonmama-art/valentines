# 💕 Our Love System.exe - Valentine's Day Gift

A fully functional, interactive, single-page web system inspired by 90s retro pixelated video games and Windows 95-style desktop OS. Built with pure HTML, CSS, and vanilla JavaScript.

## 🎮 Features

### 🏠 Landing Page
- Pixelated retro title with glitch effects
- Animated floating hearts
- Play button with glow and bounce animations
- Smooth fade-to-black loading transition

### 🖥️ Desktop System
- Windows 95-style taskbar with real-time clock
- Draggable, resizable windows
- Minimize, maximize, and close functionality
- Desktop icons for each folder
- Retro pixel background pattern
- CRT scanline effects

### 📁 Folder System

#### 📸 Our Memories
- Photo gallery with polaroid-style frames
- Navigate through memories with previous/next buttons
- Detailed memory information with dates and love notes
- Slideshow mode for automatic image progression
- Thumbnail grid view
- Floating heart particles on open

#### 🎵 Gavorotte Playlist
- Custom music player interface
- Play, pause, previous, and next controls
- Song progress bar with draggable handle
- Animated equalizer bars
- Volume slider
- Personal notes for each song
- Song list with active track highlighting

#### 💌 Love Letters
- Multiple sealed envelopes
- Opening animation when clicked
- Typewriter effect text reveal
- Reply button for responses
- Sweet romantic messages

#### 🎮 Mini Games

1. **💖 Catch the Hearts**
   - Falling heart objects to click
   - Score counter
   - 30-second timer
   - Sound effects and confetti rewards

2. **🧩 Memory Card Match**
   - 3x3 grid of photo-based memory cards
   - Match pairs to win
   - Visual feedback on successful matches
   - Victory animation and achievement

3. **💕 Avoid the No Button**
   - Button that moves away from cursor
   - Fun way to confirm love commitment
   - Sweet message reveal
   - Can't escape from love!

#### 🗓️ Our Timeline
- Interactive timeline of relationship milestones
- Clickable events with details
- Images and stories for each milestone
- Smooth scroll navigation
- Hover effects and animations

#### 🔐 Secret Folder
- Password-protected folder
- Hint system for password recovery
- Special hidden message reveal
- Valentine's Day question prompt
- Locked animation while secure

### ✨ Advanced UI Features
- **Dark Mode / Light Mode Toggle** - Switch between themes
- **Sound Effects** - Retro chiptune-style beeps for all interactions
- **Sound Toggle** - Mute/unmute all audio
- **Glitch Effect Button** - Visual glitch animation
- **Achievement System** - Unlock achievements as you explore
- **Easter Egg Heart** - Click the desktop 3 times to find hidden heart
- **Achievement Popups** - Celebration notifications for milestones
- **Confetti Effects** - Celebration particles on key moments
- **localStorage Support** - Saves all progress and preferences

### 🎨 Visual Design
- Press Start 2P pixelated font
- Soft pink and pastel purple color scheme
- Retro 3D button effects with shadows
- Hover glow animations
- Window opening animations with scaling
- CRT scanline overlay effect
- Responsive design for mobile devices
- Pixel art borders everywhere

### 🔊 Audio
- Retro chiptune-style sound effects
- Web Audio API for dynamic sound generation
- Background music support
- Volume control slider
- Mute/unmute toggle button

## 🔐 Secret Password
The secret folder password is: **2612** (February 12th - Valentine's Day)

## 📖 How to Use

1. **Open the file in a web browser**
   - Navigate to the directory where the files are located
   - Open `index.html` in a modern web browser

2. **Click "PLAY TOGETHER"**
   - Watch the loading animation
   - Enter the retro desktop system

3. **Explore Each Folder**
   - Double-click desktop icons to open windows
   - Each folder has unique interactive content
   - Drag windows around to rearrange
   - Use minimize/maximize/close buttons

4. **Play Mini Games**
   - Test your reflexes with "Catch the Hearts"
   - Exercise memory with "Memory Match"
   - Try to click the "No" button (spoiler: you can't!)

5. **Unlock Secret Folder**
   - Enter password: **2612**
   - See the special message
   - Reveal the Valentine's Day question

## 🛠️ Technical Details

### File Structure
```
val/
├── index.html          # Main HTML structure
├── style.css           # Complete CSS styling
├── script.js           # Full JavaScript functionality
└── assets/
    └── bgmusic.mp3     # Background music (optional)
```

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile Browsers: ✅ Responsive design

### localStorage Keys
- `loveSystemConfig` - Stores all user preferences and achievements

### Sound Generation
Uses Web Audio API to generate retro chiptune sounds dynamically:
- Click: 800 Hz
- Open: 600 Hz
- Close: 400 Hz
- Success: 1000 Hz
- Error: 300 Hz
- Achievement: 1200 Hz

## 🎯 Customization Guide

### Add More Memories
Edit the `memoriesData` array in `script.js`:
```javascript
{
    id: 7,
    image: 'path/to/image.jpg',
    date: 'Your Date',
    description: 'Your description',
    note: 'Your note'
}
```

### Add More Songs
Edit the `playlistData` array:
```javascript
{
    id: 6,
    title: 'Song Title',
    artist: 'Artist Name',
    duration: 210,
    note: 'Why this song is special'
}
```

### Add More Love Letters
Edit the `loveLetters` array:
```javascript
{
    id: 5,
    subject: 'Letter Title',
    text: 'Your heartfelt message'
}
```

### Add Timeline Events
Edit the `timelineEvents` array:
```javascript
{
    year: 2024,
    month: 'Month Name',
    title: 'Event Title',
    image: 'image.jpg',
    story: 'Your story'
}
```

### Change Secret Password
In the `SecretWindow` class, modify:
```javascript
this.correctPassword = 'your-password';
```

### Customize Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-pink: #ff69b4;
    --dark-pink: #c71585;
    /* ... etc ... */
}
```

## 🎮 Controls

### Desktop
- **Drag Windows** - Click and drag the title bar
- **Maximize Window** - Click the □ button
- **Minimize Window** - Click the _ button
- **Close Window** - Click the ✕ button
- **Scroll Content** - Mouse wheel or scrollbar

### Music Player
- **Play/Pause** - Click ▶/⏸ button
- **Previous Track** - Click ⏮ button
- **Next Track** - Click ⏭ button
- **Adjust Volume** - Drag the volume slider
- **Seek** - Click on the progress bar

### Mini Games
- **Hearts Game** - Click falling hearts to catch them
- **Memory Game** - Click cards to find matching pairs
- **Button Game** - Try to click the "No" button (it will move away!)

## 💫 Features Highlight

✨ **100% Vanilla JavaScript** - No frameworks or libraries needed
✨ **Fully Responsive** - Works on desktop and mobile
✨ **localStorage Persistence** - Progress saved automatically
✨ **Sound Effects** - Retro chiptune sounds
✨ **Smooth Animations** - CSS transitions and keyframes
✨ **Interactive Windows** - Drag, resize, minimize, maximize
✨ **Multiple Mini Games** - Three fun and interactive games
✨ **Achievement System** - Unlock achievements as you explore
✨ **Easter Egg** - Click the desktop 3 times to find a hidden heart
✨ **Dark Mode** - Toggle between light and dark themes
✨ **Professional Quality** - Production-ready code

## 📱 Mobile Responsive
- Adjusted layout for smaller screens
- Touch-friendly interface
- Responsive grid layouts
- Mobile-optimized font sizes

## 🎵 Background Music
To add custom background music:
1. Add an MP3 file to the `assets/` folder
2. Name it `bgmusic.mp3`
3. The system will automatically play it on game start
4. Use the volume slider to adjust

## 🏆 Achievements
Unlock achievements by:
- 📸 Opening the Memories folder
- 🎵 Opening the Playlist folder
- 💌 Opening the Letters folder
- 🗓️ Opening the Timeline folder
- 🎮 Playing and winning mini games
- 🔐 Unlocking the Secret Folder
- ❤️ Finding the Easter Egg Heart

## 💕 Perfect For
- Valentine's Day gift
- Long-distance relationship tokens
- Anniversary presents
- Romantic gestures
- Digital keepsake
- Personalized love game

## 🎁 How to Give as a Gift
1. Customize all the data (memories, songs, letters, timeline)
2. Add real photos and personal information
3. Save the entire folder
4. Share via email, cloud drive, or USB
5. Recipient opens index.html in any web browser
6. No installation or internet required!

## 📝 License
Created with love ❤️

Enjoy exploring your love system! 💕

---

**Made with 💕 for the one you love** ✨
