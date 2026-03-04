import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = [];

  const initAnimations = () => {
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    const isMobile = window.innerWidth <= 1000;
    const services = gsap.utils.toArray(".service-card");

    if (isMobile) {
      // Mobile: vertical stacking with simpler animation
      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = service.querySelector(".service-card-inner");

        if (!isLastServiceCard) {
          const pinTrigger = ScrollTrigger.create({
            trigger: service,
            start: "top 50%",
            endTrigger: ".about-copy",
            end: "top 95%",
            pin: true,
            pinSpacing: false,
          });
          scrollTriggerInstances.push(pinTrigger);

          const scrollAnimation = gsap.to(serviceCardInner, {
            y: `-${(services.length - index) * 10}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: service,
              start: "top 50%",
              endTrigger: ".about-copy",
              end: "top 95%",
              scrub: true,
            },
          });
          scrollTriggerInstances.push(scrollAnimation.scrollTrigger);
        }
      });
    } else {
      // Desktop: original stacking animation
      const mainTrigger = ScrollTrigger.create({
        trigger: services[0],
        start: "top 50%",
        endTrigger: services[services.length - 1],
        end: "top 150%",
      });
      scrollTriggerInstances.push(mainTrigger);

      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = service.querySelector(".service-card-inner");

        if (!isLastServiceCard) {
          const pinTrigger = ScrollTrigger.create({
            trigger: service,
            start: "top 45%",
            endTrigger: ".about-copy",
            end: "top 90%",
            pin: true,
            pinSpacing: false,
          });
          scrollTriggerInstances.push(pinTrigger);

          const scrollAnimation = gsap.to(serviceCardInner, {
            y: `-${(services.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: service,
              start: "top 45%",
              endTrigger: ".about-copy",
              end: "top 90%",
              scrub: true,
            },
          });
          scrollTriggerInstances.push(scrollAnimation.scrollTrigger);
        }
      });
    }
  };

  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});
