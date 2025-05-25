document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех слайдеров
    const sliders = document.querySelectorAll('.slider-input');
    
    sliders.forEach(slider => {
        const sliderId = slider.id;
        const fillId = sliderId.replace('rangeSlider', 'sliderFill');
        const sliderFill = document.getElementById(fillId);
        
        slider.addEventListener('input', function() {
            sliderFill.style.width = this.value + '%';
        });
    });
});

function handleTrackClick(event, sliderPrefix) {
    const track = event.currentTarget;
    const rect = track.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    const value = Math.min(100, Math.max(0, Math.round(pos * 100)));
    
    const slider = document.getElementById(`range${sliderPrefix}`);
    const fill = document.getElementById(`slider${sliderPrefix}`);
    
    slider.value = value;
    fill.style.width = value + '%';
}
document.addEventListener('DOMContentLoaded', function() {
    const interestsContainer = document.querySelector('.interests');

    // Находим первое поле ввода
    const firstInputContainer = document.querySelector('.input-container');
    const firstInput = firstInputContainer.querySelector('.auto-expand-input');

    // Инициализируем первое поле
    initInput(firstInputContainer);

    // Создаем кнопку добавления сразу
    createAddButton();

    function initInput(container) {
        const input = container.querySelector('.auto-expand-input');
        const helper = container.querySelector('.size-helper');

        // Настройка обработчика ввода
        input.addEventListener('input', function() {
            helper.textContent = this.value || (this.placeholder || '');
            const calculatedWidth = helper.offsetWidth;
            this.style.width = Math.min(calculatedWidth, 200) + 'px';
        });

        // Инициируем первоначальный размер
        input.dispatchEvent(new Event('input'));

        // Для обычных полей убираем курсор-указатель
        if (!input.classList.contains('add-button')) {
            input.style.cursor = 'text';
        }
    }

    function createAddButton() {
        // Создаем контейнер для кнопки
        const newContainer = document.createElement('div');
        newContainer.className = 'input-container';
        // обязательно добавить стиль для сохранения высоты и позиционирования
        newContainer.style.display = 'inline-block'; // или flex, если нужно
        newContainer.style.verticalAlign = 'top';

        // Создаем вспомогательный span
        const helper = document.createElement('span');
        helper.className = 'size-helper';
        newContainer.appendChild(helper);

        // Создаем кнопку (поле ввода)
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'auto-expand-input add-button no-print';
        newInput.placeholder = '+';
        newInput.style.display = 'inline-block';
        newContainer.appendChild(newInput);

        // Добавляем в контейнер interests
        interestsContainer.appendChild(newContainer);

        // Инициализируем кнопку
        initInput(newContainer);

        // Назначаем обработчик клика
        newInput.addEventListener('click', function(e) {
            if (!this.value) {
                // Создаем новое поле ввода
                createInputField();
                // Перемещаем кнопку в конец (чтобы не съезжала вниз)
                interestsContainer.appendChild(this.parentNode);
            }
        });
    }

    function createInputField() {
        const newContainer = document.createElement('div');
        newContainer.className = 'input-container';
        // тот же стиль, что и для add-button, чтобы не съезжало
        newContainer.style.display = 'inline-block';
        newContainer.style.verticalAlign = 'top';

        // Копируем стиль цвета из первого поля
        const firstInput = document.querySelector('.input-container:not(:last-child) .auto-expand-input');
        const firstInputColor = firstInput ? window.getComputedStyle(firstInput).color : '';

        // Создаем вспомогательный span
        const helper = document.createElement('span');
        helper.className = 'size-helper';
        newContainer.appendChild(helper);

        // Создаем поле ввода
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'auto-expand-input';
        newInput.placeholder = '';

        // Устанавливаем тот же цвет, что и у других полей
        if (firstInputColor) {
            newInput.style.color = firstInputColor;
        }

        newInput.style.display = 'inline-block';

        newContainer.appendChild(newInput);

        const addButton = document.querySelector('.add-button');
        interestsContainer.insertBefore(newContainer, addButton.parentNode);
        initInput(newContainer);
        newInput.focus();
    }
});
