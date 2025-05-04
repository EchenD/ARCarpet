import './styles.css';

async function loadCarpets() {
  const res = await fetch('/src/data/carpets.json', { cache: 'force-cache' });
  const carpets = await res.json();
  const container = document.getElementById('list');
  container.innerHTML = carpets.map(c => `
    <div class="card">
      <img class="carpet-thumb" src="${c.thumbnail}" alt="${c.title} thumbnail" loading="lazy" />
      <div class="card-content">
        <h2>${c.title}</h2>
        <p>${c.description}</p>
        <a class="ar-btn" href="detail.html?id=${c.id}">View Details</a>
      </div>
    </div>
  `).join('');
  // Preload thumbnails in the background for better UX
  carpets.forEach(c => {
    const img = new Image();
    img.src = c.thumbnail;
  });
}

loadCarpets();