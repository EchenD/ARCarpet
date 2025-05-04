import carpets from './data/carpets.json' assert { type: 'json' };
import { isARSupported } from './utils/arCheck.js';

const params = new URLSearchParams(location.search);
let idx = carpets.findIndex(c => c.id === params.get('id'));
if (idx < 0) idx = 0;

const mv = document.getElementById('ar-viewer');
const titleEl = document.getElementById('title');
const descEl = document.getElementById('desc');
const galleryEl = document.getElementById('gallery');
const showArBtn = document.getElementById('show-ar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let selectedImgIdx = 0;

const previewEl = document.createElement('div');
previewEl.id = 'preview';
galleryEl.parentNode.insertBefore(previewEl, galleryEl);

function renderGallery(images) {
    if (!images.length) return;

    // Render preview
    previewEl.innerHTML = `
        <div class="preview-container">
            <img src="${images[selectedImgIdx]}" class="preview-img" alt="Selected carpet preview" />
            ${images.length > 1 ? `
                <button class="preview-nav prev" aria-label="Previous image">‹</button>
                <button class="preview-nav next" aria-label="Next image">›</button>
            ` : ''}
        </div>
    `;

    // Render thumbnails
    galleryEl.innerHTML = images.map((img, i) => `
        <button class="thumb-btn${i === selectedImgIdx ? ' selected' : ''}" data-idx="${i}">
            <img src="${img}" class="thumb-img" alt="Carpet thumbnail ${i + 1}" loading="lazy" />
        </button>
    `).join('');

    // Preload images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Event handlers
    const navigateGallery = (direction) => {
        const newIdx = (selectedImgIdx + direction + images.length) % images.length;
        selectedImgIdx = newIdx;
        renderGallery(images);
    };

    // Preview navigation
    if (images.length > 1) {
        previewEl.querySelector('.preview-nav.prev').onclick = () => navigateGallery(-1);
        previewEl.querySelector('.preview-nav.next').onclick = () => navigateGallery(1);
    }

    // Thumbnail clicks
    galleryEl.querySelectorAll('.thumb-btn').forEach(btn => {
        btn.onclick = () => {
            selectedImgIdx = Number(btn.dataset.idx);
            renderGallery(images);
        };
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') navigateGallery(-1);
        if (e.key === 'ArrowRight') navigateGallery(1);
    });

    // Touch swipe support
    let touchStartX = 0;
    previewEl.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    previewEl.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
            navigateGallery(diff > 0 ? -1 : 1);
        }
    }, { passive: true });
}

async function loadCarpet(i) {
    const c = carpets[i];
    titleEl.textContent = c.title;
    descEl.textContent = c.description;
    renderGallery(c.gallery || []);

    // Check AR support before showing button
    const arSupported = await isARSupported();
    showArBtn.style.display = arSupported ? 'inline-flex' : 'none';

    // Setup model viewer with error handling
    mv.style.display = 'none';
    mv.src = c.glb;
    mv.setAttribute('ios-src', c.usdz);

    // Add error handling for model loading
    mv.addEventListener('error', (error) => {
        console.error('Error loading model:', error);
        showArBtn.style.display = 'none';
    }, { once: true });
}

showArBtn.addEventListener('click', async () => {
    try {
        showArBtn.classList.add('loading');
        mv.style.display = '';

        // Wait for model to load before activating AR
        await new Promise((resolve) => {
            mv.addEventListener('load', resolve, { once: true });
        });

        if (mv.activateAR) {
            await mv.activateAR();
        }
    } catch (error) {
        console.error('Error activating AR:', error);
        mv.style.display = 'none';
    } finally {
        showArBtn.classList.remove('loading');
        showArBtn.style.display = 'none';
    }
});

prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + carpets.length) % carpets.length;
    selectedImgIdx = 0;
    showArBtn.style.display = '';
    loadCarpet(idx);
});

nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % carpets.length;
    selectedImgIdx = 0;
    showArBtn.style.display = '';
    loadCarpet(idx);
});

loadCarpet(idx);
