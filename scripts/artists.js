const navLinks = document.querySelectorAll(".header__link");
const currentPage = window.location.pathname; 
navLinks.forEach((link) => {
    if (link.pathname === currentPage) {
        link.classList.add("active");
    }
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


document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.artists__card-play');
    let currentAudio = null; // Ссылка на текущее аудио
    let currentButton = null;

    // Создаем единственный объект Audio
    const audioPlayer = new Audio();
    let isPaused = false; // Флаг для отслеживания состояния паузы

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioSrc = button.getAttribute('data-audio');

            // Если нажата кнопка текущего трека
            if (currentButton === button) {
                if (isPaused) {
                    // Продолжить воспроизведение
                    audioPlayer.play();
                    isPaused = false;
                    toggleButtonState(button, true);
                } else {
                    // Приостановить воспроизведение
                    audioPlayer.pause();
                    isPaused = true;
                    toggleButtonState(button, false);
                }
                return;
            }

            // Если ранее воспроизводился другой трек, сбросить его состояние
            if (currentButton) {
                toggleButtonState(currentButton, false);
            }

            // Установить источник и начать воспроизведение
            audioPlayer.src = audioSrc;
            audioPlayer.play();
            isPaused = false;
            toggleButtonState(button, true);

            // Обновляем ссылки на текущие элементы
            currentButton = button;

            // Сброс состояния кнопки при завершении трека
            audioPlayer.addEventListener('ended', () => {
                toggleButtonState(button, false);
                currentButton = null;
                isPaused = false;
            });
        });
    });

    function toggleButtonState(button, isPlaying) {
        const playIcon = button.querySelector('.play-icon');
        const pauseIcon = button.querySelector('.pause-icon');

        if (playIcon && pauseIcon) {
            playIcon.style.display = isPlaying ? 'none' : 'inline';
            pauseIcon.style.display = isPlaying ? 'inline' : 'none';
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const artistImages = document.querySelectorAll('.artists__card__image');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close');

    // Сопоставление data-artist с ID модальных окон
    const artistToModalId = {
        kanye: 'modal-kanye',
        punk: 'modal-punk',
        future: 'modal-future',
        dragons: 'modal-dragons',
        impala: 'modal-impala',
        scott: 'modal-scott',
        malone: 'modal-malone',
        weekend: 'modal-weekend',
        eminem: 'modal-eminem',
    };

    artistImages.forEach(image => {
        image.addEventListener('click', () => {
            const artist = image.getAttribute('data-artist');
            const modalId = artistToModalId[artist];
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});