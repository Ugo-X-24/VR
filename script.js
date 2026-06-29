// Check if a saved layout configuration already exists in the user's browser storage
let elementsData = [];
const STORAGE_KEY = '3d_periodic_table_data';
const cachedData = localStorage.getItem(STORAGE_KEY);

if (cachedData) {
    // Load existing modified application state
    elementsData = JSON.parse(cachedData);
} else {
    // Default initial seed state array for elements 1-20 if no cache is found
    elementsData = [
        { number: 1, symbol: "H", name: "Hydrogen", mass: "1.008", category: "reactive-nonmetal", col: 1, row: 1, fact: "The most abundant chemical substance in the Universe.", image: null },
        { number: 2, symbol: "He", name: "Helium", mass: "4.0026", category: "noble-gas", col: 18, row: 1, fact: "Discovered in the solar spectrum before it was found on Earth.", image: null },
        { number: 3, symbol: "Li", name: "Lithium", mass: "6.94", category: "alkali", col: 1, row: 2, fact: "The lightest liquid metal density-wise at room temperature.", image: null },
        { number: 4, symbol: "Be", name: "Beryllium", mass: "9.0122", category: "transition-metal", col: 2, row: 2, fact: "Fades to emerald hues when naturally contaminated by chromium.", image: null },
        { number: 5, symbol: "B", name: "Boron", mass: "10.81", category: "reactive-nonmetal", col: 13, row: 2, fact: "Commonly used to create high-strength borosilicate fiberglass.", image: null },
        { number: 6, symbol: "C", name: "Carbon", mass: "12.011", category: "reactive-nonmetal", col: 14, row: 2, fact: "Forms the fundamental chemical structural backbone for all organic life.", image: null },
        { number: 7, symbol: "N", name: "Nitrogen", mass: "14.007", category: "reactive-nonmetal", col: 15, row: 2, fact: "Makes up roughly 78% of Earth's atmosphere.", image: null },
        { number: 8, symbol: "O", name: "Oxygen", mass: "15.999", category: "reactive-nonmetal", col: 16, row: 2, fact: "Highly reactive gas essential for respiration across most living ecosystems.", image: null },
        { number: 9, symbol: "F", name: "Fluorine", mass: "18.998", category: "reactive-nonmetal", col: 17, row: 2, fact: "The most chemically reactive and electronegative element in existence.", image: null },
        { number: 10, symbol: "Ne", name: "Neon", mass: "20.180", category: "noble-gas", col: 18, row: 2, fact: "Glows with an intense, unmistakable reddish-orange tint when ionized.", image: null },
        { number: 11, symbol: "Na", name: "Sodium", mass: "22.990", category: "alkali", col: 1, row: 3, fact: "Highly reactive alkali metal that reacts explosively with water.", image: null },
        { number: 12, symbol: "Mg", name: "Magnesium", mass: "24.305", category: "transition-metal", col: 2, row: 3, fact: "Burns with an incredibly bright, blinding white light flame.", image: null },
        { number: 13, symbol: "Al", name: "Aluminium", mass: "26.982", category: "transition-metal", col: 13, row: 3, fact: "The most widespread metal compound native to Earth's structural crust.", image: null },
        { number: 14, symbol: "Si", name: "Silicon", mass: "28.085", category: "reactive-nonmetal", col: 14, row: 3, fact: "The essential semiconductor engine driving modern computing circuitry.", image: null },
        { number: 15, symbol: "P", name: "Phosphorus", mass: "30.974", category: "reactive-nonmetal", col: 15, row: 3, fact: "Highly combustible, long used historically to generate friction matches.", image: null },
        { number: 16, symbol: "S", name: "Sulfur", mass: "32.06", category: "reactive-nonmetal", col: 16, row: 3, fact: "Produces a strong, distinctly pungent odor reminiscent of rotten eggs when combined.", image: null },
        { number: 17, symbol: "Cl", name: "Chlorine", mass: "35.45", category: "reactive-nonmetal", col: 17, row: 3, fact: "A powerful oxidizer primarily used to sanitize pools and drinking water supplies.", image: null },
        { number: 18, symbol: "Ar", name: "Argon", mass: "39.948", category: "noble-gas", col: 18, row: 3, fact: "Commonly used as an inert shielding gas in high-temperature industrial welding.", image: null },
        { number: 19, symbol: "K", name: "Potassium", mass: "39.098", category: "alkali", col: 1, row: 4, fact: "Crucial electrolyte required for maintaining safe nervous system signaling.", image: null },
        { number: 20, symbol: "Ca", name: "Calcium", mass: "40.078", category: "transition-metal", col: 2, row: 4, fact: "Primary skeletal builder responsible for constructing bone matrix structural strength.", image: null }
    ];

    const categories = ["transition-metal", "alkali", "noble-gas", "reactive-nonmetal"];
    const extendedSymbols = ["Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg"];

    extendedSymbols.forEach((sym, idx) => {
        const num = 21 + idx;
        const colIdx = (idx % 16) + 3;
        const rowIdx = Math.floor(idx / 16) + 4;
        elementsData.push({
            number: num,
            symbol: sym,
            name: `Element ${sym}`,
            mass: (num * 2.4).toFixed(3),
            category: categories[idx % categories.length],
            col: colIdx <= 18 ? colIdx : 18,
            row: rowIdx <= 7 ? rowIdx : 7,
            fact: `Heavy elements synthesized or extracted under automatic index ${num}.`,
            image: null
        });
    });

    // Save initial state layout down to storage right away
    localStorage.setItem(STORAGE_KEY, JSON.stringify(elementsData));
}

