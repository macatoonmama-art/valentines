
/**
 * VALENTINE'S DAY LOVE SYSTEM
 * Complete Interactive 90s Retro Pixelated Love Game OS
 */

// ========== CONFIGURATION & DATA ==========

const config = {
  soundEnabled: true,
  darkTheme: false,
  volume: 0.7,
  achievements: {},
  gameScores: {},
  musicPreference: 0.7,
};

// Sample playlist data with corrected paths
const playlistData = [
  {
    id: 1,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    duration: 214,
    note: ":>>",
    audioUrl: "assets/Arctic Monkeys - I Wanna Be Yours.mp3",
  },
  {
    id: 2,
    title: "Best Part",
    artist: "Daniel Caesar ft. H.E.R.",
    duration: 198,
    note: "You are",
    audioUrl: "assets/H.E.R. - Best Part (Lyrics) Ft. Daniel Caesar.mp3",
  },
  {
    id: 3,
    title: "Valentine",
    artist: "Laufey",
    duration: 187,
    note: "Hmmmmm",
    audioUrl: "assets/Laufey - Valentine (Lyrics).mp3",
  },
];

// ========== UTILITY FUNCTIONS ==========

function playSound(type) {
  if (!config.soundEnabled) return;
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    let frequency, duration;
    switch (type) {
      case "click": frequency = 800; duration = 0.1; break;
      case "open": frequency = 600; duration = 0.15; break;
      case "close": frequency = 400; duration = 0.1; break;
      case "success": frequency = 1000; duration = 0.2; break;
      case "error": frequency = 300; duration = 0.15; break;
      default: return;
    }
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.1 * config.volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) { console.log("Sound error:", e); }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function getRandomPosition() {
  const desktop = document.getElementById("desktop");
  const maxX = desktop.offsetWidth - 350;
  const maxY = desktop.offsetHeight - 300;
  return {
    x: Math.max(50, Math.random() * maxX),
    y: Math.max(50, Math.random() * maxY),
  };
}

// ========== WINDOW MANAGER ==========

class WindowManager {
  constructor() {
    this.zIndexBase = 1000; // High base to stay above desktop UI
    this.windows = [];
  }

  createWindow(type, title, content) {
    const template = document.getElementById("windowTemplate");
    const windowEl = template.content.cloneNode(true).querySelector(".window");
    windowEl.dataset.windowType = type;
    windowEl.querySelector(".window-title").textContent = title;
    windowEl.querySelector(".window-content").appendChild(content);
    
    const pos = getRandomPosition();
    windowEl.style.left = pos.x + "px";
    windowEl.style.top = pos.y + "px";
    windowEl.style.zIndex = ++this.zIndexBase;
    
    const container = document.getElementById("windowsContainer");
    container.appendChild(windowEl);
    this.setupWindowControls(windowEl);
    this.windows.push(windowEl);
    
    playSound("open");
    return windowEl;
  }

  setupWindowControls(windowEl) {
    const closeBtn = windowEl.querySelector(".close-btn");
    const header = windowEl.querySelector(".window-header");

    closeBtn.onclick = () => {
      windowEl.remove();
      this.windows = this.windows.filter((w) => w !== windowEl);
      playSound("close");
    };

    // Unified Dragging Logic
    let isDragging = false;
    let initialX, initialY;

    const startDrag = (e) => {
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      
      isDragging = true;
      initialX = clientX - windowEl.offsetLeft;
      initialY = clientY - windowEl.offsetTop;
      windowEl.style.zIndex = ++this.zIndexBase;
      header.style.cursor = "grabbing";
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      
      let currentX = clientX - initialX;
      let currentY = clientY - initialY;
      
      const desktop = document.getElementById("desktop");
      const maxX = desktop.offsetWidth - windowEl.offsetWidth;
      const maxY = desktop.offsetHeight - windowEl.offsetHeight;
      
      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));
      
      windowEl.style.left = currentX + "px";
      windowEl.style.top = currentY + "px";
    };

    const endDrag = () => {
      isDragging = false;
      header.style.cursor = "move";
    };

    header.onmousedown = startDrag;
    window.onmousemove = moveDrag;
    window.onmouseup = endDrag;
    
    header.ontouchstart = startDrag;
    window.ontouchmove = (e) => { if(isDragging) { e.preventDefault(); moveDrag(e); } };
    window.ontouchend = endDrag;

    // Bring to front on click
    windowEl.onmousedown = () => {
      windowEl.style.zIndex = ++this.zIndexBase;
    };
  }
}

