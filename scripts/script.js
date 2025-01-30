const navLinks = document.querySelectorAll(".header__link");
const currentPage = window.location.pathname; 
navLinks.forEach((link) => {
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

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        daysElement.textContent = days.toString().padStart(2, "0");
        daysElement.setAttribute("datetime", `P${days}DT0H0M0S`);

        hoursElement.textContent = hours.toString().padStart(2, "0");
        hoursElement.setAttribute("datetime", `P0DT${hours}H0M0S`);

        minutesElement.textContent = minutes.toString().padStart(2, "0");
        minutesElement.setAttribute("datetime", `P0DT0H${minutes}M0S`);

        secondsElement.textContent = seconds.toString().padStart(2, "0");
        secondsElement.setAttribute("datetime", `P0DT0H0M${seconds}S`);
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});

    document.addEventListener("DOMContentLoaded", function () {
      const images = document.querySelectorAll(".slideshow__image");
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

    let isMuted = localStorage.getItem("isMuted") === "true";

    music.volume = isMuted ? 0 : 1.0;
    toggleVolumeButton.textContent = isMuted ? "🔈 Включить" : "🔊 Выключить";

    toggleVolumeButton.addEventListener("click", () => {
        if (isMuted) {
            music.volume = 1.0;
            toggleVolumeButton.textContent = "🔊 Выключить";
        } else {
            music.volume = 0;
            toggleVolumeButton.textContent = "🔈 Включить";
        }

        isMuted = !isMuted;
        localStorage.setItem("isMuted", isMuted.toString());

        // Убираем фокус с кнопки
        toggleVolumeButton.blur();
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    const modalClose = document.getElementById("modalClose");
    const galleryImages = document.querySelectorAll(".gallery__image");

    galleryImages.forEach(image => {
        image.addEventListener("click", () => {
            const imgSrc = image.getAttribute("data-image");

            if (imgSrc) {
                modalImage.src = imgSrc;
                modal.style.display = "flex";
            } else {
                console.error("Отсутствует атрибут data-image у элемента:", image);
            }
        });
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
