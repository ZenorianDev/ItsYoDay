const urlParams = new URLSearchParams(window.location.search);
const friendName = urlParams.get('name') ? decodeURIComponent(urlParams.get('name')) : '';
const letterMessage = urlParams.get('message') ? decodeURIComponent(urlParams.get('message')) : '';
const signature = urlParams.get('signature') ? decodeURIComponent(urlParams.get('signature')) : 'Someone Special';

// Show form or birthday page
const formContainer = document.getElementById('formContainer');
const birthdayContainer = document.getElementById('birthdayContainer');
if (friendName && letterMessage && signature) {
    formContainer.style.display = 'none';
    birthdayContainer.style.display = 'block';
    document.getElementById('greeting').textContent = `Happy Birthday, ${friendName}!`;
}

// Generate shareable link
function generateLink() {
    const name = document.getElementById('friendName').value.trim();
    const message = document.getElementById('letterMessage').value.trim();
    const sig = document.getElementById('signature').value.trim();

    if (!name || !message || !sig) {
        alert('Please enter a name, message, and signature.');
        return;
    }

    const encodedName = encodeURIComponent(name);
    const encodedMessage = encodeURIComponent(message);
    const encodedSignature = encodeURIComponent(sig);
    const link = `${window.location.origin}${window.location.pathname}?name=${encodedName}&message=${encodedMessage}&signature=${encodedSignature}`;
    
    // Check URL length
    if (link.length > 2000) {
        alert('The message or signature is too long. Please shorten them.');
        return;
    }

    const linkContainer = document.getElementById('linkContainer');
    const shareLink = document.getElementById('shareLink');
    shareLink.value = link;
    linkContainer.style.display = 'block';
}

// Copy link to clipboard
function copyLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

// Confetti animation
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confetti = [];
const confettiCount = 100;
const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1'];

function createConfetti() {
    confetti.length = 0; // Clear existing confetti
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360
        });
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(p => {
        p.y += p.speed;
        p.rotation += p.speed / 2;
        if (p.y > confettiCanvas.height) {
            p.y = -p.size;
            p.x = Math.random() * confettiCanvas.width;
        }
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rotation * Math.PI / 180);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        confettiCtx.restore();
    });
    requestAnimationFrame(animateConfetti);
}

// Switch light and trigger animations
function switchLight() {
    const blackScreen = document.getElementById('blackScreen');
    const content = document.getElementById('content');
    const music = document.getElementById('birthdayMusic');
    const subtitle = document.getElementById('subtitle');
    const cake = document.getElementById('cake');

    // Fade out black screen
    gsap.to(blackScreen, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            blackScreen.style.display = 'none';
            content.style.display = 'flex';

            // Start music
            music.play().catch(error => console.log('Audio play failed:', error));

            // Start confetti
            createConfetti();
            requestAnimationFrame(animateConfetti);

            // Animate cake bounce
            gsap.to(cake, {
                y: -20,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });

            // Animate subtitles
            const sentences = letterMessage.split('.').map(s => s.trim()).filter(s => s);
            if (sentences.length === 0) {
                subtitle.textContent = `Happy Birthday, ${friendName}! Love, ${signature}`;
                gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 1 });
            } else {
                let delay = 0;
                sentences.forEach((sentence, index) => {
                    gsap.to(subtitle, {
                        textContent: sentence,
                        opacity: 1,
                        duration: 1,
                        delay: delay,
                        onComplete: () => {
                            if (index < sentences.length - 1) {
                                gsap.to(subtitle, { opacity: 0, duration: 0.5, delay: 4 });
                            } else {
                                gsap.to(subtitle, {
                                    textContent: `Love, ${signature}`,
                                    opacity: 1,
                                    duration: 1,
                                    delay: 4
                                });
                            }
                        }
                    });
                    delay += 5.5; // 1s fade in + 4s display + 0.5s fade out
                });
            }
        }
    });
}

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});