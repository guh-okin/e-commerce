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

// telas da conta
Object.assign(P, {
    volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    sparkle: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15v4M17 17h4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12A9 9 0 0 1 18.5 5.8L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.300A4.700 4.700 0 0 0 22 10.700C22 5.800 17.500 2 12 2z"/>',
    finger: '<path d="M12 11a2 2 0 0 0-2 2c0 3-1 5-2 7M12 7a6 6 0 0 0-6 6c0 2 0 4-1 6M17 12a5 5 0 0 0-10 0M9 3.500A9 9 0 0 1 21 12c0 2 0 4-.5 6M15 20c.5-1.500 1-3.500 1-6"/>',
    ticket: '<path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><path d="M13 5v14"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    ruler: '<path d="M3 17h18M3 13h18M7 13v4M11 13v4M15 13v4"/>',
    locate: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    traffic: '<rect x="8" y="2" width="8" height="20" rx="3"/><circle cx="12" cy="7" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="17" r="1"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-5h6v5M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/>',
    verified: '<path d="m3.8 12 1.6-2.200-.3-2.700 2.700-.5L9.200 4.300 12 5.200l2.800-.9 1.400 2.300 2.700.5-.3 2.700L20.200 12l-1.600 2.200.3 2.700-2.700.5-1.400 2.300-2.800-.9-2.800.9-1.400-2.300-2.700-.5.3-2.700z"/><path d="m9 12 2 2 4-4"/>',
    idcard: '<rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="11" r="2.500"/><path d="M5.500 17a3.500 3.500 0 0 1 7 0M15 10h4M15 14h4"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    plus2: '<path d="M12 5v14M5 12h14"/>'
});
const isMobile = () => matchMedia('(max-width:768px)').matches;
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const fmtDate = iso => { const d = new Date(iso); return `${String(d.getDate()).padStart(2, '0')} ${MESES[d.getMonth()]} ${d.getFullYear()}`; };
const initialsOf = n => esc(String(n).split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase());
function requireUser() {
    const u = store.get('user', null);
    if (!u) { location.replace('conta.html?next=' + encodeURIComponent(location.pathname.split('/').pop() || 'perfil.html') + '#login'); return null; }
    return u;
}
const noHash = root => $$('a[href="#"]', root).forEach(a => a.addEventListener('click', e => e.preventDefault()));

// perfil e config
function accountHtml(u, mob, o) {
    const fav = favs().size;
    const items = [
        // [chave, ícone, rótulo desktop, rótulo mobile, subtítulo mobile, meta desktop, href, escopo d|m|b]
        ['geral', 'grid', 'Visão Geral', '', '', '•', 'perfil.html', 'd'],
        ['pedidos', 'pkg', 'Meus Pedidos', 'Meus Pedidos', 'Histórico, andamento e devoluções', 'pill:1 em trânsito', 'perfil.html#pedidos', 'b'],
        ['salvas', 'heart', 'Peças Salvas', '', '', String(fav), 'favoritos.html', 'd'],
        ['aval', 'msg', 'Avaliações & Pontos', 'Avaliações de Produtos', 'Deixe sua opinião e ganhe pontos', '›', '#', 'b'],
        ['cupons', 'ticket', 'Cupons & Descontos', 'Cupons & Descontos', '3 vouchers disponíveis para uso', 'gpill:3 ativos', '#', 'b'],
        ['dados', 'idcard', 'Dados Pessoais', 'Meus Dados Pessoais', 'Nome, e-mail, telefone e nascimento', '›', 'dados.html', 'b'],
        ['end', 'pin', 'Endereços de Entrega', 'Endereços de Entrega', '2 endereços cadastrados (Padrão: SP)', '2 salvos', 'enderecos.html', 'b'],
        ['pag', 'card', 'Formas de Pagamento', 'Formas de Pagamento', 'Visa final 3812 e Mastercard final 5625', '›', 'pagamentos.html', 'b'],
        ['config', 'filter', 'Configurações & Privacidade', '', '', '•', 'configuracoes.html', 'd'],
        ['cfgapp', 'gear', '', 'Configurações do App', 'Notificações push, tema e idioma', '›', 'configuracoes.html', 'm'],
        ['faq', 'help', '', 'Perguntas Frequentes (FAQ)', 'Tire dúvidas sobre prazos, trocas e frete', '›', '#', 'm'],
        ['ajuda', 'headset', '', 'Central de Ajuda', 'Fale com um consultor pelo chat 24h', '›', '#', 'm']
    ];
    const row = it => {
        const [k, ic, d, m, sub, meta, href, sc] = it;
        if ((sc === 'd' && mob) || (sc === 'm' && !mob)) return '';
        const pill = meta.startsWith('pill:') ? `<span class="apill">${meta.slice(5)}</span>` : meta.startsWith('gpill:') ? `<span class="apill g">${meta.slice(6)}</span>` : '';
        const right = mob ? pill + icon('chev', 16)
            : pill || (meta === '•' ? '<i class="adot"></i>' : meta === '›' ? icon('chev', 16) : `<small class="ameta">${meta}</small>`);
        return `<a class="ai ${k === o.active ? 'on' : ''}" href="${href}">${icon(ic, 20)}<span class="at"><b>${mob ? m : d}</b>${mob && sub ? `<small>${sub}</small>` : ''}</span>${right}</a>`;
    };
    const grp = (t, r, keys) => `<div class="agrp"><div class="agh"><span>${t}</span><span>${r}</span></div><div class="agl">${items.filter(i => keys.includes(i[0])).map(row).join('')}</div></div>`;
    const side = `<aside class="aside card" id="pedidos-anchor">
    ${grp('Minhas compras', mob ? 'Atividade recente' : 'Atividade', ['geral', 'pedidos', 'salvas', 'aval', 'cupons'])}
    ${grp(mob ? 'Conta & dados' : 'Conta & pagamentos', '', ['dados', 'end', 'pag', 'config'])}
    ${mob ? grp('Preferências & suporte', '', ['cfgapp', 'faq', 'ajuda']) : ''}
    <button class="alogout" id="logout">${icon('logout', 16)} Encerrar sessão</button>
    <p class="aver">Versão 2.4.0 • Build 892</p></aside>`;
    const head = `<section class="card phead"><div class="pav"><span>${initialsOf(u.name)}</span><button class="cam" type="button" aria-label="Alterar foto">${icon('camera', 15)}</button></div>
    <div class="pinfo"><h1>${esc(u.name)}</h1><span class="tag"><i class="rd"></i> Membro VESTTA // Nível 03</span><p>${esc(u.email || 'davy.jones@exemplo.com')}</p><small>Desde outubro de 2023 <i class="sep"></i> <a href="dados.html">Editar dados ↗</a></small></div>
    <button class="pedit" type="button" aria-label="Editar dados">${icon('edit', 18)}</button>
    <div class="pstats"><div><b>12</b><small>Pedidos</small></div><div><b>${fav}</b><small>Salvos</small></div><div><b>3</b><small>Cupons</small></div></div></section>`;
    const banner = `<section class="trkb" data-go="rastreamento.html"><span class="tic">${icon('truck', 22)}</span>
    <div class="tbt"><small><i class="rd"></i> Rastreio em tempo real <em class="dk">#ORD-89421</em><span class="st dk">Em trânsito</span></small>
      <b class="dk">Previsão: Hoje até às 18:00 com courier parceiro Lucas Mendes</b><b class="mo">#ORD-89421 • Em Trânsito</b>
      <small class="dest dk">Destino: Av. Paulista, 1000 — Bela Vista, São Paulo/SP</small><small class="dest mo">Previsão: Chega hoje até 18h</small></div>
    <div class="tbb dk"><a class="btn white" href="rastreamento.html">Rastrear entrega ${icon('navi', 15)}</a><a class="btn ghost" href="rastreamento.html">Ver detalhes</a></div>
    <span class="tgo mo">${icon('right', 18)}</span><span class="tdeco dk">${icon('truck', 120)}</span></section>`;
    const showTop = !o.noTop && (!mob || o.mobTop), showSide = !mob || o.mobSide;
    return `<div class="wrap acct">
    <div class="crumbs"><a href="index.html">Início</a><span>/</span><a href="perfil.html">Minha conta</a><span>/</span><b>${o.crumb}</b></div>
    ${showTop ? head + banner : ''}
    <div class="agrid ${showSide ? '' : 'noside'}">${showSide ? side : ''}<div class="amain">${o.inner(mob, u)}</div></div></div>`;
}
function accountPage(o) {
    const u = requireUser(); if (!u) return;
    const root = $('#acct');
    const render = () => {
        const mob = isMobile();
        root.innerHTML = accountHtml(u, mob, o);
        const lo = $('#logout'); if (lo) lo.onclick = () => { store.del('user'); location.href = 'conta.html#login'; };
        $$('[data-go]', root).forEach(el => el.addEventListener('click', e => { if (mob && !e.target.closest('a')) location.href = el.dataset.go; }));
        const cam = $('.cam', root); if (cam) cam.onclick = () => toast('Troca de foto disponível em breve');
        const ped = $('.pedit', root); if (ped) ped.onclick = () => location.href = 'dados.html';
        noHash(root);
        if (o.bind) o.bind(root, mob, render);
        if (location.hash === '#pedidos') { const t = $('#recentes'); if (t) t.scrollIntoView(); }
    };
    render();
    matchMedia('(max-width:768px)').addEventListener('change', render);
}

