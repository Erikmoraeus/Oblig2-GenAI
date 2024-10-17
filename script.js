const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const character = {
    x: width / 2,
    y: height / 2,
    size: 40, // Juster størrelsen etter ikonets dimensjoner
    icon: new Image(),
    speed: 7, // Kontrollerer hastigheten
    zigzag: false, // Kontroll for zigzag-bevegelse
    direction: Math.random() * 2 * Math.PI, // Tilfeldig retning i radianer
    angle: 0 // Brukes for kurvet bevegelse
};

let isMoving = false;
let animationId;

// Sett stien til ikonet
character.icon.src = 'images/spaceship.png'; 
character.icon.onload = function() {
    draw();
};

character.move = function() {
    // Hvis zigzag er aktivert, endre retningen periodisk
    if (this.zigzag) {
        this.direction += Math.sin(this.angle) * 0.1; // Endre retningen
        this.angle += 0.1; // Juster vinkelen for bølgen
    }

    // Oppdater posisjon basert på retning og hastighet
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    // Sjekk for å forhindre at karakteren går utenfor canvaset
    if (this.x < 0) {
        this.x = 0; // Sett x tilbake til 0
        this.direction = Math.random() * Math.PI; // Ny tilfeldig retning
    } else if (this.x > width - this.size) {
        this.x = width - this.size; // Sett x til maks
        this.direction = Math.random() * Math.PI + Math.PI; // Ny tilfeldig retning
    }

    if (this.y < 0) {
        this.y = 0; // Sett y tilbake til 0
        this.direction = Math.random() * 2 * Math.PI; // Ny tilfeldig retning
    } else if (this.y > height - this.size) {
        this.y = height - this.size; // Sett y til maks
        this.direction = Math.random() * 2 * Math.PI; // Ny tilfeldig retning
    }
};

function draw() {
    ctx.clearRect(0, 0, width, height); // Rydde canvaset
    ctx.drawImage(character.icon, character.x, character.y, character.size, character.size); // Tegn ikonet
}

function update() {
    if (isMoving) {
        character.move();
        draw();
        animationId = requestAnimationFrame(update);
    }
}

document.getElementById('startButton').addEventListener('click', () => {
    if (!isMoving) {
        character.zigzag = true; // Aktiver zigzag-bevegelse
        isMoving = true;
        update();
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    isMoving = false;
    character.zigzag = false; // Deaktiver zigzag-bevegelse
    cancelAnimationFrame(animationId);
});
