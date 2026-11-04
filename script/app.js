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