// perfil
pages.perfil = () => accountPage({
    active: 'geral', crumb: 'Visão geral', mobTop: true, mobSide: true,
    inner: (mob, u) => {
        if (mob) return '';
        const names = it => it.map(i => (byId(i.id) || {}).name).filter(Boolean);
        const card = c => `<div class="ocard"><div class="oh"><div class="c"><small>Pedido</small><b>#${c.id}</b></div><div class="c"><small>Data</small><b>${c.date}</b></div><div class="c"><small>Total</small><b>${c.total}</b></div><span class="sb ${c.done ? 'ok' : ''}">${c.status}</span></div>
      <div class="oi2"><div class="othw">${c.thumbs.map(t => `<div class="oth">${pic(byId(t), '')}<em>1x</em></div>`).join('')}</div><div class="otx"><b>${c.title}</b><small>${c.sub}</small><small class="up">${c.note}</small></div><div class="oact">${c.actions}</div></div></div>`;
        const real = store.get('order', null);
        const cards = [];
        if (real && real.id !== 'ORD-89421' && (real.items || []).length) {
            const n = names(real.items);
            cards.push(card({
                id: real.id, date: fmtDate(real.date), total: brl(real.total), status: 'Em preparação', thumbs: real.items.slice(0, 2).map(i => i.id), title: n.slice(0, 2).join(' + '),
                sub: 'Tamanhos: ' + real.items.map(i => i.size).join(' e ') + ' • Cor: ' + real.items.map(i => i.color).join(' / '), note: 'Previsão: chega amanhã até às 18:00',
                actions: '<a class="btn sm" href="rastreamento.html">Rastrear</a><a class="btn soft sm" href="#">DANFE PDF</a>'
            }));
        }
        cards.push(card({
            id: 'ORD-89421', date: '14 Março 2025', total: 'R$ 1.190,00', status: 'Em trânsito', thumbs: ['boxy-slogan-tee', 'baggy-denim'], title: 'Camiseta Regular Fit Slogan + Calça Wide Atelier',
            sub: 'Tamanhos: G e 42 • Cor: Onyx Black / Charcoal', note: 'Previsão: chega hoje até às 18:00', actions: '<a class="btn sm" href="rastreamento.html">Rastrear</a><a class="btn soft sm" href="#">DANFE PDF</a>'
        }));
        cards.push(card({
            id: 'ORD-87110', date: '02 Fevereiro 2025', total: 'R$ 680,00', status: 'Entregue', done: 1, thumbs: ['grey-pullover-hoodie'], title: 'Heavyweight Boxy Hoodie // Mineral Grey',
            sub: 'Tamanho: GG • Coleção Drop 03', note: 'Entregue em 05/02/2025', actions: '<a class="btn soft sm" href="#">Avaliar produto</a><a class="btn sm" href="produto.html?id=heavyweight-hoodie">Comprar novamente</a>'
        }));
        return `<section class="card rec" id="recentes"><div class="rh"><div><small>Histórico de compras</small><h2>Pedidos Recentes</h2></div><a href="#">Ver todos (12) ${icon('right', 14)}</a></div>${cards.join('')}</section>
      <div class="dgrid2">
        <section class="card dcard"><div class="dh"><b>${icon('pin', 17)} Endereço Padrão</b><span class="tag">Padrão</span></div>
          <div class="dbox"><b>${esc(u.name)} (Residencial)</b><br>Av. Paulista, 1000 — Apto 84<br>Bela Vista, São Paulo — SP<br><span class="up" style="font-size:10px;color:#666">CEP: 01310-100</span></div>
          <div class="df"><a href="enderecos.html" class="mut">Gerenciar todos (2)</a><a class="btn soft sm" href="enderecos.html">Editar endereço</a></div></section>
        <section class="card dcard"><div class="dh"><b>${icon('card', 17)} Cartão Padrão</b><span class="tag">Padrão</span></div>
          <div class="cbox"><span class="vs">VISA</span><div><b>•••• 3812</b><small>Expira em 08/27</small></div><span class="ck">${icon('check', 14)}</span></div>
          <div class="df"><small>Formas salvas (2)</small><a class="btn soft sm" href="pagamentos.html">Alterar cartão</a></div></section>
      </div>`;
    }
});

