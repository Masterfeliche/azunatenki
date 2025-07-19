// Audio Player functionality for AZU website

class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentTrack = null;
        this.isPlaying = false;
        this.playlist = [];
        this.currentIndex = 0;
        this.volume = 0.5;
        
        this.initializePlayer();
        this.setupEventListeners();
    }
    
    initializePlayer() {
        this.audio.volume = this.volume;
        this.audio.preload = 'metadata';
        
        // Get player elements
        this.playerElement = document.getElementById('audio-player');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.progressSlider = document.getElementById('progress-slider');
        this.volumeSlider = document.getElementById('volume-slider');
        this.progressBar = document.getElementById('progress-bar');
        this.currentTimeEl = document.getElementById('current-time');
        this.totalTimeEl = document.getElementById('total-time');
        this.playerTitle = document.getElementById('player-title');
        this.playerArtist = document.getElementById('player-artist');
        this.playerArtwork = document.getElementById('player-artwork');
        this.playIcon = document.getElementById('play-icon');
        this.pauseIcon = document.getElementById('pause-icon');
    }
    
    setupEventListeners() {
        // Audio events
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.next());
        this.audio.addEventListener('error', (e) => this.handleError(e));
        this.audio.addEventListener('loadstart', () => this.showLoading());
        this.audio.addEventListener('canplay', () => this.hideLoading());
        
        // Control events
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previous());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        if (this.progressSlider) {
            this.progressSlider.addEventListener('input', (e) => this.seek(e.target.value));
        }
        
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    loadTrack(track, playlist = null, index = 0) {
        this.currentTrack = track;
        
        if (playlist) {
            this.playlist = playlist;
            this.currentIndex = index;
        }
        
        this.audio.src = track.audioUrl;
        this.updatePlayerUI();
        this.showPlayer();
        
        return new Promise((resolve, reject) => {
            this.audio.addEventListener('canplay', resolve, { once: true });
            this.audio.addEventListener('error', reject, { once: true });
        });
    }
    
    play() {
        if (!this.currentTrack) return;
        
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
        }).catch(error => {
            console.error('Error playing audio:', error);
            this.handleError(error);
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    next() {
        if (this.playlist.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        const nextTrack = this.playlist[this.currentIndex];
        this.loadTrack(nextTrack, this.playlist, this.currentIndex).then(() => {
            if (this.isPlaying) {
                this.play();
            }
        });
    }
    
    previous() {
        if (this.playlist.length === 0) return;
        
        this.currentIndex = this.currentIndex === 0 ? this.playlist.length - 1 : this.currentIndex - 1;
        const prevTrack = this.playlist[this.currentIndex];
        this.loadTrack(prevTrack, this.playlist, this.currentIndex).then(() => {
            if (this.isPlaying) {
                this.play();
            }
        });
    }
    
    seek(percentage) {
        if (this.audio.duration) {
            this.audio.currentTime = (percentage / 100) * this.audio.duration;
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.audio.volume = this.volume;
        
        if (this.volumeSlider) {
            this.volumeSlider.value = this.volume * 100;
        }
    }
    
    updatePlayerUI() {
        if (!this.currentTrack) return;
        
        if (this.playerTitle) {
            this.playerTitle.textContent = this.currentTrack.title;
        }
        
        if (this.playerArtist) {
            this.playerArtist.textContent = this.currentTrack.artist || 'AZU';
        }
        
        if (this.playerArtwork && this.currentTrack.artwork) {
            this.playerArtwork.innerHTML = `
                <img src="${this.currentTrack.artwork}" alt="${this.currentTrack.title}" class="w-full h-full object-cover rounded-md">
            `;
        }
    }
    
    updatePlayButton() {
        if (this.playIcon && this.pauseIcon) {
            if (this.isPlaying) {
                this.playIcon.classList.add('hidden');
                this.pauseIcon.classList.remove('hidden');
            } else {
                this.playIcon.classList.remove('hidden');
                this.pauseIcon.classList.add('hidden');
            }
        }
    }
    
    updateProgress() {
        if (!this.audio.duration) return;
        
        const percentage = (this.audio.currentTime / this.audio.duration) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${percentage}%`;
        }
        
        if (this.progressSlider) {
            this.progressSlider.value = percentage;
        }
        
        if (this.currentTimeEl) {
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        if (this.totalTimeEl && this.audio.duration) {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
        }
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    showPlayer() {
        if (this.playerElement) {
            this.playerElement.classList.remove('hidden');
        }
    }
    
    hidePlayer() {
        if (this.playerElement) {
            this.playerElement.classList.add('hidden');
        }
    }
    
    showLoading() {
        // Add loading indicator if needed
        console.log('Loading audio...');
    }
    
    hideLoading() {
        // Remove loading indicator if needed
        console.log('Audio loaded');
    }
    
    handleError(error) {
        console.error('Audio player error:', error);
        
        // Show error notification
        if (window.showNotification) {
            window.showNotification('Error playing audio. Please try again.', 'error');
        }
        
        // Reset player state
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    handleKeyboard(event) {
        // Only handle keyboard shortcuts when not typing in input fields
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                this.previous();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.next();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.setVolume(this.volume + 0.1);
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.setVolume(this.volume - 0.1);
                break;
        }
    }
}

// Initialize audio player when DOM is loaded
let audioPlayer;

document.addEventListener('DOMContentLoaded', function() {
    audioPlayer = new AudioPlayer();
});

// Global functions to be called from other scripts
window.playTrack = function(albumId, trackIndex) {
    // This will be implemented when content is loaded
    console.log('Play track called:', albumId, trackIndex);
};

window.playAlbum = function(albumId) {
    // This will be implemented when content is loaded
    console.log('Play album called:', albumId);
};