const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paleta de colores vibrantes
const colors = [
  '#FF0000', '#FF1493', '#FF69B4', '#FF8F00', 
  '#FFD700', '#00FF00', '#00FFFF', '#0000FF', 
  '#8A2BE2', '#FF00FF', '#FF6347', '#FFA500'
];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 12 + 3;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15 - 5;
    this.gravity = 0.2;
    this.alpha = 1;
    this.life = 100;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    this.alpha = this.life / 100;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Dibuja un corazón más detallado
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -this.size/2, -this.size, -this.size, 0, this.size/3);
    ctx.bezierCurveTo(this.size, -this.size, 0, -this.size/2, 0, 0);
    ctx.fill();
    
    ctx.restore();
  }
}

let particles = [];

function createFirework(x, y) {
  const particleCount = 80 + Math.floor(Math.random() * 50);
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(
      x, 
      y, 
      colors[Math.floor(Math.random() * colors.length)]
    ));
  }

  // Efecto de destello inicial
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(x, y, '#FFFFFF'));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    if (particles[i].life <= 0 || particles[i].size <= 0.5) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

// Fuegos automáticos cada 600ms
setInterval(() => {
  createFirework(
    Math.random() * canvas.width,
    Math.random() * canvas.height * 0.4
  );
}, 600);

// Fuegos al hacer clic/mover el ratón
canvas.addEventListener('click', (e) => {
  createFirework(e.clientX, e.clientY);
});

canvas.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.7) { // 30% de probabilidad al mover el ratón
    createFirework(e.clientX, e.clientY);
  }
});

// Gran explosión inicial
setTimeout(() => {
  createFirework(canvas.width/2, canvas.height/3);
}, 100);

animate();