// configurações
pages.configuracoes = () => {
    const DEF = { notif: true, drops: true, sound: true, promo: true, orders: true, beta: false, twofa: true, theme: 'claro', lang: 'Português (Brasil)', cur: 'Real Brasileiro (R$ · BRL)', shoe: 'BR (41 · 42) / 10 US' };
    let saved = { ...DEF, ...store.get('settings', {}) }, draft = { ...saved }, devices = [true, true];
    const tg = (k, ic, t, s) => `<div class="srow"><span class="ico">${icon(ic, 18)}</span><div class="tx"><b>${t}</b><small>${s}</small></div><button type="button" class="sw-t ${draft[k] ? 'on' : ''}" data-t="${k}" aria-label="${t}"></button></div>`;
    const sel = (k, ic, t, s, opts) => `<div class="selc"><div class="t"><span class="ico">${icon(ic, 17)}</span><div><b>${t}</b><small>${s}</small></div></div><label>${`<select data-s="${k}">${opts.map(x => `<option ${x === draft[k] ? 'selected' : ''}>${x}</option>`).join('')}</select>`}${icon('down', 15)}</label></div>`;
    accountPage({
        active: 'config', crumb: 'Configurações', noTop: true, mobTop: false, mobSide: false,
        inner: () => `
      <section class="card shead"><span class="sic">${icon('filter', 24)}</span><div><small>Preferências do sistema</small><h1>Configurações da Conta &amp; Preferências</h1><p>Gerencie alertas de drops exclusivos, segurança, dados pessoais e parâmetros da plataforma.</p></div></section>
      <section class="card sset"><div class="sh"><h3>${icon('bell', 20)} NOTIFICAÇÕES &amp; ALERTAS</h3><small>Tempo real</small></div>
        ${tg('notif', 'bell', 'Notificações Gerais', 'Alertas essenciais de conta, login e envios logísticos')}
        ${tg('drops', 'flame', 'Ofertas Especiais & Drops', 'Acesso antecipado prioritário de lançamentos e tiragens limitadas')}
        ${tg('sound', 'volume', 'Sons e Alertas Sonoros', 'Efeitos acústicos dedicados nos alertas instantâneos')}
        ${tg('promo', 'ticket', 'Promoções e Cupons Sazonais', 'Descontos selecionados, parcerias e códigos exclusivos')}
        ${tg('orders', 'truck', 'Atualizações de Pedidos em Tempo Real', 'Rastreamento etapa por etapa, de separação até a entrega final')}
        ${tg('beta', 'sparkle', 'Novos Recursos & Versões Beta', 'Testar antecipadamente melhorias da interface e novos módulos')}
      </section>
      <section class="card sset"><div class="sh"><h3>${icon('palette', 20)} PREFERÊNCIAS DE EXIBIÇÃO &amp; APP</h3><small>Interface</small></div>
        <div class="theme"><div><b>Tema da Plataforma</b><small>Defina o contraste estético de navegação</small></div>
          <div class="seg3">${[['claro', 'sun', 'Claro'], ['escuro', 'moon', 'Escuro'], ['auto', 'monitor', 'Automático']].map(t => `<button type="button" data-theme="${t[0]}" class="${draft.theme === t[0] ? 'on' : ''}">${icon(t[1], 14)} ${t[2]}</button>`).join('')}</div></div>
        <div class="sel3">
          ${sel('lang', 'globe', 'Idioma', 'Localização', ['Português (Brasil)', 'English (US)', 'Español'])}
          ${sel('cur', 'cash', 'Moeda de Cobrança', 'Checkout & Catálogo', ['Real Brasileiro (R$ · BRL)', 'Dólar (US$ · USD)', 'Euro (€ · EUR)'])}
          ${sel('shoe', 'ruler', 'Tamanho Calçados', 'Filtro Rápido Sneakers', ['BR (41 · 42) / 10 US', 'BR (39 · 40) / 8 US', 'BR (43 · 44) / 12 US'])}
        </div></section>
      <section class="card sset"><div class="sh"><h3>${icon('shield', 20)} SEGURANÇA &amp; PRIVACIDADE</h3></div>
        <div class="srow"><span class="ico">${icon('finger', 18)}</span><div class="tx"><b>Autenticação em Duas Etapas &amp; Biometria <span class="rec2">Recomendado</span></b><small>Face ID / Touch ID ativo para autorização de pagamentos expressos e logins</small></div><button type="button" class="sw-t ${draft.twofa ? 'on' : ''}" data-t="twofa" aria-label="Autenticação em duas etapas"></button></div>
        <div class="srow"><span class="ico">${icon('refresh', 18)}</span><div class="tx"><b>Senha da Conta</b><small>Última troca realizada há 3 meses • Nível de força: Excelente</small></div><button type="button" class="btn white sm" id="pwd">Atualizar senha ${icon('edit', 13)}</button></div>
        <div class="label" style="margin:18px 0 8px">Dispositivos conectados recentemente</div>
        <div class="dev">
          <div class="devc"><span class="ico">${icon('monitor', 18)}</span><div><b>MacBook Pro 16" <i class="rd"></i></b><small>Sessão Atual • São Paulo, Brasil</small><small class="mut">Chrome 122.0 • IP 189.40.***</small></div><span class="act">Ativo</span></div>
          ${devices[1] ? `<div class="devc"><span class="ico">${icon('phone', 18)}</span><div><b>iPhone 15 Pro <i class="rd"></i></b><small>App VESTTA iOS • Ativo agora</small><small class="mut">iOS 17.4 • Biometria On</small></div><button type="button" class="dout" aria-label="Encerrar sessão do dispositivo">${icon('logout', 16)}</button></div>` : ''}
        </div>
        <a class="srow lgpd" href="#"><span class="ico">${icon('shield', 18)}</span><div class="tx"><b>Política de Privacidade &amp; Gestão LGPD</b><small>Transparência rigorosa sobre armazenamento e uso de dados pessoais</small></div>${icon('ext', 17)}</a>
      </section>
      <div class="sact"><button type="button" class="btn soft sm cache" id="cache">${icon('refresh', 14)} Limpar cache &amp; histórico (48.2 MB)</button><div class="r"><button type="button" class="btn white" id="discard">Descartar</button><button type="button" class="btn" id="save">Salvar alterações ${icon('check', 15)}</button></div></div>`,
        bind: (root, mob, rerender) => {
            $$('[data-t]', root).forEach(b => b.onclick = () => { draft[b.dataset.t] = !draft[b.dataset.t]; b.classList.toggle('on', draft[b.dataset.t]); });
            $$('[data-theme]', root).forEach(b => b.onclick = () => { draft.theme = b.dataset.theme; $$('[data-theme]', root).forEach(x => x.classList.toggle('on', x === b)); });
            $$('[data-s]', root).forEach(s => s.onchange = () => { draft[s.dataset.s] = s.value; });
            const out = $('.dout', root); if (out) out.onclick = () => { devices[1] = false; toast('Sessão encerrada no iPhone 15 Pro'); rerender(); };
            $('#pwd', root).onclick = () => toast('Enviamos um link de redefinição para o seu e-mail');
            $('#cache', root).onclick = () => toast('Cache e histórico limpos');
            $('#save', root).onclick = () => { saved = { ...draft }; store.set('settings', saved); toast('Preferências salvas'); };
            $('#discard', root).onclick = () => { draft = { ...saved }; devices = [true, true]; rerender(); toast('Alterações descartadas'); };
        }
    });
};

