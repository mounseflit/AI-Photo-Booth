let outputimage = "";

class MagicFaceTransform {
  constructor() {
    this.currentScreen = 'welcome';
    this.capturedImage = null;
    this.selectedCharacter = '';
    this.customPrompt = '';
    this.transformedImage = null;
    this.stream = null;
    this.facingMode = 'user';
    this.isNavigating = false;
    this.loadingInterval = null;
    this.countdownInterval = null;

    this.loadingMessages = [
      "Mixing magical ingredients... 🧪",
      "Consulting the crystal ball... 🔮",
      "Weaving enchantments... 🎩",
      "Summoning digital magic... ⚡",
      "Creating your new look... 🎭",
      "Almost ready... just a few more sparkles! ✨",
      "Preparing your magical masterpiece... 🎨",
      "Finalizing the transformation...🐉",
      "Your magic is almost complete... 🌟",
      "Putting on the finishing touches... 🖌️",
      "Enchanting pixels... 🧙‍♂️",
      "Abracadabra... 🚀",
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadCharactersFromJson();
    this.setActiveScreen('welcome');
  }

  /* ---------- Navigation helpers (no wiggle) ---------- */
  getScreenEl(name) {
    return document.getElementById(`${name}-screen`);
  }

  setActiveScreen(name) {
    // Ensure exactly one active
    document.querySelectorAll('.screen.active').forEach(el => {
      el.classList.remove('active');
      el.setAttribute('aria-hidden', 'true');
    });
    const next = this.getScreenEl(name);
    if (next) {
      next.classList.add('active');
      next.removeAttribute('aria-hidden');
      this.currentScreen = name;
      window.scrollTo(0, 0); // defensive
    }
  }

  async navigateTo(name, { before = null, after = null } = {}) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    try {
      if (typeof before === 'function') await before();
      this.setActiveScreen(name);
      if (typeof after === 'function') await after();
    } finally {
      setTimeout(() => (this.isNavigating = false), 50);
    }
  }

