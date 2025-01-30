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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("payment");
    const modalPrice = document.getElementById("payment-price");
    const closeButton = document.querySelector(".payment__close");
    const ticketButtons = document.querySelectorAll(".ticket__button");
    const form = document.querySelector(".payment__form");

    function openModal(price) {
        modalPrice.textContent = price;
        modal.classList.add("payment__visible");
    }

    function closeModal() {
        modal.classList.remove("payment__visible");
    }

    ticketButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const price = event.target.dataset.price;
            openModal(price);
        });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function validateForm() {
        const name = form.querySelector('input[name="name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const category = form.querySelector('select[name="category"]').value;
        const cardNumber = form.querySelector('input[name="card-number"]').value;
        const expiry = form.querySelector('input[name="expiry"]').value;
        const cvc = form.querySelector('input[name="cvc"]').value;

        const nameParts = name.trim().split(" ");
        if (nameParts.length !== 2) {
            alert("Имя и Фамилия должны быть написаны через один пробел.");
            return false;
        }

        const phonePattern = /^77\d{6}$/;
        if (!phonePattern.test(phone)) {
            alert("Номер телефона должен начинаться с '77' и содержать только цифры (всего 8 цифр).");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailPattern.test(email)) {
            alert("Email должен быть в формате *******@gmail.com.");
            return false;
        }

        const cardNumberPattern = /^\d{16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            alert("Номер карты должен содержать ровно 16 цифр.");
            return false;
        }

        const expiryPattern = /^\d{2}\/\d{2}$/;
        if (!expiryPattern.test(expiry)) {
            alert("Срок действия карты должен быть в формате MM/YY.");
            return false;
        }

        const cvcPattern = /^\d{3}$/;
        if (!cvcPattern.test(cvc)) {
            alert("CVC код должен содержать ровно 3 цифры.");
            return false;
        }

        return true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = {
            name: form.querySelector('input[name="name"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            email: form.querySelector('input[name="email"]').value,
            category: form.querySelector('select[name="category"]').value,
            cardNumber: form.querySelector('input[name="card-number"]').value,
            expiry: form.querySelector('input[name="expiry"]').value,
            cvc: form.querySelector('input[name="cvc"]').value,
        };

        console.log("Данные для отправки:", formData);

        alert("Оплата успешно подтверждена!");
        
        closeModal();
    });
});
