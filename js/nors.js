///<reference path="splitter.ts"/>
///<reference path="scroll.ts"/>
///<reference path="resizer.ts"/>
var Nors = /** @class */ (function () {
    function Nors(config) {
        this.splitter = new Splitter(document.getElementById(config.root), 3);
        this.leftPane = new SeepPane(this.splitter.panes[0]);
        this.middlePane = new SeepPane(this.splitter.panes[1]);
        this.rightPane = new SeepPane(this.splitter.panes[2]);
        this.leftPane.pane.minWidth = config.leftPaneMinWidth || 25;
        this.middlePane.pane.minWidth = config.middlePaneMinWidth || 50;
        this.rightPane.pane.minWidth = config.rightPaneMinWidth || 25;
        this.leftPane.createSplitLine();
        this.middlePane.createSplitLine();
    }
    return Nors;
}());
var SeepPane = /** @class */ (function () {
    function SeepPane(splitterPane) {
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
    SeepPane.prototype.createSplitLine = function () {
        this.splitLine = document.createElement('div');
        this.splitLine.setAttribute('class', 'splitLine');
        this.pane.element.appendChild(this.splitLine);
    };
    return SeepPane;
}());