// favoritos
pages.favoritos = () => {
    if (store.get('favs', null) === null) store.set('favs', ['chunky-runner-black', 'bomber-street-jacket', 'black-statement-hoodie', 'boxy-slogan-tee', 'tech-cargo-pants', 'utility-track-jacket', 'heavyweight-hoodie', 'oversized-logo-tee']);
    const root = $('#fav'); let cat = 'todos', sort = 'recentes';
    const NAMES = { camisetas: 'Camisetas', moletons: 'Moletons', jaquetas: 'Jaquetas', calcas: 'Calças', tenis: 'Calçados', acessorios: 'Acessórios' };
    const user = store.get('user', null);
    function draw() {
        const ids = store.get('favs', []);
        const all = ids.slice().reverse().map(byId).filter(Boolean);
        const count = k => all.filter(p => p.cat === k).length;
        if (cat !== 'todos' && !count(cat)) cat = 'todos';
        let list = all.filter(p => cat === 'todos' || p.cat === cat);
        if (sort === 'menor') list.sort((a, b) => a.price - b.price);
        if (sort === 'maior') list.sort((a, b) => b.price - a.price);
        if (sort === 'avaliacao') list.sort((a, b) => b.rating - a.rating);
        const chips = `<button class="chip ${cat === 'todos' ? 'on' : ''}" data-cat="todos">Todos (${all.length})</button>` + Object.keys(NAMES).filter(count).map(k => `<button class="chip ${cat === k ? 'on' : ''}" data-cat="${k}">${NAMES[k]} (${count(k)})</button>`).join('');
        const card = p => `<article class="pcard fcard" data-id="${p.id}">
      <a class="img" href="produto.html?id=${p.id}">${p.tag ? `<span class="tag ${p.tagRed ? 'red' : ''}">${p.tag}</span>` : ''}${pic(p)}</a>
      <button class="fav on" data-unfav="${p.id}" aria-label="Remover dos favoritos">${icon('heart', 17)}</button>
      <div class="meta"><span>${p.colors.join(' / ')}</span><b>${icon('star')}${p.rating.toFixed(1)} (${p.reviews})</b></div>
      <a class="name" href="produto.html?id=${p.id}" style="display:block">${p.name}</a>
      <div class="row"><span class="price">${brl(p.price)}${p.old ? `<s>${brl(p.old)}</s>` : ''}</span></div>
      <button class="btn mv" data-mv="${p.id}">${icon('bag', 15)} Mover p/ sacola</button></article>`;
        root.innerHTML = `<div class="wrap fav-page">
      <div class="crumbs"><a href="index.html">Início</a><span>/</span><a href="perfil.html">Minha conta</a><span>/</span><b>Meus favoritos</b></div>
      <div class="mfh mo"><button type="button" class="mb" data-back aria-label="Voltar">${icon('left', 22)}</button><h1>Meus Favoritos <span class="count">${all.length} itens</span></h1><span class="mr"><button type="button" class="mb" data-share aria-label="Compartilhar">${icon('share', 19)}</button><a class="av-m" href="${user ? 'perfil.html' : 'conta.html#login'}">${user ? initialsOf(user.name) : icon('user', 17)}</a></span></div>
      <h1 class="ftitle dk">MEUS FAVORITOS <span class="count">${all.length} itens</span></h1>
      <p class="fsub">Peças reservadas e salvas na sua curadoria pessoal VESTTA Atelier.</p>
      <div class="ftool"><div class="chips">${chips}</div><label class="fsort"><span>Ordenar por:</span><select id="fsort"><option value="recentes">Adicionados Recentemente</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option><option value="avaliacao">Melhor avaliação</option></select></label></div>
      ${list.length ? `<div class="grid c4 fgrid">${list.map(card).join('')}</div>` : `<div class="empty"><h2 class="h2">Nenhuma peça salva</h2><p>Toque no coração dos produtos para guardar seus favoritos aqui.</p><a class="btn" href="colecao.html">Explorar coleção ${icon('right', 16)}</a></div>`}
      <div class="resv mo"><span class="ic">${icon('timer', 18)}</span><div><b>Reserva Temporária de Estoque</b><p>Dica: Seus itens favoritados ficam protegidos por até 48 horas caso restem menos de 3 peças em nosso estoque.</p></div></div></div>`;
        $('#fsort').value = sort;
        $('#fsort').onchange = e => { sort = e.target.value; draw(); };
        $$('.chip', root).forEach(c => c.onclick = () => { cat = c.dataset.cat; draw(); });
        $$('[data-unfav]', root).forEach(b => b.onclick = () => { store.set('favs', store.get('favs', []).filter(i => i !== b.dataset.unfav)); updateBadges(); toast('Removido dos favoritos'); draw(); });
        $$('[data-mv]', root).forEach(b => b.onclick = () => { addToCart(b.dataset.mv); store.set('favs', store.get('favs', []).filter(i => i !== b.dataset.mv)); updateBadges(); toast('Movido para a sacola'); draw(); });
        $$('[data-back]', root).forEach(b => b.onclick = () => history.length > 1 ? history.back() : (location.href = 'index.html'));
        $$('[data-share]', root).forEach(b => b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(location.href).catch(() => { }); toast('Link copiado'); });
        updateBadges();
    }
    draw();
};

