class Feedback {
    constructor(id, author, text, container = '#feedBacks'){
        this.id = id;
        this.author = author;
        this.text = text;
        this.container = container;
        this._render();
    }
    _render(){
        let $wrapper = $('<div/>', {
            class: 'feed'
        });
        let $sendBtn = $('<button/>', {
            class: 'sendBtn',
            type: 'submit',
            text: 'Отправить',
            'data-id': this.id,
        });
        let $id = $('<input/>', {
            class: 'id_forma',
            placeholder: 'ID',
            type: 'text',
            'data-id': this.id,
        });
        let $author= $('<input/>', {
            class: 'author_forma',
            placeholder: 'Author',
            type: 'text',
            'data-id': this.id,
        });
        let $text = $('<textarea/>', {
            class: 'text_forma',
            placeholder: 'Text',
            rows: '5',
            cols: '45',
            name: 'text',
            'data-id': this.id,
        });

        $(this.container).text('Форма отправки отзыва');
        $wrapper.appendTo($(this.container));
        $id.appendTo($wrapper);
        $author.appendTo($wrapper);
        $text.appendTo($wrapper);
        $sendBtn.appendTo($wrapper);
    }
}