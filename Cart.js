class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; //Массив для хранения товаров
        this._init(this.source);
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalGoods = $('<div/>', {
            class: 'cart-summary sum-goods'
        });
        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalGoods.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
    }
    _init(source){
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            })
    }

    _renderMassive(){
        this._render();
        for (let product of this.cartItems){
            this._renderItem(product);
        }
    }

    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
        //$container.append($(`<a class='delBtn' href="#"><img class="CloseImg" src="closeButton.png" alt="stars"></a>`));
        $container.append($(`<p class="delBtn"><img class="CloseImg" data-product='${product.id_product}' src="closeButton.png" alt="stars"></p>`));
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum(){
        $('.sum-goods').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Общая сумма: ${this.amount} руб.`);
    }
    _updateCart(product){
        let $container = $(`div[data-product=${product.id_product}]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        this._renderSum();
    }
    remove(idProduct){
        let productId = +idProduct;
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find){
            find.quantity--;
            this.countGoods--;
            this.amount -= find.price;
            this._updateCart(find);
        }
        if ((find)&&(find.quantity===0)) {
            //если количество товара равно 0, удаляем из массива
            this.cartItems.splice($.inArray(find, this.cartItems), 1);
        }
        this._renderMassive(); //написал новый метод отражения товаров из массива
        this._renderSum();
    }
}