// rastreamento
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
function mapSvg() {
    const r = rng(11); let thin = '';
    for (let i = 0; i < 28; i++) { const x = -60 + i * 30 + r() * 12; thin += `<path d="M${x.toFixed(0)} -20 L${(x + 190 + r() * 40).toFixed(0)} 580"/>`; }
    for (let i = 0; i < 22; i++) { const y = -20 + i * 28 + r() * 10; thin += `<path d="M-20 ${y.toFixed(0)} L730 ${(y + 150 - r() * 60).toFixed(0)}"/>`; }
    const avenues = ['M-20 430 C150 390 300 310 460 255 S650 130 740 70', 'M-20 160 C120 190 250 175 380 230 S600 330 740 360', 'M120 -20 C170 120 220 260 300 420 S380 540 420 580', 'M520 -20 C500 120 560 230 600 330 S650 480 690 580'];
    const lbl = (x, y, t, s = 11) => `<text x="${x}" y="${y}" font-size="${s}" letter-spacing="1.6" fill="#8c8c8c">${t}</text>`;
    return `<svg class="map" viewBox="0 0 708 540" preserveAspectRatio="xMidYMid slice" aria-label="Mapa da rota de entrega"><rect width="708" height="540" fill="#e8e8e8"/>
    <g id="mapg"><g fill="#dadcd6"><path d="M40 250q50-40 110-10t30 60q-60 40-130 10z"/><path d="M430 60q70-30 120 10t-20 70q-90 20-100-80z"/><path d="M560 400q50-20 90 10t-10 60q-70 10-80-70z"/></g>
    <g fill="none" stroke="#f7f7f7" stroke-width="1.4">${thin}</g>
    <g fill="none" stroke="#d3d3d3" stroke-width="8" stroke-linecap="round">${avenues.map(a => `<path d="${a}"/>`).join('')}</g>
    <g fill="none" stroke="#fff" stroke-width="5.500" stroke-linecap="round">${avenues.map(a => `<path d="${a}"/>`).join('')}</g>
    ${lbl(330, 20, 'CACHOEIRINHA')}${lbl(270, 75, 'SANTANA')}${lbl(120, 205, 'LAPA')}${lbl(420, 190, 'BRÁS')}${lbl(520, 205, 'TATUAPÉ')}${lbl(60, 330, 'VILA MADALENA')}${lbl(170, 395, 'PINHEIROS')}${lbl(300, 400, 'ITAIM BIBI')}${lbl(400, 470, 'VILA MARIANA')}${lbl(500, 395, 'PARAÍSO')}${lbl(560, 500, 'SÃO CAETANO')}
    <text x="215" y="320" font-size="30" font-weight="700" fill="#555" letter-spacing="-.5">São Paulo</text>
    <path id="route" d="M120 110 C250 160 330 215 385 290 S500 400 545 440" fill="none" stroke="#111" stroke-width="3.500" stroke-dasharray="7 7" stroke-linecap="round"/>
    <g transform="translate(120 110)"><circle r="7" fill="#111" stroke="#fff" stroke-width="3"/><g transform="translate(14 -34)"><rect width="112" height="26" rx="13" fill="#fff" stroke="#e2e2e2"/><text x="14" y="17" font-size="10" font-weight="700" letter-spacing="1">CENTRO CD</text></g></g>
    <g transform="translate(545 440)"><circle r="11" fill="#111" stroke="#fff" stroke-width="3"/><g transform="translate(-136 12)"><rect width="128" height="26" rx="13" fill="#111"/><text x="16" y="17" font-size="10" font-weight="700" letter-spacing="1" fill="#fff">SEU ENDEREÇO</text></g></g>
    <g id="truck"><circle r="25" fill="#111" stroke="#fff" stroke-width="3"/><g transform="translate(-12 -12)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P.truck}</g>
      <g transform="translate(0 42)"><rect x="-42" y="-12" width="84" height="24" rx="12" fill="#111"/><circle cx="-27" cy="0" r="3.500" fill="#22c55e"/><text x="-17" y="4" font-size="10" font-weight="700" fill="#fff" letter-spacing="1">EM ROTA</text></g></g></g></svg>`;
}
pages.rastreamento = () => {
    const root = $('#trk');
    const real = store.get('order', null);
    const id = (real && real.id) || 'ORD-89421';
    const its = (real && (real.items || []).length ? real.items : [{ id: 'boxy-slogan-tee', color: 'Preto', size: 'M', qty: 1 }, { id: 'wide-cargo-onyx', color: 'Ônix', size: '42', qty: 1 }]).filter(i => byId(i.id));
    const nm = its.map(i => byId(i.id).name);
    const user = store.get('user', null);
    const step = (cls, ic, t, tm, d) => `<div class="ts ${cls}"><span class="dotc">${icon(ic, 14)}</span><div class="tx"><b>${t}${cls === 'act' ? ' <i class="gd"></i>' : ''}</b><small>${d}</small></div><time>${tm}</time></div>`;
    root.innerHTML = `<div class="wrap trkpg">
    <div class="crumbs"><a href="index.html">Início</a><span>/</span><a href="perfil.html#pedidos">Meus Pedidos</a><span>/</span><b>Rastrear #${id}</b></div>
    <div class="trk-head dk"><div><h1>RASTREAR PEDIDO #${id}</h1><span class="tag big"><i class="gd"></i> Em trânsito // Entrega expressa</span></div>
      <div class="eta2"><span class="tic">${icon('truck', 22)}</span><div><small>Chegada estimada</small><b>Hoje, até às 18:00 (~<i class="eta-m">18</i> min)</b></div></div></div>
    <div class="trk-grid">
      <section class="mapcard">${mapSvg()}
        <div class="mchip"><i class="rd"></i> Chegada em aprox. <span class="eta-m">18</span> min</div>
        <div class="mctl"><button type="button" id="mloc" aria-label="Centralizar">${icon('navi', 18)}</button><button type="button" id="mtr" aria-label="Trânsito">${icon('traffic', 18)}</button><div class="zoom"><button type="button" id="zin" aria-label="Aproximar">${icon('plus', 17)}</button><button type="button" id="zout" aria-label="Afastar">${icon('minus', 17)}</button></div></div>
        <div class="mbar2"><span><i class="gd"></i> TRÂNSITO FLUIDO <em>•</em> <span class="mut">Trajeto via Av. Rebouças</span></span><span class="mut">Distância: <b id="dist">3.8</b> km restantes</span></div></section>
      <div class="mhead mo"><div><small class="label">Código de envio <span class="exp">Expresso</span></small><h2>#${id}</h2></div><div class="r"><span class="tag big">● Em trânsito</span><small>Previsão: Hoje, 18:00</small></div></div>
      <aside class="trk-side">
        <div class="tcard pp"><div class="th"><span class="ic">${icon('pin', 20)}</span><div><small class="label">Ponto de entrega</small><b>Av. Paulista, 1000 • Apt 84</b><small>Bela Vista, São Paulo — SP <span class="dk">• CEP 01310-100</span></small></div><a class="ins" href="#">Instruções</a></div>
          <div class="note dk">${icon('help', 14)} Instrução ativa: "Deixar na portaria com identificação civil."</div></div>
        <div class="tcard prog"><div class="th"><h3>PROGRESSO <span class="dk">DO ENVIO</span><span class="mo">DA ENTREGA</span></h3><span class="pill2">Etapa 3 de 4</span></div>
          <div class="tls">${step('done', 'check', 'Pedido Confirmado', '10:24', 'Pagamento aprovado e registrado no hub central VESTTA.')}${step('done', 'check', 'Pacote Preparado e Embalado', '13:10', 'Conferência de qualidade no Centro de Distribuição Pinheiros.')}${step('act', 'navi', 'Em Trânsito com Entregador', '15:45', 'Lucas coletou seu pacote e está em deslocamento até seu endereço.')}${step('pend', 'pkg', 'Entrega no Endereço', 'Hoje, ~18:00', 'Requer confirmação de recebimento com o código PIN 5821.')}</div></div>
        <div class="tcard courier mo"><div class="cr"><span class="cav">LM<i>${icon('star', 9)}</i></span><div><b>Lucas Mendes ${icon('verified', 15)}</b><small>Entregador Parceiro • 4.9 (1.240 entregas)</small></div><span class="moto">Moto CG</span></div>
          <div class="cact"><span class="plate">${icon('idcard', 16)} STR-2025</span><a class="btn soft" href="#">${icon('msg', 15)} Mensagem</a><a class="btn" href="tel:+5511988224411">${icon('phone', 15)} Ligar</a></div></div>
        <div class="tcard acc2"><button type="button" class="ah" id="itbtn"><span class="thm">${pic(byId(its[0].id), '')}<em>${its.reduce((a, i) => a + i.qty, 0)}</em></span><div><b class="dk">Itens neste Pacote</b><b class="mo">Ver Itens do Pedido (${its.reduce((a, i) => a + i.qty, 0)} ${its.length > 1 || its[0].qty > 1 ? 'itens' : 'item'})</b><small class="dk">${nm[0]}</small><small class="mo">${nm.join(' + ')}</small></div>${icon('down', 18)}</button>
          <div class="ab">${its.map(i => { const p = byId(i.id); return `<div class="oi"><span class="th">${pic(p, '')}</span><div><b>${p.name}</b><small>${i.color} • Tam ${i.size} • Qtd ${i.qty}</small></div></div>`; }).join('')}</div></div>
        <div class="tcard supp dk"><span class="ic">${icon('headset', 20)}</span><div><b>Precisa de suporte com o pacote?</b><small>Suporte VESTTA disponível 24h para assistência.</small></div><a class="btn white sm" href="#">Falar ${icon('right', 13)}</a></div>
        <p class="safe mo">${icon('shield', 15)} Entrega protegida com código de segurança de 4 dígitos</p>
      </aside></div></div>`;
    noHash(root);
    // animação da rota
    const path = $('#route'), L = path.getTotalLength(), truck = $('#truck'); let p = .45, z = 1;
    const place = () => {
        const pt = path.getPointAtLength(L * p); truck.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
        const rest = (1 - p) / .55; const m = Math.max(1, Math.round(rest * 18));
        $$('.eta-m', root).forEach(e => e.textContent = m); $('#dist').textContent = (rest * 3.8).toFixed(1);
    };
    const zoom = () => $('#mapg').setAttribute('transform', `translate(354 270) scale(${z}) translate(-354 -270)`);
    place();
    setInterval(() => { if (p < .96) { p += .004; place(); } }, 3000);
    $('#zin').onclick = () => { z = Math.min(1.6, z + .2); zoom(); };
    $('#zout').onclick = () => { z = Math.max(.8, z - .2); zoom(); };
    $('#mloc').onclick = () => { z = 1; zoom(); toast('Mapa centralizado na entrega'); };
    $('#mtr').onclick = () => toast('Trânsito fluido na rota');
    $('#itbtn').onclick = () => $('.acc2').classList.toggle('open');
    const mb = $('#mback'); if (mb) mb.onclick = () => history.length > 1 ? history.back() : (location.href = 'perfil.html');
};

