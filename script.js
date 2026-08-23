(() => {
  const seal = document.getElementById('seal');
  const envelope = document.getElementById('envelope');
  const instruction = document.getElementById('instruction');
  const petalsContainer = document.getElementById('petalsContainer');

  let isOpened = false;

  // ── Seal click ──
  seal.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;

    envelope.classList.add('opened');
    instruction.classList.add('hidden');

    setTimeout(() => createPetals(), 800);
  });

  // Also handle touch for better mobile response
  seal.addEventListener('touchend', (e) => {
    e.preventDefault();
    seal.click();
  });

  // ── Rose Petals ──
  function createPetals() {
    const petalCount = window.innerWidth < 500 ? 18 : 28;

    for (let i = 0; i < petalCount; i++) {
      setTimeout(() => spawnPetal(), i * 350);
    }

    // Keep spawning petals
    let continuous = setInterval(() => {
      if (petalsContainer.children.length > 40) return;
      spawnPetal();
    }, 600);

    setTimeout(() => clearInterval(continuous), 20000);
  }

  function spawnPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size = rand(10, 20);
    const startX = rand(5, 95);
    const drift = rand(-120, 120);
    const spin = rand(180, 720);
    const duration = rand(5, 9);
    const delay = rand(0, 0.5);
    const rotate = rand(0, 360);

    const colorSets = [
      ['#ff6b8a', '#ff3366'],
      ['#ff8a9e', '#e84060'],
      ['#ffb3c1', '#ff6b8a'],
      ['#ff4d6d', '#c9184a'],
      ['#ff758f', '#ff4d6d'],
    ];
    const colors = colorSets[Math.floor(Math.random() * colorSets.length)];

    petal.style.cssText = `
      left: ${startX}%;
      --petal-size: ${size}px;
      --petal-color-1: ${colors[0]};
      --petal-color-2: ${colors[1]};
      --petal-rotate: ${rotate}deg;
      --petal-drift: ${drift}px;
      --petal-spin: ${spin}deg;
      --fall-duration: ${duration}s;
      --fall-delay: ${delay}s;
    `;

    const shape = document.createElement('div');
    shape.className = 'petal-shape';
    petal.appendChild(shape);

    petalsContainer.appendChild(petal);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        petal.classList.add('falling');
      });
    });

    // Remove after animation
    setTimeout(() => {
      if (petal.parentNode) petal.remove();
    }, (duration + delay) * 1000 + 500);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // ── Ambient particles before opening ──
  function createAmbientParticles() {
    const scene = document.querySelector('.scene');
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'ambient-particle';
      p.style.left = rand(10, 90) + '%';
      p.style.top = rand(10, 90) + '%';
      p.style.animationDelay = rand(0, 3) + 's';
      p.style.animationDuration = rand(3, 6) + 's';
      scene.appendChild(p);
    }
  }

  createAmbientParticles();
})();
