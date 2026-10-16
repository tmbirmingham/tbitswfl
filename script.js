// TBIT SWFL — shared site script (navigation, footer year, scroll reveal)
(function () {
    "use strict";

    document.documentElement.classList.add("js");

    // Mobile navigation
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("site-nav");

    function setMenu(open) {
        if (!toggle || !menu) return;
        menu.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    if (toggle && menu) {
        toggle.addEventListener("click", function (e) {
            e.stopPropagation();
            setMenu(toggle.getAttribute("aria-expanded") !== "true");
        });

        // Close when a link is chosen
        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenu(false);
            });
        });

        // Close when clicking outside
        document.addEventListener("click", function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                setMenu(false);
            }
        });

        // Close on Escape and return focus to the toggle
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
                setMenu(false);
                toggle.focus();
            }
        });

        // Close when resizing to desktop
        window.addEventListener("resize", function () {
            if (window.innerWidth > 860) setMenu(false);
        });
    }

    // Keep the footer year current
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // Gentle reveal-on-scroll (skipped when reduced motion is preferred)
    var items = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("is-visible"); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
})();
