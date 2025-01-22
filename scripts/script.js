const navLinks = document.querySelectorAll(".header__menu-link");
const currentPage = window.location.pathname; // Используем pathname вместо полного URL

navLinks.forEach((link) => {
    // Если href совпадает с текущим путем, добавляем класс active
    if (link.pathname === currentPage) {
        link.classList.add("active");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const festivalDate = new Date("2025-06-01T00:00:00").getTime();
    const countdownTimer = document.querySelector(".countdown__timer");
    const festivalStartedText = document.getElementById("festival-started");

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = festivalDate - now;

        if (timeLeft <= 0) {
            countdownTimer.classList.add("hidden");
            festivalStartedText.classList.remove("hidden");
            festivalStartedText.classList.add("visible");
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});


    document.addEventListener("DOMContentLoaded", function () {
      const images = document.querySelectorAll(".slideshow-image");
      const interval = 5000;
  
      let currentImageIndex = 0;
  
      function changeImage() {
          images[currentImageIndex].classList.remove("active");
  
          currentImageIndex = (currentImageIndex + 1) % images.length;
  
          images[currentImageIndex].classList.add("active");
      }
  
      setInterval(changeImage, interval);
  });

  
  document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");
    const toggleVolumeButton = document.getElementById("toggle-volume");

    // Проверяем состояние музыки, сохраненное в localStorage
    let isMuted = localStorage.getItem("isMuted") === "true";

    // Устанавливаем громкость в зависимости от сохраненного состояния
    music.volume = isMuted ? 0 : 1.0;
    toggleVolumeButton.textContent = isMuted ? "🔈 Включить" : "🔊 Выключить";

    // Переключаем громкость при нажатии на кнопку
    toggleVolumeButton.addEventListener("click", () => {
        if (isMuted) {
            music.volume = 1.0;
            toggleVolumeButton.textContent = "🔊 Выключить";
        } else {
            music.volume = 0;
            toggleVolumeButton.textContent = "🔈 Включить";
        }

        // Сохраняем состояние в localStorage
        isMuted = !isMuted;
        localStorage.setItem("isMuted", isMuted.toString());

        // Убираем фокус с кнопки
        toggleVolumeButton.blur();
    });
});


        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');
        const galleryImages = document.querySelectorAll('.gallery__image');

        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                const imgSrc = image.getAttribute('data-image');
                modalImage.src = imgSrc;
                modal.style.display = 'flex';
            });
        });

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
