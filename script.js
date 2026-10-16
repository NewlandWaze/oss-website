/* logo embedded so it never depends on file paths */
const LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAB9CAMAAABH0HuwAAABgFBMVEX///////3///v///j//v///vz//vn//f///f7//fz//P7/+vz+///+/v/+/v79//78///9/v/6///+/vz+//n7//z8//n9/f77/Pv7+fr3//73/fzy//7s///e///2+fjk+fzv8PXa7fTC+PrC6vKl8fej5fZc6ak67W8x9Fwv6m3X2+Sz3erCwtCd2+2J2uyOw8xt2vtjzfNp0LttutRVuc/LoKTHl5e1o6u5mJ3KkpK4j5eLnrNZnseQg5NVgbY/0cE9131Awcglv+c3uek9ucYfueU6sOE9r7wfseUjr848oto9obQ9kb4gndQhlapEhMVGfcFEfrMuf64Vf6t+boZebYg8cLk8bZVaVHQ8UH0qcrkqa7cqa5oqUaErUmwpRXoWcbMTZ7ARapQPXagQWn8bS5sKTpoRS28WSktDPHE3OX8zOYUuO5MvNY8uOXUnO44YPIolPF8TPFw1MogxM4g2MnExMXAuMoktMnIiMnwzLn8xLmcxKWciLXEjJVoGMozSAAAhnklEQVR42u2c+V8aabbGAUGUxRAQEFxKFunuIIIIBlvAdoJBRZCIIoqAG4gCChoXFuVfv895C1ATk565mTvzyz2fjhqTyJezPuetqhYI/iUb+hdN8H9p/w/z/zD/lClgAiEzDWzo3bv379+/00j6+zWad+/eDQ1JJBpmQ+zjMKzz5dC/7/W7X6lUKq1QpxP1wUQikVClUptMHPutTqtWKYSSfhEzoY6jv6XjOJEEvx3WjSg69os0z1h4bfWobni4j706BxsdMxrVqmHOxIzjRkYIWKEYMQmEBs5EzJp+AhSyd4U/+kXfiJnxMCqtCK5n71g7alQbjUaz2e7w+fywYJA++hwOu5lTv1eKpTIDZ+gXiyXwjUQjpn+vVmsVv47yEoaDBzQCPdxktDv8yeTexfVLy+3tJYFkNxlkMpncoJcODEokg5xULAaM9t8B080e0HCcAt/UmwCys3fdvr5u49fF3gWQznt2nUsGfQ6TTCY1KJUGbnBw8N8HQ5nD559qFBkhBsnOTnIPBHttgCR3ggvBnb09+OU8l2NM+PKCeOxq5Aknl0ilUrFApdVqhb8IwyLEJyb5xmB30CvvBP3BnYt26wJfBRcXFhbpmz0S2M0N/JN0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';
document.querySelectorAll('img.logo-img, .footer-wrap img, .brand img').forEach((i) => (i.src = LOGO));
const fav = document.querySelector('link[rel="icon"]');
if (fav) fav.href = LOGO;

const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* loader */
(() => {
  const loader = $('#loader'), pct = $('#loadPct');
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 12));
    pct.textContent = n + '%';
    if (n >= 100) { clearInterval(t); setTimeout(() => loader.classList.add('done'), 250); }
  }, 70);
})();

/* scroll: progress bar, turning globe, degrees */
const globe = $('#globe'), degrees = $('#degrees'), progress = $('#progress');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const y = scrollY;
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  const deg = Math.round(y * 0.3) % 360;
  if (!reduced && globe) globe.style.transform = `rotate(${y * 0.3}deg)`;
  if (degrees) degrees.textContent = String(deg).padStart(3, '0') + '°';
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* reveal + section counter */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });

const counter = $('#counter');
const sections = document.querySelectorAll('[data-section]');
const so = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) counter.textContent = String(e.target.dataset.section).padStart(2, '0') + ' / ' + String(sections.length).padStart(2, '0');
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach((s) => so.observe(s));

