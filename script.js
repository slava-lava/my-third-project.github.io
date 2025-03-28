let swiperInstance = null;

function initOrDestroySwiper() {
  const isMobile = window.innerWidth < 768;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper(".brands", {
        slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".brands__pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1.31 },
        480: { slidesPerView: 1.9 },
      },
    });
  } else if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".brands__toggle");
  const brandsBlock = document.querySelector(".brands");

  let expanded = false;

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    brandsBlock.classList.toggle("brands--expanded", expanded);
    toggleBtn.classList.toggle("expanded", expanded);
    toggleBtn.textContent = expanded ? "Скрыть всё" : "Показать всё";
  });

  function updateToggleButton() {
    const width = window.innerWidth;
    if (width >= 768) {
      toggleBtn.style.display = "inline-flex";
      brandsBlock.classList.remove("brands--expanded");
      toggleBtn.classList.remove("expanded");
      toggleBtn.textContent = "Показать всё";
      expanded = false;
    } else {
      toggleBtn.style.display = "none";
    }
  }

  initOrDestroySwiper();
  updateToggleButton();

  window.addEventListener("resize", () => {
    initOrDestroySwiper();
    updateToggleButton();
  });
});