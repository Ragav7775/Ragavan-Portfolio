/**
 * RAGAVAN PORTFOLIO — MAIN JAVASCRIPT BUNDLE
 * Modernized, performant, accessible vanilla JavaScript architecture.
 */

(function () {
  "use strict";

  // -------------------------------------------------------------------------
  // 1. DOM NODES & STATE INITIALIZATION
  // -------------------------------------------------------------------------
  const elements = {
    audio: document.getElementById("audioPlayer"),
    preloader: document.getElementById("preloader"),
    heyBadge: document.querySelector(".hey"),
    settingContainer: document.getElementById("setting-container"),
    settingBtn: document.getElementById("switchforsetting"),
    visualModeBtn: document.getElementById("switchforvisualmode"),
    soundBtn: document.getElementById("switchforsound"),
    hamburgerBtn: document.getElementById("hamburger-button"),
    mobileMenu: document.getElementById("mobiletogglemenu"),
    burgerBars: [
      document.getElementById("burger-bar1"),
      document.getElementById("burger-bar2"),
      document.getElementById("burger-bar3"),
    ],
    navLinks: document.querySelectorAll(".navbar-tabs-ul li"),
    mobileNavLinks: document.querySelectorAll(".mobile-navbar-tabs-ul li"),
    sections: document.querySelectorAll("section[id]"),
    backToTopBtn: document.getElementById("backtotopbutton"),
    cursorInner: document.getElementById("cursor-inner"),
    cursorOuter: document.getElementById("cursor-outer"),
    pupils: Array.from(document.getElementsByClassName("footer-pupil")),
  };

  // -------------------------------------------------------------------------
  // 2. PRELOADER & INITIAL LOAD ORCHESTRATION
  // -------------------------------------------------------------------------
  function dismissPreloader() {
    if (!elements.preloader) return;
    elements.preloader.classList.add("fade-out");
    setTimeout(() => {
      elements.preloader.style.display = "none";
      if (elements.heyBadge) {
        elements.heyBadge.classList.add("popup");
      }
      if (window.AOS) {
        window.AOS.refresh();
      }
    }, 400);
  }

  if (document.readyState === "complete") {
    setTimeout(dismissPreloader, 600);
  } else {
    window.addEventListener("load", () => {
      setTimeout(dismissPreloader, 600);
    });
  }

  // -------------------------------------------------------------------------
  // 3. THEME & VISUAL MODE (WITH LOCALSTORAGE PERSISTENCE)
  // -------------------------------------------------------------------------
  const THEME_STORAGE_KEY = "ragavan_portfolio_theme";

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }
  }

  function toggleVisualMode() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem(THEME_STORAGE_KEY, isLight ? "light" : "dark");
  }

  if (elements.visualModeBtn) {
    elements.visualModeBtn.addEventListener("click", toggleVisualMode);
  }
  initTheme();

  // -------------------------------------------------------------------------
  // 4. SETTINGS PANEL TOGGLE
  // -------------------------------------------------------------------------
  function toggleSettings() {
    if (!elements.settingContainer || !elements.settingBtn) return;
    const isExpanded = elements.settingContainer.classList.toggle("settingactivate");
    elements.settingBtn.setAttribute("aria-expanded", String(isExpanded));
  }

  if (elements.settingBtn) {
    elements.settingBtn.addEventListener("click", toggleSettings);
  }

  // -------------------------------------------------------------------------
  // 5. BACKGROUND AUDIO CONTROLS (SAFE PROMISE HANDLING)
  // -------------------------------------------------------------------------
  let isAudioPlaying = false;

  function toggleSound() {
    if (!elements.audio || !elements.soundBtn) return;

    if (isAudioPlaying) {
      elements.audio.pause();
      isAudioPlaying = false;
      elements.soundBtn.classList.remove("sound-active");
      elements.soundBtn.setAttribute("aria-pressed", "false");
    } else {
      elements.audio
        .play()
        .then(() => {
          isAudioPlaying = true;
          elements.soundBtn.classList.add("sound-active");
          elements.soundBtn.setAttribute("aria-pressed", "true");
        })
        .catch(() => {
          // Playback blocked by browser policy
          isAudioPlaying = false;
          elements.soundBtn.classList.remove("sound-active");
          elements.soundBtn.setAttribute("aria-pressed", "false");
        });
    }
  }

  if (elements.soundBtn) {
    elements.soundBtn.addEventListener("click", toggleSound);
  }

  // -------------------------------------------------------------------------
  // 6. HAMBURGER MENU & ACCESSIBLE DRAWER
  // -------------------------------------------------------------------------
  function openMobileMenu() {
    if (!elements.mobileMenu || !elements.hamburgerBtn) return;
    elements.mobileMenu.classList.add("show-toggle-menu");
    elements.mobileMenu.setAttribute("aria-hidden", "false");
    elements.hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("stopscrolling");

    if (elements.burgerBars[0]) elements.burgerBars[0].classList.add("hamburger-animation1");
    if (elements.burgerBars[1]) elements.burgerBars[1].classList.add("hamburger-animation2");
    if (elements.burgerBars[2]) elements.burgerBars[2].classList.add("hamburger-animation3");
  }

  function closeMobileMenu() {
    if (!elements.mobileMenu || !elements.hamburgerBtn) return;
    elements.mobileMenu.classList.remove("show-toggle-menu");
    elements.mobileMenu.setAttribute("aria-hidden", "true");
    elements.hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("stopscrolling");

    if (elements.burgerBars[0]) elements.burgerBars[0].classList.remove("hamburger-animation1");
    if (elements.burgerBars[1]) elements.burgerBars[1].classList.remove("hamburger-animation2");
    if (elements.burgerBars[2]) elements.burgerBars[2].classList.remove("hamburger-animation3");
  }

  function toggleMobileMenu() {
    const isOpen = elements.mobileMenu?.classList.contains("show-toggle-menu");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (elements.hamburgerBtn) {
    elements.hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }

  // Close drawer when clicking any mobile navigation link
  elements.mobileNavLinks.forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });

  // Close drawer on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && elements.mobileMenu?.classList.contains("show-toggle-menu")) {
      closeMobileMenu();
    }
  });

  // -------------------------------------------------------------------------
  // 7. HIGH-PERFORMANCE SCROLL SPY VIA INTERSECTIONOBSERVER
  // -------------------------------------------------------------------------
  function updateActiveNav(activeId) {
    if (!activeId) return;

    elements.navLinks.forEach((li) => {
      const link = li.querySelector("a");
      const target = link?.getAttribute("href")?.replace("#", "");
      li.classList.toggle("activeThistab", target === activeId);
    });

    elements.mobileNavLinks.forEach((li) => {
      const link = li.querySelector("a");
      const target = link?.getAttribute("href")?.replace("#", "");
      li.classList.toggle("activeThismobiletab", target === activeId);
    });
  }

  if ("IntersectionObserver" in window && elements.sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveNav(entry.target.getAttribute("id"));
        }
      });
    }, observerOptions);

    elements.sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // -------------------------------------------------------------------------
  // 8. BACK TO TOP BUTTON
  // -------------------------------------------------------------------------
  let isScrolling = false;

  function handleScrollBackToTop() {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          elements.backToTopBtn?.classList.add("is-visible");
        } else {
          elements.backToTopBtn?.classList.remove("is-visible");
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  }

  window.addEventListener("scroll", handleScrollBackToTop, { passive: true });

  if (elements.backToTopBtn) {
    elements.backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // -------------------------------------------------------------------------
  // 9. HIGH-PERFORMANCE CUSTOM CURSOR (RAF & NO EVENT LISTENER LEAKS)
  // -------------------------------------------------------------------------
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (isFinePointer && elements.cursorInner && elements.cursorOuter) {
    let mouseX = -100;
    let mouseY = -100;
    let outerX = -100;
    let outerY = -100;

    window.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true }
    );

    function animateCursor() {
      // Inner cursor snaps directly
      elements.cursorInner.style.left = `${mouseX}px`;
      elements.cursorInner.style.top = `${mouseY}px`;

      // Outer cursor follows with smooth lerp
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      elements.cursorOuter.style.left = `${outerX}px`;
      elements.cursorOuter.style.top = `${outerY}px`;

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Event delegation for cursor hover states (zero memory leaks)
    document.addEventListener(
      "mouseover",
      (e) => {
        const target = e.target;
        if (target.closest("a, button, input, label, .tech-stack-box, .project-box")) {
          elements.cursorInner.classList.add("hover");
          elements.cursorOuter.classList.add("hover");
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseout",
      (e) => {
        const target = e.target;
        if (target.closest("a, button, input, label, .tech-stack-box, .project-box")) {
          elements.cursorInner.classList.remove("hover");
          elements.cursorOuter.classList.remove("hover");
        }
      },
      { passive: true }
    );
  }

  // -------------------------------------------------------------------------
  // 10. FOOTER PUPIL TRACKING (DESKTOP + TOUCH)
  // -------------------------------------------------------------------------
  if (elements.pupils.length > 0) {
    const pupilRangeX = 14;
    const pupilRangeY = 10;
    let targetPupilX = 0;
    let targetPupilY = 0;
    let pupilRafId = null;

    function updatePupilPosition() {
      elements.pupils.forEach((pupil) => {
        pupil.style.transform = `translate(${targetPupilX}px, ${targetPupilY}px)`;
      });
      pupilRafId = null;
    }

    function calculatePupils(clientX, clientY) {
      const fracX = clientX / window.innerWidth;
      const fracY = clientY / window.innerHeight;

      targetPupilX = (fracX - 0.5) * pupilRangeX * 2;
      targetPupilY = (fracY - 0.5) * pupilRangeY * 2;

      if (!pupilRafId) {
        pupilRafId = requestAnimationFrame(updatePupilPosition);
      }
    }

    window.addEventListener(
      "mousemove",
      (e) => {
        calculatePupils(e.clientX, e.clientY);
      },
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches && e.touches[0]) {
          calculatePupils(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );
  }

  // -------------------------------------------------------------------------
  // 11. RESIZE & ORIENTATION HANDLING
  // -------------------------------------------------------------------------
  let resizeTimeout;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          closeMobileMenu();
        }
        if (window.AOS) {
          window.AOS.refresh();
        }
      }, 200);
    },
    { passive: true }
  );
})();
