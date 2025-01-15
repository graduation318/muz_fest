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


document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.artists__card-play');
    let currentAudio = null; // Ссылка на текущее аудио
    let currentButton = null; // Ссылка на текущую активную кнопку

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioSrc = button.getAttribute('data-audio');

            // Если воспроизводится этот же трек, остановить воспроизведение
            if (currentAudio && currentAudio.src === new URL(audioSrc, window.location.href).href) {
                currentAudio.pause();
                currentAudio = null;
                toggleButtonState(currentButton, false);
                currentButton = null;
                return;
            }

            // Если ранее играл другой трек, остановить его
            if (currentAudio) {
                currentAudio.pause();
                toggleButtonState(currentButton, false);
            }

            // Создание нового аудиотрека и запуск воспроизведения
            currentAudio = new Audio(audioSrc);
            currentAudio.play();
            toggleButtonState(button, true);
            currentButton = button;

            // Сброс состояния кнопки при завершении трека
            currentAudio.addEventListener('ended', () => {
                toggleButtonState(button, false);
                currentAudio = null;
                currentButton = null;
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
