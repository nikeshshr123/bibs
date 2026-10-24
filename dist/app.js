'use strict';
const screens = ['invite', 'accepted', 'game', 'finale'];
const byId = id => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let dodgeCount = 0;

function showScreen(name) {
  screens.forEach(id => { byId(id).hidden = id !== name; });
  document.body.classList.toggle('night', name === 'finale');
  const step = screens.indexOf(name);
  document.querySelectorAll('.progress i').forEach((dot, index) => dot.classList.toggle('active', index === step));
  document.querySelector('.progress').setAttribute('aria-label', `Step ${step + 1} of 4`);
  window.scrollTo({ top: 0, behavior: 'instant' });
  const heading = byId(name).querySelector('h1');
  if (heading.hasAttribute('tabindex')) heading.focus({ preventScroll: true });
}

function dodgeNo() {
  const button = byId('no');
  const area = byId('choice-area');
  const maxX = Math.max(0, area.clientWidth - button.offsetWidth);
  // Alternate sides and rows so every dodge is visible, and stay inside the letter.
  const positions = [{ x: 0, y: 53 }, { x: maxX, y: 53 }, { x: maxX, y: 0 }];
  const position = positions[dodgeCount % positions.length];
  button.style.position = 'absolute';
  button.style.left = `${position.x}px`;
  button.style.top = `${position.y}px`;
  dodgeCount++;
  const messages = ['Oh! That button has butterflies too.', 'A little shy… just like me.', 'Looks like “No” has other plans.'];
  byId('no-hint').textContent = messages[(dodgeCount - 1) % messages.length];
}

byId('no').addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') dodgeNo(); });
byId('no').addEventListener('click', dodgeNo);
window.addEventListener('resize', () => {
  if (!dodgeCount) return;
  const button = byId('no');
  button.style.left = `${Math.min(parseFloat(button.style.left) || 0, Math.max(0, byId('choice-area').clientWidth - button.offsetWidth))}px`;
});

function celebrate() {
  if (reducedMotion) return;
  for (let i = 0; i < 45; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.cssText = `left:${Math.random() * 100}%;background:${['#a84253', '#dba6aa', '#cfb47e', '#ead0b9'][i % 4]};animation-delay:${Math.random() * .7}s;--drift:${Math.random() * 160 - 80}px;border-radius:${i % 2 ? '50%' : '2px'}`;
    byId('confetti').appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

byId('yes').addEventListener('click', () => { showScreen('accepted'); celebrate(); });
byId('to-game').addEventListener('click', () => showScreen('game'));

function soulmateInitial(value, random = Math.random) {
  const first = value.trim().toUpperCase().charAt(0);
  return first === 'B' ? 'N' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(random() * 26)];
}

byId('initial-form').addEventListener('submit', event => {
  event.preventDefault();
  const value = byId('initial').value.trim();
  if (!/\p{L}/u.test(value.charAt(0))) {
    byId('input-error').textContent = 'A little hint: start with a letter from your name.';
    byId('initial').setAttribute('aria-invalid', 'true');
    byId('initial').focus();
    return;
  }
  byId('input-error').textContent = '';
  byId('initial').removeAttribute('aria-invalid');
  const initial = soulmateInitial(value);
  byId('result-initial').textContent = initial;
  byId('romantic-quote').textContent = `“${initial} will be the moon to your midnight, the calm in your chaos, and one more reason to believe in love.”`;
  showScreen('finale');
});

byId('again').addEventListener('click', () => { showScreen('game'); byId('initial').focus(); byId('initial').select(); });

for (let i = 0; i < 65; i++) {
  const star = document.createElement('i');
  star.className = 'star';
  const size = i % 5 === 0 ? 3 : 1.5;
  star.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;opacity:${.2 + Math.random() * .6};animation-delay:${Math.random() * 4}s`;
  byId('stars').appendChild(star);
}
