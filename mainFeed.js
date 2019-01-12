$(document).ready(() => {
    //Форма для ввода отзывов
    let product1 = new Feedback();
    let $myBody = $('body');

    //Список отзывов
    let feed = new Feed('feedback.json');

    //Отправка отзыва
    $('.sendBtn').click(e => {
        feed.sendFeed();
    });

    // Одобрение отзывов
    $myBody.on('click', '.GoodBtn', function (e) {
        feed.goodFeed(e.target.dataset.id);
    });


    //Удаление отзывов
    $myBody.on('click', '.delBtn', function (e) {
        feed.remove(e.target.dataset.id);
    });

});