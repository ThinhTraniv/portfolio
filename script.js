const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu')}));const dialog=document.querySelector('dialog');document.querySelector('#open-research').addEventListener('click',()=>dialog.showModal());document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>document.body.style.overflow='');dialog.addEventListener('toggle',()=>{document.body.style.overflow=dialog.open?'hidden':''});const svg=document.querySelector('#candles'),ns='http://www.w3.org/2000/svg';function el(tag,attrs){const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));svg.append(n)}for(let y=80;y<700;y+=100)el('line',{x1:0,y1:y,x2:1400,y2:y,stroke:'#345562','stroke-width':.5});for(let x=0;x<1400;x+=100)el('line',{x1:x,y1:0,x2:x,y2:700,stroke:'#345562','stroke-width':.5});let last=540;for(let i=0;i<49;i++){const x=480+i*21;const delta=Math.sin(i*1.9)*39-7;const next=Math.max(90,Math.min(590,last+delta));const top=Math.min(last,next),h=Math.max(Math.abs(delta),5),color=delta<0?'#4d9caa':'#345d72';el('line',{x1:x,y1:top-12-(i%4)*5,x2:x,y2:top+h+15,stroke:color,'stroke-width':1.5});el('rect',{x:x-5,y:top,width:10,height:h,fill:color});last=next}document.querySelectorAll('a[target="_blank"]').forEach(a=>{a.title=(a.getAttribute('aria-label')||a.textContent.trim())+' (opens in a new tab)'});

const snapshotDialog = document.querySelector('#snapshot-dialog');
document.querySelector('.snapshot-zoom').addEventListener('click', () => {
  const image = snapshotDialog.querySelector('img');
  if (!image.hasAttribute('src')) image.src = image.dataset.src;
  snapshotDialog.showModal();
  document.body.style.overflow = 'hidden';
});
document.querySelector('.snapshot-close').addEventListener('click', () => snapshotDialog.close());
snapshotDialog.addEventListener('close', () => { document.body.style.overflow = ''; });
snapshotDialog.addEventListener('click', event => {
  if (event.target !== snapshotDialog) return;
  const bounds = snapshotDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) snapshotDialog.close();
});

// Experience and research recognition gallery.
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const gallerySource = document.querySelector('#gallery-source');
const galleryPrevious = document.querySelector('#gallery-prev');
const galleryNext = document.querySelector('#gallery-next');
let galleryItems = [];
let galleryIndex = 0;
function renderGalleryPhoto() {
  const item = galleryItems[galleryIndex];
  galleryImage.src = item.dataset.full;
  galleryImage.alt = item.dataset.caption;
  document.querySelector('#gallery-caption').textContent = item.dataset.caption;
  document.querySelector('#gallery-credit').textContent = item.dataset.credit;
  document.querySelector('#gallery-position').textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
  gallerySource.hidden = !item.dataset.source;
  if (item.dataset.source) gallerySource.href = item.dataset.source;
  else gallerySource.removeAttribute('href');
  galleryPrevious.disabled = galleryIndex === 0;
  galleryNext.disabled = galleryIndex === galleryItems.length - 1;
}
document.querySelectorAll('.gallery-photo').forEach(button => {
  button.addEventListener('click', () => {
    galleryItems = [...document.querySelectorAll('.gallery-photo')].filter(item => item.dataset.gallery === button.dataset.gallery);
    galleryIndex = galleryItems.indexOf(button);
    renderGalleryPhoto();
    galleryDialog.showModal();
  });
});
galleryPrevious.addEventListener('click', () => { if (galleryIndex > 0) { galleryIndex--; renderGalleryPhoto(); } });
galleryNext.addEventListener('click', () => { if (galleryIndex < galleryItems.length - 1) { galleryIndex++; renderGalleryPhoto(); } });
document.querySelector('#gallery-close').addEventListener('click', () => galleryDialog.close());
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); galleryPrevious.click(); }
  if (event.key === 'ArrowRight') { event.preventDefault(); galleryNext.click(); }
});
galleryDialog.addEventListener('click', event => {
  if (event.target !== galleryDialog) return;
  const bounds = galleryDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) galleryDialog.close();
});
