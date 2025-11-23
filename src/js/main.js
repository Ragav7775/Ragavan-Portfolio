var audio = document.getElementById("audioPlayer"),
    loader = document.getElementById("preloader");

/* ------------------ TOGGLE SETTINGS PANEL ------------------ */
function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
    document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

/* ------------------ PLAY/PAUSE BACKGROUND AUDIO ------------------ */
function playpause() {
    if (!document.getElementById("switchforsound").checked) audio.pause();
    else audio.play();
}

/* ------------------ VISUAL MODE TOGGLE ------------------ */
function visualmode() {
    document.body.classList.toggle("light-mode");
    document.querySelectorAll(".needtobeinvert").forEach(e => {
        e.classList.toggle("invertapplied");
    });
}

/* ------------------ PRELOADER ------------------ */
window.addEventListener("load", function () {
    setTimeout(() => {
        loader.style.display = "none";
        AOS.refreshHard();     // ensures mobile/tablet correct offsets
    }, 1500);

    document.querySelector(".hey").classList.add("popup");
});

/* ------------------ HAMBURGER MENU ------------------ */
let emptyArea = document.getElementById("emptyarea"),
    mobileTogglemenu = document.getElementById("mobiletogglemenu");

function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");

    mobileTogglemenu.classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.remove("stopscrolling");

    mobileTogglemenu.classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

/* ------------------ SCROLL SPY (THROTTLED) ------------------ */
const sections = document.querySelectorAll("section"),
    navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
    mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        fn(...args);
    };
}

window.addEventListener("scroll", throttle(() => {
    let activeId = "";

    sections.forEach(sec => {
        if (pageYOffset >= sec.offsetTop - 200) {
            activeId = sec.getAttribute("id");
        }
    });

    mobilenavLi.forEach(li => {
        li.classList.toggle("activeThismobiletab", li.classList.contains(activeId));
    });

    navLi.forEach(li => {
        li.classList.toggle("activeThistab", li.classList.contains(activeId));
    });

    AOS.refresh(); // keeps animations accurate
}, 100));

/* ------------------ BACK TO TOP BUTTON ------------------ */
let mybutton = document.getElementById("backtotopbutton");

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 400) mybutton.style.display = "block";
    else mybutton.style.display = "none";
});

function scrolltoTopfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/* ------------------ DISABLE IMAGE RIGHT-CLICK ------------------ */
document.addEventListener("contextmenu", function (e) {
    if (e.target.nodeName === "IMG") e.preventDefault();
});

/* ------------------ FOOTER EYE ANIMATION (DESKTOP + MOBILE) ------------------ */
let Pupils = document.getElementsByClassName("footer-pupil"),
    pupilsArr = Array.from(Pupils),
    pupilStartPoint = -10,
    pupilRangeX = 20,
    pupilRangeY = 15,
    mouseXStartPoint = 0,
    mouseXEndPoint = window.innerWidth,
    mouseYEndPoint = window.innerHeight,
    mouseXRange = mouseXEndPoint - mouseXStartPoint;

const mouseMove = e => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    let fracXValue = (clientX - mouseXStartPoint) / mouseXRange;
    let fracYValue = clientY / mouseYEndPoint;

    let pupilX = pupilStartPoint + fracXValue * pupilRangeX;
    let pupilY = pupilStartPoint + fracYValue * pupilRangeY;

    pupilsArr.forEach(pupil => {
        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
};

const windowResize = () => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
    mouseXRange = mouseXEndPoint - mouseXStartPoint;
};

window.addEventListener("mousemove", mouseMove);
window.addEventListener("resize", windowResize);
window.addEventListener("orientationchange", windowResize);

/* Mobile touch support */
window.addEventListener("touchmove", e => {
    const t = e.touches[0];
    mouseMove({ clientX: t.clientX, clientY: t.clientY });
});

window.addEventListener("touchstart", e => {
    const t = e.touches[0];
    mouseMove({ clientX: t.clientX, clientY: t.clientY });
});

/* ------------------ AOS STABILITY FIXES ------------------ */
window.addEventListener("resize", () => AOS.refresh());
window.addEventListener("orientationchange", () => {
    setTimeout(() => AOS.refreshHard(), 300);
});

/* Final guaranteed mobile/tablet fix */
window.addEventListener("load", () => {
    setTimeout(() => AOS.refreshHard(), 500);
});