// dados pessoais / endereços / pagamentos
const fld = (id, label, val, o = {}) => `<label class="fld ${o.w || ''}"><span>${label}</span><input id="${id}" value="${esc(val || '')}" ${o.type ? `type="${o.type}"` : ''} ${o.ph ? `placeholder="${o.ph}"` : ''} ${o.max ? `maxlength="${o.max}"` : ''} ${o.mode ? `inputmode="${o.mode}"` : ''} ${o.ro ? 'readonly' : ''}></label>`;
const pageHead = (ic, kicker, t, p) => `<section class="card shead"><span class="sic">${icon(ic, 24)}</span><div><small>${kicker}</small><h1>${t}</h1><p>${p}</p></div></section>`;
const maskDigits = (v, pat) => { let d = v.replace(/\D/g, ''), o = '', i = 0; for (const c of pat) { if (i >= d.length) break; o += c === '#' ? d[i++] : c; } return o; };
const bindMask = (el, pat) => el && el.addEventListener('input', () => { el.value = maskDigits(el.value, pat); });

pages.dados = () => {
    const u = store.get('user', {}); const pr = { phone: '(11) 98822-4411', cpf: '123.456.789-09', birth: '1998-04-12', gender: 'Prefiro não informar', ...store.get('profile', {}) };
    accountPage({
        active: 'dados', crumb: 'Dados pessoais', noTop: true, mobTop: false, mobSide: false,
        inner: () => `${pageHead('idcard', 'Minha conta', 'Dados Pessoais', 'Mantenha suas informações atualizadas para entregas e pagamentos mais rápidos.')}
      <section class="card sset"><div class="sh"><h3>${icon('user', 20)} INFORMAÇÕES BÁSICAS</h3><small>Obrigatórias</small></div>
        <div class="fgrid2">${fld('f-name', 'Nome completo', u.name, { w: 'full' })}${fld('f-email', 'E-mail', u.email, { type: 'email' })}${fld('f-phone', 'Telefone / WhatsApp', pr.phone, { mode: 'numeric', max: 15 })}
        ${fld('f-cpf', 'CPF', pr.cpf, { mode: 'numeric', max: 14 })}${fld('f-birth', 'Data de nascimento', pr.birth, { type: 'date' })}
        <label class="fld"><span>Gênero</span><select id="f-gender">${['Prefiro não informar', 'Feminino', 'Masculino', 'Outro'].map(g => `<option ${g === pr.gender ? 'selected' : ''}>${g}</option>`).join('')}</select></label></div>
        <p class="ferr" id="ferr"></p></section>
      <section class="card sset"><div class="sh"><h3>${icon('lock', 20)} SENHA &amp; SEGURANÇA</h3></div>
        <div class="srow"><span class="ico">${icon('refresh', 18)}</span><div class="tx"><b>Alterar senha</b><small>Enviaremos um link seguro para o seu e-mail</small></div><button type="button" class="btn white sm" id="pw">Enviar link</button></div></section>
      <section class="card sset danger"><div class="sh"><h3>${icon('trash', 20)} ZONA DE RISCO</h3></div>
        <div class="srow"><div class="tx"><b>Excluir minha conta</b><small>Esta ação remove seus dados deste dispositivo e encerra a sessão.</small></div><button type="button" class="btn white sm dgr" id="del">Excluir conta</button></div></section>
      <div class="sact"><span></span><div class="r"><button type="button" class="btn white" id="dcancel">Cancelar</button><button type="button" class="btn" id="dsave">Salvar dados ${icon('check', 15)}</button></div></div>`,
        bind: root => {
            bindMask($('#f-phone', root), '(##) #####-####'); bindMask($('#f-cpf', root), '###.###.###-##');
            $('#pw', root).onclick = () => toast('Enviamos um link de redefinição para o seu e-mail');
            $('#dcancel', root).onclick = () => location.href = 'perfil.html';
            $('#del', root).onclick = () => { if (confirm('Excluir sua conta e encerrar a sessão?')) { ['user', 'profile', 'addrs', 'cards', 'settings'].forEach(store.del); location.href = 'index.html'; } };
            $('#dsave', root).onclick = () => {
                const g = i => $('#' + i, root).value.trim(), er = $('#ferr', root);
                if (g('f-name').split(/\s+/).length < 2) return er.textContent = 'Informe nome e sobrenome.';
                if (!/^\S+@\S+\.\S+$/.test(g('f-email'))) return er.textContent = 'Informe um e-mail válido.';
                if (g('f-phone').replace(/\D/g, '').length < 10) return er.textContent = 'Informe um telefone com DDD.';
                if (g('f-cpf').replace(/\D/g, '').length !== 11) return er.textContent = 'O CPF deve ter 11 dígitos.';
                er.textContent = '';
                store.set('user', { ...u, name: g('f-name'), email: g('f-email') });
                store.set('profile', { phone: g('f-phone'), cpf: g('f-cpf'), birth: g('f-birth'), gender: g('f-gender') });
                toast('Dados atualizados'); setTimeout(() => location.reload(), 700);
            };
        }
    });
};