const scene = document.getElementById('scene');
const sceneContent = document.getElementById('scene-content');
const template = document.getElementById('element-template').content;
const buttons = document.querySelectorAll('.controls-btn');
const modal = document.getElementById('info-modal');

let currentLayout = 'table';
let isDragging = false;
let isModalOpen = false;
let previousMousePosition = { x: 0, y: 0 };
let currentRotation = { x: -0.15, y: 0.3 };
const targetRotation = { x: -0.15, y: 0.3 };
const elementDOMNodes = [];
let currentModalIndex = 0;

// Node Generation Pipeline
elementsData.forEach((data, index) => {
    const clone = document.importNode(template, true);
    const element = clone.querySelector('.element');

    element.classList.add(data.category);
    element.querySelector('.element-number').textContent = data.number;
    element.querySelector('.element-title').textContent = data.name;
    element.querySelector('.element-description').textContent = data.mass;

    // Retrieve saved visual state elements (text vs uploaded images)
    const imgEl = element.querySelector('.element-image');
    const symEl = element.querySelector('.element-symbol');
    if (data.image) {
        imgEl.src = data.image;
        imgEl.classList.remove('hidden');
        symEl.classList.add('hidden');
    } else {
        symEl.textContent = data.symbol;
    }

    element.style.transitionDelay = `${index * 15}ms`;

    element.addEventListener('click', () => {
        if (Math.abs(targetRotation.y - currentRotation.y) > 0.05) return;
        showModal(index);
    });

    sceneContent.appendChild(clone);
    elementDOMNodes.push(sceneContent.lastElementChild);
});

