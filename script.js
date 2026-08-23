(() => {
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const instruction = document.getElementById('instruction');
  const title = document.querySelector('.envelope-title');
  const parchmentWrapper = document.getElementById('parchmentWrapper');
  const petalsContainer = document.getElementById('petalsContainer');
  const lines = document.querySelectorAll('.p-line');

  let isOpened = false;

  // Click envelope to open (reference style)
  envelope.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;

    // Step 1: Open flap + move title up (0ms)
    envelope.classList.add('open');
    title.style.transform = 'translateY(-120px)';
    title.style.transition = 'transform 0.65s ease-in-out';
    instruction.classList.add('hidden');

    // Step 2: Letter appears behind envelope (700ms)
    // CSS handles this via .envelope.open .envelope-letter opacity

    // Step 3: Envelope fades, parchment appears (1600ms)
    setTimeout(() => {
      envelopeWrapper.classList.add('hiding');
      parchmentWrapper.classList.add('visible');
    }, 1600);

    // Step 4: Start petals (1800ms)
    setTimeout(() => {
      startPetals();
    }, 1800);

    // Step 5: Reveal text lines (2400ms)
    setTimeout(() => {
      revealLines();
    }, 2400);
  });

  // Reveal text lines
  function revealLines() {
    lines.forEach((line) => {
      const delay = parseFloat(line.dataset.delay) || 0;
      setTimeout(() => {
        line.classList.add('revealed');
      }, delay * 1000);
    });
  }

  // Rose petals
  function startPetals() {
    const total = window.innerWidth < 500 ? 20 : 30;

    for (let i = 0; i < total; i++) {
      setTimeout(() => spawnPetal(), i * 300);
    }

    let interval = setInterval(() => {
      if (petalsContainer.children.length > 45) return;
      spawnPetal();
    }, 500);

    setTimeout(() => clearInterval(interval), 25000);
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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        petal.classList.add('falling');
      });
    });

    setTimeout(() => {
      if (petal.parentNode) petal.remove();
    }, (duration + delay) * 1000 + 500);
  }

  // Ambient particles
  function createAmbientParticles() {
    const scene = document.querySelector('.envelope-wrapper');
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

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
})();
