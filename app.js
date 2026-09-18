const cuts = [
  {
    id: 'fade-moderno',
    name: 'Fade moderno',
    fit: ['oval', 'square', 'diamond'],
    texture: ['straight', 'wavy', 'thick'],
    length: ['short', 'mid', 'textured'],
    maintenance: ['low', 'medium'],
    style: ['clean', 'modern', 'masculine'],
    reason: 'Te da una silueta limpia, con volumen controlado y un acabado muy profesional.',
    notes: ['Limpio y moderno', 'Muy fácil de mantener', 'Ideal para vida diaria'],
    products: ['Pomada ligera', 'Cera matte', 'Aceite para barba']
  },
  {
    id: 'crop-texturizado',
    name: 'Crop texturizado',
    fit: ['round', 'oval', 'square'],
    texture: ['straight', 'wavy', 'thick', 'fine'],
    length: ['short', 'textured'],
    maintenance: ['low', 'medium'],
    style: ['modern', 'soft', 'clean'],
    reason: 'Acentúa tus facciones sin dejarte demasiado volumen en la parte superior.',
    notes: ['Muy fresco', 'Minimalista', 'Bonito para rostro redondo'],
    products: ['Cera texturizante', 'Laca suave', 'Gel de peinado']
  },
  {
    id: 'pompadour',
    name: 'Pompadour',
    fit: ['oval', 'diamond', 'square'],
    texture: ['straight', 'wavy', 'thick'],
    length: ['mid', 'long'],
    maintenance: ['medium', 'high'],
    style: ['bold', 'modern', 'masculine'],
    reason: 'Tiene impacto visual y funciona muy bien si quieres que tu mirada sea más definida.',
    notes: ['Más volumen', 'Estilo audaz', 'Se ve elegante'],
    products: ['Pomada de alto control', 'Cerámica para volumen', 'Aceite de barba']
  },
  {
    id: 'crew-cut',
    name: 'Crew cut',
    fit: ['round', 'oval', 'long'],
    texture: ['straight', 'fine', 'thick'],
    length: ['short'],
    maintenance: ['low'],
    style: ['clean', 'professional', 'masculine'],
    reason: 'Es sobrio, funcional y muy práctico si quieres un corte fácil de mantener.',
    notes: ['Muy fácil', 'Limpio', 'Apto para trabajo o rutina'],
    products: ['Gel ligero', 'Pomada matte', 'Champú para barba']
  },
  {
    id: 'curly-taper',
    name: 'Curly taper',
    fit: ['oval', 'square', 'diamond'],
    texture: ['curly', 'wavy'],
    length: ['short', 'mid', 'textured'],
    maintenance: ['medium', 'high'],
    style: ['soft', 'modern', 'bold'],
    reason: 'Mantiene el cuerpo del cabello sin perder forma y ayuda a controlar volumen.',
    notes: ['Perfecto para rizos', 'Más textura', 'Muy natural'],
    products: ['Crema definidora', 'Gel de rizo', 'Aceite hidratante']
  },
  {
    id: 'buzz-cut',
    name: 'Buzz cut',
    fit: ['round', 'square', 'oval'],
    texture: ['thick', 'fine', 'straight'],
    length: ['short'],
    maintenance: ['low'],
    style: ['clean', 'masculine', 'bold'],
    reason: 'Es brutalmente sencillo, muy limpio y te hace lucir más definido en el rostro.',
    notes: ['Minimalista', 'Muy bajo mantenimiento', 'Fresco'],
    products: ['Gel para cabello corto', 'Aceite para barba', 'Champú hidratante']
  }
];

const form = document.getElementById('recommendationForm');
const promptInput = document.getElementById('prompt');
const resultContent = document.getElementById('resultContent');
const randomBtn = document.getElementById('randomBtn');
const shareBtn = document.getElementById('shareBtn');
const waBtn = document.getElementById('waBtn');

const normalize = (value) => value.trim().toLowerCase();

