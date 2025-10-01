// Love Birthday Site — script.js
// =====================================================
// QUICK EDIT CONTENT — change these values to customize
// =====================================================
const CONTENT = {
  herName: "[Srija]",             // <-- her name
  yourName: "[Vishal]",       // <-- your name (footer)
  birthdayISO: "2025-10-02",     // <-- YYYY-MM-DD (00:00 local)
  heroSub: "I’m so lucky to celebrate you today.",

  timeline: [
    { icon: "💬", title: "First Message", text: "Everything begins with you." },
    { icon: "🍰", title: "First Date", text: "Laughs, shy smiles, and sweet memories." },
    { icon: "✈️", title: "Favorite Trip", text: "You, me, and the open road." },
    { icon: "🎬", title: "Inside Joke", text: "I used to say you gudda, You used to think something bad." },
    { icon: "🌅", title: "A Perfect Sunset", text: "Everything felt just right in your arms." },
    { icon: "💍", title: "Dreams", text: "My dream is to own a beautiful life with you." },
  ],

  reasons: [
    "You brought hopes in my life, I never felt this much confident.",
    "You make ordinary days feel special.",
    "Your pretty baby face is my weakness.",
    "We can be silly together.",
    "You listen with your heart.",
    "Your laugh is my favorite sound.",
    "You believe in me.",
    "You make me want to be better.",
    "You are my strength, that no one can take away.",
    "Why you are soo perfect."
  ],

  loveNotes: [
    "You’re my favorite person."
  ],

  letter: "Hey my love, officially 23 aah! Cheers to 23. You know I can't beleive like when I met you, you were 21 now 23 time flew very fast. I saw srija in different moods different avatars. I still remember when we didn't have bike. Our buildings were different. I used to come there to see you go with you to pg. I used to wait in cafeteria.  We used to talk and laugh in same time. I can still feel that jealousy, I used to get when anyone used to talk with you and you used to ignore me. But fine I had feelings at that time. Then we started going to temple. Those auto rides were very refreshing or I can say my best auto rides in my life. Then we came into relationship. So many things changed. I know i hurted you alot but I love you the most as well. You are my strength. I will never say you are my weakness, You only gave me strength to do all. I learnt soo much things because of you. I gained confidence. I am sorry for the pain I have given you in the entire life. But I really  love you. Howmuch I fight with you but I can't imagine next day without you now. I love you meri sharuu, your gifts are waiting with me. I am angry on you as well because you are not here to celebrate birthday with me. I don't know but i am angry on you because of this okay pullu :). I love you my bujjikonda meri pyari sharu meri guddu meri srinagaja meri srija meri love."
};

// =====================================================
// Utility helpers
// =====================================================
const $$ = sel => document.querySelector(sel);
const $$$ = sel => Array.from(document.querySelectorAll(sel));

function prefersReducedMotion(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Lightweight confetti (no external file): launches a handful of hearts
function confettiHearts(duration = 900, count = 24){
  const container = document.body;
  const frag = document.createDocumentFragment();
  const start = performance.now();

  for(let i=0;i<count;i++){
    const span = document.createElement('span');
    span.textContent = '❤';
    span.setAttribute('aria-hidden','true');
    span.style.position = 'fixed';
    span.style.left = Math.random()*100 + 'vw';
    span.style.top = '-2rem';
    span.style.fontSize = (Math.random()*16 + 12) + 'px';
    span.style.opacity = '0.9';
    span.style.pointerEvents = 'none';
    span.style.transition = 'transform .9s linear, opacity .9s linear';
    frag.appendChild(span);
    requestAnimationFrame(()=>{
      span.style.transform = `translateY(${window.innerHeight + 60}px) rotate(${Math.random()*180-90}deg)`;
      span.style.opacity = '0';
    });
  }
  container.appendChild(frag);
  setTimeout(()=> $$$('body > span').forEach(s => s.remove()), duration+400);
}

// =====================================================
// Init content
// =====================================================
window.addEventListener('DOMContentLoaded', () => {
  // Insert basic content
  $('#her-name').textContent = CONTENT.herName;
  $('#yourName').textContent = CONTENT.yourName;
  $('#heroSub').textContent = CONTENT.heroSub;

  // Countdown
  updateCountdown();
  setInterval(updateCountdown, 1000 * 30); // update every 30s

  // Timeline
  const tl = $('#timelineList');
  CONTENT.timeline.forEach((t, idx)=>{
    const li = document.createElement('li');
    li.style.animationDelay = (idx * 0.07) + 's';
    li.innerHTML = `<div class="icon" aria-hidden="true">${t.icon}</div>
      <div><h3 style="margin:.15rem 0 .25rem">${t.title}</h3><p style="margin:0">${t.text}</p></div>`;
    tl.appendChild(li);
  });

  // Reasons
  const rl = $('#reasonsList');
  CONTENT.reasons.forEach(text=>{
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.innerHTML = `<span>${text}</span><span class="pop" aria-hidden="true">💖</span>`;
    rl.appendChild(li);
  });

  // Gallery lightbox
  setupLightbox();

  // Carousel
  setupCarousel();

  // Letter toggle
  const toggle = $('#toggleLetter');
  toggle.addEventListener('click', () => {
    const body = $('#letterBody');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    body.hidden = expanded;
    if(!expanded){
      $('#letterText').textContent = CONTENT.letter;
      if(!prefersReducedMotion()) confettiHearts();
    }
  });

  // CTA
  $('#ctaSurprise').addEventListener('click', () => {
    if(!prefersReducedMotion()) confettiHearts();
    document.getElementById('countdownSection').scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
  });

  // Audio controls (no autoplay)
  const audio = $('#bgm');
  const audioToggle = $('#audioToggle');
  const saved = localStorage.getItem('bgm-playing') === 'true';
  let playing = false;

  function setButton(){
    audioToggle.textContent = playing ? 'Pause' : 'Play';
    audioToggle.setAttribute('aria-pressed', String(playing));
    audioToggle.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    audioToggle.title = playing ? 'Pause music' : 'Play music';
  }
  setButton();

  if(saved){ // restore user choice
    audio.load();
    audio.play().then(()=>{ playing = true; setButton(); }).catch(()=>{});
  }

  audioToggle.addEventListener('click', async ()=>{
    if(playing){ audio.pause(); playing = false; }
    else{
      audio.load();
      try{ await audio.play(); playing = true; } catch(e){ /* autoplay blocked until user gesture */ }
    }
    localStorage.setItem('bgm-playing', String(playing));
    setButton();
  });

  // Share button
  $('#shareBtn').addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: 'A little birthday surprise 💖',
      url: window.location.href
    };
    try{
      if(navigator.share){ await navigator.share(shareData); }
      else{
        const url = encodeURIComponent(shareData.url);
        const text = encodeURIComponent(shareData.text);
        const tw = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        const wa = `https://wa.me/?text=${text}%20${url}`;
        alert('Sharing not supported. Try these:\nTwitter: ' + tw + '\nWhatsApp: ' + wa);
      }
    }catch{ /* user cancelled */ }
  });

  // Konami code Easter egg
  setupKonami();

  // Letter content
  $('#letterText').textContent = CONTENT.letter;
});

