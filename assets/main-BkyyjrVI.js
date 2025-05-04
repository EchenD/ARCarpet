import{l as e,r as s}from"./dataService-BF1Cczdg.js";async function l(){const i=document.getElementById("list");try{const a=await e();i.innerHTML=a.map(t=>`
            <div class="card">
                <img class="carpet-thumb" src="${t.thumbnail}" 
                     alt="${t.title} thumbnail" loading="lazy" />
                <div class="card-content">
                    <h2>${t.title}</h2>
                    <p>${t.description}</p>
                    <a class="ar-btn" href="${s("detail.html")}?id=${t.id}">View Details</a>
                </div>
            </div>
        `).join(""),a.forEach(t=>{const n=new Image;n.src=t.thumbnail})}catch(a){i.innerHTML=`
            <div class="error-message">
                <p>${a.message}</p>
                <button onclick="window.location.reload()">Try Again</button>
            </div>`}}l();
