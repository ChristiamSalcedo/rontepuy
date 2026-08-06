document.addEventListener('DOMContentLoaded', () => {

  // 1. Estado de la barra de navegación al hacer scroll
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  // 2. Menú móvil
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('navMobile');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Animaciones al hacer scroll (soporta entradas centrales y laterales)
  const revealEls = document.querySelectorAll('.reveal, .reveal--left, .reveal--right');

if (revealEls.length > 0) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target); // Ejecuta la animación una sola vez
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px' // Obliga a hacer scroll más abajo para activar la animación
  });

  revealEls.forEach(el => io.observe(el));
}

  // 4. Carrusel de cócteles
  const track = document.getElementById('carouselTrack');
  if (track) {
    const cocktails = [
      {
        slug: 'old-fashioned',
        name: 'Old Fashioned',
        desc: 'Ron Tepuy Monumento, azúcar, angostura y una torcida de naranja.',
        image: 'assets/cocteles/old-fashioned.jpeg'
      },
      {
        slug: 'rum-sour',
        name: 'Rum Sour',
        desc: 'Ron Tepuy Destino, limón fresco, jarabe natural y clara de huevo.',
        image: 'assets/cocteles/ron-sour.jpeg'
      },
      {
        slug: 'negroni-tepuy',
        name: 'Negroni de Tepuy',
        desc: 'Ron Tepuy Monumento, vermut rojo y bitter, en partes iguales.',
        image: 'assets/cocteles/negroni.jpeg'
      },
      {
        slug: 'manhattan',
        name: 'Manhattan',
        desc: 'Ron Tepuy Destino, Vermut rojo y bitter, en partes iguales.',
        image: 'assets/cocteles/manhattan.jpeg'
      },
      {
        slug: 'daiquiri',
        name: 'Daiquiri',
        desc: 'Ron Tepuy Monumento, limón fresco y azúcar.',
        image: 'assets/cocteles/daiquiri.jpeg'
      }
    ];

    const buildCard = (c) => {
      const card = document.createElement('article');
      card.className = 'cocktail';
      card.innerHTML = `
        <div class="cocktail__media">
          <img src="${c.image}" alt="${c.name}" class="cocktail__img" loading="lazy">
        </div>
        <div class="cocktail__body">
          <h4 class="cocktail__name">${c.name}</h4>
          <p class="cocktail__desc">${c.desc}</p>
          <a href="receta.html?coctel=${c.slug}" class="cocktail__link">Ver receta &rarr;</a>
        </div>
      `;
      return card;
    };

    // Duplicado de elementos para permitir desplazamiento infinito continuo
    const list = [...cocktails, ...cocktails];
    list.forEach(c => track.appendChild(buildCard(c)));
  }

});

document.addEventListener("DOMContentLoaded", () => {
  const estados = document.querySelectorAll(".map-svg path");
  const tituloEstado = document.getElementById("estadoNombre");
  const tooltip = document.getElementById("mapTooltip");
  const mapWrapper = document.querySelector(".map-wrapper");

  if (estados.length > 0) {
    estados.forEach((estado) => {
      // 1. Evento para mover el mouse dentro del estado
      estado.addEventListener("mousemove", (e) => {
        const nombre = estado.getAttribute("title") || estado.getAttribute("id");
        const info = estado.getAttribute("data-info");

        // Cambia el título fijo arriba del mapa
        if (tituloEstado) {
          tituloEstado.textContent = nombre;
        }

        // Si tiene data-info, posiciona y muestra la leyenda flotante
        if (info && tooltip && mapWrapper) {
          tooltip.innerHTML = `<strong>${nombre}</strong>${info}`;
          tooltip.style.display = "block";

          const rect = mapWrapper.getBoundingClientRect();
          const x = e.clientX - rect.left + 15;
          const y = e.clientY - rect.top - 15;

          tooltip.style.left = `${x}px`;
          tooltip.style.top = `${y}px`;
        } else if (tooltip) {
          tooltip.style.display = "none";
        }
      });

      // 2. Evento cuando el mouse sale del estado
      estado.addEventListener("mouseleave", () => {
        if (tituloEstado) {
          tituloEstado.textContent = "Explora Venezuela";
        }
        if (tooltip) {
          tooltip.style.display = "none";
        }
      });

      // 3. Evento al hacer clic en un estado
      estado.addEventListener("click", () => {
        estados.forEach((e) => e.classList.remove("active"));
        estado.classList.add("active");
      });
    });
  }
});