function parsePrompt(text) {
  const values = {
    faceShape: 'oval',
    hairTexture: 'straight',
    hairLength: 'short',
    maintenance: 'low',
    styleGoal: 'clean'
  };

  const trimmed = normalize(text);

  if (!trimmed) return values;

  if (trimmed.includes('redondo') || trimmed.includes('cara redonda')) values.faceShape = 'round';
  if (trimmed.includes('cuadrado') || trimmed.includes('cara cuadrada')) values.faceShape = 'square';
  if (trimmed.includes('alargado') || trimmed.includes('cara larga')) values.faceShape = 'long';
  if (trimmed.includes('diamante') || trimmed.includes('cara de diamante')) values.faceShape = 'diamond';
  if (trimmed.includes('oval') || trimmed.includes('ovalado')) values.faceShape = 'oval';

  if (trimmed.includes('rizado') || trimmed.includes('rizos')) values.hairTexture = 'curly';
  if (trimmed.includes('ondulado') || trimmed.includes('ondas')) values.hairTexture = 'wavy';
  if (trimmed.includes('grueso') || trimmed.includes('mucho pelo')) values.hairTexture = 'thick';
  if (trimmed.includes('fino') || trimmed.includes('poco pelo')) values.hairTexture = 'fine';
  if (trimmed.includes('liso')) values.hairTexture = 'straight';

  if (trimmed.includes('largo') || trimmed.includes('mas largo')) values.hairLength = 'long';
  if (trimmed.includes('medio') || trimmed.includes('a la mitad')) values.hairLength = 'mid';
  if (trimmed.includes('textur') || trimmed.includes('volumen')) values.hairLength = 'textured';
  if (trimmed.includes('corto') || trimmed.includes('corto y limpio')) values.hairLength = 'short';

  if (trimmed.includes('poco mantenimiento') || trimmed.includes('fácil') || trimmed.includes('rapidez')) values.maintenance = 'low';
  if (trimmed.includes('medio') || trimmed.includes('normal')) values.maintenance = 'medium';
  if (trimmed.includes('mucho cuidado') || trimmed.includes('estilo perfecto') || trimmed.includes('muy cuidado')) values.maintenance = 'high';

  if (trimmed.includes('moderno') || trimmed.includes('trendy') || trimmed.includes('fashion')) values.styleGoal = 'modern';
  if (trimmed.includes('profe') || trimmed.includes('limpio') || trimmed.includes('profesional')) values.styleGoal = 'clean';
  if (trimmed.includes('masculino') || trimmed.includes('robusto') || trimmed.includes('duro')) values.styleGoal = 'masculine';
  if (trimmed.includes('suave') || trimmed.includes('natural')) values.styleGoal = 'soft';
  if (trimmed.includes('audaz') || trimmed.includes('llamativo') || trimmed.includes('destacado')) values.styleGoal = 'bold';

  return values;
}

function scoreCut(cut, data) {
  let score = 0;

  if (cut.fit.includes(data.faceShape)) score += 3;
  if (cut.texture.includes(data.hairTexture)) score += 3;
  if (cut.length.includes(data.hairLength)) score += 2;
  if (cut.maintenance.includes(data.maintenance)) score += 2;
  if (cut.style.includes(data.styleGoal)) score += 2;

  const prompt = normalize(promptInput.value);
  if (prompt.includes('redondo') && cut.fit.includes('round')) score += 2;
  if (prompt.includes('rizado') && cut.texture.includes('curly')) score += 2;
  if (prompt.includes('fácil') && cut.maintenance.includes('low')) score += 2;
  if (prompt.includes('moderno') && cut.style.includes('modern')) score += 2;
  if (prompt.includes('limpio') && cut.style.includes('clean')) score += 2;

  return score;
}

function getRecommendation(data) {
  const scored = cuts
    .map((cut) => ({ cut, score: scoreCut(cut, data) }))
    .sort((a, b) => b.score - a.score);

  return scored[0].cut;
}

