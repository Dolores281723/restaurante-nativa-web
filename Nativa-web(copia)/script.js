document.addEventListener('DOMContentLoaded', function() {
    
    // Desplazamiento suave para los enlaces del menú
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Se resta el alto del header para que no quede tapado
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pequeña animación para las secciones al hacer scroll
    const sections = document.querySelectorAll('section');

    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        // Preparamos las secciones para la animación
        section.style.opacity = 0;
        section.style.transform = "translateY(50px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        
        // La sección Hero es visible desde el principio
        if (section.id === 'hero') {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        } else {
            sectionObserver.observe(section);
        }
    });

});