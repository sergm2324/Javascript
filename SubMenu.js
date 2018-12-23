class SubMenu extends Menu{
    constructor(href, title, id, className, items){
        super(id, className, items);
        this.href = href;
        this.title = title;
    }
    render(){
        return `<li class="${this.className}"><a href="${this.href}">${this.title}</a>${super.render()}</li>`;
    }
}

/*
2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами, т.е с подменю.
Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.

*/