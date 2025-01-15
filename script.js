const navLinks = document.querySelectorAll(".nav-menu a");

const currentPage = window.location.href;
navLinks.forEach((link) => {
        if (link.href === currentPage) {
            link.classList.add("active");
        }
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

    let isPlaying = false; // Переменная для отслеживания состояния воспроизведения

    toggleVolumeButton.addEventListener("click", () => {
        if (!isPlaying) {
            music.play().then(() => {
                isPlaying = true;
                toggleVolumeButton.textContent = "🔊 Выключить";
            }).catch(error => console.error("Не удалось воспроизвести музыку:", error));
        } else {
            music.volume = music.volume > 0 ? 0 : 1.0;
            toggleVolumeButton.textContent = music.volume > 0 ? "🔊 Выключить" : "🔈 Включить";
        }

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
