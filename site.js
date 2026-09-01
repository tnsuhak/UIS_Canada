const b=document.getElementById('burger'),m=document.getElementById('menu');
if(b&&m){b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.textContent=o?'✕':'☰'});}
