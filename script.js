(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Mobile nav
  var toggle = document.getElementById("navToggle");
  var mobile = document.getElementById("navMobile");

  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      if (open) {
        mobile.setAttribute("hidden", "");
      } else {
        mobile.removeAttribute("hidden");
      }
    });

    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        mobile.setAttribute("hidden", "");
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
          hint.textContent = "Enter a valid work email.";
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
