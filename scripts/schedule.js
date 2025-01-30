const navLinks = document.querySelectorAll(".header__link");
const currentPage = window.location.pathname; 
navLinks.forEach((link) => {
    if (link.pathname === currentPage) {
        link.classList.add("active");
    }
});

document.getElementById("downloadButton").addEventListener("click", function () {
    const filePath = "./images/schedule/schedule.png";

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Файл не найден");
            }
            return response.blob();
        })
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "schedule.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error("Ошибка скачивания:", error));
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