// ========== PLAYLIST WINDOW ==========

class PlaylistWindow {
  constructor(windowManager) {
    this.windowManager = windowManager;
    this.currentTrack = 0;
    this.isPlaying = false;
  }

  create() {
    const template = document.getElementById("playlistTemplate");
    const content = template.content.cloneNode(true);
    const wrapper = document.createElement("div");
    wrapper.appendChild(content);
    
    const win = this.windowManager.createWindow("playlist", "🎵 Songs for you", wrapper);
    this.setupPlayer(win);
    return win;
  }

  setupPlayer(win) {
    const songsContainer = win.querySelector(".songs-container");
    const playPauseBtn = win.querySelector(".play-pause-btn");
    const prevBtn = win.querySelector(".prev-track-btn");
    const nextBtn = win.querySelector(".next-track-btn");
    const songTitleDisplay = win.querySelector(".song-title");
    
    // Create disk player if it doesn't exist
    let diskPlayer = win.querySelector(".disk-player");
    if (!diskPlayer) {
      diskPlayer = document.createElement("div");
      diskPlayer.className = "disk-player aesthetic-disk";
      diskPlayer.innerHTML = `
        <div class="disk-outer"><div class="disk-inner"></div><div class="disk-label">🎵</div></div>
        <audio id="playlistAudio" preload="auto"></audio>
      `;
      win.querySelector(".player-display").appendChild(diskPlayer);
    }
    
    const audio = win.querySelector("#playlistAudio");
    const diskOuter = win.querySelector(".disk-outer");

    const updateUI = () => {
      playPauseBtn.textContent = this.isPlaying ? "⏸" : "▶";
      if (this.isPlaying) {
        diskOuter.classList.add("spinning");
      } else {
        diskOuter.classList.remove("spinning");
      }
      
      // Update active song in list
      win.querySelectorAll(".song-item").forEach((item, idx) => {
        item.classList.toggle("active", idx === this.currentTrack);
      });
      
      // Update title
      songTitleDisplay.textContent = playlistData[this.currentTrack].title;
    };

    const loadTrack = (index, autoPlay = false) => {
      this.currentTrack = index;
      audio.src = playlistData[index].audioUrl;
      audio.load();
      if (autoPlay || this.isPlaying) {
        audio.play().then(() => {
          this.isPlaying = true;
          updateUI();
        }).catch(e => console.log("Autoplay blocked or error:", e));
      } else {
        updateUI();
      }
    };

    // Populate songs list
    songsContainer.innerHTML = "";
    playlistData.forEach((song, index) => {
      const songEl = document.createElement("div");
      songEl.className = "song-item" + (index === this.currentTrack ? " active" : "");
      songEl.innerHTML = `<span class="song-name">${song.title}</span><span class="song-note">${song.note}</span>`;
      songEl.onclick = () => loadTrack(index, true);
      songsContainer.appendChild(songEl);
    });

    playPauseBtn.onclick = () => {
      if (audio.paused) {
        audio.play().then(() => {
          this.isPlaying = true;
          updateUI();
        }).catch(e => alert("Please interact with the page first!"));
      } else {
        audio.pause();
        this.isPlaying = false;
        updateUI();
      }
    };

    prevBtn.onclick = () => {
      let nextIdx = (this.currentTrack - 1 + playlistData.length) % playlistData.length;
      loadTrack(nextIdx, true);
    };

    nextBtn.onclick = () => {
      let nextIdx = (this.currentTrack + 1) % playlistData.length;
      loadTrack(nextIdx, true);
    };

    audio.onended = () => {
      let nextIdx = (this.currentTrack + 1) % playlistData.length;
      loadTrack(nextIdx, true);
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        win.querySelector(".progress-fill").style.width = percent + "%";
        win.querySelector(".progress-handle").style.left = percent + "%";
        win.querySelector(".current-time").textContent = formatTime(audio.currentTime);
        win.querySelector(".duration-time").textContent = formatTime(audio.duration);
      }
    };

    // Initial load
    loadTrack(0, false);
  }
}

