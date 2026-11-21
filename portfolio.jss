
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.classList.toggle("open", isOpen);
        });

        // Close menu after clicking a navigation link
        navigationItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside it
        document.addEventListener("click", event => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu using Escape key
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    // ==========================================
    // 2. HEADER SCROLL EFFECT
    // ==========================================

    const header = document.querySelector(".header");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 30);
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    // ==========================================
    // 3. ROTATING GIS SPECIALISATIONS
    // ==========================================

    const changingText = document.getElementById("changing-text");

    const specialisations = [
        "GIS & Mapping",
        "Remote Sensing",
        "Earth Observation",
        "Spatial Analysis",
        "Environmental Research"
    ];

    let currentPhrase = 0;

    if (changingText) {
        setInterval(() => {

            // Fade out current phrase
            changingText.classList.add("fade-out");

            setTimeout(() => {

                // Move to next phrase
                currentPhrase = (currentPhrase + 1) % specialisations.length;

                changingText.textContent = specialisations[currentPhrase];

                // Fade in new phrase
                changingText.classList.remove("fade-out");

            }, 300);

        }, 2500);
    }


    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-main, " +
        ".highlight-card, " +
        ".project-card, " +
        ".skill-group, " +
        ".experience-item, " +
        ".contact-info, " +
        ".contact-form-wrapper, " +
        ".hero-content, " +
        ".hero-visual"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("reveal");
        });

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
    }


    // ==========================================
    // 5. ACTIVE NAVIGATION LINK
    // ==========================================

    const sections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.getAttribute("id");

                        navigationItems.forEach(link => {

                            link.classList.remove("active-link");

                            if (link.getAttribute("href") === `#${sectionId}`) {
                                link.classList.add("active-link");
                            }

                        });
                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // ==========================================
    // 6. AUTOMATIC FOOTER YEAR
    // ==========================================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 7. CONTACT FORM - FORMSPREE
    // ==========================================

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", async event => {

            event.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            if (!submitButton) {
                contactForm.submit();
                return;
            }

            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            try {

                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {

                    contactForm.reset();
                    submitButton.textContent = "Message Sent ✓";

                } else {

                    submitButton.textContent = "Could Not Send";

                }

            } catch (error) {

                console.error("Contact form error:", error);

                submitButton.textContent = "Connection Error";

            }

            setTimeout(() => {

                submitButton.textContent = originalText;
                submitButton.disabled = false;

            }, 3000);

        });
    }


    // ==========================================
    // 8. SMOOTH SCROLL FOR NAVIGATION
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    console.log("Portfolio JavaScript loaded successfully.");

});
