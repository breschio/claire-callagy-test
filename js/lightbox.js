class Lightbox {
    constructor() {
        this.createLightbox();
        this.currentIndex = 0;
        this.images = [];
        this.category = '';
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.bindEvents();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">
                <span class="lnr lnr-cross"></span>
            </button>
            <button class="lightbox-nav lightbox-prev">
                <span class="lnr lnr-chevron-left"></span>
            </button>
            <button class="lightbox-nav lightbox-next">
                <span class="lnr lnr-chevron-right"></span>
            </button>
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
            </div>
            <div class="lightbox-dots"></div>
        `;
        document.body.appendChild(lightbox);
        
        this.element = lightbox;
        this.image = lightbox.querySelector('.lightbox-image');
        this.dotsContainer = lightbox.querySelector('.lightbox-dots');
    }

    bindEvents() {
        // Close button
        this.element.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        
        // Navigation buttons
        this.element.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        this.element.querySelector('.lightbox-next').addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.element.classList.contains('is-open')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch events for mobile
        this.element.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        this.element.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Bind click events to all gallery images
        document.querySelectorAll('.masonry-item img, .gallery-image img').forEach(img => {
            img.addEventListener('click', () => this.open(img));
        });
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                this.prev();
            } else {
                this.next();
            }
        }
    }

    open(clickedImg) {
        // Get category and all related images
        const parent = clickedImg.closest('[data-category]');
        this.category = parent ? parent.dataset.category : '';
        
        // Get all images from the same category
        this.images = Array.from(document.querySelectorAll(`[data-category="${this.category}"] img`));
        this.currentIndex = this.images.indexOf(clickedImg);
        
        // Show the image
        this.showImage();
        this.element.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.element.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage();
    }

    updateDots() {
        this.dotsContainer.innerHTML = '';
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `lightbox-dot${index === this.currentIndex ? ' active' : ''}`;
            this.dotsContainer.appendChild(dot);
        });
    }

    showImage() {
        const img = this.images[this.currentIndex];
        
        // Create a temporary image to preload
        const tempImage = new Image();
        tempImage.src = img.src;
        
        // Fade out current image
        this.image.style.opacity = '0';
        
        // Update dots
        this.updateDots();
        
        // Once new image is loaded, fade it in
        tempImage.onload = () => {
            setTimeout(() => {
                this.image.src = img.src;
                this.image.alt = img.alt;
                this.image.style.opacity = '1';
            }, 200);
        };
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
}); 