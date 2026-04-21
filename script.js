const navLinks = document.querySelectorAll("[data-nav-target]");
const sections = document.querySelectorAll(".content-section");
const placeholderLinks = document.querySelectorAll('a[href="#"]');
const toggleButtons = document.querySelectorAll("[data-toggle-target]");

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
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (current) {
        setActiveNav(current.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -60% 0px",
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

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-toggle-target");
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "[+]" : "[-]";
    target.hidden = expanded;
  });
});