const defAddrs = u => [{ id: 'a1', nick: 'Residencial', name: (u && u.name) || 'Davy Jones', cep: '01310-100', street: 'Av. Paulista', num: '1000', comp: 'Apto 84', dist: 'Bela Vista', city: 'São Paulo', uf: 'SP', def: true },
{ id: 'a2', nick: 'Trabalho', name: (u && u.name) || 'Davy Jones', cep: '04538-132', street: 'Av. Brigadeiro Faria Lima', num: '3477', comp: '12º andar', dist: 'Itaim Bibi', city: 'São Paulo', uf: 'SP', def: false }];
pages.enderecos = () => {
    const u = store.get('user', {}); let list = store.get('addrs', null) || defAddrs(u), edit = null;
    const save = () => store.set('addrs', list);
    accountPage({
        active: 'end', crumb: 'Endereços de entrega', noTop: true, mobTop: false, mobSide: false,
        inner: () => {
            const card = a => `<article class="acard ${a.def ? 'def' : ''}"><div class="ah2"><span class="ico">${icon(a.nick === 'Trabalho' ? 'building' : 'home', 18)}</span><b>${esc(a.nick)}</b>${a.def ? '<span class="tag">Padrão</span>' : ''}</div>
        <p>${esc(a.name)}<br>${esc(a.street)}, ${esc(a.num)}${a.comp ? ' — ' + esc(a.comp) : ''}<br>${esc(a.dist)}, ${esc(a.city)} — ${esc(a.uf)}<br><small>CEP ${esc(a.cep)}</small></p>
        <div class="aact"><button type="button" class="btn soft sm" data-ed="${a.id}">${icon('edit', 13)} Editar</button>${a.def ? '' : `<button type="button" class="btn soft sm" data-df="${a.id}">Tornar padrão</button><button type="button" class="btn white sm dgr" data-rm="${a.id}" aria-label="Excluir">${icon('trash', 14)}</button>`}</div></article>`;
            const e = edit === 'new' ? {} : list.find(x => x.id === edit) || null;
            const form = e ? `<section class="card sset" id="aform"><div class="sh"><h3>${icon('pin', 20)} ${edit === 'new' ? 'NOVO ENDEREÇO' : 'EDITAR ENDEREÇO'}</h3></div>
        <div class="fgrid2">${fld('a-nick', 'Apelido (ex.: Casa)', e.nick)}${fld('a-name', 'Destinatário', e.name || u.name)}${fld('a-cep', 'CEP', e.cep, { mode: 'numeric', max: 9, ph: '00000-000' })}${fld('a-street', 'Rua / Avenida', e.street)}${fld('a-num', 'Número', e.num)}${fld('a-comp', 'Complemento', e.comp)}${fld('a-dist', 'Bairro', e.dist)}${fld('a-city', 'Cidade', e.city)}${fld('a-uf', 'UF', e.uf, { max: 2 })}</div>
        <p class="ferr" id="aerr"></p><div class="sact"><span></span><div class="r"><button type="button" class="btn white" id="acancel">Cancelar</button><button type="button" class="btn" id="asave">Salvar endereço ${icon('check', 15)}</button></div></div></section>` : '';
            return `${pageHead('pin', 'Minha conta', 'Endereços de Entrega', `${list.length} ${list.length === 1 ? 'endereço cadastrado' : 'endereços cadastrados'}. O endereço padrão é usado no checkout.`)}
        <div class="agrid3">${list.map(card).join('')}<button type="button" class="acard add" id="anew">${icon('plus', 22)}<b>Adicionar novo endereço</b></button></div>${form}`;
        },
        bind: (root, mob, rerender) => {
            $$('[data-df]', root).forEach(b => b.onclick = () => { list.forEach(a => a.def = a.id === b.dataset.df); save(); toast('Endereço padrão atualizado'); rerender(); });
            $$('[data-rm]', root).forEach(b => b.onclick = () => { if (confirm('Excluir este endereço?')) { list = list.filter(a => a.id !== b.dataset.rm); save(); rerender(); } });
            $$('[data-ed]', root).forEach(b => b.onclick = () => { edit = b.dataset.ed; rerender(); $('#aform').scrollIntoView({ behavior: 'smooth' }); });
            $('#anew', root).onclick = () => { edit = 'new'; rerender(); $('#aform').scrollIntoView({ behavior: 'smooth' }); };
            const cancel = $('#acancel', root); if (!cancel) return;
            cancel.onclick = () => { edit = null; rerender(); };
            const cep = $('#a-cep', root); bindMask(cep, '#####-###');
            cep.addEventListener('input', async () => { if (cep.value.length === 9) { try { const r = await (await fetch(`https://viacep.com.br/ws/${cep.value.replace('-', '')}/json/`)).json(); if (!r.erro) { $('#a-street', root).value = r.logradouro || ''; $('#a-dist', root).value = r.bairro || ''; $('#a-city', root).value = r.localidade || ''; $('#a-uf', root).value = r.uf || ''; } } catch { } } });
            $('#asave', root).onclick = () => {
                const g = i => $('#' + i, root).value.trim(), er = $('#aerr', root);
                if (!g('a-nick') || !g('a-name') || !g('a-street') || !g('a-num') || !g('a-dist') || !g('a-city')) return er.textContent = 'Preencha os campos obrigatórios (complemento é opcional).';
                if (g('a-cep').replace(/\D/g, '').length !== 8) return er.textContent = 'CEP inválido.';
                if (g('a-uf').length !== 2) return er.textContent = 'Informe a UF com 2 letras.';
                const d = { nick: g('a-nick'), name: g('a-name'), cep: g('a-cep'), street: g('a-street'), num: g('a-num'), comp: g('a-comp'), dist: g('a-dist'), city: g('a-city'), uf: g('a-uf').toUpperCase() };
                if (edit === 'new') list.push({ id: 'a' + Date.now(), def: !list.length, ...d }); else Object.assign(list.find(a => a.id === edit), d);
                save(); edit = null; toast('Endereço salvo'); rerender();
            };
        }
    });
};

