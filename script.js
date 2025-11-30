document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const navigation = document.getElementById("navigation");
  const progressBar = document.getElementById("progressBar");

  // Agar asosiy elementlardan biri topilmasa – umuman ishlamasin, xato bermasin
  if (!slider || !navigation || !progressBar) {
    console.error(
      "Slider elementlari topilmadi (slider / navigation / progressBar)."
    );
    return;
  }

  const slides = Array.from(slider.querySelectorAll(".slide"));

  if (!slides.length) {
    console.error("Hech bo‘lmaganda bitta .slide element bo‘lishi kerak.");
    return;
  }

  let currentIndex = 0;

  // Navigatsiya nuqtalarini yaratish
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("nav-btn");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    navigation.appendChild(dot);
  });

  const navBtns = Array.from(navigation.querySelectorAll(".nav-btn"));

  function updateProgressBar() {
    const progress = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    navBtns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    updateProgressBar();
  }

  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // Tugmalar bo‘lsa, event biriktiramiz (bo‘lmasa xato bermaydi)
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Klaviatura
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  // Mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 100;
    if (touchStartX - touchEndX > threshold) nextSlide();
    else if (touchEndX - touchStartX > threshold) prevSlide();
  }

  // Boshlang‘ich slaydni ko‘rsatamiz
  showSlide(currentIndex);
});
