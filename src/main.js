import { loadCarpets } from './services/dataService.js';

async function init() {
  const container = document.getElementById('list');
  try {
    const carpets = await loadCarpets();

    container.innerHTML = carpets.map(c => `
            <div class="card">
                <img class="carpet-thumb" src="${c.thumbnail}" 
                     alt="${c.title} thumbnail" loading="lazy" />
                <div class="card-content">
                    <h2>${c.title}</h2>
                    <p>${c.description}</p>
                    <a class="ar-btn" href="detail.html?id=${c.id}">View Details</a>
                </div>
            </div>
        `).join('');

    // Preload thumbnails
    carpets.forEach(c => {
      const img = new Image();
      img.src = c.thumbnail;
    });
  } catch (e) {
    container.innerHTML = `
            <div class="error-message">
                <p>${e.message}</p>
                <button onclick="window.location.reload()">Try Again</button>
            </div>`;
  }
}

init();