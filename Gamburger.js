class Gamburger{
    constructor() {
        this.count = 0; // счетчик калорий
        this.price = 0; // счетчик цены
        this.countSelector= '#gamburger-count'; // селектор вывода калорийности
        this.priceSelector= '#gamburger-price'; // селектор вывода цены
        this.goods= []; // массив для суммирования всех калорий и всех цен
    }
    // точка входа, инициализация расчета
    init() {
        //отображаем начальные данные калорийности и цены
        this.render(this.count, this.price);

        //обрабатываем события на кнопку расчета калорийности
        document
            .querySelector('#menu')
            .addEventListener('click', e => this.containerClickHandler(e));
    }
    // отображение калорийности и цены гамбургера
    render(count, price) {
        document.querySelector(this.countSelector).textContent = count;
        document.querySelector(this.priceSelector).textContent = price;
    }
    // отработка события
    containerClickHandler(event) {
        // Если целевой тег кнопки был без надписи расчета калорийности, то ничего не делаем, просто завершаем функцию.
        if (event.target.tagName !== 'BUTTON' && event.target.textContent !== 'Рассчитать калорийность') {
            return;
        }
        // очищаем массив
        this.goods= [];

        // Добавляем в массив значения калорийности и цены, полученные из каждого выбранного тега
        if (document.getElementById('radio1').checked) {
            this.add(+document.getElementById('radio1').dataset.count,
                +document.getElementById('radio1').dataset.price);
        }
        if (document.getElementById('radio2').checked) {
            this.add(+document.getElementById('radio2').dataset.count,
                +document.getElementById('radio2').dataset.price);
        }
        if (document.getElementById('radio3').checked) {
            this.add(+document.getElementById('radio3').dataset.count,
                +document.getElementById('radio3').dataset.price);
        }
        if (document.getElementById('radio4').checked) {
            this.add(+document.getElementById('radio4').dataset.count,
                +document.getElementById('radio4').dataset.price);
        }
        if (document.getElementById('radio5').checked) {
            this.add(+document.getElementById('radio5').dataset.count,
                +document.getElementById('radio5').dataset.price);
        }
        if (document.getElementById('radio1').checked) {
            this.add(+document.getElementById('radio1').dataset.count,
                +document.getElementById('radio1').dataset.price);
        }
        if (document.getElementById('Top1').checked) {
            this.add(+document.getElementById('Top1').dataset.count,
                +document.getElementById('Top1').dataset.price);
        }
        if (document.getElementById('Top2').checked) {
            this.add(+document.getElementById('Top2').dataset.count,
                +document.getElementById('Top2').dataset.price);
        }
    }
    // добавляем в массив калорийность и цену
    add(goodCount, goodPrice) {
        this.goods.push({count: goodCount, price: goodPrice});
        this.render(this.getGoodsCount(), this.getGoodsPrice());
    }
    // считаем калорийность
    getGoodsCount() {
        let countAll = 0;
        for (const good of this.goods) {
            countAll += good.count;
        }
        return countAll;
    }
    // считаем стоимость
    getGoodsPrice() {
        let priceAll = 0;
        for (const good of this.goods) {
            priceAll += good.price;
        }
        return priceAll;
    }

}