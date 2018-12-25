class Gallery {
    constructor() {
        this.previewSelector = '.galleryPreviewsContainer';
        this.openedImageWrapperClass = 'galleryWrapper';
        this.openedImageClass = 'galleryWrapper__image';
        this.openedImageScreenClass = 'galleryWrapper__screen';
        this.openedImageCloseBtnClass = 'galleryWrapper__close';
        this.openedImageCloseBtnSrc = 'images/gallery/close.png';
        this.openImageError = 'images/gallery/noimage.jpg';
        this.element = null;
        this.alt = null;
    }

    init() {
        document
            .querySelector(this.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));

        fetch('gallerymax.json')
            .then(resultMax => {
                console.log(resultMax);
                return resultMax.json();
            })
            .then(dataMax => {
                console.log(dataMax);
                this.element = dataMax;
                console.log(this.element);
            });
    }

    containerClickHandler(event) {
        // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
        if (event.target.tagName !== 'IMG') {
            return;
        }
        this.alt = this.element[event.target.id-1].alt;

        // Открываем картинку с полученным из целевого тега (значением id).
        this.openImage(this.element[event.target.id - 1].src);

    }

    /**
     * Открывает картинку.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    openImage(src) {
        // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
        this.getScreenContainer().querySelector(`.${this.openedImageClass}`).src = src;
    }

    /**
     * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
     * @returns {Element}
     */
    getScreenContainer() {
        // Получаем контейнер для открытой картинки.
        const galleryWrapperElement = document.querySelector(`.${this.openedImageWrapperClass}`);
        // Если контейнер для открытой картинки существует - возвращаем его.
        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        // Возвращаем полученный из метода createScreenContainer контейнер.
        return this.createScreenContainer();
    }

    /**
     * Создает контейнер для открытой картинки.
     * @returns {HTMLElement}
     */
    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.openedImageWrapperClass);

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.openedImageCloseBtnClass);
        closeImageElement.src = this.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();
        image.classList.add(this.openedImageClass);
        image.alt = this.alt;
        galleryWrapperElement.appendChild(image);

        // Отрабатываем ошибку, если картинка отсутствует - меняем src на картинку-заглушку.
        image.onerror = () => image.src = this.openImageError;

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);

        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    }

    /**
     * Закрывает (удаляет) контейнер для открытой картинки.
     */
    close() {
        document.querySelector(`.${this.openedImageWrapperClass}`).remove();
    }

}


// Инициализируем нашу галерею при загрузке страницы и выводим превьюшки
window.onload = () => {
    let blockMin = document.getElementById('galleryPreviewsContainer');
    fetch('gallerymin.json')
        .then(result => {
            console.log(result);
            return result.json();
        })
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const element = new Image();
                element.src = data[i].src;
                element.alt = data[i].alt;
                element.id = data[i].id;
                blockMin.appendChild(element);
            }
        });

    let myunit = new Gallery();
    myunit.init();
};