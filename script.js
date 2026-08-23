(() => {
  const seal = document.getElementById('seal');
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const instruction = document.getElementById('instruction');
  const title = document.querySelector('.envelope-title');
  const parchmentWrapper = document.getElementById('parchmentWrapper');
  const petalsContainer = document.getElementById('petalsContainer');
  const lines = document.querySelectorAll('.p-line');

  let isOpened = false;

  // Seal click handler
  seal.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;

    // Step 1: Break the seal (0ms)
    seal.classList.add('breaking');
    spawnSealPieces(seal);

    // Step 2: Open the flap + hide title and instruction (400ms)
    setTimeout(() => {
      envelope.classList.add('open');
      title.classList.add('hidden');
      instruction.classList.add('hidden');
    }, 400);

    // Step 3: Flap goes back + letter slides up (1100ms = 400 + 700)
    setTimeout(() => {
      envelope.classList.add('flap-back');
      envelope.classList.add('letter-up');
    }, 1100);

    // Step 4: Envelope fades, parchment appears (2000ms)
    setTimeout(() => {
      envelopeWrapper.classList.add('hiding');
      parchmentWrapper.classList.add('visible');
    }, 2000);

    // Step 5: Start petals (2200ms)
    setTimeout(() => {
      startPetals();
    }, 2200);

    // Step 6: Reveal text lines (2800ms)
    setTimeout(() => {
      revealLines();
    }, 2800);
  });

  // Touch support
  seal.addEventListener('touchend', (e) => {
    e.preventDefault();
    seal.click();
  });

  // Seal pieces explosion
  function spawnSealPieces(parent) {
    const rect = parent.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const pieceCount = 8;

    for (let i = 0; i < pieceCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'seal-piece';

      const size = rand(6, 14);
      const angle = (Math.PI * 2 * i) / pieceCount + rand(-0.3, 0.3);
      const distance = rand(40, 100);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      piece.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${cx}px;
        top: ${cy}px;
        transform: translate(-50%, -50%);
      `;

      document.body.appendChild(piece);

      piece.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.3) rotate(${rand(90, 360)}deg)`, opacity: 0 }
      ], {
        duration: rand(400, 700),
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      }).onfinish = () => piece.remove();
    }
  }

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
    const total = window.innerWidth < 500 ? 35 : 50;

    for (let i = 0; i < total; i++) {
      setTimeout(() => spawnPetal(), i * 200);
    }

    let interval = setInterval(() => {
      if (petalsContainer.children.length > 60) return;
      spawnPetal();
    }, 350);

    setTimeout(() => clearInterval(interval), 45000);
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

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  document.querySelectorAll('.photo').forEach(function(photo) {
    photo.addEventListener('click', function() {
      lightboxImg.src = photo.src;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });
})();
