(() => {
  "use strict";

  const storedTheme = localStorage.getItem("theme");

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = function (theme) {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme) => {
    const activeThemeIcon = document.querySelector(".theme-icon-active");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
    });

    btnToActive.classList.add("active");
    activeThemeIcon.innerHTML = btnToActive.innerHTML;

    document.querySelectorAll(".pr-check").forEach((check) => {
      check.classList.add("d-none");
    });

    const activeCheck = btnToActive.querySelector(".pr-check");
    if (activeCheck) {
      activeCheck.classList.remove("d-none");
    }
  };

  const updateThemeIcon = (theme) => {
    const themeIcon = document.querySelector("#bd-theme .theme-icon-active");

    if (theme === "light") {
      themeIcon.innerHTML = '<i class="bi bi-sun me-1"></i>';
    } else if (theme === "dark") {
      themeIcon.innerHTML = '<i class="bi bi-moon me-1"></i>';
    } else {
      themeIcon.innerHTML = '<i class="bi bi-circle-half me-1"></i>';
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());
    updateThemeIcon(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        localStorage.setItem("theme", theme);
        setTheme(theme);
        showActiveTheme(theme);
        updateThemeIcon(theme);
      });
    });
  });
})();
