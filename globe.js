/* 3D rotating globe (three.js). Land is drawn as dots from an embedded 180x90 mask. */
(function () {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const fallback = document.getElementById('globe');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch (e) { return; }
  if (fallback) fallback.style.display = 'none';
  canvas.style.display = 'block';

  const W = 180, H = 90;
  const bin = atob('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//7//wAAAAAAAAAAAAAAAAAAAAAAB///////AA/wDwAAHgAAAAAAAAAAAHf//////4AB/gAAAAD+AAAAAAAAAAD/v/8////4AA/gAA+ADf4AGAAAAAAAH///4A///4AAAAAH4Af/8AP8AAAAAAH///+Af//wAAAAAeD////+H4AA////////////////////////////////////////////////////////////v///////////////xD/wBwAAAAAAAA//////////////////////////////Df/////7/8D8A8AP//////////////A//////gf8B4AAAP/////////////8A/8f///wP+AAAAGP5///////////fQAHwB///8H/AAAAPD7/////////8B8AAeAB////v/wAAAfD//////////9B8AAAAB//////4AAAfv///////////B4AAAAAf/////4AAAX////////////AwAAAAAf/////8AAAH////////////gAAAAAAH/////8AAAH////H///////AAAAAAAD/////gAAAB//7+H//////7gAAAAAAH////8AAAAf//7eH//////3gAAAAAAH////wAAAAfy///D/////+HAAAAAAAD///+AAAAAfi///H/////+GAAAAAAAD///+AAAAAf/7//H/////+OAAAAAAAB///+AAAAAP/Bz///////n+AAAAAAAA///4AAAAAf/zB///////jwAAAAAAAAf//wAAAAAf//////////hAAAAAAAAAP/9wAAAAB///////////wAAAAAAAAAP/A8AAAAD///////////gAAAAAAAAAH/AcAAAAD///////////gAAAAACAAAD/B8AAAAH//////H///+gAAAAADgAAAfPeAAAAH//////B///wgAAAAABgAAAf+P8AAAH////v+A/j/wwAAAAAAAAAAP+EsAAAH/////+A/B/hwAAAAAAAAAABfgAAAAH/////4A+B/hwAAAAAAAAAAAPgwAAAH/////wAeAfg4AAAAAAAAAAADj/AAAH/////wAcAXh4AAAAAAAAAAAB//gAAD/////wAOAbDcAAAAAAAAAAAAf/4AAB/////gAOAcC8AAAAAAAAAAAAH/+AAAfv///gACB8HIAAAAAAAAAAAAP/+AAAAD///AAAA8/EAAAAAAAAAAAAf//AAAAD//+AAAAe/+AAAAAAAAAAAAf//wAAAD//8AAAAO/38AAAAAAAAAAAf//+AAAD//4AAAAPf//mAAAAAAAAAAf///gAAB//wAAAAHHw/vAAAAAAAAAAf///gAAA//wAAAAD8AX9wAAAAAAAAAP///gAAA//wAAAAAf8PcYAAAAAAAAAP///AAAA//4AAAAAA57cMAAAAAAAAAH///AAAA//5wAAAAAH7AAAAAAAAAAAH//+AAAB//7wAAAAAP7gBA//////////////////////////////AAAAAAAAA//+AAAB//jgAAAAB//4ADAAAAAAAAA//8AAAA//HgAAAAH//4DAAAAAAAAAA//8AAAAf/HAAAAAP//8BAAAAAAAAAA//gAAAAf/HAAAAAP//+AAAAAAAAAAA//AAAAAf+AAAAAAP//+AAAAAAAAAAA//AAAAAP+AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/8AAAAAP4AAAAAAH8/+AAAAAAAAAAB/8AAAAAGAAAAAAAHQf8AMAAAAAAAAB/wAAAAAAAAAAAAAAAH8APAAAAAAAAB/wAAAAAAAAAAAAAAADwAPAAAAAAAAD+AAAAAAAAAAAAAAAAA4AeAAAAAAAAD+AAAAAAAAAAAAAAAAA4A4AAAAAAAAD8AAAAAAAAAAAAAAAAAABwAAAAAAAAD8AAAAAAAAAAAAAAAAAABgAAAAAAAAD8AAAAAAAAAADAAAAAAAAAAAAAAAAADxwAAAAAAAAAAAAAAAAAAAAAAAAAAAD5gAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAOAAAGIAQAAAAAAAAAAAAOAAAAAAAAD/+D/////wAAAAAAAAAAA+AAAAAEsH//+///////wAAAAAAAPAD/AAAA///////////////wAAAAPkP///AAAH///////////////wAAD///////AAAf///////////////AAD///////wAgf///////////////+AAP//////+BD4/////////////////AAB////////v/////////////////4ABAf//////////////////////////g//////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  const land = (lat, lon) => {
    const x = Math.min(W - 1, Math.floor(((lon + 180) / 360) * W));
    const y = Math.min(H - 1, Math.floor(((90 - lat) / 180) * H));
    const i = y * W + x;
    return (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  };
  const ll = (lat, lon, r) => {
    const a = (lat * Math.PI) / 180, b = (lon * Math.PI) / 180;
    return new THREE.Vector3(r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b));
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 4.2;
  const tilt = new THREE.Group(); tilt.rotation.z = 0.35; tilt.rotation.x = 0.15; scene.add(tilt);
  const spin = new THREE.Group(); tilt.add(spin);

  const dotTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const g = c.getContext('2d'); g.beginPath(); g.arc(16, 16, 14, 0, 7); g.fillStyle = '#fff'; g.fill();
    return new THREE.CanvasTexture(c);
  })();

  const pts = [], N = 9000, ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = ga * i;
    const lat = (Math.asin(y) * 180) / Math.PI;
    let lon = ((Math.atan2(Math.sin(t) * r, Math.cos(t) * r) * 180) / Math.PI);
    if (land(lat, lon)) { const p = ll(lat, lon, 1.0); pts.push(p.x, p.y, p.z); }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const landMat = new THREE.PointsMaterial({ size: 0.028, map: dotTex, transparent: true, alphaTest: 0.4, depthWrite: false });
  spin.add(new THREE.Points(geo, landMat));

  const ocean = new THREE.Mesh(new THREE.SphereGeometry(0.985, 48, 48), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9 }));
  spin.add(ocean);

  const gratMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18 });
  for (let lat = -60; lat <= 60; lat += 30) {
    const p = []; for (let lo = 0; lo <= 360; lo += 6) p.push(ll(lat, lo, 0.99));
    spin.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p), gratMat));
  }
  for (let lo = 0; lo < 180; lo += 30) {
    const p = []; for (let la = -90; la <= 90; la += 6) p.push(ll(la, lo, 0.99), ll(la, lo + 180, 0.99));
  }

  const green = 0x1fb36b;
  const kigali = ll(-1.94, 30.06, 1.0);
  const pin = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), new THREE.MeshBasicMaterial({ color: green }));
  pin.position.copy(kigali); spin.add(pin);
  const pulse = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.05, 32), new THREE.MeshBasicMaterial({ color: green, transparent: true, side: THREE.DoubleSide }));
  pulse.position.copy(kigali.clone().multiplyScalar(1.01)); pulse.lookAt(kigali.clone().multiplyScalar(3)); spin.add(pulse);

  /* green arrow orbit, echoing the logo */
  const orbit = new THREE.Group(); orbit.rotation.x = 1.15; orbit.rotation.y = 0.4; scene.add(orbit);
  const arcPts = []; const A0 = 0.2, A1 = 4.2, R = 1.22;
  for (let a = A0; a <= A1; a += 0.04) arcPts.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0));
  const arc = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arcPts), 120, 0.012, 8), new THREE.MeshBasicMaterial({ color: green }));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 16), new THREE.MeshBasicMaterial({ color: green }));
  head.position.set(Math.cos(A1) * R, Math.sin(A1) * R, 0); head.rotation.z = A1;
  const arrow = new THREE.Group(); arrow.add(arc, head); orbit.add(arrow);

  function theme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    landMat.color.set(dark ? 0x7d9bff : 0x0d2c8f);
    ocean.material.color.set(dark ? 0x101a38 : 0xf3f6fc);
    gratMat.color.set(dark ? 0x7d9bff : 0x0d2c8f);
  }
  theme(); addEventListener('themechange', theme);

  function size() {
    const s = canvas.clientWidth || 400;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(s, s, false);
  }
  size(); addEventListener('resize', size);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  spin.rotation.y = (-30 * Math.PI) / 180;
  let lastY = scrollY, visible = true, t = 0;
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(canvas);
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    t += 0.016;
    const dy = scrollY - lastY; lastY = scrollY;
    if (!reduced) spin.rotation.y += 0.004 + dy * 0.006;
    else spin.rotation.y += dy * 0.006;
    if (!reduced) arrow.rotation.z -= 0.012;
    const k = (t % 2) / 2; pulse.scale.setScalar(1 + k * 3); pulse.material.opacity = 1 - k;
    renderer.render(scene, camera);
  })();
})();
