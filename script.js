// Mark that JS is active (enables reveal-on-scroll styling)
document.documentElement.classList.add("js");

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (persisted)
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-toggle");
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon();
});

function updateThemeIcon() {
  themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
}

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal-on-scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".section, .project-featured").forEach((el) => observer.observe(el));
