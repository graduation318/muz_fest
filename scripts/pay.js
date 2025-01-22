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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("payment-modal");
    const modalPrice = document.getElementById("payment-modal-price");
    const closeButton = document.querySelector(".payment-modal__close-button");
    const ticketButtons = document.querySelectorAll(".ticket__button");
    const form = document.querySelector(".payment-modal__form");

    // Функция для показа модального окна
    function openModal(price) {
        modalPrice.textContent = price;
        modal.classList.add("payment-modal--visible");
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.remove("payment-modal--visible");
    }

    // Назначение обработчиков кнопкам "Купить"
    ticketButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const price = event.target.dataset.price; // Получаем цену из data-price
            openModal(price);
        });
    });

    // Закрытие модального окна при клике на кнопку "закрыть"
    closeButton.addEventListener("click", closeModal);

    // Закрытие модального окна при клике вне области контента
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Функция для валидации формы
    function validateForm() {
        const name = form.querySelector('input[name="name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const category = form.querySelector('select[name="category"]').value;
        const cardNumber = form.querySelector('input[name="card-number"]').value;
        const expiry = form.querySelector('input[name="expiry"]').value;
        const cvc = form.querySelector('input[name="cvc"]').value;

        // 1. Проверка имени и фамилии
        const nameParts = name.trim().split(" ");
        if (nameParts.length !== 2) {
            alert("Имя и Фамилия должны быть написаны через один пробел.");
            return false;
        }

        // 2. Проверка номера телефона (должен начинаться с 77 и содержать 8 цифр)
        const phonePattern = /^77\d{6}$/;  // Теперь номер телефона должен быть 8 цифр
        if (!phonePattern.test(phone)) {
            alert("Номер телефона должен начинаться с '77' и содержать только цифры (всего 8 цифр).");
            return false;
        }

        // 3. Проверка email (должен быть в формате *******@gmail.com)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailPattern.test(email)) {
            alert("Email должен быть в формате *******@gmail.com.");
            return false;
        }

        // 4. Проверка номера карты (16 цифр)
        const cardNumberPattern = /^\d{16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            alert("Номер карты должен содержать ровно 16 цифр.");
            return false;
        }

        // 5. Проверка срока действия (формат MM/YY)
        const expiryPattern = /^\d{2}\/\d{2}$/;
        if (!expiryPattern.test(expiry)) {
            alert("Срок действия карты должен быть в формате MM/YY.");
            return false;
        }

        // 6. Проверка CVC-кода (3 цифры)
        const cvcPattern = /^\d{3}$/;
        if (!cvcPattern.test(cvc)) {
            alert("CVC код должен содержать ровно 3 цифры.");
            return false;
        }

        return true;
    }

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        // Валидируем форму
        if (!validateForm()) {
            return;
        }

        // Получаем все данные формы
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            email: form.querySelector('input[name="email"]').value,
            category: form.querySelector('select[name="category"]').value,
            cardNumber: form.querySelector('input[name="card-number"]').value,
            expiry: form.querySelector('input[name="expiry"]').value,
            cvc: form.querySelector('input[name="cvc"]').value,
        };

        // Для примера, "отправим" данные на сервер (вы можете заменить это на реальную отправку на сервер)
        console.log("Данные для отправки:", formData);

        // Показать успешное сообщение
        alert("Оплата успешно подтверждена!");
        
        // Закрываем модальное окно
        closeModal();
    });
});
