class Menu {
    constructor(id, className, items){
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render(){
        let result = `<ul class="${this.className}" id="${this.id}">`;

        for (let i = 0; i < this.items.length; i++){
            if (this.items[i] instanceof MenuItem){
                result += this.items[i].render();
            }
        }

        result += `</ul>`;
        return result;
    }

    /*
    1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет соответствующий DOM-узел.

     */

    remove(blockToDel){
        blockToDel.parentNode.removeChild(blockToDel);
    }
}
