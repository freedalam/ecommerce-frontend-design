function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  document.getElementById('toastIcon').textContent = icon;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}


function switchImg(thumbEl, src) {

  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');

  const main = document.getElementById('mainImg');
  main.style.opacity = '0.4';
  main.style.transform = 'scale(0.97)';
  setTimeout(() => {
    main.src = src;
    main.style.opacity = '1';
    main.style.transform = 'scale(1)';
  }, 150);
}

const mainImg = document.getElementById('mainImg');
if (mainImg) {
  mainImg.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
}


function openTab(event, tabId) {

  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
 
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');

  event.currentTarget.classList.add('active');
}


let selectedRating = 0;

function setRating(rating) {
  selectedRating = rating;
  const stars = document.querySelectorAll('#starInput span');
  stars.forEach((s, i) => {
    s.classList.toggle('lit', i < rating);
  });
}

const starInputEl = document.getElementById('starInput');
if (starInputEl) {
  const stars = starInputEl.querySelectorAll('span');
  stars.forEach((star, i) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, j) => s.style.color = j <= i ? '#FFAD33' : '#E0E0E0');
    });
    star.addEventListener('mouseout', () => {
      stars.forEach((s, j) => s.style.color = j < selectedRating ? '#FFAD33' : '#E0E0E0');
    });
  });
}

function submitReview() {
  const name  = document.getElementById('reviewName').value.trim();
  const email = document.getElementById('reviewEmail').value.trim();
  const text  = document.getElementById('reviewText').value.trim();

  if (selectedRating === 0) { showToast('Please select a star rating!', '⚠️'); return; }
  if (!name)  { showToast('Please enter your name!', '⚠️'); return; }
  if (!text)  { showToast('Please write your review!', '⚠️'); return; }

  const reviewList = document.querySelector('.review-list');
  const starStr = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const colors = ['#2563EB','#FF7B24','#00B517','#E53935','#9C27B0'];
  const color  = colors[Math.floor(Math.random() * colors.length)];

  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="review-card-top">
      <div class="reviewer-info">
        <div class="reviewer-avatar" style="background:${color};">${name.charAt(0).toUpperCase()}</div>
        <div>
          <div class="reviewer-name">${name}</div>
          <div class="reviewer-date">${dateStr}</div>
        </div>
      </div>
      <span class="review-stars" style="color:#FFAD33;">${starStr}</span>
    </div>
    <p class="review-text">${text}</p>
    <div class="review-helpful">Was this helpful?
      <button class="helpful-btn" onclick="markHelpful(this)">👍 Yes (0)</button>
      <button class="helpful-btn">👎 No (0)</button>
    </div>`;
  reviewList.prepend(card);

  
  selectedRating = 0;
  document.querySelectorAll('#starInput span').forEach(s => { s.classList.remove('lit'); s.style.color = '#E0E0E0'; });
  ['reviewName','reviewEmail','reviewTitle','reviewText'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });

  showToast('Review submitted! Thank you 🎉', '✓');
}


function markHelpful(btn) {
  const m = btn.textContent.match(/\((\d+)\)/);
  if (m) {
    btn.textContent = `👍 Yes (${parseInt(m[1]) + 1})`;
    btn.style.borderColor = '#2563EB';
    btn.style.color = '#2563EB';
    btn.disabled = true;
    btn.style.cursor = 'default';
    showToast('Thanks for your feedback!', '✓');
  }
}

let isSaved = false;
function toggleSave(el) {
  isSaved = !isSaved;
  const icon = document.getElementById('saveIcon');
  const text = document.getElementById('saveText');
  if (isSaved) {
    icon.style.stroke = '#E53935';
    icon.style.fill = '#E53935';
    text.textContent = 'Saved!';
    el.style.color = '#E53935';
    showToast('Saved for later!', '❤️');
  } else {
    icon.style.stroke = '';
    icon.style.fill = '';
    text.textContent = 'Save for later';
    el.style.color = '';
    showToast('Removed from saved', '✓');
  }
}

function handleSize(select) {
  const val = select.value;
  if (val) showToast(`Size selected: ${val}`, '✓');
}

function handleCustomization(select) {
  const val = select.options[select.selectedIndex].text;
  if (val) showToast(`Customization: ${val}`, '✓');
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#') e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});


const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') window.location.href = 'products.html';
  });
}

function subscribeNl() {
  const e = document.getElementById('nlEmail').value.trim();
  if (!e || !e.includes('@')) { showToast('Please enter a valid email!', '⚠️'); return; }
  showToast('Subscribed successfully! 🎉', '✓');
  document.getElementById('nlEmail').value = '';
}

console.log('✅ Week 3 — Product Details JS loaded successfully!');
console.log('Browser:', navigator.userAgent.split(') ')[0].split('(')[1]);