// Structural Form Transformations
const layouts = {
    table: (el, data) => {
        const x = (data.col - 9.5) * 140;
        const y = (data.row - 4) * 180;
        return `translate3d(${x}px, ${y}px, 0px)`;
    },
    sphere: (el, data, i) => {
        const total = elementsData.length;
        const phi = Math.acos(-1 + (2 * i) / total);
        const theta = Math.sqrt(total * Math.PI) * phi;
        const radius = 600;

        const x = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.cos(theta);

        const rotY = theta * (180 / Math.PI);
        const rotX = -(phi - Math.PI / 2) * (180 / Math.PI);
        return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    },
    helix: (el, data, i) => {
        const radius = 600;
        const theta = i * 0.175 + Math.PI;
        const y = (i * 12) - 450;
        const x = radius * Math.sin(theta);
        const z = radius * Math.cos(theta);

        const rotY = theta * (180 / Math.PI);
        return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg)`;
    },
    grid: (el, data, i) => {
        const x = ((i % 5) - 2) * 200;
        const y = ((Math.floor(i / 5) % 5) - 2) * 200;
        const z = -(Math.floor(i / 25) - 2) * 350;
        return `translate3d(${x}px, ${y}px, ${z}px)`;
    }
};

function applyLayout(layoutName) {
    currentLayout = layoutName;
    sceneContent.setAttribute('data-layout', layoutName);
    elementDOMNodes.forEach((el, index) => {
        el.style.transform = layouts[layoutName](el, elementsData[index], index);
    });
}

// Layout Switch Controls
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLayout(btn.dataset.layout);
    });
});

// Viewport Mouse Mapping Mechanics
scene.addEventListener('mousedown', (e) => {
    if (isModalOpen) return;
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotation.y += deltaX * 0.005;
    targetRotation.x -= deltaY * 0.005;
    targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

    previousMousePosition = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', () => { isDragging = false; });

// Display & Editor Window Binding System
const modalNum = document.getElementById('modal-number');
const modalSym = document.getElementById('modal-symbol');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalFact = document.getElementById('modal-fact');
const modalImageUpload = document.getElementById('modal-image-upload');

function showModal(index) {
    currentModalIndex = index;
    isModalOpen = true;
    const data = elementsData[index];

    modalNum.value = data.number;
    modalSym.value = data.symbol;
    modalTitle.value = data.name;
    modalDesc.value = data.mass;
    modalFact.value = data.fact;
    modalImageUpload.value = '';

    modal.classList.remove('hidden');
}

// Live Text Update Binding
function handleDataSync() {
    const data = elementsData[currentModalIndex];
    const node = elementDOMNodes[currentModalIndex];

    data.symbol = modalSym.value;
    data.name = modalTitle.value;
    data.mass = modalDesc.value;
    data.fact = modalFact.value;

    if (!data.image) {
        node.querySelector('.element-symbol').textContent = data.symbol;
    }
    node.querySelector('.element-title').textContent = data.name;
    node.querySelector('.element-description').textContent = data.mass;

    // Save changes to local storage instantly as user types
    localStorage.setItem(STORAGE_KEY, JSON.stringify(elementsData));
}

[modalSym, modalTitle, modalDesc, modalFact].forEach(input => {
    input.addEventListener('input', handleDataSync);
});

// File Upload Stream Handling Logic
modalImageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataUrl = event.target.result;
            const data = elementsData[currentModalIndex];
            const node = elementDOMNodes[currentModalIndex];

            data.image = dataUrl;

            const imgEl = node.querySelector('.element-image');
            const symEl = node.querySelector('.element-symbol');

            imgEl.src = dataUrl;
            imgEl.classList.remove('hidden');
            symEl.classList.add('hidden');

            // Save state immediately once file finishes loading into base64 payload
            localStorage.setItem(STORAGE_KEY, JSON.stringify(elementsData));
        };
        reader.readAsDataURL(file);
    }
});

// Sequenced One-by-One Navigation Listeners
document.getElementById('modal-prev-btn').addEventListener('click', () => {
    let newIndex = currentModalIndex - 1;
    if (newIndex < 0) newIndex = elementsData.length - 1;
    showModal(newIndex);
});

document.getElementById('modal-next-btn').addEventListener('click', () => {
    let newIndex = currentModalIndex + 1;
    if (newIndex >= elementsData.length) newIndex = 0;
    showModal(newIndex);
});

function closeModal() {
    isModalOpen = false;
    modal.classList.add('hidden');
}

document.querySelector('.close-btn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Smooth Rendering Frame Interpolation Loop
function animate() {
    if (!isDragging && !isModalOpen) {
        targetRotation.y += 0.002;
    }
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

    sceneContent.style.transform = `translateZ(-300px) rotateX(${currentRotation.x}rad) rotateY(${currentRotation.y}rad)`;
    requestAnimationFrame(animate);
}

// Initialization
applyLayout('table');
animate();