// ========== MAIN APPLICATION CONTROLLER ==========

class LoveSystem {
  constructor() {
    this.windowManager = new WindowManager();
    this.openFolders = {};
  }

  init() {
    this.setupEventListeners();
    this.setupClock();
  }

  setupEventListeners() {
    document.getElementById("playBtn").onclick = () => this.startGame();
    document.getElementById("soundToggle").onclick = () => {
      config.soundEnabled = !config.soundEnabled;
      document.getElementById("soundToggle").textContent = config.soundEnabled ? "🔊" : "🔇";
    };
  }

  setupClock() {
    const clock = document.getElementById("clockDisplay");
    setInterval(() => { clock.textContent = new Date().toLocaleTimeString(); }, 1000);
  }

  setupHotWheels() {
    const tires = document.querySelectorAll("#tiresPanel .tire");
    tires.forEach((tire) => {
      tire.onclick = () => {
        const id = tire.dataset.tire;
        const type = id === "1" ? "playlist" : id === "2" ? "letter" : id === "3" ? "flowers" : "games";
        
        // Toggle behavior
        const existing = document.querySelector(`[data-window-type="${type}"]`);
        if (existing) {
          existing.querySelector(".close-btn").click();
          return;
        }

        let content = document.createElement("div");
        content.style.padding = "20px";
        content.style.textAlign = "center";

        if (id === "1") {
          new PlaylistWindow(this.windowManager).create();
        } else if (id === "2") {
          content.innerHTML = `
            <div class="letter-container">
              <button id="playMuseoBtn" class="pixel-button" style="margin-bottom: 15px; width: 100%;">🎵 Play Background Music</button>
              <h2>LETTER FROM ME</h2>
              <p style='font-size:0.8rem; margin-top:10px;'>My dearest, you make me better every day. ❤️</p>
              <audio id="museoAudio" src="assets/Eliza Maturan - Museo (Official Music Video).mp3"></audio>
            </div>
          `;
          const win = this.windowManager.createWindow("letter", "💌 Letter", content);
          const museoBtn = content.querySelector("#playMuseoBtn");
          const museoAudio = content.querySelector("#museoAudio");
          
          museoBtn.onclick = () => {
            if (museoAudio.paused) {
              museoAudio.play().then(() => {
                museoBtn.textContent = "⏸ Pause Background Music";
              }).catch(e => alert("Please interact with the page first to play music!"));
            } else {
              museoAudio.pause();
              museoBtn.textContent = "▶ Play Background Music";
            }
          };
          
          // Stop music when window is closed
          const closeBtn = win.querySelector(".close-btn");
          const originalClose = closeBtn.onclick;
          closeBtn.onclick = () => {
            museoAudio.pause();
            originalClose();
          };
        } else if (id === "3") {
          content.innerHTML = "<h2>FLOWERS FOR U MADAM</h2><img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Z0YmR1eTd0cnA3ZTdidmo4bDJuYm52NzB5ajJyaXdwNTVrbDd2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dFYPRY6u3YnajI1jP3/giphy.gif' style='width:100%; border-radius:10px; margin-top:10px;'>";
          this.windowManager.createWindow("flowers", "🌹 Flowers", content);
        } else if (id === "4") {
          content.innerHTML = "<h2>GAMES</h2><button id='startStrawberry' class='pixel-button' style='margin-top:10px;'>Play Catch the Strawberries</button>";
          const win = this.windowManager.createWindow("games", "🎮 Games", content);
          content.querySelector("#startStrawberry").onclick = () => {
            win.querySelector(".close-btn").click();
            this.startHeartsGame();
          };
        }
      };
    });
  }

