// Smooth scroll para los enlaces de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Efecto de scroll en el header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    });

    // Configuración del Intersection Observer para animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // Función para observar elementos y agregar animación
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // No necesitamos observar más este elemento después de animarlo
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos principales del landing page para animar
    // Primero verificar si estamos en la página de keto o en index
    const isKetoPage = document.querySelector('.keto-hero');
    
    let elementsToAnimate = [];
    
    if (isKetoPage) {
        // Elementos para la página de keto
        elementsToAnimate = [
            '.hero-main-headline',
            '.keto-main-title',
            '.hero-subtitle-main',
            '.hero-subtitle-secondary',
            '.hero-description-box',
            '.ebook-cover-card',
            '.ebook-features-card',
            '.pricing-section',
            '.main-cta-section',
            '.includes-title',
            '.include-item',
            '.includes-image-placeholder',
            '.bonos-title',
            '.bono-item',
            '.pricing-breakdown',
            '.testimonios-title-main',
            '.testimonio-card-new',
            '.faq-title',
            '.faq-item',
            '.features-boxes',
            '.guarantee-badge-large',
            '.cta-final-content'
        ];
    } else {
        // Elementos para la página principal (index)
        elementsToAnimate = [
            '.hero-title',
            '.hero-subtitle',
            '.hero-description',
            '.hero-buttons',
            '.hero-illustration',
            '.section-title',
            '.section-text',
            '.section-title-left',
            '.mision-paragraph',
            '.mision-illustration',
            '.section-title-white',
            '.target-card',
            '.ofrecemos-card',
            '.testimonio-card',
            '.unete-content',
            '.recursos-subtitle',
            '.recursos-cta'
        ];
    }

    // Aplicar clases de animación y observar cada elemento
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            // Agregar clase base de animación
            element.classList.add('scroll-animate');
            
            // Agregar delay basado en el índice para efecto escalonado
            if (index > 0) {
                const delayClass = `scroll-animate-delay-${(index % 4) + 1}`;
                element.classList.add(delayClass);
            }
            
            // Observar el elemento
            scrollObserver.observe(element);
        });
    });

    // Animación especial para elementos en grid
    let gridElements;
    if (isKetoPage) {
        gridElements = document.querySelectorAll(
            '.testimonio-card-new, .bono-item, .include-item, .faq-item, .feature-box'
        );
    } else {
        gridElements = document.querySelectorAll(
            '.target-card, .ofrecemos-card, .testimonio-card'
        );
    }
    
    gridElements.forEach((element, index) => {
        // Solo agregar si no tiene ya la clase scroll-animate
        if (!element.classList.contains('scroll-animate')) {
            element.classList.add('scroll-animate');
            const delayClass = `scroll-animate-delay-${(index % 4) + 1}`;
            element.classList.add(delayClass);
            scrollObserver.observe(element);
        }
    });

    // Botón compartir
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Infodivent',
                    text: 'Contenido digital para inspirar, aprender y avanzar cada día',
                    url: window.location.href
                }).catch(err => console.log('Error al compartir:', err));
            } else {
                // Fallback: copiar URL al portapapeles
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('¡URL copiada al portapapeles!');
                });
            }
        });
    }
});
