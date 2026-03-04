document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  // Reveal video cards on scroll
  const videoCards = document.querySelectorAll(".video-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "50px", threshold: 0.1 }
  );

  videoCards.forEach((card) => observer.observe(card));
});