  startGame() {
    document.getElementById("landingPage").classList.add("hidden");
    document.getElementById("loadingScreen").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("loadingScreen").classList.add("hidden");
      document.getElementById("desktopSystem").classList.remove("hidden");
      this.setupHotWheels();
    }, 4500);
  }

  startHeartsGame() {
    const board = document.getElementById("gameBoard-hearts");
    board.classList.remove("hidden");
    board.style.zIndex = 5000; // Above everything
    const container = document.querySelector(".hearts-game-container");
    const scoreEl = document.querySelector("#gameBoard-hearts .score");
    let score = 0, timeLeft = 30, gameActive = true;
    container.innerHTML = "";
    scoreEl.textContent = 0;
    
    const createBerry = () => {
      if (!gameActive) return;
      const berry = document.createElement("div");
      berry.textContent = "🍓";
      berry.style.position = "absolute";
      berry.style.left = Math.random() * (container.offsetWidth - 30) + "px";
      berry.style.top = "-30px";
      berry.style.fontSize = "2rem";
      berry.style.cursor = "pointer";
      let y = -30;
      const fall = () => {
        if (!gameActive) return;
        y += 2.5;
        berry.style.top = y + "px";
        if (y > container.offsetHeight) { berry.remove(); return; }
        requestAnimationFrame(fall);
      };
      berry.onclick = () => {
        score++;
        scoreEl.textContent = score;
        berry.remove();
        playSound("success");
        if (score >= 14) {
          gameActive = false;
          this.triggerValentineSurprise(container);
        }
      };
      container.appendChild(berry);
      requestAnimationFrame(fall);
    };

    const spawnInterval = setInterval(createBerry, 700);
    const timerInterval = setInterval(() => {
      if (!gameActive) { clearInterval(timerInterval); clearInterval(spawnInterval); return; }
      timeLeft--;
      document.querySelector("#gameBoard-hearts .timer").textContent = timeLeft;
      if (timeLeft <= 0) { clearInterval(timerInterval); clearInterval(spawnInterval); alert("Game Over!"); board.classList.add("hidden"); }
    }, 1000);
    board.querySelector(".game-back-btn").onclick = () => { gameActive = false; board.classList.add("hidden"); };
  }

  triggerValentineSurprise(container) {
    container.innerHTML = "";
    const bigHeart = document.createElement("div");
    bigHeart.textContent = "❤️";
    bigHeart.style.fontSize = "10rem";
    bigHeart.style.cursor = "pointer";
    bigHeart.style.display = "flex";
    bigHeart.style.justifyContent = "center";
    bigHeart.style.alignItems = "center";
    bigHeart.style.height = "100%";
    bigHeart.style.animation = "pulse 1s infinite";
    bigHeart.onclick = () => {
      container.innerHTML = `
        <div style="text-align:center; padding:12px; display:flex; flex-direction:column; gap:10px;">
          <h2 style="color:#c71585; font-size:0.85rem; margin:0;">Will you be my valentine?</h2>
          <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2FoeHA1amdpZHljMjhxeXl4aDhoZm8zMXZyMjY4ZGx6bDJ0aHoxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cFZ7Sd0Eiz1urtmFSb/giphy.gif" style="width:100%; max-width:160px; height:auto; border-radius:8px; align-self:center;" alt="romantic">
          <div style="display:flex; justify-content:center; gap:10px;">
            <button id="valYes" class="pixel-button" style="padding:0.5rem 1rem; font-size:0.65rem;">YES</button>
            <button id="valNo" class="pixel-button" style="position:relative; padding:0.5rem 1rem; font-size:0.65rem;">NO</button>
          </div>
        </div>
      `;
      const noBtn = document.getElementById("valNo");
      noBtn.onmouseover = () => {
        noBtn.style.position = "fixed";
        noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
        noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
      };
      document.getElementById("valYes").onclick = () => {
        container.innerHTML = `
          <div style="text-align:center; padding:12px; display:flex; flex-direction:column; gap:10px;">
            <p style="color:#c71585; font-size:0.7rem; margin:0;">It was my pleasure having you as my Valentine ❤️</p>
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDhqZml2a3pydzFqcGZhMnlhNjR6ZW0xNXFoYnBxN2RqdzdkaTJuNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vzbq5TreSbtW6h1tGi/giphy.gif" style="width:100%; max-width:160px; height:auto; border-radius:8px; align-self:center;" alt="celebration">
            <button id="surpriseBtn" class="pixel-button" style="padding:0.5rem 1rem; font-size:0.65rem;">click here for surprise</button>
          </div>
        `;
        document.getElementById("surpriseBtn").onclick = () => showFinalSurprise();
      };
    };
    container.appendChild(bigHeart);
  }
}

function showFinalSurprise() {
  const surprise = document.getElementById("finalSurprise");
  surprise.classList.remove("hidden");
  surprise.style.zIndex = 9999;
  surprise.querySelector(".replay-btn").onclick = () => location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  new LoveSystem().init();
});
