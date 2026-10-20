/* ===== EDIT THESE ===== */
const SHOP = {
    name: "Baba Shyam Jewellers",
    phone: "RAJAT VERMA +91 9050868986, <br>NARESH VERMA +91 9416374419",
    wa: "919050868986",                 // ✅ WhatsApp must include country code (91...)
    email: "rajatrv1234@gmail.com",
    addr: "Jawahar Nagar Camp, Palwal",
    since: 1999
};

/* DELHI RATES — update the numbers daily (per gram, INR) */
const RATES = { date: "2026-10-13", time: "18:30", gold24: 14806, gold22: 13685, gold18: 11993, silver: 235 };
const PREV  = { gold24: 15156, gold22: 13840, gold18: 11324, silver: 240 };
/* ====================== */

const fmt = n => Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const page = location.pathname.split('/').pop() || 'index.html';
const links = [['index.html', 'Home'], ['collection.html', 'Collection'], ['gold-collection.html', 'Gold'], ['rates.html', 'Rates'], ['about.html', 'About'], ['contact.html', 'Contact']];

const tk = `<span>✦ GOLD 24K ₹${fmt(RATES.gold24)}/g</span><span>✦ GOLD 22K ₹${fmt(RATES.gold22)}/g</span><span>✦ GOLD 18K ₹${fmt(RATES.gold18)}/g</span><span>✦ SILVER ₹${fmt(RATES.silver)}/g</span><span>✦ BIS HALLMARKED</span>`;

document.body.insertAdjacentHTML('afterbegin', `
<div class="ticker"><div>${tk.repeat(4)}</div></div>
<header>
    <a href="index.html" class="logo">
        <img src="./images/gold/logo.png" alt="Baba Shyam Jewellers logo" width="90" height="90">
        <div>Baba Shyam<small>JEWELLERS</small></div>
    </a>
    <nav>
        <ul id="nl">${links.map(l => `<li><a href="${l[0]}" class="${page === l[0] ? 'on' : ''}">${l[1]}</a></li>`).join('')}</ul>
    </nav>
    <button class="mb" id="mb">☰</button>
</header>`);

document.body.insertAdjacentHTML('beforeend', `
<footer>
    <div class="fc">
        <div>
            <a href="index.html" class="logo">
                <img src="./images/gold/logo.png" alt="Baba Shyam Jewellers logo" width="90" height="90">
                <div>Baba Shyam<small>JEWELLERS</small></div>
            </a>
            <p style="margin-top:16px">Crafting elegance in gold &amp; silver since ${SHOP.since}. Hallmarked, trusted by generations.</p>
        </div>
        <div>
            <h4>Explore</h4>
            <ul>${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul>
        </div>
        <div>
            <h4>Collections</h4>
            <ul>
                <li><a href="collection.html#gold">Gold Jewellery</a></li>
                <li><a href="rates.html">Price Calculator</a></li>
            </ul>
        </div>
        <div>
            <h4>Visit Us</h4>
            <p>${SHOP.addr}</p>
            <p style="margin-top:8px">${SHOP.phone}<br>${SHOP.email}</p>
        </div>
    </div>
    <div class="cp">© ${new Date().getFullYear()} ${SHOP.name}. All Rights Reserved.</div>
</footer>
<a class="wa" target="_blank" rel="noopener" href="https://wa.me/${SHOP.wa}?text=${encodeURIComponent('Hello ' + SHOP.name)}">💬</a>`);

document.getElementById('mb').onclick = () => document.getElementById('nl').classList.toggle('open');

/* ===== RATES DISPLAY ===== */
const ids = { gold24: 'gold24', gold22: 'gold22', gold18: 'gold18', silver: 'silver' };
for (const k in ids) {
    const e = document.getElementById(k);
    if (e) e.textContent = '₹' + fmt(RATES[k]);
    const c = document.getElementById('c_' + k);
    if (c) {
        const d = (RATES[k] - PREV[k]) / PREV[k] * 100;
        c.textContent = (d >= 0 ? '▲ ' : '▼ ') + Math.abs(d).toFixed(2) + '% vs yesterday';
        c.classList.toggle('down', d < 0);
    }
}

