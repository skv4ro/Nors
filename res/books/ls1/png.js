function ls1Json() {
    const jsonObj = [];
    for(let i = 0; i < 10; i++) {
        let item = {};
        item['src'] = 'res/books/ls1/png2/' + (i  + 1) + '.png';
        item['id'] = 'ls1-' + i;
        jsonObj.push(item);
    }
    return jsonObj;
}

class LS1 {
    constructor(parent) {
        const json = ls1Json();
        this.json = json;
        for(let item of json) {
            const img = document.createElement('img');
            img.setAttribute('src', item.src);
            img.setAttribute('id', item.id);
            parent.appendChild(img);
        }
        this.json.s653 = 'ls1-87';
        this.json.p69 = 'ls1-69';
    }
}
