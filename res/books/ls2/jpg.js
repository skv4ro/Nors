function ls2Json() {
    const jsonObj = [];
    for(let i = 0; i < 10; i++) {
        let item = {};
        item['src'] = 'res/books/ls2/jpg/' + (i  + 1) + '.jpg';
        item['id'] = 'ls2-' + i;
        jsonObj.push(item);
    }
    return jsonObj;
}

class LS2 {
    constructor(parent) {
        const json = ls2Json();
        this.json = json;
        for(let item of json) {
            const img = document.createElement('img');
            img.setAttribute('src', item.src);
            img.setAttribute('id', item.id);
            parent.appendChild(img);
        }
    }
}
