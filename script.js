// Получаем все элементы с классом 'zoom-image'
const images = document.querySelectorAll('.zoom-image');

// Добавляем обработчики событий
images.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.2)'; // Увеличение при наведении
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)'; // Возврат к исходному размеру
    });
});