  /* ---------- Event wiring ---------- */
  bindEvents() {
    // Welcome → Camera (start camera before showing the screen)
    document.getElementById('start-camera-btn').addEventListener('click', () => {

      document.getElementById("camera-screen").style.display = "flex";
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("character-screen").style.display = "none";

      this.navigateTo('camera', {
        before: async () => {
          await this.startCamera();
          // Start countdown after camera is initialized
          setTimeout(() => this.startCountdown(), 1000);
        }
      });

    });

    // Camera → Back to Welcome
    document.getElementById('back-to-welcome-btn').addEventListener('click', () => {
      this.stopCamera();
      this.navigateTo('welcome');
      document.getElementById("welcome-screen").style.display = "flex";
      document.getElementById("character-screen").style.display = "none";
      document.getElementById("camera-screen").style.display = "none";
    });

    document.getElementById('switch-camera-btn').addEventListener('click', () => {
      this.switchCamera();
    });

    document.getElementById('capture-btn').addEventListener('click', () => {
      // Manual capture skips countdown
      const cameraView = document.querySelector('.camera-view');
      cameraView.classList.add('camera-flash');
      setTimeout(() => {
        cameraView.classList.remove('camera-flash');
        this.capturePhoto();
        document.getElementById("camera-screen").style.display = "none";
        document.getElementById("character-screen").style.display = "flex";
        document.getElementById("welcome-screen").style.display = "none";
      }, 300);
    });

    document.getElementById('upload-btn').addEventListener('click', () => {
      document.getElementById('file-input').click();
    });

    document.getElementById('upload-photo-btn').addEventListener('click', () => {
      document.getElementById('file-input').click();
    });

    document.getElementById('retry-camera-btn').addEventListener('click', () => {
      this.startCamera();
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("character-screen").style.display = "none";
      document.getElementById("camera-screen").style.display = "flex";
    });

    document.getElementById('file-input').addEventListener('change', (e) => {
      this.handleFileUpload(e);
    });

    // Character screen
    document.getElementById('retake-photo-btn').addEventListener('click', () => {
      this.navigateTo('camera', { 
      before: async () => {
        await this.startCamera();
        // Start countdown after camera is initialized
        setTimeout(() => this.startCountdown(), 1000);
      }
      });
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("character-screen").style.display = "none";
      document.getElementById("camera-screen").style.display = "flex";
    });

    document.getElementById('transform-btn').addEventListener('click', () => {
      this.handleTransform();
      if (document.getElementById('custom-prompt').value.trim() || this.selectedCharacter) {


        this.navigateTo('loading');
        document.getElementById('loading-screen').style.display = 'block';
        document.getElementById("welcome-screen").style.display = "none";
        document.getElementById("character-screen").style.display = "none";
        document.getElementById("camera-screen").style.display = "none";

      }


    });

    document.getElementById('custom-prompt').addEventListener('input', (e) => {
      this.customPrompt = e.target.value;
      this.clearCharacterSelection();
    });

    // Character option click handlers (delegated for dynamic content)
    document.addEventListener('click', (e) => {
      const option = e.target.closest('.character-option');
      if (!option) return;
      const characterData = option.dataset.character;
      if (characterData === 'personalized') {
        this.showPersonalizedModal();
      } else {
        this.selectCharacterOption(option);
      }
    });

    // Legacy character button support (if any remain)
    document.querySelectorAll('.character-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectCharacter(e.target);
      });
    });

    // Personalized modal handlers
    document.getElementById('close-personalized-modal-btn').addEventListener('click', () => {
      this.hidePersonalizedModal();
    });

    document.getElementById('cancel-personalized-btn').addEventListener('click', () => {
      this.hidePersonalizedModal();
    });

    document.getElementById('continue-personalized-btn').addEventListener('click', () => {
      this.handlePersonalizedPrompt();
    });

    // Result screen
    document.getElementById('transform-again-btn').addEventListener('click', () => {


      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("welcome-screen").style.display = "flex";
      document.getElementById("character-screen").style.display = "none";
      document.getElementById("camera-screen").style.display = "none";
      document.getElementById("result-screen").style.display = "none";


      this.resetApp();

    });


    // 
    document.getElementById('share-result-btn').addEventListener('click', () => {
      this.showShareModal();
    });


    // Share modal
    document.getElementById('close-modal-btn').addEventListener('click', () => {
      this.hideShareModal();
    });

    document.getElementById('send-email-btn').addEventListener('click', () => {
      this.sendEmail();
    });

    document.getElementById('copy-link-btn').addEventListener('click', () => {
      this.copyLink();
    });

    document.getElementById('download-btn').addEventListener('click', () => {
      this.downloadImage();
    });
  }

  /* ---------- Load characters from JSON ---------- */
  async loadCharactersFromJson() {
    try {
      const res = await fetch('js/characters.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load characters');
      const items = await res.json();



      const container = document.getElementById('characters-container');
      container.innerHTML = '';

      const card0 = document.createElement('div');
      card0.className = 'character-option personalized-option';
      card0.dataset.character = 'personalized';
      card0.innerHTML = `
        <div class="character-option personalized-option" data-character="personalized">
              <div class="character-image">
                <div class="personalized-icon">✨</div>
              </div>
              <div class="character-name">Personalized</div>
              <div class="character-description">Create your own</div>
            </div>`;
      container.appendChild(card0);



      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'character-option';
        card.dataset.character = item.dataCharacter || item.datacharacter || item["data-character"] || '';

        card.innerHTML = `
          <div class="character-image">
            ${item.image ? `<img class="character-thumb" src="${item.image}" alt="${item.name}" onerror="this.style.display='none'"/>` : ''}
            ${item.image ? '' : '<div class="character-emoji">🎭</div>'}
          </div>
          <div class="character-name">${item.name || 'Unknown'}</div>
          <div class="character-description">${item.description || ''}</div>
        `;

        container.appendChild(card);
      });
    } catch (err) {
      console.error('Characters load error:', err);
      const container = document.getElementById('characters-container');
      if (container) {
        container.innerHTML = '<p style="color:#fff;opacity:.8">Failed to load characters.</p>';
      }
    }
  }

  /* ---------- Camera lifecycle ---------- */
  async startCamera() {
    try {
      this.hideError();
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop());
        this.stream = null;
      }

      const constraints = {
        video: { facingMode: this.facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.getElementById('camera-video');
      video.srcObject = this.stream;
    } catch (error) {
      console.error('Camera error:', error);
      this.showError('Unable to access camera. Please check permissions and try again.');
    }
  }

  stopCamera() {
    // Clear countdown interval if it exists
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
      document.getElementById('countdown-overlay').style.display = 'none';
    }

    // Stop the camera stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  switchCamera() {
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    this.startCamera();
  }

  /* ---------- Capture / Upload ---------- */
  startCountdown() {
    // Show and initialize the countdown overlay
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownNumber = countdownOverlay.querySelector('.countdown-number');
    const cameraView = document.querySelector('.camera-view');

    countdownOverlay.style.display = 'flex';
    let count = 5;
    countdownNumber.textContent = count;

    this.countdownInterval = setInterval(() => {
      count--;

      if (count <= 0) {
        // Clear the interval
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;

        // Flash effect
        cameraView.classList.add('camera-flash');
        setTimeout(() => {
          cameraView.classList.remove('camera-flash');

          // Hide the countdown overlay
          countdownOverlay.style.display = 'none';

          // Take the photo
          this.capturePhoto();
        }, 500);
      } else {
        // Update the countdown
        countdownNumber.textContent = count;
      }
    }, 1000);
  }

  capturePhoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');

    if (!video.videoWidth || !video.videoHeight) {
      alert('Camera not ready. Please wait a moment and try again.');
      return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.capturedImage = canvas.toDataURL('image/jpeg', 0.9);

    this.stopCamera();
    this.showCharacterScreen();


    document.getElementById("camera-screen").style.display = "none";
    document.getElementById("character-screen").style.display = "flex";
    document.getElementById("welcome-screen").style.display = "none";
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.capturedImage = e.target.result;
      this.showCharacterScreen();
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("character-screen").style.display = "flex";
      document.getElementById("camera-screen").style.display = "none";
    };
    reader.readAsDataURL(file);
  }

  showCharacterScreen() {
    const previewImg = document.getElementById('captured-image');

    document.getElementById("camera-screen").style.display = "none";
    document.getElementById("character-screen").style.display = "flex";
    document.getElementById("welcome-screen").style.display = "none";

    previewImg.src = this.capturedImage;
    this.setActiveScreen('character');
  }

  /* ---------- Character & transform ---------- */
  selectCharacter(button) {
    document.getElementById('custom-prompt').value = '';
    this.customPrompt = '';
    document.querySelectorAll('.character-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    this.selectedCharacter = button.dataset.character;
  }

  clearCharacterSelection() {
    document.querySelectorAll('.character-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.character-option').forEach(option => option.classList.remove('selected'));
    this.selectedCharacter = '';
  }

  selectCharacterOption(option) {
    // Clear previous selections
    document.querySelectorAll('.character-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('.character-btn').forEach(btn => btn.classList.remove('selected'));

    // Select the clicked option
    option.classList.add('selected');
    this.selectedCharacter = option.dataset.character;
    this.customPrompt = '';
  }

  showPersonalizedModal() {
    document.getElementById('personalized-modal').style.display = 'flex';
    document.getElementById('personalized-prompt').focus();
  }

  hidePersonalizedModal() {
    document.getElementById('personalized-modal').style.display = 'none';
    document.getElementById('personalized-prompt').value = '';
  }

  handlePersonalizedPrompt() {
    const promptText = document.getElementById('personalized-prompt').value.trim();
    if (!promptText) {
      alert('Please enter a transformation description!');
      return;
    }

    // Clear other selections and set custom prompt
    document.querySelectorAll('.character-option').forEach(option => option.classList.remove('selected'));
    document.querySelectorAll('.character-btn').forEach(btn => btn.classList.remove('selected'));

    // Mark personalized option as selected and set the prompt
    document.querySelector('.personalized-option').classList.add('selected');
    this.selectedCharacter = '';
    this.customPrompt = promptText;

    this.hidePersonalizedModal();
  }

  async handleTransform() {
    const prompt = `${this.customPrompt} ${this.selectedCharacter}`.trim();
    if (!this.capturedImage) {
      alert('Please capture or upload a photo first!');
      return;
    }
    if (!prompt || prompt.length < 3) {
      alert('Please select a character or enter a custom transformation!');
      return;
    }

    this.showLoadingScreen();

    try {
      const response = await fetch('/api/transform/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: this.capturedImage, prompt, character: this.selectedCharacter }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Transformation failed');
      }

      const result = await response.json();
      if (result.success && result.image_url) {
        this.transformedImage = result.data_url
        outputimage = result.real_url;
        this.showResultScreen();
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('character-screen').style.display = 'none';
        document.getElementById("camera-screen").style.display = "none";
        document.getElementById("result-screen").style.display = "flex";

      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Transformation error:', error);
      alert(`Transformation failed: ${error.message}`);
      this.setActiveScreen('character');
    }
  }

  /* ---------- Loading / Result ---------- */
  showLoadingScreen() {
    this.setActiveScreen('loading');
    if (this.loadingInterval) clearInterval(this.loadingInterval);
    let i = 0;
    const el = document.getElementById('loading-message');
    this.loadingInterval = setInterval(() => {
      // random message
      const msg = this.loadingMessages[Math.floor(Math.random() * this.loadingMessages.length)];
      el.textContent = msg;
      i++;
    }, 2000);
  }

  showResultScreen() {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
      this.loadingInterval = null;
    }
    const resultImg = document.getElementById('result-image');
    resultImg.src = this.transformedImage;
    this.setActiveScreen('result');
  }

  /* ---------- Share modal ---------- */
  showShareModal() {
    const modal = document.getElementById('share-modal');
    const shareImg = document.getElementById('share-image');
    const shareLink = document.getElementById('share-link');
    const qrCode = document.getElementById('qr-code');

    shareImg.src = outputimage;
    shareLink.value = outputimage;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(outputimage)}&size=150x150`;
    qrCode.src = qrUrl;

    modal.style.display = 'flex';
  }

  hideShareModal() {
    document.getElementById('share-modal').style.display = 'none';
  }

  async sendEmail() {
    const email = document.getElementById('email-input').value;
    if (!email) { alert('Please enter an email address.'); return; }
    if (!this.isValidEmail(email)) { alert('Please enter a valid email address.'); return; }

    let linktosend = this.transformedImage;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          imageUrl: linktosend
        }),
      });

      if (response.ok) {
        alert('Email sent successfully! 📧');
        document.getElementById('email-input').value = '';
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to send email. Please try again.');
    }
  }

  copyLink() {
    const linkInput = document.getElementById('share-link');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      alert('Link copied to clipboard! 📋');
    } catch (error) {
      console.error('Copy error:', error);
      alert('Failed to copy link. Please copy manually.');
    }
  }

  downloadImage() {
    if (!this.transformedImage) return;
    const link = document.createElement('a');
    link.href = this.transformedImage;
    link.download = `magic-transformation-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /* ---------- Errors & reset ---------- */
  showError(message) {
    const errorDiv = document.getElementById('camera-error');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorDiv.style.display = 'flex';
  }

  hideError() {
    document.getElementById('camera-error').style.display = 'none';
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  resetApp() {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
      this.loadingInterval = null;
    }
    this.stopCamera();

    this.capturedImage = null;
    this.selectedCharacter = '';
    this.customPrompt = '';
    this.transformedImage = null;
    this.facingMode = 'user';

    document.getElementById('custom-prompt').value = '';
    const emailInput = document.getElementById('email-input');
    if (emailInput) emailInput.value = '';

    document.querySelectorAll('.character-btn').forEach(btn => btn.classList.remove('selected'));
    this.hideShareModal();
    this.setActiveScreen('welcome');
  }
}

/* Initialize app when DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MagicFaceTransform();
});

/* Stop camera when hidden */
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.app && window.app.stream) {
    window.app.stopCamera();
  }
});

/* Stop camera on unload */
window.addEventListener('beforeunload', () => {
  if (window.app && window.app.stream) {
    window.app.stopCamera();
  }
});
