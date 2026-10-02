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
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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
