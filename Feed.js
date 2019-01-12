class Feed {
    constructor(source, container = '#cartFeeds') {
        this.source = source;
        this.container = container;
        this.feedItems = []; //Массив для хранения отзывов
        this._init(this.source);
    }

    _render() {
        let $feedItemsDiv = $('<div/>', {
            class: 'feeds-items-wrap'
        });

        $(this.container).text('Список отзывов');
        $feedItemsDiv.appendTo($(this.container));
    }

    _init(source) {
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let feed of data) {
                    this.feedItems.push(feed);
                    this._renderItem(feed);
                }
            })
    }

    _renderMassive() {
        this._render();
        for (let feed of this.feedItems) {
            this._renderItem(feed);
        }
    }

    _renderItem(feed) {
        let $container = $('<div/>', {
            class: 'feed-item',
            'data-feed': feed.id
        });
        let $GoodBtn = $('<button/>', {
            class: 'GoodBtn',
            text: 'Одобрить',
            'data-id': feed.id,
        });
        let $status;
        if (feed.isApproved) {
            $status = $('<p/>', {
                class: 'feed-status green',
                text: feed.isApproved,
                'data-id': feed.id,
            });
        } else {
            $status = $('<p/>', {
                class: 'feed-status',
                text: feed.isApproved,
                'data-id': feed.id,
            });
        }

        $container.append($(`<p class="author-name">${feed.author}</p>`));
        $container.append($(`<p class="text">${feed.text}</p>`));
        $status.appendTo($container);
        $GoodBtn.appendTo($container);
        $container.append($(`<p class="delBtn"><img class="CloseImg" data-id='${feed.id}' src="closeButton.png" alt="del"></p>`));
        $container.appendTo($('.feeds-items-wrap'));
    }

    goodFeed(idProduct) {
        let find = this.feedItems.find(feed => +feed.id === +idProduct);
        let index = $.inArray(find, this.feedItems);
        this.feedItems[index].isApproved = "true";
        this._renderMassive();

    }

    remove(idProduct) {
        let find = this.feedItems.find(feed => +feed.id === +idProduct);
        this.feedItems.splice($.inArray(find, this.feedItems), 1);
        this._renderMassive();
    }

    sendFeed() {
        let find = this.feedItems.find(feed => +feed.id === +$('.id_forma').val());
        if (!find) {
            let newFeed = {
                "id": +$('.id_forma').val(),
                "author": $('.author_forma').val(),
                "text": $('.text_forma').val(),
                "isApproved": false
            };
            this.feedItems.push(newFeed);
            this._renderMassive();
        } else {
            alert('Элемент с таким ID уже есть, введите другой ID');
        }
    }
}