document.addEventListener('DOMContentLoaded', function () {
  const projectsContainer = document.querySelector('.projects-pages-container');
  const projectRows = document.querySelectorAll('.projects__row');
  const pageIndicators = document.querySelector('.page-indicators');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let PROJECTS_PER_PAGE = 1; // По умолчанию 3 проекта на странице
  let currentPage = 0;

  // Функция для создания страниц и распределения проектов
  function createPages() {
    // Очищаем контейнер и индикаторы
    projectsContainer.innerHTML = '';
    pageIndicators.innerHTML = '';

    // Вычисляем количество необходимых страниц
    const totalPages = Math.ceil(Array.from(projectRows).length / PROJECTS_PER_PAGE);

    // Создаем страницы и распределяем проекты
    for (let i = 0; i < totalPages; i++) {
      // Создаем страницу
      const page = document.createElement('div');
      page.className = 'projects-page';
      if (i === 0) page.classList.add('active');

      // Определяем индексы проектов для текущей страницы
      const startIndex = i * PROJECTS_PER_PAGE;
      const endIndex = Math.min(startIndex + PROJECTS_PER_PAGE, projectRows.length);

      // Добавляем проекты на страницу
      for (let j = startIndex; j < endIndex; j++) {
        page.appendChild(projectRows[j].cloneNode(true));
      }

      projectsContainer.appendChild(page);

      // Создаем индикатор для страницы
      const indicator = document.createElement('span');
      indicator.className = 'page-indicator';
      if (i === 0) indicator.classList.add('active');
      indicator.setAttribute('data-page', i + 1);
      indicator.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
      });
      pageIndicators.appendChild(indicator);
    }
  }

  // Функция для изменения количества проектов на странице
  function setProjectsPerPage(count) {
    PROJECTS_PER_PAGE = count;
    currentPage = 0; // Сбрасываем на первую страницу
    createPages();
    showPage(0);
  }

  // Функция для показа определенной страницы
  function showPage(pageIndex) {
    const pages = document.querySelectorAll('.projects-page');
    const indicators = document.querySelectorAll('.page-indicator');

    pages.forEach((page, index) => {
      page.classList.remove('active');
      indicators[index].classList.remove('active');
    });

    pages[pageIndex].classList.add('active');
    indicators[pageIndex].classList.add('active');

    // Управление видимостью кнопок
    prevBtn.style.visibility = pageIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = pageIndex === pages.length - 1 ? 'hidden' : 'visible';
  }

  // Обработчики для кнопок
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(projectRows.length / PROJECTS_PER_PAGE);
    if (currentPage < totalPages - 1) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // Инициализация страниц
  createPages();
  showPage(0);

  // Делаем функцию доступной глобально
  window.setProjectsPerPage = setProjectsPerPage;
});
