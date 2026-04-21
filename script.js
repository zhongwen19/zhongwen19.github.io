const navLinks = document.querySelectorAll("[data-nav-target]");
const sections = document.querySelectorAll(".content-section");
const placeholderLinks = document.querySelectorAll('a[href="#"]');
const navToggle = document.querySelector(".nav-toggle");
const topNav = document.querySelector(".topnav");
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
  if (!navToggle || !topNav) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  topNav.classList.remove("is-open");
}

if (sections.length) {
  setActiveNav("about");

  const observer = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (current) {
        setActiveNav(current.target.id);
      }
    },
    {
      rootMargin: "-18% 0px -58% 0px",
      threshold: [0.2, 0.4, 0.6],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

if (navToggle && topNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    topNav.classList.toggle("is-open", !expanded);
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
    publicationToggle.setAttribute("aria-expanded", String(!expanded));
    publicationToggle.textContent = expanded ? "Show more" : "Show less";

    extraPublications.forEach((item) => {
      item.hidden = expanded;
      item.classList.toggle("is-revealed", !expanded);
    });
  });
}