/* service cards */
const cards = document.querySelectorAll('.service-card');
cards.forEach((c) => c.addEventListener('click', () => { cards.forEach((i) => i.classList.remove('active')); c.classList.add('active'); }));

/* estimate + client note */
const hours = document.querySelector('input[name="hours"]');
const pax = document.querySelector('input[name="passengers"]');
const est = $('#estimateValue'), note = $('#formNote'), clientType = $('#clientType');
function updateEstimate() {
  const h = Number(hours.value || 4), p = Number(pax.value || 4);
  est.textContent = 'RWF ' + (150000 + h * 25000 + Math.max(0, p - 4) * 12000).toLocaleString();
}
const notes = {
  institution: 'For long-term institutional clients, contract coordination is managed directly with our operations team.',
  tourism: 'For tourism requests, we align the route with your destinations, timing and vehicle suitability.',
  external: 'For external clients, we confirm the route, vehicle type and payment method and follow up by email.'
};
function updateNote() { note.textContent = notes[clientType.value] || notes.external; }
hours.addEventListener('input', updateEstimate);
pax.addEventListener('input', updateEstimate);
clientType.addEventListener('change', updateNote);

/* chat widget */
const aiChat = $('#aiChat'), aiInput = $('#aiInput'), aiWidget = $('#aiWidget');
$('#aiHeader').addEventListener('click', () => aiWidget.classList.toggle('open'));
function bubble(role, text) {
  const b = document.createElement('div');
  b.className = 'chat-bubble ' + role;
  b.textContent = text;
  aiChat.appendChild(b);
  aiChat.scrollTop = aiChat.scrollHeight;
}
function reply(q) {
  const t = q.toLowerCase();
  const has = (...w) => w.some((x) => t.includes(x));
  if (has('ngo', 'institution', 'contract')) return 'We support long-term NGO and institutional transport with scheduled routes, verified fleet availability and dependable coordination across Rwanda.';
  if (has('tour', 'sightseeing', 'akagera', 'volcanoes', 'nyungwe', 'kivu')) return 'We provide tourism transport to Kigali, Akagera, Volcanoes, Nyungwe and Lake Kivu, with routes planned for comfort and convenience.';
  if (has('price', 'rate', 'cost', 'payment')) return 'External clients can pay by bank transfer, mobile money or corporate invoice, depending on the booking.';
  if (has('fleet', 'maintenance', 'mileage')) return 'Our operations team tracks daily mileage, maintenance schedules and fleet availability so vehicles are ready for dispatch.';
  if (/\b(hello|hi|hey)\b/.test(t)) return 'Hello. I can help with NGO transport, tourism routes, fleet availability and service enquiries in Rwanda.';
  return 'We support NGO logistics, tourism transport, corporate mobility and flexible planning across Rwanda. Tell us your destination or organisation type and we will guide the next step.';
}
$('#aiForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = aiInput.value.trim();
  if (!q) return;
  bubble('user', q);
  aiInput.value = '';
  setTimeout(() => bubble('system', reply(q)), 200);
});

/* quote form */
$('#quoteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const name = f.get('name') || 'Client';
  const service = String(f.get('service') || 'service').toLowerCase();
  aiWidget.classList.add('open');
  bubble('system', f.get('clientType') === 'institution'
    ? `Thank you, ${name}. Your institutional ${service} request has been recorded for operations coordination.`
    : `Thank you, ${name}. Your ${service} request has been received and our team will confirm the route, vehicle and next steps by email.`);
  e.target.reset();
  updateEstimate();
  updateNote();
});

updateEstimate();
updateNote();

/* light / dark mode */
const themeBtn = $('#themeToggle');
function paintToggle() { themeBtn.textContent = document.documentElement.dataset.theme === 'dark' ? '\u2600' : '\u263E'; }
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('oss-theme', next); } catch (e) {}
  paintToggle();
  dispatchEvent(new Event('themechange'));
});
paintToggle();
