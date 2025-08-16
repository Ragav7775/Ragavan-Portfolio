var audio = document.getElementById("audioPlayer"),
    loader = document.getElementById("preloader");

// Toggle Settings Panel
function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
    document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

// Play / Pause Audio
function playpause() {
    if (document.getElementById("switchforsound").checked == false) {
        audio.pause();
    } else {
        audio.play();
    }
}

// Toggle Dark/Light Visual Mode
function visualmode() {
    document.body.classList.toggle("light-mode");
    document.querySelectorAll(".needtobeinvert").forEach(function (e) {
        e.classList.toggle("invertapplied");
    });
}

// Hide Preloader on Load
window.addEventListener("load", function () {
    // loader.style.display = "none"; // Commented out to keep the preloader visible even in fast internet
    setTimeout(() => {
        loader.style.display = "none";
    }, 1500);
    document.querySelector(".hey").classList.add("popup");
});

// Hamburger Menu Toggle
let emptyArea = document.getElementById("emptyarea"),
    mobileTogglemenu = document.getElementById("mobiletogglemenu");

function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.toggle("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// Scroll Spy for Active Sections
const sections = document.querySelectorAll("section"),
    navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
    mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

window.addEventListener("scroll", () => {
    let activeId = "";

    sections.forEach(sec => {
        let top = sec.offsetTop;
        if (pageYOffset >= top - 200) {
            activeId = sec.getAttribute("id");
        }
    });

    mobilenavLi.forEach(li => {
        li.classList.remove("activeThismobiletab");
        if (li.classList.contains(activeId)) {
            li.classList.add("activeThismobiletab");
        }
    });

    navLi.forEach(li => {
        li.classList.remove("activeThistab");
        if (li.classList.contains(activeId)) {
            li.classList.add("activeThistab");
        }
    });
});

// Console Credit
console.log(
    "%c Designed and Developed by Ragavan ",
    "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white; font-weight:900; font-size:1rem; padding:20px;"
);

// Back to Top Button
let mybutton = document.getElementById("backtotopbutton");

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrolltoTopfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
    scrollFunction();
};

// Disable Right-Click on Images
document.addEventListener(
    "contextmenu",
    function (e) {
        if (e.target.nodeName === "IMG") {
            e.preventDefault();
        }
    },
    false
);

// Eye Animation in Footer
let Pupils = document.getElementsByClassName("footer-pupil"),
    pupilsArr = Array.from(Pupils),
    pupilStartPoint = -10,
    pupilRangeX = 20,
    pupilRangeY = 15,
    mouseXStartPoint = 0,
    mouseXEndPoint = window.innerWidth,
    currentXPosition = 0,
    fracXValue = 0,
    mouseYEndPoint = window.innerHeight,
    currentYPosition = 0,
    fracYValue = 0,
    mouseXRange = mouseXEndPoint - mouseXStartPoint;

const mouseMove = e => {
    currentXPosition = e.clientX - mouseXStartPoint;
    fracXValue = currentXPosition / mouseXRange;
    currentYPosition = e.clientY;
    fracYValue = currentYPosition / mouseYEndPoint;

    let pupilX = pupilStartPoint + fracXValue * pupilRangeX,
        pupilY = pupilStartPoint + fracYValue * pupilRangeY;

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