const brandOf = n => /^4/.test(n) ? 'Visa' : /^(5[1-5]|2[2-7])/.test(n) ? 'Mastercard' : /^3[47]/.test(n) ? 'Amex' : /^(636|606282|5067|4011)/.test(n) ? 'Elo' : 'Cartão';
pages.pagamentos = () => {
    let list = store.get('cards', null) || [{ id: 'c1', brand: 'Visa', last: '3812', exp: '08/27', holder: 'DAVY JONES', def: true }, { id: 'c2', brand: 'Mastercard', last: '5625', exp: '11/28', holder: 'DAVY JONES', def: false }], adding = false;
    const save = () => store.set('cards', list);
    const col = { Visa: '#1a1f71', Mastercard: '#222', Amex: '#006fcf', Elo: '#111', Cartão: '#444' };
    accountPage({
        active: 'pag', crumb: 'Formas de pagamento', noTop: true, mobTop: false, mobSide: false,
        inner: () => {
            const card = c => `<article class="ccard ${c.def ? 'def' : ''}"><div class="cvis" style="background:linear-gradient(135deg,${col[c.brand]},#000)"><span class="cb">${c.brand.toUpperCase()}</span><b>•••• •••• •••• ${c.last}</b><div><small>Titular</small><span>${esc(c.holder)}</span><small class="r">Validade <em>${c.exp}</em></small></div></div>
        <div class="cft">${c.def ? '<span class="tag">Padrão</span>' : `<button type="button" class="btn soft sm" data-df="${c.id}">Tornar padrão</button>`}<button type="button" class="btn white sm dgr" data-rm="${c.id}" aria-label="Remover cartão">${icon('trash', 14)}</button></div></article>`;
            const form = adding ? `<section class="card sset" id="cform"><div class="sh"><h3>${icon('card', 20)} NOVO CARTÃO</h3><small>${icon('lock', 12)} Ambiente seguro</small></div>
        <div class="fgrid2">${fld('c-num', 'Número do cartão', '', { mode: 'numeric', max: 19, ph: '0000 0000 0000 0000', w: 'full' })}${fld('c-name', 'Nome impresso no cartão', '', { w: 'full' })}${fld('c-exp', 'Validade', '', { mode: 'numeric', max: 5, ph: 'MM/AA' })}${fld('c-cvv', 'CVV', '', { mode: 'numeric', max: 4, ph: '000' })}</div>
        <p class="ferr" id="cerr"></p><div class="sact"><span class="mut" style="font-size:12px">O CVV não é armazenado. Guardamos apenas os 4 últimos dígitos.</span><div class="r"><button type="button" class="btn white" id="ccancel">Cancelar</button><button type="button" class="btn" id="csave">Salvar cartão ${icon('check', 15)}</button></div></div></section>` : '';
            return `${pageHead('card', 'Minha conta', 'Formas de Pagamento', 'Gerencie seus cartões salvos para finalizar compras com um toque.')}
        <div class="agrid3">${list.map(card).join('')}<button type="button" class="ccard add" id="cnew">${icon('plus', 22)}<b>Adicionar cartão</b></button></div>${form}
        <section class="card sset"><div class="srow"><span class="ico">${icon('bolt', 18)}</span><div class="tx"><b>Pix com 5% de desconto</b><small>Disponível no checkout — pagamento instantâneo, sem cadastro prévio.</small></div></div></section>`;
        },
        bind: (root, mob, rerender) => {
            $$('[data-df]', root).forEach(b => b.onclick = () => { list.forEach(c => c.def = c.id === b.dataset.df); save(); toast('Cartão padrão atualizado'); rerender(); });
            $$('[data-rm]', root).forEach(b => b.onclick = () => { if (confirm('Remover este cartão?')) { const was = list.find(c => c.id === b.dataset.rm); list = list.filter(c => c.id !== was.id); if (was.def && list[0]) list[0].def = true; save(); rerender(); } });
            $('#cnew', root).onclick = () => { adding = true; rerender(); $('#cform').scrollIntoView({ behavior: 'smooth' }); };
            const cc = $('#ccancel', root); if (!cc) return;
            cc.onclick = () => { adding = false; rerender(); };
            const num = $('#c-num', root); num.addEventListener('input', () => num.value = maskDigits(num.value, '#### #### #### ####'));
            bindMask($('#c-exp', root), '##/##'); bindMask($('#c-cvv', root), '####');
            $('#csave', root).onclick = () => {
                const g = i => $('#' + i, root).value.trim(), er = $('#cerr', root), d = g('c-num').replace(/\D/g, ''), [m, y] = g('c-exp').split('/').map(Number);
                if (d.length < 15) return er.textContent = 'Número de cartão inválido.';
                if (g('c-name').split(/\s+/).length < 2) return er.textContent = 'Informe o nome como está no cartão.';
                if (!(m >= 1 && m <= 12) || !y || (2000 + y) * 12 + m < new Date().getFullYear() * 12 + new Date().getMonth() + 1) return er.textContent = 'Validade inválida ou vencida.';
                if (g('c-cvv').length < 3) return er.textContent = 'CVV inválido.';
                list.push({ id: 'c' + Date.now(), brand: brandOf(d), last: d.slice(-4), exp: g('c-exp'), holder: g('c-name').toUpperCase(), def: !list.length });
                save(); adding = false; toast('Cartão adicionado'); rerender();
            };
        }
    });
};

// boot
document.addEventListener('DOMContentLoaded', () => {
    renderHeader(); renderFooter(); renderBottomNav();
    $$('[data-img]').forEach(el => { const i = document.createElement('img'); i.loading = 'lazy'; i.alt = ''; i.referrerPolicy = 'no-referrer'; i.src = IMG(el.dataset.img, +el.dataset.w || 900); i.onerror = () => i.remove(); el.appendChild(i); });
    const fn = pages[document.body.dataset.page]; if (fn) fn();
});