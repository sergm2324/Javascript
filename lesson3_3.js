class Validation {
    constructor() {
        this.elementName = null;
        this.elementPhone = null;
        this.elementEmail = null;
        this.colorError = 'red';
        this.colorGood = 'grey';
    }

    init() {
        //Проверка валидации формы перед ее отправкой

        document.querySelector('button').addEventListener('click', (event) => {

            this.elementName = document.getElementById('name');
            this.elementPhone = document.getElementById('phone');
            this.elementEmail = document.getElementById('email');
            //const elementText = document.getElementById('text');


            if ((/^[a-zа-яА-ЯёA-Z\s]{2,30}$/i.test(this.elementName.value)) === false) {
                event.preventDefault();
                const message = 'Имя содержит цифры или другое.';
                let myId = 'invalid-feedback1';
                this.errorElement(myId, message);
                this.redElement(this.elementName);
            } else {
                let myId = 'invalid-feedback1';
                const message = '';
                this.errorElement(myId, message);
                this.redElementNone(this.elementName);
            }


            if ((/^(\+7)(\(\d{3}\)(\d{3}))(\-\d{4})$/i.test(this.elementPhone.value)) === false) {
                event.preventDefault();
                const message = 'Неверный номер телефона.';
                let myId = 'invalid-feedback2';
                this.errorElement(myId, message);
                this.redElement(this.elementPhone);
            } else {
                let myId = 'invalid-feedback2';
                const message = '';
                this.errorElement(myId, message);
                this.redElementNone(this.elementPhone);
            }

            if ((/^[\w-._]+@\w+\.(ru|com)$/i.test(this.elementEmail.value)) === false) {
                event.preventDefault();
                const message = 'Неверный email.';
                let myId = 'invalid-feedback3';
                this.errorElement(myId, message);
                this.redElement(this.elementEmail);
            } else {
                let myId = 'invalid-feedback3';
                const message = '';
                this.errorElement(myId, message);
                this.redElementNone(this.elementEmail);
            }
        });
    }

    /**
     * Вывод текста ошибки в элемент
     * @param myId значение id элемента
     * @param message текст ошибки
     */
    errorElement(myId, message) {
        let elem = document.getElementById(myId);
        elem.textContent = message;
        elem.style.color = (this.colorError);
    }

    /**
     * Подкраска элемента красным
     * @param element передаваемый элемент, который нужно покрасить
     */
    redElement(element) {
        element.style.borderColor = (this.colorError);
    }

    /**
     * Подкраска элемента серым
     * @param element передаваемый элемент, который нужно покрасить
     */
    redElementNone(element) {
        element.style.borderColor = (this.colorGood);
    }

}



