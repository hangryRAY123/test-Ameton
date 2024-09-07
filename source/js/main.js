import { iosVhFix } from "./utils/ios-vh-fix";
import { initModals } from "./modules/modals/init-modals";
import { Form } from "./modules/form-validate/form";
import Swiper from "./vendor/swiper";

// ---------------------------------

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    spaceBetween: 8,
    slidesPerView: 1,
    watchSlidesProgress: true,

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      550: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  class ItcAccordion {
    constructor(target, config) {
      this._el =
        typeof target === "string" ? document.querySelector(target) : target;
      const defaultConfig = {
        alwaysOpen: true,
        duration: 350,
      };
      this._config = Object.assign(defaultConfig, config);
      this.addEventListener();
    }
    addEventListener() {
      this._el.addEventListener("click", (e) => {
        const elHeader = e.target.closest(".accordion__header");

        if (!elHeader) {
          return;
        }
        if (!this._config.alwaysOpen) {
          const elOpenItem = this._el.querySelector(".accordion__item_show");
          if (elOpenItem) {
            elOpenItem !== elHeader.parentElement
              ? this.toggle(elOpenItem)
              : null;
          }
        }
        this.toggle(elHeader.parentElement);
      });
    }
    show(el) {
      const elBody = el.querySelector(".accordion__body");
      if (
        elBody.classList.contains("collapsing") ||
        el.classList.contains("accordion__item_show")
      ) {
        return;
      }
      elBody.style.display = "block";
      const height = elBody.offsetHeight;
      elBody.style.height = 0;
      elBody.style.overflow = "hidden";
      elBody.style.transition = `height ${this._config.duration}ms ease`;
      elBody.classList.add("collapsing");
      el.classList.add("accordion__item_slidedown");
      elBody.offsetHeight;
      elBody.style.height = `${height}px`;
      window.setTimeout(() => {
        elBody.classList.remove("collapsing");
        el.classList.remove("accordion__item_slidedown");
        elBody.classList.add("collapse");
        el.classList.add("accordion__item_show");
        elBody.style.display = "";
        elBody.style.height = "";
        elBody.style.transition = "";
        elBody.style.overflow = "";
      }, this._config.duration);
    }
    hide(el) {
      const elBody = el.querySelector(".accordion__body");
      if (
        elBody.classList.contains("collapsing") ||
        !el.classList.contains("accordion__item_show")
      ) {
        return;
      }
      elBody.style.height = `${elBody.offsetHeight}px`;
      elBody.offsetHeight;
      elBody.style.display = "block";
      elBody.style.height = 0;
      elBody.style.overflow = "hidden";
      elBody.style.transition = `height ${this._config.duration}ms ease`;
      elBody.classList.remove("collapse");
      el.classList.remove("accordion__item_show");
      elBody.classList.add("collapsing");
      window.setTimeout(() => {
        elBody.classList.remove("collapsing");
        elBody.classList.add("collapse");
        elBody.style.display = "";
        elBody.style.height = "";
        elBody.style.transition = "";
        elBody.style.overflow = "";
      }, this._config.duration);
    }
    toggle(el) {
      el.classList.contains("accordion__item_show")
        ? this.hide(el)
        : this.show(el);
    }
  }

  if (document.querySelector(".accordion")) {
    new ItcAccordion(document.querySelector(".accordion"), {
      alwaysOpen: false,
    });
  }

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener("load", () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
