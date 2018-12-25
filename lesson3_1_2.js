class Change {
    constructor(str) {
        this.stroke = str;
    }

    render_old(){
        return this.stroke
    }

    render_new() {
        return this.stroke.replace(/[']+(?!t)(?!ll)(?!s)(?!m)/g, '"')
    }

}