/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");
        document.body.classList.toggle("menu-open");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("open")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");
            document.body.classList.remove("menu-open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.replace("fa-xmark", "fa-bars");
            }

        });

    });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================
   ROTATING GIS SPECIALISATIONS
========================================= */

const changingText = document.getElementById("changing-text");

const specialisations = [
    "GIS & Mapping",
    "Remote Sensing",
    "Earth Observation",
    "Spatial Analysis",
    "Environmental Research",
    "Geospatial Technology"
];

let specialisationIndex = 0;

if (changingText) {

    setInterval(() => {

        changingText.style.opacity = "0";

        setTimeout(() => {

            specialisationIndex++;

            if (specialisationIndex >= specialisations.length) {
                specialisationIndex = 0;
            }

            changingText.textContent =
                specialisations[specialisationIndex];

            changingText.style.opacity = "1";

        }, 400);

    }, 3000);

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* =========================================
   PROJECT CAROUSEL
========================================= */

const projectsGrid = document.getElementById("projects-grid");

const projectNext = document.getElementById("project-next");
const projectPrev = document.getElementById("project-prev");

function getProjectScrollAmount() {

    if (!projectsGrid) return 0;

    const card = projectsGrid.querySelector(".project-card");

    if (!card) return 0;

    const gap = parseFloat(
        getComputedStyle(projectsGrid).gap
    ) || 0;

    return card.offsetWidth + gap;

}


if (projectNext && projectsGrid) {

    projectNext.addEventListener("click", () => {

        projectsGrid.scrollBy({
            left: getProjectScrollAmount(),
            behavior: "smooth"
        });

    });

}


if (projectPrev && projectsGrid) {

    projectPrev.addEventListener("click", () => {

        projectsGrid.scrollBy({
            left: -getProjectScrollAmount(),
            behavior: "smooth"
        });

    });

}


/* =========================================
   PROJECT DRAG SCROLL
========================================= */

if (projectsGrid) {

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    projectsGrid.addEventListener("mousedown", event => {

        if (event.target.closest("a")) return;

        isDragging = true;

        startX = event.pageX;
        scrollStart = projectsGrid.scrollLeft;

        projectsGrid.style.cursor = "grabbing";

    });

    projectsGrid.addEventListener("mouseleave", () => {

        isDragging = false;
        projectsGrid.style.cursor = "grab";

    });

    projectsGrid.addEventListener("mouseup", () => {

        isDragging = false;
        projectsGrid.style.cursor = "grab";

    });

    projectsGrid.addEventListener("mousemove", event => {

        if (!isDragging) return;

        event.preventDefault();

        const distance = event.pageX - startX;

        projectsGrid.scrollLeft = scrollStart - distance;

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {

    contactForm.addEventListener("submit", async event => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML =
            'Sending... <i class="fas fa-spinner fa-spin"></i>';

        if (formMessage) {
            formMessage.textContent = "";
        }

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(contactForm.action, {

                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }

            });

            if (response.ok) {

                if (formMessage) {
                    formMessage.textContent =
                        "Message sent successfully! Thank you for reaching out.";
                }

                contactForm.reset();

            } else {

                if (formMessage) {
                    formMessage.textContent =
                        "Something went wrong. Please try again.";
                }

            }

        } catch (error) {

            if (formMessage) {
                formMessage.textContent =
                    "Unable to send your message. Please try again.";
            }

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

        }

    });

}


/* =========================================
   BACK TO TOP BUTTON
========================================= */

const backToTop = document.getElementById("back-to-top");

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

}

window.addEventListener("scroll", updateBackToTop);

updateBackToTop();


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});
