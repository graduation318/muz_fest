const navLinks = document.querySelectorAll(".header__menu-link");
const currentPage = window.location.pathname; // Используем pathname вместо полного URL

navLinks.forEach((link) => {
    // Если href совпадает с текущим путем, добавляем класс active
    if (link.pathname === currentPage) {
        link.classList.add("active");
    }
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


document.addEventListener('DOMContentLoaded', () => {
    const legendItems = document.querySelectorAll('.legend__item');
    const zones = document.querySelectorAll('.map__zone');

    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            // Убираем активность у всех зон
            zones.forEach(zone => zone.classList.remove('active'));

            // Определяем зону, которая соответствует кнопке
            const zoneId = item.getAttribute('data-zone');
            const zone = document.getElementById(zoneId);

            // Выделяем зону
            if (zone) {
                zone.classList.add('active');
            }
        });
    });
});