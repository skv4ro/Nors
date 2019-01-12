function jksJson() {
    const jsonObj = [];
    for(let i = 0; i < 10; i++) {
        let item = {};
        item['src'] = 'res/books/jks/jpg/' + (i  + 1) + '.jpg';
        item['id'] = 'jks-' + i;
        jsonObj.push(item);
    }
    return jsonObj;
}

class JKS {
    constructor(parent) {
        const json = jksJson();
        this.json = json;
        for(let item of json) {
            const img = document.createElement('img');
            img.setAttribute('src', item.src);
            img.setAttribute('id', item.id);
            parent.appendChild(img);
        }
    }
}
