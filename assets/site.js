(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const willOpen = !navigation.classList.contains("open");
      navigation.classList.toggle("open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
    });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const heroVideo = document.querySelector("[data-hero-video]");
  const soundButton = document.querySelector("[data-sound-toggle]");
  if (heroVideo && soundButton) {
    soundButton.addEventListener("click", async () => {
      heroVideo.muted = !heroVideo.muted;
      const label = heroVideo.muted ? soundButton.dataset.off : soundButton.dataset.on;
      const text = soundButton.querySelector("span");
      if (text) text.textContent = label;
      soundButton.setAttribute("aria-label", label);
      if (heroVideo.paused) {
        try { await heroVideo.play(); } catch (_) { /* Browser may keep autoplay blocked. */ }
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll(".video-gallery video").forEach((video) => {
    video.addEventListener("play", () => {
      document.querySelectorAll(".video-gallery video").forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
      if (heroVideo && !heroVideo.paused) heroVideo.pause();
    });
  });
})();