// Small query helper
function $(sel){ return document.querySelector(sel); }

// Countdown logic
function updateCountdown(){
  const now = new Date();
  const target = new Date(CONTENT.birthdayISO + 'T00:00:00');
  const el = $('#countdownText');

  const diff = target - now;
  if(diff > 0){
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    el.textContent = `Only ${days}d ${hours}h ${mins}m to go!`;
  } else {
    // Passed or today
    const today = new Date();
    const targetDay = new Date(CONTENT.birthdayISO + 'T00:00:00');
    if(today.toDateString() === targetDay.toDateString()){
      el.textContent = "Today’s Your Day!";
    } else {
      el.textContent = "Another year of love together 💖";
    }
  }
}

// Lightbox
function setupLightbox(){
  const dialog = $('#lightbox');
  const imgs = $$$('#galleryGrid img');
  const caption = $('#lightboxCaption');
  const preview = $('#lightboxImg');
  let idx = 0;

  function open(i){
    idx = i;
    const fig = imgs[idx].closest('figure');
    preview.src = imgs[idx].src;
    caption.textContent = fig.querySelector('figcaption')?.textContent || '';
    if(typeof dialog.showModal === 'function'){ dialog.showModal(); }
    else dialog.setAttribute('open','');
  }
  function close(){
    if(typeof dialog.close === 'function'){ dialog.close(); }
    else dialog.removeAttribute('open');
  }
  function next(){ open((idx+1) % imgs.length); }
  function prev(){ open((idx-1+imgs.length) % imgs.length); }

  imgs.forEach((img,i)=> img.addEventListener('click', ()=> open(i)));
  $('#lightboxClose').addEventListener('click', close);
  $('#lightboxNext').addEventListener('click', next);
  $('#lightboxPrev').addEventListener('click', prev);

  window.addEventListener('keydown', (e)=>{
    if(!dialog.open) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });
}

// Carousel
function setupCarousel(){
  const track = $('#carouselTrack');
  const dots = $('#dots');
  let index = 0;
  let timer = null;
  const AUTO_MS = 4000;

  // Populate
  CONTENT.loveNotes.forEach((txt, i)=>{
    const slide = document.createElement('article');
    slide.className = 'note';
    slide.setAttribute('role','group');
    slide.setAttribute('aria-roledescription','slide');
    slide.setAttribute('aria-label', `Slide ${i+1} of ${CONTENT.loveNotes.length}`);
    slide.textContent = txt;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.setAttribute('role','tab');
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', ()=> go(i));
    dots.appendChild(dot);
  });

  function go(i){
    index = i;
    track.style.transform = `translateX(-${index*100}%)`;
    $$$('#dots button').forEach((b,bi)=> b.setAttribute('aria-selected', bi===index ? 'true':'false'));
  }

  function next(){ go((index+1) % CONTENT.loveNotes.length); }
  function prev(){ go((index-1+CONTENT.loveNotes.length) % CONTENT.loveNotes.length); }

  $('#nextNote').addEventListener('click', next);
  $('#prevNote').addEventListener('click', prev);

  function start(){
    if(prefersReducedMotion()) return; // respect motion preference
    stop();
    timer = setInterval(next, AUTO_MS);
  }
  function stop(){
    if(timer){ clearInterval(timer); timer = null; }
  }

  // Pause on hover/focus
  const carousel = $('#notesSection');
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  go(0);
  start();
}

// Konami code
function setupKonami(){
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const pressed = [];
  window.addEventListener('keydown', e=>{
    pressed.push(e.key);
    if(pressed.length > seq.length) pressed.shift();
    if(seq.every((k,i)=> pressed[i] === k)){
      // Show floating “I love you”
      const note = document.createElement('div');
      note.textContent = 'I love you';
      note.style.position = 'fixed';
      note.style.left = '50%';
      note.style.top = '20%';
      note.style.transform = 'translate(-50%,-50%)';
      note.style.background = '#fff';
      note.style.padding = '.5rem .75rem';
      note.style.borderRadius = '.75rem';
      note.style.boxShadow = '0 10px 30px rgba(0,0,0,.15)';
      note.style.zIndex = '9999';
      document.body.appendChild(note);
      setTimeout(()=> note.remove(), 5000);
      if(!prefersReducedMotion()) confettiHearts();
    }
  });
}
