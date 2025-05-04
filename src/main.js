async function loadCarpets() {
  let res;
  try {
    // Always use base-relative path for production and dev
    res = await fetch('/ARCarpet/src/data/carpets.json');
    if (!res.ok) throw new Error('Not found');
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
  } catch (e) {
    const container = document.getElementById('list');
    container.innerHTML = `<div style="color:red;text-align:center;">Failed to load carpets. Make sure <code>src/data/carpets.json</code> exists and is accessible.<br>${e.message}</div>`;
  }
}

loadCarpets();