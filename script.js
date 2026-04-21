const navLinks = document.querySelectorAll("[data-nav-target]");
const sections = document.querySelectorAll("main section[id]");
const navToggle = document.querySelector(".site-nav-toggle");
const siteNav = document.querySelector(".site-nav");
const placeholderLinks = document.querySelectorAll('a[href="#"]');
const publicationToggle = document.querySelector("[data-publication-toggle]");
const extraPublications = document.querySelectorAll("[data-publication-extra]");

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function closeMobileNav() {
  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}

if (sections.length) {
  setActiveNav("hero");

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleSection) {
        setActiveNav(visibleSection.target.id);
      }
    },
    {
      rootMargin: "-18% 0px -58% 0px",
      threshold: [0.2, 0.4, 0.6],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) {
      closeMobileNav();
    }
  });
}

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

if (publicationToggle && extraPublications.length) {
  publicationToggle.addEventListener("click", () => {
    const expanded = publicationToggle.getAttribute("aria-expanded") === "true";
    const nextState = !expanded;

    publicationToggle.setAttribute("aria-expanded", String(nextState));
    publicationToggle.textContent = nextState ? "Show less" : "Show more";

    extraPublications.forEach((item) => {
      item.hidden = !nextState;
      item.classList.toggle("is-visible", nextState);
    });
  });
}
