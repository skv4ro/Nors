///<reference path="splitter.ts"/>
///<reference path="scroll.ts"/>
///<reference path="resizer.ts"/>
///<reference path="bookloader.ts"/>
var Nors = /** @class */ (function () {
    function Nors(config) {
        this.splitter = new Splitter(document.getElementById(config.root), 3);
        this.leftPane = new NorsPane(this.splitter.panes[0]);
        this.middlePane = new NorsPane(this.splitter.panes[1]);
        this.rightPane = new NorsPane(this.splitter.panes[2]);
        this.leftPane.content.id = "cp1";
        this.middlePane.content.id = "cp2";
        this.rightPane.content.id = "cp3";
        this.leftPane.pane.minWidth = config.leftPaneMinWidth || 25;
        this.middlePane.pane.minWidth = config.middlePaneMinWidth || 50;
        this.rightPane.pane.minWidth = config.rightPaneMinWidth || 25;
        this.leftPane.createSplitLine();
        this.middlePane.createSplitLine();
    }
    return Nors;
}());
var NorsPane = /** @class */ (function () {
    function NorsPane(splitterPane) {
        this.contentRoot = document.createElement('div');
        this.content = document.createElement('div');
        this.pane = splitterPane;
        this.contentRoot.setAttribute('class', 'contentRoot');
        this.content.setAttribute('class', 'content');
        this.pane.element.appendChild(this.contentRoot);
        this.contentRoot.appendChild(this.content);
        new Scroll(this.content, this.contentRoot);
        new Resizer(this.content);
    }
    NorsPane.prototype.createSplitLine = function () {
        this.splitLine = document.createElement('div');
        this.splitLine.setAttribute('class', 'splitLine');
        this.pane.element.appendChild(this.splitLine);
    };
    NorsPane.prototype.loadBook = function (book) {
        while (this.content.hasChildNodes()) {
            this.content.removeChild(this.content.firstChild);
        }
        Bookloader.loadBook(this.content, book);
    };
    return NorsPane;
}());
