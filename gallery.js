"use strict";

/*==================================================
    APP INITIALIZATION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilter();

  initHeroScroll();

  initSmoothScroll();

  initActiveNavbar();

  initCounter();

  initScrollReveal();

  initLightbox();

  initBackToTop();

  initNavbarScroll();

  initGalleryHover();

  initLazyLoading();
});

/*==================================================
    HELPERS
==================================================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/*==================================================
    GALLERY FILTER
==================================================*/

const initGalleryFilter = () => {
  const buttons = $$(".gallery-filters .btn");

  const cards = $$(".gallery-card");

  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const category = button.dataset.filter;

      cards.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
          card.style.display = "block";

          setTimeout(() => {
            card.style.opacity = "1";

            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";

          card.style.transform = "translateY(30px)";

          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
};

/*==================================================
    HERO BUTTON SCROLL
==================================================*/

const initHeroScroll = () => {
  const button = $(".hero-btn");

  const target = $("#gallery");

  if (!button || !target) return;

  button.addEventListener("click", (e) => {
    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
};

/*==================================================
    SMOOTH SCROLL
==================================================*/

const initSmoothScroll = () => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');

    if (!link) return;

    const id = link.getAttribute("href");

    const target = document.querySelector(id);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",

      block: "start",
    });
  });
};

/*==================================================
    ACTIVE NAVBAR
==================================================*/

const initActiveNavbar = () => {
  const links = $$(".navbar .nav-link");

  if (!links.length) return;

  const sections = [];

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    const section = document.querySelector(href);

    if (section) {
      sections.push({
        link,

        section,
      });
    }
  });

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        sections.forEach((item) => {
          item.link.classList.remove("active");
        });

        const current = sections.find((item) => item.section === entry.target);

        if (current) {
          current.link.classList.add("active");
        }
      });
    },
    {
      threshold: 0.3,

      rootMargin: "-100px 0px -40%",
    },
  );

  sections.forEach((item) => {
    observer.observe(item.section);
  });
};

/*==================================================
    STATISTICS COUNTER
==================================================*/

const initCounter = () => {
  const counters = $$(".stat-number");

  if (!counters.length) return;

  counters.forEach((counter) => {
    const text = counter.textContent;

    const number = parseInt(
      text.replace(/[^\d]/g, ""),

      10,
    );

    const suffix = text.replace(/[0-9]/g, "");

    if (!number) return;

    let started = false;

    const animate = () => {
      if (started) return;

      started = true;

      let current = 0;

      const duration = 1600;

      const increment = number / (duration / 16);

      const timer = setInterval(() => {
        current += increment;

        if (current >= number) {
          current = number;

          clearInterval(timer);
        }

        counter.textContent = Math.floor(current) + suffix;
      }, 16);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();

          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(counter);
  });
};
/*==================================================
    SCROLL REVEAL
==================================================*/

const initScrollReveal = () => {
  const elements = $$(
    ".stat-card," +
      ".gallery-card," +
      ".memory-content," +
      ".memory-image," +
      ".cta-section",
  );

  if (!elements.length) return;

  elements.forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
};

/*==================================================
    LIGHTBOX
==================================================*/

const initLightbox = () => {
  const buttons = $$(".gallery-btn");

  if (!buttons.length) return;

  const lightbox = document.createElement("div");

  lightbox.className = "gallery-lightbox";

  lightbox.innerHTML = `

        <button class="gallery-close">

            <i class="fa-solid fa-xmark"></i>

        </button>


        <img src="" alt="Gallery Image">

    `;

  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");

  const close = lightbox.querySelector(".gallery-close");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      e.stopPropagation();

      const card = button.closest(".gallery-card");

      const img = card.querySelector("img");

      if (!img) return;

      image.src = img.src;

      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  });

  const closeBox = () => {
    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  };

  close.addEventListener("click", closeBox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeBox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeBox();
    }
  });
};

/*==================================================
    BACK TO TOP
==================================================*/

const initBackToTop = () => {
  let button = $(".back-to-top");

  if (!button) {
    button = document.createElement("button");

    button.className = "back-to-top";

    button.innerHTML = `

            <i class="fa-solid fa-arrow-up"></i>

        `;

    document.body.appendChild(button);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
};

/*==================================================
    NAVBAR SCROLL EFFECT
==================================================*/

const initNavbarScroll = () => {
  const header = $(".site-header");

  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
};

/*==================================================
    IMAGE HOVER 3D EFFECT
==================================================*/

const initGalleryHover = () => {
  const cards = $$(".gallery-card");

  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const rotateY = (x / rect.width - 0.5) * 8;

      const rotateX = (y / rect.height - 0.5) * -8;

      card.style.transform = `

                perspective(900px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                translateY(-8px)

            `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
};

/*==================================================
    LAZY IMAGE EFFECT
==================================================*/

const initLazyLoading = () => {
  const images = $$("img[loading='lazy']");

  if (!images.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "100px",
    },
  );

  images.forEach((img) => {
    observer.observe(img);
  });
};

/*==================================================
    WINDOW RESIZE
==================================================*/

window.addEventListener("resize", () => {
  document.documentElement.style.setProperty(
    "--window-width",

    `${window.innerWidth}px`,
  );
});

/*==================================================
    PAGE LOADED
==================================================*/

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
