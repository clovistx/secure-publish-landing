(function () {
  "use strict";

  var htmlLang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
  var isPt = htmlLang.indexOf("pt") === 0;

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Language switcher — preserve hash when possible
  document.querySelectorAll(".lang-switch").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var base = link.getAttribute("data-lang-base") || link.getAttribute("href");
      if (!base) return;
      var hash = window.location.hash || "";
      // Normalize directory base
      var target = base;
      if (target.slice(-1) !== "/" && target.indexOf(".html") === -1) {
        target += "/";
      }
      if (hash) {
        e.preventDefault();
        window.location.assign(target + hash);
      }
    });
  });

  // Mobile nav — .nav__mobile.is-open pattern (not [hidden] alone)
  var toggle = document.getElementById("navToggle");
  var mobile = document.getElementById("navMobile");

  if (toggle && mobile) {
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        open
          ? (isPt ? "Fechar menu" : "Close menu")
          : (isPt ? "Abrir menu" : "Open menu")
      );
      mobile.classList.toggle("is-open", open);
      if (open) {
        mobile.removeAttribute("hidden");
      } else {
        mobile.setAttribute("hidden", "");
      }
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        // Keep menu open briefly only for same-page hash; always close
        setOpen(false);
      });
    });
  }

  // Waitlist form — client-side success only (no backend)
  var form = document.getElementById("waitlistForm");
  var success = document.getElementById("waitlistSuccess");
  var hint = document.getElementById("formHint");
  var emailInput = document.getElementById("email");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form && success && emailInput) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (emailInput.value || "").trim();

      if (!isValidEmail(value)) {
        emailInput.classList.add("is-invalid");
        emailInput.setAttribute("aria-invalid", "true");
        if (hint) {
          hint.textContent = isPt
            ? "Informe um e-mail corporativo válido."
            : "Enter a valid work email.";
        }
        emailInput.focus();
        return;
      }

      emailInput.classList.remove("is-invalid");
      emailInput.removeAttribute("aria-invalid");
      if (hint) {
        hint.textContent = "";
      }

      form.hidden = true;
      success.hidden = false;
    });

    emailInput.addEventListener("input", function () {
      emailInput.classList.remove("is-invalid");
      emailInput.removeAttribute("aria-invalid");
      if (hint) {
        hint.textContent = "";
      }
    });
  }
})();