function renderRecommendation(cut, data) {
  resultContent.innerHTML = `
    <h3>${cut.name}</h3>
    <p>${cut.reason}</p>
    <ul>
      <li>Rostro ideal: ${cut.fit.map((item) => itemLabel(item)).join(', ')}</li>
      <li>Cabello: ${cut.texture.map((item) => itemLabel(item)).join(', ')}</li>
      <li>Mantenimiento: ${data.maintenance}</li>
      <li>Estilo: ${data.styleGoal}</li>
    </ul>
    <p><strong>Qué pedir:</strong> ${cut.notes.join(' • ')}</p>
    <p><strong>Productos:</strong> ${cut.products.join(', ')}</p>
  `;

  const message = `Hola The Cut Lab, quiero reservar el corte recomendado: ${cut.name}. Mi estilo es ${data.styleGoal}, mi rostro ${data.faceShape} y mi cabello ${data.hairTexture}.`;
  waBtn.href = `https://wa.me/5218110742345?text=${encodeURIComponent(message)}`;
}

function itemLabel(value) {
  const labels = {
    oval: 'ovalado',
    round: 'redondo',
    square: 'cuadrado',
    diamond: 'diamante',
    long: 'alargado',
    straight: 'liso',
    wavy: 'ondulado',
    curly: 'rizado',
    thick: 'grueso',
    fine: 'fino',
    short: 'corto',
    mid: 'medio',
    long: 'largo',
    textured: 'texturizado',
    low: 'bajo',
    medium: 'medio',
    high: 'alto',
    clean: 'limpio',
    modern: 'moderno',
    masculine: 'masculino',
    soft: 'suave',
    bold: 'audaz'
  };

  return labels[value] || value;
}

function buildDataFromForm() {
  const data = {
    faceShape: document.getElementById('faceShape').value,
    hairTexture: document.getElementById('hairTexture').value,
    hairLength: document.getElementById('hairLength').value,
    maintenance: document.getElementById('maintenance').value,
    styleGoal: document.getElementById('styleGoal').value
  };

  const promptText = promptInput.value.trim();
  if (promptText) {
    Object.assign(data, parsePrompt(promptText));
  }

  return data;
}

function updateRecommendation() {
  const data = buildDataFromForm();
  const cut = getRecommendation(data);
  renderRecommendation(cut, data);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateRecommendation();
});

randomBtn.addEventListener('click', () => {
  const randomCut = cuts[Math.floor(Math.random() * cuts.length)];
  const selectors = {
    faceShape: document.getElementById('faceShape'),
    hairTexture: document.getElementById('hairTexture'),
    hairLength: document.getElementById('hairLength'),
    maintenance: document.getElementById('maintenance'),
    styleGoal: document.getElementById('styleGoal')
  };

  selectors.faceShape.value = randomCut.fit[0] || 'oval';
  selectors.hairTexture.value = randomCut.texture[0] || 'straight';
  selectors.hairLength.value = randomCut.length[0] || 'short';
  selectors.maintenance.value = randomCut.maintenance[0] || 'medium';
  selectors.styleGoal.value = randomCut.style[0] || 'modern';

  promptInput.value = 'Quiero un look moderno, con personalidad y buen mantenimiento.';
  updateRecommendation();
});

shareBtn.addEventListener('click', async () => {
  const recommendationText = resultContent.innerText;
  const shareText = `The Cut Lab: ${recommendationText}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'The Cut Lab',
        text: shareText
      });
      return;
    } catch (error) {
      console.warn('Share cancelled', error);
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    shareBtn.textContent = 'Copiado';
    setTimeout(() => {
      shareBtn.textContent = 'Compartir';
    }, 1200);
  } catch (error) {
    alert('No se pudo copiar automáticamente. Puedes copiar el texto manualmente.');
  }
});

updateRecommendation();

const primaryBtn = document.querySelector('[data-scroll="recommender"]');
if (primaryBtn) {
  primaryBtn.addEventListener('click', () => {
    document.getElementById('recommender').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}


