const navLinks = document.querySelectorAll("[data-nav-target]");
const sections = document.querySelectorAll(".content-section");
const profileToggle = document.querySelector(".profile-toggle");
const profileDetails = document.querySelector(".profile-details");
const publicationsToggle = document.querySelector("[data-toggle-publications]");
const extraPublications = document.querySelectorAll(".extra-publication");
const placeholderLinks = document.querySelectorAll('a[href="#"]');

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
  });
}

if (sections.length) {
  setActiveNav("about");

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveNav(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

function syncProfilePanel() {
  if (!profileToggle || !profileDetails) {
    return;
  }

  const isMobile = window.matchMedia("(max-width: 860px)").matches;

  if (isMobile) {
    const expanded = profileToggle.getAttribute("aria-expanded") === "true";
    profileDetails.classList.toggle("is-open", expanded);
  } else {
    profileDetails.classList.add("is-open");
  }
}

if (profileToggle && profileDetails) {
  profileToggle.addEventListener("click", () => {
    const expanded = profileToggle.getAttribute("aria-expanded") === "true";
    profileToggle.setAttribute("aria-expanded", String(!expanded));
    profileToggle.textContent = expanded ? "Show details" : "Hide details";
    syncProfilePanel();
  });

  window.addEventListener("resize", syncProfilePanel);
  syncProfilePanel();
}

if (publicationsToggle && extraPublications.length) {
  publicationsToggle.addEventListener("click", () => {
    const expanded = publicationsToggle.getAttribute("aria-expanded") === "true";
    publicationsToggle.setAttribute("aria-expanded", String(!expanded));
    publicationsToggle.textContent = expanded ? "Show more" : "Show less";

    extraPublications.forEach((item) => {
      item.classList.toggle("is-hidden", expanded);
    });
  });
}
