/* =========================================================
   ANURAG CHAUHAN — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const backTop = document.querySelector(".back-top");
    const revealElements = document.querySelectorAll(".reveal");
    const contactForm = document.querySelector(".contact-form");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon = menuBtn.querySelector("i");

            if (nav.classList.contains("open")) {

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }

            } else {

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Close menu after clicking a link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =====================================================
       NAVBAR ON SCROLL
    ===================================================== */

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

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


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        });


        backTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }


            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const navbarHeight = navbar
                    ? navbar.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,
                    behavior: "smooth"

                });

            }

        });

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const nameInput =
                contactForm.querySelector('[name="name"]');

            const emailInput =
                contactForm.querySelector('[name="email"]');

            const messageInput =
                contactForm.querySelector('[name="message"]');

            const status =
                contactForm.querySelector(".form-status");

            const submitBtn =
                contactForm.querySelector(".submit-btn");


            const name =
                nameInput ? nameInput.value.trim() : "";

            const email =
                emailInput ? emailInput.value.trim() : "";

            const message =
                messageInput ? messageInput.value.trim() : "";


            /* Basic validation */

            if (!name || !email || !message) {

                if (status) {

                    status.textContent =
                        "Please fill in all fields.";

                    status.style.color = "#ff6b6b";

                }

                return;

            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                if (status) {

                    status.textContent =
                        "Please enter a valid email address.";

                    status.style.color = "#ff6b6b";

                }

                return;

            }


            /* Button loading state */

            if (submitBtn) {

                submitBtn.disabled = true;

                submitBtn.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            }


            /*
             IMPORTANT:

             This part only handles the frontend.

             It does NOT automatically send the message
             to your Gmail.

             For real email sending, connect the form
             with Formspree, EmailJS, Web3Forms, or your
             own backend.
            */


            setTimeout(() => {

                if (status) {

                    status.textContent =
                        "Form is ready. Connect an email service to receive messages.";

                    status.style.color =
                        "#7894ff";

                }


                if (submitBtn) {

                    submitBtn.disabled = false;

                    submitBtn.innerHTML =
                        '<i class="fa-regular fa-paper-plane"></i> Send Message';

                }

            }, 800);

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector(".typing-text");


    if (typingElement) {

        const words = [

            "Computer Science Student",
            "Web Developer",
            "UI/UX Enthusiast",
            "Problem Solver"

        ];


        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1800);

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 50 : 90
            );

        }


        typeEffect();

    }


    /* =====================================================
       PROJECT CARD TILT EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 760) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cWelcome to Anurag Chauhan's Portfolio 🚀",
        "font-size:16px;font-weight:bold;"
    );

});