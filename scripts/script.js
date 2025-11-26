/* =========================================
   SCRIPT.JS - O Cérebro do Site
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. MENU MOBILE E NAVEGAÇÃO
    // =========================================
    const mobileBtn = document.querySelector('.menu-mobile');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileBtn.classList.toggle('toggle');
        });
    }

    // Navbar com sombra ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // =========================================
    // 2. SISTEMA DE FILTROS DO PORTFÓLIO
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões e adiciona no clicado
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    // Se for 'todos' ou se a categoria bater com o filtro
                    if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Pequeno delay para a animação funcionar suavemente
                        setTimeout(() => {
                            item.classList.add('visible');
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        // Espera a transição visual acabar antes de remover do layout
                        setTimeout(() => {
                            item.style.display = 'none';
                            item.classList.remove('visible');
                        }, 400);
                    }
                });
            });
        });
    }


    // =========================================
    // 3. LIGHTBOX (JANELA MODAL DE FOTO)
    // =========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const triggers = document.querySelectorAll('.card-image');

    if (lightbox) {
        // Abrir Lightbox
        triggers.forEach(trigger => {
            trigger.addEventListener('click', function () {
                const img = this.querySelector('img');
                const title = this.nextElementSibling.querySelector('h3').innerText; // Pega o título do cartão

                lightbox.style.display = 'flex';
                setTimeout(() => lightbox.classList.add('active'), 10); // Fade in suave

                lightboxImg.src = img.src;
                lightboxCaption.innerText = title;
            });
        });

        // Fechar Lightbox (Clicando no X)
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
        });

        // Fechar Lightbox (Clicando fora da foto)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => lightbox.style.display = 'none', 300);
            }
        });
    }


    // =========================================
    // 4. ANIMAÇÕES GERAIS (SCROLL OBSERVER)
    // =========================================
    const observerOptions = {
        threshold: 0.1 // Começa a animar quando 10% do item aparece
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Lista de elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.gallery-item, .gallery-card, .text-box, .hero-content, .animate-left, .animate-right');

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

});