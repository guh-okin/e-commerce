const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const store = {
    get: (k, d) => { try { const v = localStorage.getItem('vestta_' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem('vestta_' + k, JSON.stringify(v)); } catch { } },
    del: k => { try { localStorage.removeItem('vestta_' + k); } catch { } }
};

// ícones
const P = {
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    heart: '<path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    truck: '<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    left: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18 18 0 0 1 5.1-5.9M9.9 4.2A10.7 10.7 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.2 3.2M1 1l22 22"/>',
    repeat: '<path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.9-1.2 8.1 5-3 5 3-1.2-8.1"/>',
    headset: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3zM3 19a2 2 0 0 0 2 2h1v-7H3z"/>',
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    card: '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    pkg: '<path d="m21 8-9-5-9 5v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v9"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    backsp: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="m18 9-6 6M12 9l6 6"/>',
    navi: '<path d="m3 11 19-9-9 19-2-8z"/>',
    down2: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    list: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    filter: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1-2 .5-4 2-5 .5 2.5 2 4 3.5 5.5s2.5 3 2.5 5a6 6 0 1 1-12 0c0-1 .5-2 1.5-2.5z"/>',
    lookbook: '<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    box: '<rect x="3" y="3" width="18" height="5" rx="1"/><path d="M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M10 12h4"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'
};
const icon = (n, s) => `<svg class="i" viewBox="0 0 24 24"${s ? ` style="width:${s}px;height:${s}px"` : ''}>${P[n] || ''}</svg>`;
const GOOGLE = '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.4-4.7 3.4-8z"/><path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.800A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.800 14.100a6.600 6.600 0 0 1 0-4.200V7.100H2.200a11 11 0 0 0 0 9.800z"/><path fill="#EA4335" d="M12 5.400c1.600 0 3.100.6 4.300 1.700l3.200-3.200A11 11 0 0 0 2.200 7.100l3.600 2.800C6.700 7.300 9.100 5.400 12 5.400z"/></svg>';
const APPLE = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M16.4 12.6c0-2.500 2-3.700 2.100-3.800-1.200-1.700-3-1.900-3.600-1.900-1.500-.2-3 .9-3.800.9s-2-.9-3.300-.9c-1.700 0-3.300 1-4.200 2.500-1.800 3.100-.5 7.700 1.300 10.200.9 1.200 1.900 2.600 3.200 2.500 1.300-.1 1.800-.8 3.300-.8s2 .8 3.300.8c1.400 0 2.300-1.200 3.100-2.500 1-1.400 1.400-2.800 1.400-2.900-.1 0-2.800-1.100-2.800-4.100zM13.900 5.100c.7-.9 1.200-2 1-3.200-1 0-2.300.7-3 1.600-.7.800-1.200 2-1.100 3.100 1.100.1 2.300-.6 3.100-1.500z"/></svg>';

// catálogo
const COLORS = {
    'Preto': '#141414', 'Preto Ônix': '#141414', 'Ônix': '#4b4b45', 'Off White': '#ecebe4', 'Cinza': '#9a9a9a',
    'Bege': '#b9a98a', 'Verde Militar': '#3f4d3a', 'Verde Azulado': '#0f3b3a', 'Azul Marinho': '#16233f', 'Marrom': '#4a0c14',
    'Grafite': '#555', 'Azul': '#2b4a7a', 'Branco': '#f2f2f2'
};
const PRODUCTS = [
    { id: 'oversized-logo-tee', name: 'Oversized Logo Tee', cat: 'camisetas', price: 189.90, rating: 4.8, reviews: 42, tag: 'NEW DROP', colors: ['Preto', 'Off White', 'Cinza'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'T-SHIRT // SÉRIE LIMITADA', fit: 'Oversized Pesado', range: 'P ao GG' },
    { id: 'heavyweight-hoodie', name: 'Heavyweight Hoodie', cat: 'moletons', price: 279.90, old: 349.90, rating: 4.9, reviews: 57, tag: '-20%', tagRed: true, colors: ['Preto', 'Cinza', 'Bege'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'HEAVYWEIGHT // ESSENTIALS', fit: 'Oversized Pesado', range: 'P ao GG' },
    { id: 'utility-track-jacket', name: 'Utility Track Jacket', cat: 'jaquetas', price: 499.90, rating: 5.0, reviews: 19, tag: 'URBAN ESSENTIALS', colors: ['Preto', 'Verde Militar', 'Cinza'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'OUTERWEAR // UTILITY', fit: 'Regular Fit', range: 'P ao GG' },
    { id: 'tech-cargo-pants', name: 'Tech Cargo Pants', cat: 'calcas', price: 429.90, rating: 4.8, reviews: 64, tag: 'ESSENTIALS', colors: ['Bege', 'Preto', 'Verde Militar'], sizes: ['38', '40', '42', '44'], tone: 'sand', sub: 'TECHWEAR // UTILITY', fit: 'Boxy Fit', range: '38 ao 46' },
    { id: 'jaqueta-techwear-utility', name: 'Jaqueta Techwear Utility', cat: 'jaquetas', price: 489.90, rating: 4.8, reviews: 45, tag: 'DROP 04', colors: ['Preto Ônix', 'Azul Marinho', 'Off White', 'Verde Militar'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'JAQUETA // DROP 04', fit: 'Regular', range: 'P ao GG' },
    { id: 'jaqueta-kennedy', name: 'Jaqueta Kennedy', cat: 'jaquetas', price: 429.90, rating: 4.7, reviews: 31, tag: 'DROP 04', colors: ['Preto', 'Cinza'], sizes: ['38', '40', '42', '44', '46'], tone: 'dark', sub: 'JAQUETA // COURO', fit: 'Regular', range: '38 ao 46' },
    { id: 'sneaker-vulcan', name: 'Sneaker Vulcan Couro Branco', cat: 'tenis', price: 299.90, rating: 4.6, reviews: 28, tag: 'ESSENTIALS', colors: ['Off White'], sizes: ['39', '40', '41', '42', '43', '44'], tone: 'light', sub: 'SNEAKER // ESSENTIALS', fit: 'Regular', range: '39 ao 44' },
    { id: 'boxy-slogan-tee', name: 'Camiseta Boxy Slogan', cat: 'camisetas', price: 169.90, rating: 4.7, reviews: 36, tag: 'NEW DROP', colors: ['Preto', 'Off White'], sizes: ['P', 'M', 'G', 'GG'], tone: 'navy', sub: 'T-SHIRT // BOXY', fit: 'Boxy Fit', range: 'P ao GG' },
    { id: 'graphic-street-tee', name: 'Graphic Street Tee', cat: 'camisetas', price: 159.90, rating: 4.6, reviews: 28, tag: 'NEW DROP', colors: ['Preto', 'Off White'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'T-SHIRT // GRAPHIC', fit: 'Oversized Pesado', range: 'P ao GG' },
    { id: 'essential-white-tee', name: 'Essential Boxy Tee', cat: 'camisetas', price: 149.90, rating: 4.7, reviews: 51, tag: 'ESSENTIALS', colors: ['Off White', 'Preto'], sizes: ['P', 'M', 'G', 'GG'], tone: 'light', sub: 'T-SHIRT // ESSENTIALS', fit: 'Boxy Fit', range: 'P ao GG' },
    { id: 'black-statement-hoodie', name: 'Statement Hoodie', cat: 'moletons', price: 299.90, old: 374.90, rating: 4.8, reviews: 46, tag: '-20%', tagRed: true, colors: ['Preto', 'Grafite'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'HEAVYWEIGHT // STATEMENT', fit: 'Oversized Pesado', range: 'P ao GG' },
    { id: 'zip-hoodie-black', name: 'Zip Hoodie Night', cat: 'moletons', price: 319.90, rating: 4.8, reviews: 33, tag: 'DROP 04', colors: ['Preto', 'Cinza'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'HOODIE // ZIP', fit: 'Regular Fit', range: 'P ao GG' },
    { id: 'grey-pullover-hoodie', name: 'Pullover Concrete', cat: 'moletons', price: 259.90, rating: 4.5, reviews: 22, tag: 'ESSENTIALS', colors: ['Cinza', 'Grafite'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'HOODIE // CONCRETE', fit: 'Boxy Fit', range: 'P ao GG' },
    { id: 'bomber-street-jacket', name: 'Bomber Street Jacket', cat: 'jaquetas', price: 459.90, rating: 4.7, reviews: 17, tag: 'URBAN ESSENTIALS', colors: ['Preto', 'Verde Militar'], sizes: ['P', 'M', 'G', 'GG'], tone: 'dark', sub: 'OUTERWEAR // BOMBER', fit: 'Regular Fit', range: 'P ao GG' },
    { id: 'wide-cargo-onyx', name: 'Wide Cargo Ônix', cat: 'calcas', price: 399.90, rating: 4.7, reviews: 38, tag: 'ESSENTIALS', colors: ['Ônix', 'Preto'], sizes: ['38', '40', '42', '44', '46'], tone: 'dark', sub: 'CARGO // WIDE', fit: 'Oversized Pesado', range: '38 ao 46' },
    { id: 'baggy-denim', name: 'Baggy Denim Black', cat: 'calcas', price: 349.90, rating: 4.6, reviews: 24, tag: 'NEW DROP', colors: ['Preto', 'Grafite'], sizes: ['38', '40', '42', '44', '46'], tone: 'navy', sub: 'DENIM // BAGGY', fit: 'Boxy Fit', range: '38 ao 46' },
    { id: 'chunky-runner-black', name: 'Chunky Runner Black', cat: 'tenis', price: 389.90, rating: 4.8, reviews: 41, tag: 'DROP 04', colors: ['Preto', 'Cinza'], sizes: ['39', '40', '41', '42', '43', '44'], tone: 'dark', sub: 'SNEAKER // RUNNER', fit: 'Regular Fit', range: '39 ao 44' },
    { id: 'low-top-classic', name: 'Low Top Classic', cat: 'tenis', price: 279.90, rating: 4.5, reviews: 26, tag: 'ESSENTIALS', colors: ['Preto', 'Marrom'], sizes: ['39', '40', '41', '42', '43', '44'], tone: 'sand', sub: 'SNEAKER // CLASSIC', fit: 'Regular Fit', range: '39 ao 44' },
    { id: 'fitted-cap', name: 'Fitted Cap Atelier', cat: 'acessorios', price: 119.90, rating: 4.9, reviews: 63, tag: 'NEW DROP', colors: ['Preto', 'Azul'], sizes: ['Único'], tone: 'dark', sub: 'ACESSÓRIO // BONÉ', fit: 'Regular Fit', range: 'Único' },
    { id: 'tactical-backpack', name: 'Tactical Backpack', cat: 'acessorios', price: 349.90, rating: 4.8, reviews: 29, tag: 'DROP 04', colors: ['Preto', 'Verde Militar'], sizes: ['Único'], tone: 'dark', sub: 'ACESSÓRIO // MOCHILA', fit: 'Regular Fit', range: 'Único' },
    { id: 'utility-crossbody', name: 'Utility Crossbody Bag', cat: 'acessorios', price: 199.90, rating: 4.7, reviews: 35, tag: 'URBAN ESSENTIALS', colors: ['Preto'], sizes: ['Único'], tone: 'dark', sub: 'ACESSÓRIO // BOLSA', fit: 'Regular Fit', range: 'Único' }
];
// imagens
const IMG = (code, w = 700) => `https://images.unsplash.com/photo-${code}?auto=format&fit=crop&w=${w}&q=70`;
const PHOTO = {
    'oversized-logo-tee': '1626781309887-cdfb9f258c64',
    'heavyweight-hoodie': '1569402184083-516dff77c3a4',
    'utility-track-jacket': '1660486044177-45cd45bb5e99',
    'tech-cargo-pants': '1623596305214-19f21cbf48ee',
    'jaqueta-techwear-utility': '1523398002811-999ca8dec234',
    'jaqueta-kennedy': '1590330297626-d7aff25a0431',
    'sneaker-vulcan': '1551747777-458b63c6ae38',
    'boxy-slogan-tee': '1636047250452-6772f6144b3d',
    'graphic-street-tee': '1787682912838-4d0edf47cfbe',
    'essential-white-tee': '1594035795072-3fcd236b7d83',
    'black-statement-hoodie': '1680292783974-a9a336c10366',
    'zip-hoodie-black': '1579572331145-5e53b299c64e',
    'grey-pullover-hoodie': '1556821840-3a63f95609a7',
    'bomber-street-jacket': '1774413769417-29fde33e368b',
    'wide-cargo-onyx': '1588117260148-b47818741c74',
    'baggy-denim': '1787682912838-4d0edf47cfbe',
    'chunky-runner-black': '1623910170171-ae0198ea4a5e',
    'low-top-classic': '1577106436954-eb29e215beff',
    'fitted-cap': '1618914729549-2c9afb0558df',
    'tactical-backpack': '1614096602561-7394f4d5dc82',
    'utility-crossbody': '1582439313550-c8d5c1bb8e37'
};
PRODUCTS.forEach(p => { if (PHOTO[p.id]) p.img = IMG(PHOTO[p.id]); });
const byId = id => PRODUCTS.find(p => p.id === id);
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const KW = { camisetas: 'camiseta camisetas tee t-shirt camisa', moletons: 'moletom moletons hoodie casaco', jaquetas: 'jaqueta jaquetas outerwear casaco', calcas: 'calca calcas cargo pants', tenis: 'tenis sneaker sneakers calcado', acessorios: 'acessorio acessorios bone mochila bolsa cap bag' };
const hay = p => norm([p.name, p.cat, KW[p.cat] || '', p.colors.join(' ')].join(' '));
const colorHex = c => COLORS[c] || '#333';
const imgTag = (src, alt) => `<img src="${src}" alt="${alt || ''}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`;
const pic = (p, label) => `<div class="ph ${p.tone === 'dark' ? '' : p.tone || ''}"><span>${label === undefined ? p.name : label}</span>${p.img ? imgTag(p.img, p.name) : ''}</div>`;

// carrinho e cálculo
const COUPONS = {
    STREET30: { label: 'R$ 150 OFF', calc: s => s >= 499 ? 150 : 0, min: 499 },
    STREET20: { label: '-20% OFF', calc: s => +(s * .2).toFixed(2), min: 0 },
    DROP20: { label: '-20% OFF', calc: s => +(s * .2).toFixed(2), min: 0 }
};
function getCart() {
    let c = store.get('cart', null);
    if (c === null) {
        c = [{ id: 'oversized-logo-tee', color: 'Preto', size: 'M', qty: 1 }, { id: 'heavyweight-hoodie', color: 'Verde Azulado', size: 'G', qty: 1 }, { id: 'tech-cargo-pants', color: 'Ônix', size: 'G', qty: 1 }];
        store.set('cart', c);
    }
    return c;
}
const setCart = c => { store.set('cart', c); updateBadges(); };
const cartCount = () => getCart().reduce((a, i) => a + i.qty, 0);
function addToCart(id, color, size, qty = 1) {
    const c = getCart(); const p = byId(id);
    color = color || p.colors[0]; size = size || p.sizes[1] || p.sizes[0];
    const ex = c.find(i => i.id === id && i.color === color && i.size === size);
    ex ? ex.qty += qty : c.push({ id, color, size, qty });
    setCart(c);
}
function calc() {
    const cart = getCart();
    const subtotal = +cart.reduce((a, i) => a + byId(i.id).price * i.qty, 0).toFixed(2);
    const taxes = Math.round(subtotal * .29);
    const code = store.get('coupon', 'STREET30');
    const cp = COUPONS[code];
    const discount = cp && cart.length ? Math.min(cp.calc(subtotal), subtotal) : 0;
    const method = store.get('ship', 'standard');
    const std = subtotal >= 499 ? 5 : 38;
    const shipping = !cart.length ? 0 : method === 'express' ? 15 : std;
    const total = +(subtotal + taxes + shipping - discount).toFixed(2);
    return { cart, subtotal, taxes, code: cp ? code : null, couponLabel: cp ? cp.label : '', discount, shipping, shipOld: method === 'standard' && subtotal >= 499 ? 38 : 0, total, method, items: cart.reduce((a, i) => a + i.qty, 0) };
}

// toast
let toastT;
function toast(msg) {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = icon('check') + msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
}

// header / footer
const LOGO = `<a class="logo" href="index.html"><span class="mark"><svg viewBox="0 0 24 24"><path d="M3 4h5l4 10 4-10h5l-7 16h-4z" fill="#fff"/></svg></span><span>VESTTA</span></a>`;
function renderHeader() {
    const el = $('#app-header'); if (!el) return;
    const page = document.body.dataset.page;
    const user = store.get('user', null);
    const MB = { carrinho: 'Meu Carrinho', checkout: 'Finalizar Compra', confirmacao: 'Pedido Confirmado', produto: 'Detalhes do Produto', conta: 'Login', configuracoes: 'Configurações', dados: 'Dados Pessoais', enderecos: 'Endereços', pagamentos: 'Formas de Pagamento', rastreamento: 'Rastrear Pedido' }[page];
    if (MB) document.body.setAttribute('data-mbar', '1');
    const mbar = MB ? `<div class="mbar"><button type="button" id="mback" aria-label="Voltar">${icon('left', 20)}</button><span class="t">${MB}</span><button type="button" class="bell" aria-label="Notificações">${icon('bell', 20)}<i></i></button></div>` : '';
    const navs = [['NOVIDADES', 'colecao.html?q=novidades', 'new'], ['MOLETONS', 'colecao.html?cat=moletons', 'moletons'], ['JAQUETAS', 'colecao.html?cat=jaquetas', 'jaquetas'], ['CALÇAS', 'colecao.html?cat=calcas', 'calcas'], ['SNEAKERS', 'colecao.html?cat=tenis', 'tenis'], ['ACESSÓRIOS', 'colecao.html?cat=acessorios', 'acessorios']];
    el.innerHTML = `
  <div class="topbar"><div class="wrap"><div><span class="dot"></span>EDIÇÃO LIMITADA</div><div class="c">DROP 04 // LIVE — FRETE GRÁTIS ACIMA DE R$ 499 — USE O CUPOM <code>STREET30</code></div><div class="r"><a href="#">Ajuda</a><a href="rastreamento.html">Rastrear Envio</a></div></div></div>
  <header class="header"><div class="wrap">
    ${LOGO}
    <nav class="nav">${navs.map(n => `<a href="${n[1]}" class="${new URLSearchParams(location.search).get('cat') === n[2] ? 'on' : ''}">${n[0]}</a>`).join('')}</nav>
    <form class="search" id="hsearch">${icon('search')}<input placeholder="Buscar roupas..." aria-label="Buscar"></form>
    <a class="icon-btn" href="favoritos.html" aria-label="Favoritos">${icon('heart')}<span class="badge" id="fav-badge">0</span></a>
    <a class="icon-btn" href="carrinho.html" aria-label="Sacola">${icon('bag')}<span class="badge red" id="cart-badge">0</span></a>
    <a class="user" href="${user ? 'perfil.html' : 'conta.html#login'}" id="user-box"><span class="av ${user ? 'has' : ''}">${user ? user.name.split(' ').map(s => s[0]).join('').slice(0, 2) : icon('user')}</span><div><b>${user ? user.name : 'Usuário'}</b><small>Membro VESTTA</small></div></a>
  </div>${mbar}</header>`;
    $('#hsearch').addEventListener('submit', e => { e.preventDefault(); const q = e.target.querySelector('input').value.trim(); location.href = 'colecao.html' + (q ? '?q=' + encodeURIComponent(q) : ''); });
    const mb = $('#mback'); if (mb) mb.onclick = () => history.length > 1 ? history.back() : (location.href = 'index.html');
    updateBadges();
}
function updateBadges() {
    const n = cartCount(); $$('#cart-badge,.bnav .badge').forEach(b => { b.textContent = n; b.style.display = n ? '' : 'none'; });
    const f = $('#fav-badge'); if (f) { const k = favs().size; f.textContent = k; f.style.display = k ? '' : 'none'; }
}
function renderBottomNav() {
    const page = document.body.dataset.page; if (!['home', 'colecao', 'carrinho', 'perfil', 'favoritos'].includes(page)) return;
    const fav = new URLSearchParams(location.search).get('fav') === '1';
    const on = page === 'home' ? 'd' : page === 'carrinho' ? 'c' : page === 'favoritos' ? 's' : page === 'perfil' ? 'p' : 'b';
    const it = (k, href, ic, lb, extra = '') => `<a href="${href}" class="${on === k ? 'on' : ''}">${icon(ic, 22)}<span>${lb}</span>${extra}</a>`;
    const nav = document.createElement('nav'); nav.className = 'bnav';
    nav.innerHTML = it('d', 'index.html', 'compass', 'Descobrir') + it('b', 'colecao.html', 'search', 'Buscar') + it('s', 'favoritos.html', 'heart', 'Salvos') + it('c', 'carrinho.html', 'bag', 'Carrinho', '<span class="badge red">0</span>') + it('p', store.get('user', null) ? 'perfil.html' : 'conta.html#login', 'user', 'Perfil');
    document.body.appendChild(nav); document.body.classList.add('has-bnav'); updateBadges();
}
function renderFooter() {
    const el = $('#app-footer'); if (!el) return;
    el.innerHTML = `<footer class="footer"><div class="wrap">
    <div><div class="logo-t">VESTTA</div><p>Streetwear para quem transforma atitude em identidade. Silhuetas oversized, estética urbana e drops que expressam uma forma própria de viver a cidade.</p>
      <div class="nl"><small>Acesso antecipado &amp; Drops</small><form class="nlform"><input type="email" placeholder="Seu melhor e-mail" required aria-label="E-mail"><button>Assinar ${icon('right', 16)}</button></form></div></div>
    <div><h5>Atendimento</h5><ul><li><a href="#"><b>Central de Ajuda</b></a></li><li><a href="#">Perguntas Frequentes</a></li><li><a href="#">Trocas e Devoluções</a></li><li><a href="#">Guia de Medidas</a></li></ul></div>
    <div><h5>Explore</h5><ul><li><a href="colecao.html">Novos Drops</a></li><li><a href="colecao.html?cat=camisetas">Oversized Essentials</a></li><li><a href="colecao.html?cat=camisetas">Camisetas e Tops</a></li><li><a href="colecao.html?cat=moletons">Moletons e Hoodies</a></li></ul></div>
    <div><h5>Legal &amp; Privacidade</h5><ul><li><a href="#">Termos de Uso</a></li><li><a href="#">Política de Privacidade</a></li><li><a href="#">Política de Trocas e Devoluções</a></li><li><a href="#">Garantia de Autenticidade</a></li></ul></div>
  </div></footer>`;
    $$('.nlform').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.reset(); toast('Inscrição confirmada! Você receberá os próximos drops.'); }));
}

// card de produto
const favs = () => new Set(store.get('favs', []));
function productCard(p, mode) {
    const on = favs().has(p.id);
    return `<article class="pcard" data-id="${p.id}">
    <a class="img" href="produto.html?id=${p.id}">${p.tag ? `<span class="tag ${p.tagRed ? 'red' : ''}">${p.tag}</span>` : ''}${pic(p)}</a>
    <button class="fav ${on ? 'on' : ''}" data-fav="${p.id}" aria-label="Favoritar">${icon('heart', 17)}</button>
    <div class="meta"><span>${p.colors.join(' / ')}</span><b>${icon('star')}${p.rating.toFixed(1)} (${p.reviews})</b></div>
    <a class="name" href="produto.html?id=${p.id}" style="display:block">${p.name}</a>
    <div class="row"><span class="price">${brl(p.price)}${p.old ? `<s>${brl(p.old)}</s>` : ''}</span>
      <button class="add" data-add="${p.id}" aria-label="Adicionar à sacola">${icon('cart', 16)}</button></div></article>`;
}
function bindCards(root = document) {
    $$('[data-add]', root).forEach(b => b.onclick = () => { addToCart(b.dataset.add); toast('Adicionado à sacola'); });
    $$('[data-fav]', root).forEach(b => b.onclick = () => {
        const f = favs(); f.has(b.dataset.fav) ? f.delete(b.dataset.fav) : f.add(b.dataset.fav);
        store.set('favs', [...f]); b.classList.toggle('on'); updateBadges(); toast(b.classList.contains('on') ? 'Salvo nos favoritos' : 'Removido dos favoritos');
    });
}

// Páginas
const pages = {};

// home
pages.home = () => {
    const grid = $('#home-grid');
    const draw = cat => { grid.innerHTML = PRODUCTS.filter(p => cat === 'todos' || p.cat === cat).slice(0, 8).map(p => productCard(p)).join(''); bindCards(grid); };
    draw('todos');
    $$('#home-chips .chip').forEach(c => c.onclick = () => { $$('#home-chips .chip').forEach(x => x.classList.remove('on')); c.classList.add('on'); draw(c.dataset.cat); });
    $('#copy-coupon').onclick = () => { navigator.clipboard && navigator.clipboard.writeText('DROP20').catch(() => { }); toast('Cupom DROP20 copiado'); store.set('coupon', 'DROP20'); };
    $('#news-form').onsubmit = e => { e.preventDefault(); e.target.reset(); toast('Inscrição confirmada!'); };
};

// coleção
pages.colecao = () => {
    const qs = new URLSearchParams(location.search);
    const rawQ = qs.get('q') || '';
    const st = { cat: qs.get('cat') || 'todos', q: norm(rawQ), fav: qs.get('fav') === '1', max: 2890, sizes: new Set(), colors: new Set(), fits: new Set(), sort: 'relevancia' };
    if (st.q === 'novidades') { st.q = ''; }
    const titles = { moletons: 'Moletom & Casacos', jaquetas: 'Jaquetas', calcas: 'Calças', tenis: 'Tênis', camisetas: 'Camisetas', acessorios: 'Acessórios', todos: 'Coleção Drop 04' };
    const grid = $('#list-grid');
    const active = () => st.sizes.size + st.colors.size + st.fits.size + (st.max < 2890 ? 1 : 0);
    function draw() {
        const fv = favs(); const toks = st.q.split(/\s+/).filter(Boolean);
        let list = PRODUCTS.filter(p => (st.cat === 'todos' || p.cat === st.cat) && (!st.fav || fv.has(p.id)) && p.price <= st.max
            && toks.every(t => hay(p).includes(t))
            && (!st.sizes.size || p.sizes.some(s => st.sizes.has(s)))
            && (!st.colors.size || p.colors.some(c => st.colors.has(norm(c.split(' ')[0]))))
            && (!st.fits.size || st.fits.has(p.fit === 'Regular' ? 'Regular Fit' : p.fit)));
        if (st.sort === 'menor') list.sort((a, b) => a.price - b.price);
        if (st.sort === 'maior') list.sort((a, b) => b.price - a.price);
        if (st.sort === 'avaliacao') list.sort((a, b) => b.rating - a.rating);
        $('#list-title').textContent = st.fav ? 'Meus Favoritos' : (titles[st.cat] || 'Coleção');
        $('#list-count').textContent = `${list.length} ${list.length === 1 ? 'item encontrado' : 'itens encontrados'}${rawQ && norm(rawQ) !== 'novidades' ? ' para “' + rawQ + '”' : ''}`;
        grid.innerHTML = list.length ? list.map(p => productCard(p)).join('') : `<p style="grid-column:1/-1;padding:40px;text-align:center;color:#777">${st.fav ? 'Você ainda não salvou nenhuma peça.' : 'Nenhuma peça encontrada com esses filtros.'}</p>`;
        $('#list-show').innerHTML = `Mostrando <b>${list.length ? '1 a ' + list.length : '0'}</b> de <b>${list.length}</b> peças catalogadas`;
        $('#q-chip').style.display = st.q ? '' : 'none'; $('#q-chip span').textContent = rawQ;
        $('#clear').textContent = 'LIMPAR (' + active() + ')';
        $$('#list-tabs .chip').forEach(c => c.classList.toggle('on', c.dataset.cat === st.cat && !st.fav));
        bindCards(grid);
    }
    $$('#list-tabs .chip').forEach(c => c.onclick = () => { st.cat = c.dataset.cat; st.fav = false; draw(); });
    $$('.filters [data-fit]').forEach(i => i.onchange = () => { i.checked ? st.fits.add(i.dataset.fit) : st.fits.delete(i.dataset.fit); draw(); });
    $$('#fsizes .size').forEach(b => b.onclick = () => { b.classList.toggle('on'); b.classList.contains('on') ? st.sizes.add(b.textContent) : st.sizes.delete(b.textContent); draw(); });
    $$('#fcolors .sw').forEach(b => b.onclick = () => { b.classList.toggle('on'); const k = norm(b.dataset.c); b.classList.contains('on') ? st.colors.add(k) : st.colors.delete(k); draw(); });
    $('#frange').oninput = e => { st.max = +e.target.value; $('#frange-max').textContent = 'R$ ' + st.max.toLocaleString('pt-BR'); draw(); };
    $('#sort').onchange = e => { st.sort = e.target.value; draw(); };
    $('#q-chip').onclick = () => { st.q = ''; draw(); };
    $('#open-filters').onclick = () => $('.filters').classList.toggle('open');
    $('#clear').onclick = () => { st.sizes.clear(); st.colors.clear(); st.fits.clear(); st.max = 2890; $('#frange').value = 2890; $('#frange-max').textContent = 'R$ 2.890'; $$('.size.on,.sw.on').forEach(x => x.classList.remove('on')); $$('.filters [data-fit]').forEach(x => x.checked = false); draw(); };
    draw();
};

// produto
pages.produto = () => {
    const p = byId(new URLSearchParams(location.search).get('id')) || byId('jaqueta-techwear-utility');
    document.title = p.name + ' — VESTTA';
    const sel = { color: p.colors[0], size: p.sizes[1] || p.sizes[0] };
    const tones = ['', 'sand', 'navy', 'green'];
    const gallery = [p.img, ...PRODUCTS.filter(x => x.id !== p.id && x.cat !== 'tenis' && x.img).slice(0, 3).map(x => x.img)];
    const gimg = i => gallery[i] ? imgTag(gallery[i].replace('w=700', 'w=1100'), p.name) : '';
    const rot = PRODUCTS.filter(x => x.id !== p.id && ['jaqueta-kennedy', 'oversized-logo-tee', 'sneaker-vulcan'].includes(x.id));
    $('#pdp').innerHTML = `
  <div class="wrap">
    <div class="crumbs" style="display:flex;justify-content:space-between"><div><a href="index.html">Início</a><span>/</span><b>${p.name}</b></div><a href="#" id="share" style="display:flex;gap:6px;align-items:center">${icon('share', 14)} Compartilhar</a></div>
    <div class="pdp">
      <div class="thumbs">${[0, 1, 2, 3].map(i => `<button class="thumb ${i ? '' : 'on'}" data-i="${i}"><div class="ph ${tones[i]}"><span>${i + 1}</span>${gimg(i).replace('w=1100', 'w=200')}</div></button>`).join('')}</div>
      <div class="stage"><button class="stage-fav ${favs().has(p.id) ? 'on' : ''}" id="sfav" aria-label="Favoritar">${icon('heart', 18)}</button><span class="cnt" id="cnt">1 / 4</span><div id="stage-img" class="ph ${p.tone === 'dark' ? '' : p.tone}" style="height:100%"><span>${p.name} — foto 1</span>${gimg(0)}</div></div>
      <div class="info">
        <div class="top"><span class="tag">DROP 04 // EDIÇÃO LIMITADA</span><span>• 300 Unidades</span></div>
        <h1>${p.name}</h1>
        <div class="rate"><b>★ ${p.rating.toFixed(1)}</b>• <a class="link" href="#">${p.reviews} avaliações verificadas</a> • <span class="rec">98% RECOMENDAM</span></div>
        <div class="pricebox"><div><b>${brl(p.price)}</b><small>ou em até 6x de ${brl(p.price / 6)} sem juros no cartão</small></div><span class="tag">5% OFF NO PIX</span></div>
        <div class="desc">Jaqueta urbana de inspiração techwear, com capuz integrado, fechamento frontal por zíper, bolsos utilitários e detalhes de ajuste. Uma peça versátil para composições streetwear modernas, com visual funcional e minimalista.</div>
        <div class="opt-h"><b>COR:</b><span id="color-name">${sel.color}</span></div>
        <div class="swatches" id="colors">${p.colors.map((c, i) => `<button class="sw ${i ? '' : 'on'} ${c === 'Off White' ? 'light' : ''}" data-c="${c}" style="background:${colorHex(c)}" title="${c}">${icon('check')}</button>`).join('')}</div>
        <div class="opt-h"><b>ESCOLHA O TAMANHO:</b><a class="link" href="#" style="font-weight:400;text-transform:none;letter-spacing:0">Guia de Medidas</a></div>
        <div class="sizes" id="sizes">${p.sizes.map(s => `<button class="size ${s === sel.size ? 'on' : ''}" data-s="${s}">${s}</button>`).join('')}</div>
        <div class="model"><span>● Modelo tem 1,85m, 80kg e veste M</span><b>Caimento Regular</b></div>
        <div class="buy"><div class="mprice"><small>Preço total</small><b>${brl(p.price)}</b></div><button class="btn" id="buy">${icon('bag', 16)} Adicionar à sacola</button><button class="fav ${favs().has(p.id) ? 'on' : ''}" id="pfav" aria-label="Favoritar">${icon('heart')}</button></div>
        <div class="freight"><div class="hd">${icon('truck', 16)} Calcule frete</div><div class="f"><input id="cep" placeholder="00000-000" maxlength="9" inputmode="numeric"><button class="btn sm" id="calc-cep" style="height:44px">Calcular</button></div><div class="res" id="cep-res"></div></div>
        <div class="acc"><button>Detalhes de Tecido &amp; Caimento ${icon('down', 18)}</button><div class="body">Algodão BCI encorpado de 260g, com toque macio e estrutura. Modelagem regular com ombros levemente caídos. Lavar à mão ou ciclo delicado, do avesso, em água fria.</div></div>
        <div class="acc"><button>Envio &amp; Devoluções Grátis ${icon('down', 18)}</button><div class="body">Frete grátis acima de R$ 499. Primeira troca gratuita em até 30 dias corridos, com coleta reversa sem custo.</div></div>
      </div>
    </div>
    <div class="facts">
      <div class="fact"><big>260g</big><b>Algodão encorpado</b><small>Estrutura e presença para o uso diário.</small></div>
      <div class="fact"><big>100%</big><b>Algodão BCI</b><small>Composição pensada para conforto e durabilidade.</small></div>
      <div class="fact"><big>30D</big><b>Garantia de troca</b><small>Consulte as condições e os prazos da política de trocas.</small></div>
    </div>
    <div class="pdp-rot"><div class="label" style="letter-spacing:.14em">Curadoria de estilo VESTTA</div><h2 class="h2" style="margin:4px 0 18px">Monte sua rotação</h2>
      <div class="grid c3">${rot.map(x => `<article class="pcard"><a class="img" href="produto.html?id=${x.id}" style="aspect-ratio:3/4">${x.tag ? `<span class="tag">${x.tag}</span>` : ''}${pic(x)}</a><button class="fav" data-fav="${x.id}">${icon('heart', 17)}</button><div class="meta"><span>${x.colors.join(' / ')}</span><span>Tamanhos: ${x.range}</span></div><a class="name" href="produto.html?id=${x.id}" style="display:block">${x.name}</a><div class="row"><span class="price">${brl(x.price)}</span><button class="add txt" data-add="${x.id}">+ Sacola</button></div></article>`).join('')}</div></div>
  </div>`;
    const stage = $('#stage-img');
    $$('.thumb').forEach(t => t.onclick = () => {
        $$('.thumb').forEach(x => x.classList.remove('on')); t.classList.add('on');
        const i = +t.dataset.i; stage.className = 'ph ' + (i ? tones[i] : (p.tone === 'dark' ? '' : p.tone));
        stage.innerHTML = `<span>${p.name} — foto ${i + 1}</span>${gimg(i)}`; $('#cnt').textContent = `${i + 1} / 4`;
    });
    $$('#colors .sw').forEach(b => b.onclick = () => { $$('#colors .sw').forEach(x => x.classList.remove('on')); b.classList.add('on'); sel.color = b.dataset.c; $('#color-name').textContent = sel.color; });
    $$('#sizes .size').forEach(b => b.onclick = () => { $$('#sizes .size').forEach(x => x.classList.remove('on')); b.classList.add('on'); sel.size = b.dataset.s; });
    $('#buy').onclick = () => { addToCart(p.id, sel.color, sel.size); toast('Adicionado à sacola'); };
    $$('#pfav,#sfav').forEach(b => b.onclick = () => { const f = favs(); f.has(p.id) ? f.delete(p.id) : f.add(p.id); store.set('favs', [...f]); $$('#pfav,#sfav').forEach(x => x.classList.toggle('on', f.has(p.id))); updateBadges(); });
    $('#share').onclick = e => { e.preventDefault(); navigator.clipboard && navigator.clipboard.writeText(location.href).catch(() => { }); toast('Link copiado'); };
    $('#cep').oninput = e => { let v = e.target.value.replace(/\D/g, '').slice(0, 8); if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5); e.target.value = v; };
    $('#calc-cep').onclick = () => {
        const r = $('#cep-res'); const ok = $('#cep').value.replace(/\D/g, '').length === 8; r.style.display = 'block';
        r.innerHTML = ok ? `<b>Entrega Padrão</b> — ${p.price >= 499 ? 'R$ 5,00' : 'R$ 38,00'} • 2 a 3 dias úteis<br><b>Envio Expresso</b> — R$ 15,00 • em até 24h` : '<span style="color:var(--accent)">Digite um CEP válido com 8 dígitos.</span>';
    };
    $$('.acc button').forEach(b => b.onclick = () => b.parentElement.classList.toggle('open'));
    bindCards($('.pdp-rot'));
};

// carrinho
pages.carrinho = () => {
    const root = $('#cart');
    function draw() {
        const c = calc();
        if (!c.cart.length) {
            root.innerHTML = `<div class="wrap"><div class="empty" style="margin-top:30px"><h2 class="h2">Sua sacola está vazia</h2><p>Explore os drops e monte seu look.</p><a class="btn" href="colecao.html">Explorar coleção ${icon('right', 16)}</a></div></div>`; return;
        }
        const pct = Math.min(100, Math.round(c.subtotal / 499 * 100));
        root.innerHTML = `<div class="wrap">
      <div class="crumbs"><a href="index.html">Início</a><span>/</span><b>Carrinho de compras</b></div>
      <a class="back" href="colecao.html">${icon('left', 16)} Continuar comprando</a>
      <div class="cart"><div>
        <h1>Meu Carrinho</h1>
        <div class="strip"><span class="ic">${icon('truck')}</span><div><b>Envio prioritário VESTTA</b><small>Despacho conforme prazo informado no rastreamento do pedido.</small></div><span class="pill">Expresso disponível</span></div>
        ${c.cart.map((it, i) => { const p = byId(it.id); return `<div class="item"><a class="im" href="produto.html?id=${p.id}">${pic(p, '')}</a><div class="nf"><small>${p.sub}</small><b>${p.name}</b><span>Cor: ${it.color}<i></i>Tam: ${it.size}</span></div><span class="pr">${brl(p.price * it.qty)}</span><div class="qty"><button data-q="-1" data-i="${i}" aria-label="Menos">${icon('minus', 14)}</button><span>${it.qty}</span><button data-q="1" data-i="${i}" aria-label="Mais">${icon('plus', 14)}</button></div><button class="del" data-del="${i}" aria-label="Remover">${icon('trash', 18)}</button></div>`; }).join('')}
        <div class="couponbar" id="cbar">${c.code ? `<span class="ic">${icon('tag', 18)}</span><b class="ok">${c.code} ${icon('check')}<em>VÁLIDO</em></b><div class="act"><button class="btn soft sm" id="chg">Alterar</button><button class="del" id="rmc" style="color:#000" aria-label="Remover cupom">${icon('x', 16)}</button></div>` : `<span class="ic">${icon('tag', 18)}</span><div class="act" style="margin-left:0;flex:1"><input id="cin" placeholder="Código do cupom"><button class="btn sm" id="apc">Aplicar</button><span class="msg" id="cmsg"></span></div>`}</div>
        <div class="ship-bar"><div class="t"><span>${icon('check', 14)} ${c.subtotal >= 499 ? 'Você desbloqueou o frete grátis' : 'Faltam ' + brl(499 - c.subtotal) + ' para o frete grátis'}</span><span>${pct}% ${c.subtotal >= 499 ? 'concluído' : ''}</span></div><div class="bar"><i style="width:${pct}%"></i></div><div class="b"><span>${c.subtotal >= 499 ? 'Benefício liberado para este pedido (compras acima de R$ 499,00)' : 'Frete grátis em compras acima de R$ 499,00'}</span><b>${c.shipOld ? 'Economia de R$ 38,00 no frete' : ''}</b></div></div>
      </div>
      <aside><div class="summary"><div class="hd"><h3>Resumo do pedido</h3><span class="count">${c.items} ${c.items > 1 ? 'itens' : 'item'}</span></div>
        <div class="line"><span>Subtotal dos produtos</span><b>${brl(c.subtotal)}</b></div>
        <div class="line"><span>Impostos e tributos ⓘ</span><b>${brl(c.taxes)}</b></div>
        <div class="line"><span>Entrega com rastreamento</span><b>${c.shipOld ? `<s>${brl(c.shipOld)}</s>` : ''}${brl(c.shipping)}</b></div>
        ${c.discount ? `<div class="line cp"><span>${icon('tag', 14)} Cupom (${c.code})</span><span>-${brl(c.discount)}</span></div>` : ''}
        <div class="total"><div><b>Total</b><small>Tributos e seguro de carga inclusos</small></div><div class="v"><b>${brl(c.total)}</b><small>ou 10x de ${brl(c.total / 10)} sem juros</small></div></div>
        <a class="btn" href="checkout.html">Ir para o checkout ${icon('right', 16)}</a>
        <a class="btn pix" href="checkout.html?pay=pix">${icon('bolt', 14)} Checkout rápido com PIX (-5% extra)</a>
        <div class="methods"><span><i></i>PIX</span><span>• Cartão até 10x</span><span>• Apple Pay</span><span>• Nupay</span></div>
        <div class="help"><div>${icon('headset', 16)} Precisa de ajuda com seu pedido?</div><a class="link" href="#">Suporte VESTTA</a></div></div>
        <div class="assure"><div class="r"><span class="ic">${icon('repeat', 16)}</span><div><b>Primeira troca gratuita</b><small>Até 30 dias corridos para solicitar troca sem custos de postagem.</small></div></div><div class="r"><span class="ic">${icon('award', 16)}</span><div><b>Autenticidade VESTTA</b><small>Peças acompanham etiqueta NFC numerada do atelier VESTTA.</small></div></div></div>
      </aside></div></div>`;
        $$('[data-q]').forEach(b => b.onclick = () => { const cart = getCart(); const it = cart[+b.dataset.i]; it.qty = Math.max(1, it.qty + +b.dataset.q); setCart(cart); draw(); });
        $$('[data-del]').forEach(b => b.onclick = () => { const cart = getCart(); cart.splice(+b.dataset.del, 1); setCart(cart); draw(); toast('Item removido'); });
        const rm = $('#rmc'); if (rm) rm.onclick = () => { store.set('coupon', ''); draw(); };
        const chg = $('#chg'); if (chg) chg.onclick = () => { store.set('coupon', ''); draw(); setTimeout(() => $('#cin') && $('#cin').focus(), 0); };
        const ap = $('#apc'); if (ap) ap.onclick = () => {
            const v = $('#cin').value.trim().toUpperCase(); const cp = COUPONS[v];
            if (!cp) return $('#cmsg').textContent = 'Cupom inválido';
            if (cp.min && calc().subtotal < cp.min) return $('#cmsg').textContent = `Válido acima de ${brl(cp.min)}`;
            store.set('coupon', v); draw(); toast('Cupom aplicado');
        };
    }
    draw();
};

// checkout
pages.checkout = () => {
    const root = $('#co'); let pay = new URLSearchParams(location.search).get('pay') === 'pix' ? 'pix' : 'card'; let saved = 0;
    const cards = [{ last: '3812', brand: 'Mastercard', exp: '27/08', num: '4532 •••• •••• 3812' }, { last: '5625', brand: 'Visa', exp: '26/11', num: '4716 •••• •••• 5625' }];
    function draw(keep) {
        const c = calc();
        if (!c.cart.length) { location.href = 'carrinho.html'; return; }
        const prev = keep ? { name: $('#cname') && $('#cname').value, exp: $('#cexp') && $('#cexp').value, cvv: $('#ccvv') && $('#ccvv').value } : {};
        const inst = Array.from({ length: 10 }, (_, i) => `<option>${i + 1}x de ${brl(c.total / (i + 1))} ${i ? 'sem juros' : 'à vista sem juros'}</option>`).join('');
        root.innerHTML = `<div class="wrap">
      <div class="crumbs"><a href="index.html">Início</a><span>/</span><a href="carrinho.html">Carrinho de compras</a><span>/</span><b>Pagamento</b></div>
      <a class="back" href="carrinho.html">${icon('left', 16)} Voltar para o carrinho</a>
      <div class="steps"><div class="step"><span class="n">${icon('check', 14)}</span><div><small>01. Etapa</small><b>Carrinho</b></div></div><span class="ln"></span><div class="step"><span class="n">02</span><div><small>Etapa atual</small><b>Pagamento</b></div></div><span class="ln off"></span><div class="step todo"><span class="n">04</span><div><small>Aguardando</small><b>Confirmação</b></div></div></div>
      <div class="co"><div>
        <div class="box"><h3>${icon('pin', 20)} ENDEREÇO DE ENTREGA<span class="acts"><a class="link" href="#">Alterar</a><a href="#">+ Novo endereço</a></span></h3>
          <div class="addr"><span class="ic">${icon('home', 20)}</span><div><b>Casa <span class="tag" style="margin-left:6px">PADRÃO</span></b><p>Av. Paulista, 1000 — Apto 84, Edifício Horizon<br>Bela Vista, São Paulo — SP, 01310-100</p><small>Destinatário: Davy Jones — (11) 98822-4411</small></div><span class="edit">${icon('edit', 15)}</span></div></div>
        <div class="box"><h3>${icon('truck', 20)} MÉTODO DE ENVIO</h3><div class="ship-opts">
          <label class="opt ${c.method === 'standard' ? 'on' : ''}"><input type="radio" name="ship" value="standard" class="sr" ${c.method === 'standard' ? 'checked' : ''}><div class="t"><span class="r"></span>Entrega Padrão<em>${brl(c.subtotal >= 499 ? 5 : 38)}</em></div><small>Previsão: 2 a 3 dias úteis</small></label>
          <label class="opt ${c.method === 'express' ? 'on' : ''}"><input type="radio" name="ship" value="express" class="sr" ${c.method === 'express' ? 'checked' : ''}><div class="t"><span class="r"></span>Envio Expresso<em>R$ 15,00</em></div><small>Garantido em 24h <span class="fast">Mais rápido</span></small></label></div></div>
        <div class="box"><h3>${icon('card', 20)} FORMA DE PAGAMENTO</h3>
          <div class="paytabs"><button data-pay="card" class="${pay === 'card' ? 'on' : ''}">${icon('card', 15)} Cartão</button><button data-pay="pix" class="${pay === 'pix' ? 'on' : ''}">${icon('cash', 15)} PIX</button><button data-pay="apple" class="${pay === 'apple' ? 'on' : ''}">${icon('phone', 15)} Apple Pay</button></div>
          <div class="pay-pane ${pay === 'card' ? 'on' : ''}">
            <div class="label" style="display:flex;justify-content:space-between;margin-bottom:10px"><span>Cartões salvos</span><span>2 cadastrados</span></div>
            <div class="saved">${cards.map((k, i) => `<div class="scard ${saved === i ? 'on' : ''}" data-k="${i}"><span class="lg">${k.brand === 'Visa' ? 'VISA' : '<span style="display:flex"><i style="width:18px;height:18px;border-radius:50%;background:#e11d48"></i><i style="width:18px;height:18px;border-radius:50%;background:#f59e0b;margin-left:-8px;opacity:.85"></i></span>'}</span><div><b>•••• ${k.last} ${i === 0 ? '<span class="tag" style="font-size:8px;padding:2px 6px">PADRÃO</span>' : ''}</b><small>${k.brand} • Expira ${k.exp}</small></div><span class="ck">${icon('check', 14)}</span></div>`).join('')}</div>
            <div class="label" style="margin-bottom:12px">Dados para cobrança</div>
            <div class="field"><label>Número do cartão</label><div class="in">${icon('card', 18)}<input id="cnum" value="${cards[saved].num}" inputmode="numeric" maxlength="19">${icon('check', 18)}</div></div>
            <div class="field"><label>Nome do titular (como no cartão)</label><div class="in">${icon('user', 18)}<input id="cname" value="${prev.name || 'DAVY JONES'}" style="text-transform:uppercase"></div></div>
            <div class="two"><div class="field"><label>Data de validade</label><div class="in">${icon('clock', 18)}<input id="cexp" value="${prev.exp || '27/08/26'}" maxlength="8"></div></div><div class="field"><label style="display:flex;justify-content:space-between">CVV / CVC ${icon('help', 14)}</label><div class="in">${icon('lock', 18)}<input id="ccvv" value="${prev.cvv || '345'}" maxlength="4" inputmode="numeric"></div></div></div>
            <div class="field"><span class="sub">Condição de parcelamento</span><div class="in"><select id="inst">${inst}</select>${icon('down', 16)}</div></div>
            <div class="toggle"><span>Salvar este cartão para compras futuras</span><button class="sw-t on" id="savecard" aria-label="Salvar cartão"></button></div>
          </div>
          <div class="pay-pane ${pay === 'pix' ? 'on' : ''}"><div class="pixbox"><div class="qr"></div><b style="font-size:20px">${brl(c.total * .95)}</b><p>Pague via PIX e ganhe 5% de desconto extra. O QR Code é gerado ao finalizar o pedido e expira em 30 minutos.</p></div></div>
          <div class="pay-pane ${pay === 'apple' ? 'on' : ''}"><div class="pixbox"><p style="font-size:14px">Você confirmará o pagamento de <b>${brl(c.total)}</b> com Face ID / Touch ID ao finalizar o pedido.</p></div></div>
        </div>
      </div>
      <aside><div class="summary" style="top:96px"><div class="hd"><h3 style="font-size:15px;letter-spacing:.06em">RESUMO DO PEDIDO</h3><span class="count">${c.items} Itens</span></div>
        ${c.cart.map(it => { const p = byId(it.id); return `<div class="mini"><div class="im">${pic(p, '')}</div><div><b>${p.name}</b><small>Tam: ${it.size} • Qtd: ${it.qty}</small><span>${brl(p.price * it.qty)}</span></div></div>`; }).join('')}
        ${c.code ? `<div class="coupon-row"><div class="lb"><span>Cupom promocional</span><b>1 ativo</b></div><div class="bx"><span class="ic">${icon('shield', 16)}</span><div><b>${c.code}<em>${c.couponLabel}</em></b><small>Aplicado (-${brl(c.discount)})</small></div><a href="carrinho.html">ALTERAR</a></div></div>` : ''}
        <div class="line" style="margin-top:22px"><span>Subtotal</span><b>${brl(c.subtotal)}</b></div>
        <div class="line"><span>Tributos &amp; Encargos (7%) ⓘ</span><b>${brl(c.taxes)}</b></div>
        <div class="line"><span>Taxa de Entrega</span><b>${brl(c.shipping)}</b></div>
        ${c.discount ? `<div class="line" style="color:var(--accent)"><span>${icon('tag', 13)} Desconto Cupom</span><b>-${brl(c.discount)}</b></div>` : ''}
        <div class="total"><div><b style="font-size:15px">TOTAL</b><small style="max-width:none">Inclui tributos e taxas de envio</small></div><div class="v"><b>${brl(c.total)}</b></div></div>
        <button class="btn" id="finish">${icon('lock', 16)} Finalizar pedido (${brl(c.total)}) ${icon('right', 16)}</button></div>
        <div class="pack">${icon('box', 24)}<div><b>Embalagem Antiviolação</b><span>Todas as peças são enviadas em caixas com lacre holográfico selado.</span></div></div>
      </aside></div></div>`;
        $$('[name=ship]').forEach(r => r.onchange = () => { store.set('ship', r.value); draw(true); });
        $$('[data-pay]').forEach(b => b.onclick = () => { pay = b.dataset.pay; draw(true); });
        $$('.scard').forEach(s => s.onclick = () => { saved = +s.dataset.k; draw(true); });
        $('#savecard').onclick = e => e.currentTarget.classList.toggle('on');
        const n = $('#cnum'); if (n) n.oninput = e => e.target.value = e.target.value.replace(/[^\d•\s]/g, '');
        const ex = $('#cexp'); if (ex) ex.oninput = e => { let v = e.target.value.replace(/\D/g, '').slice(0, 6); if (v.length > 4) v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4); else if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); e.target.value = v; };
        $('#finish').onclick = () => {
            if (pay === 'card') {
                const ok = [$('#cnum').value.replace(/\D|•/g, '').length >= 4, $('#cname').value.trim().length > 2, $('#cexp').value.length >= 5, $('#ccvv').value.length >= 3];
                ['#cnum', '#cname', '#cexp', '#ccvv'].forEach((s, i) => $(s).closest('.in').classList.toggle('err', !ok[i]));
                if (ok.includes(false)) return toast('Revise os dados do cartão');
            }
            const id = 'ORD-' + Math.floor(10000 + Math.random() * 89999);
            const k = cards[saved];
            store.set('order', { id, date: new Date().toISOString(), items: c.cart, subtotal: c.subtotal, taxes: c.taxes, shipping: c.shipping, discount: c.discount, total: pay === 'pix' ? +(c.total * .95).toFixed(2) : c.total, method: c.method, pay, card: k.last, brand: k.brand, inst: pay === 'card' ? ($('#inst').selectedIndex + 1) : 1 });
            store.set('cart', []); store.set('coupon', 'STREET30'); store.del('ship');
            location.href = 'confirmacao.html';
        };
    }
    draw();
};

// confirmação
pages.confirmacao = () => {
    const o = store.get('order', null) || { id: 'ORD-89421', total: 1015.7, method: 'express', pay: 'card', card: '3812', brand: 'Visa', inst: 10, shipping: 15 };
    const user = store.get('user', { name: 'Davy Jones', email: 'davy.jones@exemplo.com' });
    const d = new Date(); const tom = new Date(Date.now() + 864e5);
    const fm = x => x.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
    const payLbl = o.pay === 'pix' ? 'PIX' : o.pay === 'apple' ? 'Apple Pay' : `Cartão de Crédito`;
    $('#conf').innerHTML = `<div class="wrap" style="padding-top:20px">
    <a class="back" href="index.html">${icon('left', 16)} Voltar ao início</a>
    <div class="ok-hero"><div class="big">${icon('check')}<i>${icon('check')}</i></div><div><span class="st">PAGAMENTO BEM-SUCEDIDO</span><h1>Pedido Confirmado!</h1><p>Seu pedido <b>#${o.id}</b> foi registrado com sucesso. Enviamos a documentação fiscal e chave de acesso para <b>${user.email || 'davy.jones@exemplo.com'}</b>.</p></div>
      <div class="acts"><a class="btn" href="rastreamento.html">${icon('pin', 14)} Rastrear envio</a><a class="btn soft" href="#">${icon('down2', 14)} Recibo &amp; DANFE (PDF)</a></div></div>
    <div class="cf"><div>
      <div class="box"><h3>${icon('truck', 20)} STATUS EM TEMPO REAL <span class="count">EM PREPARAÇÃO NO ATELIER</span></h3>
        <div class="track"><div class="s done"><span class="c">${icon('check', 16)}</span><b>Realizado</b><small>Hoje, ${d.toTimeString().slice(0, 5)}</small></div><div class="s done"><span class="c" style="background:#000;color:#fff">●</span><b>Atelier</b><small>Inspeção &amp; Dobra</small></div><div class="s"><span class="c">${icon('navi', 15)}</span><b>Em Trânsito</b><small>Previsão 14h</small></div><div class="s"><span class="c">${icon('home', 15)}</span><b>Entregue</b><small>Portaria</small></div></div>
        <div class="eta">${icon('clock', 20)}<div><small>Previsão de chegada</small><b>Amanhã, ${fm(tom)} — até às 18:00</b></div><em>⚡ Prioritário</em></div></div>
      <div class="box"><h3>${icon('pin', 20)} DETALHES DA ENTREGA</h3><div class="dgrid">
        <div><small>Destinatário &amp; Endereço</small><b>${user.name}</b><br>Av. Paulista, 1000 — Apto 84<br>Edifício Horizon — Bela Vista<br>São Paulo, SP — CEP 01310-100</div>
        <div><small>Modalidade selecionada</small><div style="display:flex;justify-content:space-between"><b>${o.method === 'express' ? 'Serviço Expresso Dedicado' : 'Entrega Padrão'}</b><b style="font-size:12px">${brl(o.shipping)}</b></div><span style="font-size:11px;color:#555">Veículo blindado com rastreamento GPS e controle térmico de embalagem têxtil.</span><div class="trk"><span><small style="margin:0">Código Fedex</small>BR-9842103584-VT</span><button class="btn soft sm" id="cpy">${icon('copy', 12)} Copiar</button></div></div></div></div>
      <div class="dark-help"><div><b>Dúvidas sobre o pedido?</b><small>Fale diretamente com nosso Suporte.</small></div><a class="btn white sm" href="#" style="height:44px">${icon('msg', 14)} WhatsApp</a></div>
    </div><div>
      <div class="box"><div class="paid"><h3>RESUMO DO PAGAMENTO</h3><span class="tag">● PAGO</span></div>
        <div class="cardline"><span class="lg">${o.pay === 'card' ? (o.brand || 'VISA').toUpperCase() : o.pay.toUpperCase()}</span><div><b>${payLbl}</b><small>${o.pay === 'card' ? `Final •••• ${o.card} (${o.inst}x sem juros)` : 'Pagamento aprovado'}</small></div><span style="margin-left:auto;color:var(--green)">${icon('shield', 18)}</span></div>
        <div class="tot"><div><b style="font-size:14px">Total Pago</b><small>Valor líquido processado</small></div><b>${brl(o.total)}</b></div>
        <a class="btn" href="#">${icon('pkg', 14)} Ver todos meus pedidos</a><a class="btn soft" href="colecao.html">${icon('bag', 14)} Continuar comprando</a></div>
      <div class="box guar"><h3>GARANTIA VESTTA</h3>
        <div class="r"><span class="ic">${icon('shield', 18)}</span><div><b>Chip NFC de Autenticidade</b>Cada peça vem com tag digital costurada internamente. Aproxime seu smartphone para conferir a tiragem e série do lote.</div></div>
        <div class="r"><span class="ic">${icon('repeat', 18)}</span><div><b>Troca Rápida em 30 Dias</b>O caimento não ficou perfeito? Coletamos gratuitamente no seu endereço sem qualquer complicação ou custo adicional.</div></div>
        <div class="r"><span class="ic">${icon('lock', 18)}</span><div><b>Embalagem Antiviolação</b>Lacre holográfico exclusivo que atesta a inviolabilidade do pacote desde o nosso centro de distribuição até suas mãos.</div></div></div>
    </div></div>
    <div class="sec" style="padding-top:40px"><div class="sec-head"><div><div class="label" style="letter-spacing:.14em">Complemente seu estilo</div><h2 class="h2">Peças curadas do Drop 04</h2></div><a class="btn soft sm" href="colecao.html" style="background:none">Ver coleção completa ${icon('right', 14)}</a></div>
      <div class="grid c4" id="conf-grid"></div></div></div>`;
    $('#conf-grid').innerHTML = PRODUCTS.slice(0, 4).map(p => productCard(p)).join(''); bindCards($('#conf-grid'));
    $('#cpy').onclick = () => { navigator.clipboard && navigator.clipboard.writeText('BR-9842103584-VT').catch(() => { }); toast('Código copiado'); };
};

// conta (login / cadastro / verificação 2FA)
pages.conta = () => {
    const VIEWS = { login: 'Entrar', cadastro: 'Criar conta', verificacao: 'Verificação' };
    let view = 'login', code = '', t = 46;
    const cells = $$('.codes .c');
    const drawCode = () => cells.forEach((c, i) => { c.textContent = code[i] || ''; c.classList.toggle('act', i === Math.min(code.length, 3)); c.classList.toggle('has', !!code[i]); });
    const pending = () => store.get('pending', { email: 'davy.jones@vestta.atelier', name: 'Davy Jones' });
    const show = () => {
        const h = location.hash.slice(1); view = VIEWS[h] ? h : 'login';
        $$('[data-view]').forEach(s => s.hidden = s.dataset.view !== view);
        document.title = VIEWS[view] + ' — VESTTA'; window.scrollTo(0, 0);
        const mt = $('.mbar .t'); if (mt) mt.textContent = { login: 'Login', cadastro: 'Cadastro', verificacao: 'Verificação OTP' }[view];
        if (view === 'verificacao') { code = ''; t = 46; drawCode(); $$('.em').forEach(e => e.textContent = pending().email); }
    };
    window.addEventListener('hashchange', show);

    const toggle = (btn, input) => btn.onclick = () => { input.type = input.type === 'password' ? 'text' : 'password'; btn.innerHTML = icon(input.type === 'password' ? 'eye' : 'eyeoff'); };
    const social = () => $$('.social button').forEach(b => b.onclick = () => { store.set('user', { name: 'Davy Jones', email: 'davy.jones@exemplo.com' }); location.href = 'index.html'; });
    social();

    // login
    toggle($('#lg-toggle'), $('#lg-pw'));
    $('#lg-form').onsubmit = e => {
        e.preventDefault(); const em = $('#lg-email').value.trim(), pw = $('#lg-pw').value;
        const okE = /^\S+@\S+\.\S+$/.test(em);
        $('#lg-email').closest('.in').classList.toggle('err', !okE); $('#lg-pw').closest('.in').classList.toggle('err', pw.length < 6);
        if (!okE || pw.length < 6) return toast('Verifique e-mail e senha');
        store.set('pending', { email: em, name: em.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) });
        location.hash = 'verificacao';
    };

    // cadastro
    const pw = $('#cd-pw');
    const score = v => [v.length >= 8, /[A-Z]/.test(v), /\d/.test(v), /[^\w\s]/.test(v)].filter(Boolean).length;
    const upd = () => { const s = score(pw.value); $$('.strength i').forEach((b, i) => b.classList.toggle('on', i < s)); $('#str').textContent = ['', 'FRACA', 'MÉDIA', 'BOA', 'FORTE'][s] || ''; };
    pw.oninput = upd; upd(); toggle($('#cd-toggle'), pw);
    $('#cd-form').onsubmit = e => {
        e.preventDefault(); const n = $('#cd-nome').value.trim(), em = $('#cd-email').value.trim();
        const bad = [n.length < 2, !/^\S+@\S+\.\S+$/.test(em), pw.value.length < 8, !$('#cd-terms').checked];
        $('#cd-nome').closest('.in').classList.toggle('err', bad[0]); $('#cd-email').closest('.in').classList.toggle('err', bad[1]); pw.closest('.in').classList.toggle('err', bad[2]);
        if (bad.includes(true)) return toast(bad[3] && !bad[0] && !bad[1] && !bad[2] ? 'Aceite os termos para continuar' : 'Revise os campos do cadastro');
        store.set('pending', { email: em, name: n }); location.hash = 'verificacao';
    };

    // verificação
    const press = k => { if (view !== 'verificacao') return; if (k === 'x') code = code.slice(0, -1); else if (code.length < 4) code += k; drawCode(); };
    $$('.keypad button').forEach(b => b.onclick = () => b.dataset.k && press(b.dataset.k));
    document.addEventListener('keydown', e => { if (view !== 'verificacao') return; if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('x'); else if (e.key === 'Enter') $('#confirm').click(); });
    const tick = () => { const s = '00:' + String(t).padStart(2, '0'); $$('.timer').forEach(x => x.textContent = s); $('#tbar').style.width = (t / 46 * 100) + '%'; if (t > 0) t--; };
    tick(); setInterval(tick, 1000);
    $('#resend').onclick = e => { e.preventDefault(); if (t > 0) return toast('Aguarde o contador'); t = 46; code = ''; drawCode(); toast('Novo código enviado'); };
    $('#confirm').onclick = () => {
        if (code.length < 4) return toast('Digite os 4 dígitos do código');
        const p = pending(); store.set('user', { name: p.name, email: p.email }); store.del('pending');
        location.href = new URLSearchParams(location.search).get('next') || 'index.html';
    };
    show();
};

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
