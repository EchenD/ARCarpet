import carpets from './data/carpets.json' assert { type: 'json' };

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

function renderGallery(images) {
    galleryEl.innerHTML = images.map((img, i) => `
    <img src="${img}" class="gallery-img${i === selectedImgIdx ? ' selected' : ''}" data-idx="${i}" alt="Carpet image ${i + 1}" loading="lazy" tabindex="0" />
  `).join('');
    // Preload all gallery images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    galleryEl.querySelectorAll('.gallery-img').forEach(imgEl => {
        imgEl.onclick = () => {
            selectedImgIdx = Number(imgEl.dataset.idx);
            renderGallery(images);
        };
        imgEl.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                selectedImgIdx = Number(imgEl.dataset.idx);
                renderGallery(images);
            }
        };
    });
}

function loadCarpet(i) {
    const c = carpets[i];
    titleEl.textContent = c.title;
    descEl.textContent = c.description;
    renderGallery(c.gallery || []);
    mv.src = c.glb;
    mv.setAttribute('ios-src', c.usdz);
    mv.style.display = 'none';
}

showArBtn.addEventListener('click', () => {
    mv.style.display = '';
    mv.activateAR && mv.activateAR();
    showArBtn.style.display = 'none';
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
