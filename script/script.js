const themeToggle = document.getElementById("theme-toggle");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
    }
});

hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-right")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId !== "#") {
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

function setupTypingEffect() {
    const title = "Software Engineer";
    let charIndex = 0;
    const typeSpeed = 75;
    const headerElement = document.querySelector('.hero-content h2');
    if (!headerElement) return;

    headerElement.innerHTML = "";

    function type() {
        if (charIndex < title.length) {
            headerElement.innerHTML = title.substring(0, charIndex + 1) + '<span class="blinking-cursor">|</span>';
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            headerElement.innerHTML = title + '<span class="blinking-cursor">|</span>';
        }
    }

    type();
}

function setupScrollReveal() {
    const revealElements = document.querySelectorAll(".project-card, .about-card");
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        revealObserver.observe(element);
    });

    document.head.insertAdjacentHTML("beforeend", `
    <style>
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);
}

function setupProjectInteraction() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
            card.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(-5px)";
            card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
        });
    });
}

function setupParallax() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

function setupParticleBackground() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    const canvas = document.createElement("canvas");
    canvas.id = "particles-canvas";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";

    heroSection.style.position = "relative";
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.position = "relative";
        heroContent.style.zIndex = "2";
    }

    const ctx = canvas.getContext("2d");
    let particles = [];
    const particlesNum = 50;
    let isDarkTheme = !document.body.classList.contains("light-theme");

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particlesNum; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                color: isDarkTheme
                    ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
                    : `rgba(15, 118, 110, ${Math.random() * 0.3 + 0.1})`,
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill();
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = isDarkTheme
                        ? `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
                        : `rgba(15, 118, 110, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
            if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
        }
    }

    function animateParticles() {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animateParticles);
    }

    themeToggle.addEventListener("change", () => {
        isDarkTheme = !themeToggle.checked;
        createParticles();
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    createParticles();
    animateParticles();
}

function setupScrollProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress-bar";
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "3px";
    progressBar.style.width = "0%";
    progressBar.style.backgroundColor = "#1f6feb";
    progressBar.style.zIndex = "1000";
    progressBar.style.transition = "width 0.1s";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupTypingEffect();
    setupScrollReveal();
    setupProjectInteraction();
    setupParallax();
    setupParticleBackground();
    setupScrollProgressBar();
});
