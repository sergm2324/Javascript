class Validation {
    constructor() {
        this.elementName = null;
        this.elementPhone = null;
        this.elementEmail = null;
        this.colorError = 'red';
        this.colorGood = 'grey';
        this.patterns = {
            name: /^[a-zа-яА-ЯёA-Z\s]{2,30}$/i,
            phone: /^(\+7)(\(\d{3}\)(\d{3}))(\-\d{4})$/i,
            email: /^[\w-\._]+@\w+\.(ru|com)$/i
        };
        this.errors = {
            name: 'Имя содержит цифры или другое.',
            phone: 'Неверный номер телефона.',
            email: 'Неверный email.'
        }
    }


    init() {

        //загрузка списка городов через AJAX
        let $ajaxBlock = $('.city');
        console.log($ajaxBlock);
        $.ajax({
            url: 'towns.json',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                let i=0;
                for (let user of data){
                    i++;
                    $ajaxBlock.append($('<option>', {
                        value: user.town
                      }));
                    console.log($ajaxBlock);
                }
            },
            error: (error) => {
                console.log(error);
            }
        });

        //Проверка валидации формы перед ее отправкой

        document.querySelector('button').addEventListener('click', (event) => {

            this.elementName = document.getElementById('name');
            this.elementPhone = document.getElementById('phone');
            this.elementEmail = document.getElementById('email');
            //const elementText = document.getElementById('text');


            if ((this.patterns.name.test(this.elementName.value)) === false) {
                event.preventDefault();
                const message = this.errors.name;
                let myId = 'invalid-feedback1';
                this.errorElement(myId, message);
                this.redElement(this.elementName);
            } else {
                let myId = 'invalid-feedback1';
                const message = '';
                this.errorElement(myId, message);
                this.redElementNone(this.elementName);
            }


            if ((this.patterns.phone.test(this.elementPhone.value)) === false) {
                event.preventDefault();
                const message = this.errors.phone;
                let myId = 'invalid-feedback2';
                this.errorElement(myId, message);
                this.redElement(this.elementPhone);
            } else {
                let myId = 'invalid-feedback2';
                const message = '';
                this.errorElement(myId, message);
                this.redElementNone(this.elementPhone);
            }

            if ((this.patterns.email.test(this.elementEmail.value)) === false) {
                event.preventDefault();
                const message = this.errors.email;
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