/* ===== LIVE CURRENT DATE & TIME (IST) — updates every minute ===== */
function updateLiveTime() {
    const u = document.getElementById('upd');
    if (!u) return;
    const now = new Date();
    const formatted = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    u.textContent = 'Delhi retail rates updated: ' + formatted + ' IST';
}
updateLiveTime();                          // paint immediately
setInterval(updateLiveTime, 60 * 1000);    // refresh every minute

/* ===== JEWELLERY ARTWORK (SVG illustrations) ===== */
document.body.insertAdjacentHTML('beforeend', '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="mg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200"><stop offset="0" stop-color="#fff3b8"/><stop offset=".4" stop-color="#e2bb45"/><stop offset=".7" stop-color="#b98a22"/><stop offset="1" stop-color="#f3dc8f"/></linearGradient><linearGradient id="ms" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#c3c9d0"/><stop offset=".7" stop-color="#7d848c"/><stop offset="1" stop-color="#e9edf1"/></linearGradient></defs></svg>');

const Q = (a, b, c, t) => (1 - t) * (1 - t) * a + 2 * t * (1 - t) * b + t * t * c;
const beads = (x0, y0, cx, cy, x1, y1, n, r, m, f) => Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / (n + 1);
    return `<circle cx="${Q(x0, cx, x1, t)}" cy="${Q(y0, cy, y1, t)}" r="${r}" fill="${f || m}" stroke="${m}" stroke-width="1.5"/>`;
}).join('');
const flower = (m, s) => `<g transform="scale(${s})">${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="0" cy="-20" rx="10" ry="18" fill="${m}" stroke="#0005" stroke-width="1" transform="rotate(${a})"/>`).join('')}<circle r="9" fill="#fff6e0" stroke="${m}" stroke-width="3"/></g>`;

const D = {
    ring: m => `<circle cx="100" cy="130" r="42" fill="none" stroke="${m}" stroke-width="10"/><path d="M100 88L76 68L86 44H114L124 68Z" fill="#e9f7ff" stroke="${m}" stroke-width="4" stroke-linejoin="round"/><path d="M76 68H124M86 44L100 68L114 44" stroke="${m}" stroke-width="2" fill="none"/>`,
    band: m => `<circle cx="100" cy="110" r="52" fill="none" stroke="${m}" stroke-width="20"/>` + Array.from({ length: 7 }, (_, i) => { const a = -2.4 + i * .28; return `<circle cx="${100 + 52 * Math.cos(a)}" cy="${110 + 52 * Math.sin(a)}" r="4.5" fill="#fff" opacity=".9"/>` }).join(''),
    neck: m => `<path d="M25 30Q100 190 175 30" fill="none" stroke="${m}" stroke-width="5"/><path d="M45 38Q100 150 155 38" fill="none" stroke="${m}" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>${beads(25, 30, 100, 190, 175, 30, 5, 6, m)}<path d="M100 108L84 128L100 160L116 128Z" fill="${m}" stroke="#fff6" stroke-width="2"/><circle cx="100" cy="128" r="6" fill="#c0283a"/>`,
    haar: m => [140, 185].map(d => `<path d="M28 25Q100 ${d} 172 25" fill="none" stroke="${m}" stroke-width="3"/>${beads(28, 25, 100, d, 172, 25, 9, 6.5, m, '#fff3c8')}`).join('') + `<path d="M100 130L88 150L100 178L112 150Z" fill="${m}"/>`,
    jhumka: m => [58, 142].map(x => `<g transform="translate(${x} 0)"><circle cy="26" r="7" fill="none" stroke="${m}" stroke-width="3"/><path d="M-24 62A24 24 0 0 1 24 62Z" fill="${m}"/><path d="M-24 62Q-36 110 -14 130H14Q36 110 24 62Z" fill="${m}" stroke="#0004" stroke-width="1.5"/><path d="M-10 78Q0 100 10 78" stroke="#fff8" stroke-width="2" fill="none"/>${[-14, 0, 14].map(k => `<circle cx="${k}" cy="140" r="5.5" fill="${m}"/>`).join('')}</g>`).join(''),
    stud: m => `<g transform="translate(58 100)">${flower(m, 1.2)}</g><g transform="translate(142 100)">${flower(m, 1.2)}</g>`,
    bangle: m => [88, 126].map(y => `<ellipse cx="100" cy="${y}" rx="72" ry="44" fill="none" stroke="${m}" stroke-width="13"/>` + Array.from({ length: 14 }, (_, i) => { const a = i * .45; return `<circle cx="${100 + 72 * Math.cos(a)}" cy="${y + 44 * Math.sin(a)}" r="2.6" fill="#fff" opacity=".8"/>` }).join('')).join(''),
    kada: m => `<path d="M150 58A64 64 0 1 0 150 142" fill="none" stroke="${m}" stroke-width="18" stroke-linecap="round"/><circle cx="150" cy="58" r="17" fill="${m}"/><circle cx="150" cy="142" r="17" fill="${m}"/><circle cx="150" cy="58" r="6" fill="#c0283a"/><circle cx="150" cy="142" r="6" fill="#c0283a"/>`,
    pendant: m => `<circle cx="100" cy="34" r="12" fill="none" stroke="${m}" stroke-width="4"/><g transform="translate(100 150)">${[-60, -30, 0, 30, 60].map(a => `<ellipse cx="0" cy="-45" rx="17" ry="42" fill="${m}" stroke="#0005" stroke-width="1.5" transform="rotate(${a})"/>`).join('')}</g><circle cx="100" cy="112" r="7" fill="#c0283a" stroke="#fff6" stroke-width="2"/>`,
    mang: m => `<path d="M30 28Q100 192 170 28" fill="none" stroke="${m}" stroke-width="3"/>${beads(30, 28, 100, 192, 170, 28, 11, 4.5, m, '#151515')}<circle cx="100" cy="132" r="16" fill="none" stroke="${m}" stroke-width="5"/><circle cx="100" cy="132" r="6" fill="#151515" stroke="${m}" stroke-width="2"/><path d="M100 150V172" stroke="${m}" stroke-width="4"/><circle cx="100" cy="176" r="5" fill="${m}"/>`,
    tikka: m => `<path d="M18 62Q100 22 182 62" fill="none" stroke="${m}" stroke-width="3"/>${beads(18, 62, 100, 22, 182, 62, 9, 5, m, '#fff3c8')}<path d="M100 56V84" stroke="${m}" stroke-width="4"/><path d="M100 84C66 116 78 168 100 168C122 168 134 116 100 84Z" fill="${m}" stroke="#0005" stroke-width="1.5"/><circle cx="100" cy="126" r="10" fill="#c0283a" stroke="#fff7" stroke-width="2"/>`,
    coin: (m, t) => `<circle cx="100" cy="100" r="74" fill="${m}"/><circle cx="100" cy="100" r="62" fill="none" stroke="#0005" stroke-width="3" stroke-dasharray="3 5"/><circle cx="100" cy="100" r="54" fill="none" stroke="#fff7" stroke-width="2"/><text x="100" y="124" text-anchor="middle" font-size="68" font-family="serif" fill="#5a3d05" opacity=".75">${t || 'ॐ'}</text>`,
    chain: m => Array.from({ length: 12 }, (_, i) => { const t = (i + .5) / 12, x = Q(20, 100, 180, t), y = Q(44, 176, 44, t), a = Math.atan2(2 * (1 - t) * 132 + 2 * t * -132, 160) * 180 / Math.PI + (i % 2 ? 90 : 0); return `<ellipse cx="${x}" cy="${y}" rx="14" ry="7" fill="none" stroke="${m}" stroke-width="4" transform="rotate(${a} ${x} ${y})"/>` }).join(''),
    payal: m => `<path d="M16 56Q100 150 184 56" fill="none" stroke="${m}" stroke-width="4"/>` + [.12, .26, .4, .5, .6, .74, .88].map(t => { const x = Q(16, 100, 184, t), y = Q(56, 150, 56, t); return `<path d="M${x} ${y}V${y + 8}" stroke="${m}" stroke-width="2"/><circle cx="${x}" cy="${y + 16}" r="8" fill="${m}" stroke="#0004"/><circle cx="${x}" cy="${y + 20}" r="2" fill="#0007"/>` }).join(''),
    diya: m => `<path d="M100 36Q128 78 100 112Q72 78 100 36Z" fill="#ffb347"/><path d="M100 62Q113 86 100 106Q87 86 100 62Z" fill="#fff2b0"/><path d="M34 118Q100 196 166 118Z" fill="${m}" stroke="#0004" stroke-width="2"/><ellipse cx="100" cy="118" rx="66" ry="10" fill="${m}" stroke="#0005" stroke-width="2"/><path d="M80 168H120" stroke="${m}" stroke-width="8" stroke-linecap="round"/>`,
    brace: m => Array.from({ length: 16 }, (_, i) => { const a = i * 22.5, r = a * Math.PI / 180, x = 100 + 62 * Math.cos(r), y = 92 + 62 * Math.sin(r); return `<ellipse cx="${x}" cy="${y}" rx="${i % 2 ? 11 : 9}" ry="${i % 2 ? 5 : 7}" fill="none" stroke="${m}" stroke-width="4" transform="rotate(${a + 90} ${x} ${y})"/>` }).join('') + `<path d="M100 154V170" stroke="${m}" stroke-width="3"/><path d="M100 188C84 176 86 164 100 170C114 164 116 176 100 188Z" fill="${m}"/>`
};

const art = (k, mt, t) => `<svg viewBox="0 0 200 200">${D[k]('url(#' + (mt === 'gold' ? 'mg' : 'ms') + ')', t)}</svg>`;

const P = [
    ["Solitaire Ring", "22K Gold", "gold", "ring"],
    ["Bridal Necklace Set", "22K Gold", "gold", "neck"],
    ["Temple Haar", "22K Gold", "gold", "haar"],
    ["Jhumka Earrings", "22K Gold", "gold", "jhumka"],
    ["Floral Studs", "18K Gold", "gold", "stud"],
    ["Traditional Bangles", "22K Gold", "gold", "bangle"],
    ["Royal Kada", "22K Gold", "gold", "kada"],
    ["Lotus Pendant", "18K Gold", "gold", "pendant"],
    ["Mangalsutra", "22K Gold", "gold", "mang"],
    ["Maang Tikka", "22K Gold", "gold", "tikka"],
    ["Lakshmi Gold Coin", "24K Gold", "gold", "coin", "श्री"],
    ["Stone Band Ring", "18K Gold", "gold", "band"],
    ["Silver Payal", "925 Silver", "silver", "payal"],
    ["Silver Pooja Diya", "999 Silver", "silver", "diya"],
    ["Silver Om Coin", "999 Silver", "silver", "coin", "ॐ"],
    ["Silver Charm Bracelet", "925 Silver", "silver", "brace"],
    ["Silver Chain", "925 Silver", "silver", "chain"],
    ["Silver Band Ring", "925 Silver", "silver", "band"],
    ["Silver Lotus Pendant", "925 Silver", "silver", "pendant"],
    ["Silver Floral Studs", "925 Silver", "silver", "stud"]
];

/* ===== DRAW COLLECTION GRID (dynamic pages only) ===== */
const g = document.getElementById('cg');
function draw(f) {
    if (!g) return;
    const n = g.dataset.max;
    let l = P.filter(p => f === 'all' || p[2] === f);
    if (n) l = l.slice(0, +n);
    g.innerHTML = l.map(p => `
        <div class="pc rv in">
            <div class="im">
                <div class="art ${p[2]}">${art(p[3], p[2], p[4])}</div>
                <span class="tg ${p[2] === 'silver' ? 's' : ''}">${p[1]}</span>
            </div>
            <div class="in">
                <div><h3>${p[0]}</h3><p>Hallmarked · Custom sizes</p></div>
                <a target="_blank" rel="noopener" href="https://wa.me/${SHOP.wa}?text=${encodeURIComponent('I am interested in ' + p[0])}">Enquire</a>
            </div>
        </div>`).join('');
}

/* ===== ANIMATED HERO STAGE ===== */
const stg = document.getElementById('stage');
if (stg) stg.innerHTML = `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice"><g class="rot" style="transform-origin:200px 250px">${Array.from({ length: 12 }, (_, i) => `<ellipse cx="200" cy="165" rx="20" ry="72" fill="url(#mg)" opacity=".8" stroke="#0005" transform="rotate(${i * 30} 200 250)"/>`).join('')}</g><g class="rot2" style="transform-origin:200px 250px"><circle cx="200" cy="250" r="128" fill="none" stroke="url(#mg)" stroke-width="2" stroke-dasharray="3 9"/><circle cx="200" cy="250" r="150" fill="none" stroke="url(#mg)" stroke-width="1"/></g><g transform="translate(120 170) scale(.8)">${D.pendant('url(#mg)')}</g>${[[70, 90, 1], [330, 120, 1.4], [60, 380, 1.2], [340, 400, 1], [200, 60, 1.6], [200, 450, 1.2]].map((s, i) => `<g transform="translate(${s[0]} ${s[1]}) scale(${s[2]})"><path class="tw" style="animation-delay:${i * .6}s" d="M0-12L3-3L12 0L3 3L0 12L-3 3L-12 0L-3-3Z" fill="#fff"/></g>`).join('')}</svg>`;

/* ===== SHOWCASE REEL =====
   ⚠️ Disabled so your showcase.mp4 video is visible.
   If you want the SVG slideshow INSTEAD of the video,
   uncomment the block below and remove the <video> from index.html.
*/
/*
const rl = document.getElementById('reel');
if (rl) {
    const rp = P.filter(p => p[2] === 'gold').slice(0, 8);
    rl.innerHTML = rp.map((p, i) => `<div class="sl ${i ? '' : 'on'}"><div class="art gold">${art(p[3], 'gold', p[4])}</div><b>${p[0]}</b></div>`).join('');
    let ri = 0;
    setInterval(() => {
        const s = rl.children;
        s[ri].classList.remove('on');
        ri = (ri + 1) % s.length;
        s[ri].classList.add('on');
    }, 2600);
}
*/

/* ===== TABS (collection page) ===== */
const tabs = document.querySelectorAll('.tab');
tabs.forEach(t => t.onclick = () => {
    tabs.forEach(x => x.classList.remove('on'));
    t.classList.add('on');
    draw(t.dataset.f);
});
const h = location.hash.slice(1);
const st = document.querySelector(`.tab[data-f="${h}"]`);
if (st) { tabs.forEach(x => x.classList.remove('on')); st.classList.add('on'); draw(h); }
else draw('all');

/* ===== CALCULATOR ===== */
const cb = document.getElementById('calc');
if (cb) cb.oninput = () => {
    const r = RATES[document.getElementById('metal').value];
    const w = +document.getElementById('wt').value || 0;
    const m = +document.getElementById('mk').value || 0;
    const base = r * w, mc = base * m / 100, gst = (base + mc) * .03, t = base + mc + gst;
    document.getElementById('tot').textContent = '₹' + fmt(t);
    document.getElementById('brk').textContent = `Metal ₹${fmt(base)} + Making ₹${fmt(mc)} + GST 3% ₹${fmt(gst)}`;
};
if (cb) cb.oninput();

/* ===== WHATSAPP FORM — disabled on contact.html (Web3Forms is used instead) =====
   If you want the WhatsApp form on any other page, keep this.
   On contact.html the inline Web3Forms handler will take over.
*/
// const f = document.getElementById('wf');
// if (f && !f.dataset.web3forms) {
//     f.onsubmit = e => {
//         e.preventDefault();
//         const v = [...f.elements].filter(x => x.name).map(x => x.name + ': ' + x.value).join('\n');
//         window.open('https://wa.me/' + SHOP.wa + '?text=' + encodeURIComponent(v), '_blank');
//     };
// }

/* ===== REVEAL ON SCROLL ===== */
const io = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
    { threshold: .12 }
);
document.querySelectorAll('.rv').forEach(e => io.observe(e));