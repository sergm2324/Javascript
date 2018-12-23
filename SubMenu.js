class SubMenu extends MenuItem {
    constructor(href, title, submenu) {
        super(href, title);
        this.submenu = submenu;
    }


    render() {
        return `<li><a href="${this.href}">${this.title}</a>
                <ul class="${this.submenu}">
                <li><a href="/${this.submenu}">${this.submenu}</a></li>
                <li><a href="/${this.submenu}">${this.submenu}</a></li>
                <li><a href="/${this.submenu}">${this.submenu}</a></li>
                </ul>
                </li>`
    }
}

/*
2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами, т.е с подменю.
Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.

*/