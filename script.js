// Sticky Header Logic
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Menu móvil
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });
});

// Efecto Parallax en el motor del Hero
const hero = document.querySelector('.hero');
const engineImage = document.getElementById('engine-pop-out');

if (hero && engineImage) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calcular posición relativa (-0.5 a 0.5)
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;

        // Aplicar rotación y traslación sutil
        // Detenemos la animación CSS temporalmente para que el mouse mande
        engineImage.style.animation = 'none';

        const xRotation = yPos * -20; // Hasta 10 grados
        const yRotation = xPos * 20;  // Hasta 10 grados

        engineImage.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });

    // Restaurar animación al salir
    hero.addEventListener('mouseleave', () => {
        engineImage.style.animation = 'floatEngine 6s ease-in-out infinite';
        engineImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}

// Parallax para la imagen de "Nosotros"
const aboutImg = document.querySelector('.about-img img');
const aboutSection = document.querySelector('#nosotros');

if (aboutSection && aboutImg) {
    aboutSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const rect = aboutSection.getBoundingClientRect();

        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;

        aboutImg.style.animation = 'none';
        // Aumentamos la intensidad y añadimos un ligero desplazamiento
        aboutImg.style.transform = `perspective(1000px) rotateY(${x * 25}deg) rotateX(${y * -25}deg) scale(1.08) translateY(${y * 10}px)`;
    });

    aboutSection.addEventListener('mouseleave', () => {
        aboutImg.style.animation = 'floatAbout 6s ease-in-out infinite';
        aboutImg.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0)';
    });
}

// Animación de aparición en scroll (Intersection Observer)
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Opcional: dejar de observar una vez revelado
            // observer.unobserve(entry.target); 
        }
    });
}, revealOptions);

// Inicializar estado de secciones
document.addEventListener('DOMContentLoaded', () => {
    // Observar secciones y contenedores de grids
    const elementsToReveal = document.querySelectorAll('section:not(.hero), .fortalezas, .services-grid');

    elementsToReveal.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });
});