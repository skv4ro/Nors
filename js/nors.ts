///<reference path="splitter.ts"/>
///<reference path="scroll.ts"/>
///<reference path="resizer.ts"/>

interface Config {
    root: string;
    leftPaneMinWidth: number;
    middlePaneMinWidth: number;
    rightPaneMinWidth: number;
}

class Nors {
    private readonly splitter: Splitter;
    readonly leftPane: SeepPane;
    readonly middlePane: SeepPane;
    readonly rightPane: SeepPane;

    constructor(config: Config) {
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
}

class SeepPane {
    private splitLine: HTMLElement;
    private readonly contentRoot: HTMLElement = document.createElement('div');
    readonly content: HTMLElement = document.createElement('div');
    readonly pane: Pane;

    constructor(splitterPane: Pane) {
        this.pane = splitterPane;
        this.contentRoot.setAttribute('class', 'contentRoot');
        this.content.setAttribute('class', 'content');
        this.pane.element.appendChild(this.contentRoot);
        this.contentRoot.appendChild(this.content);
        new Scroll(this.content, this.contentRoot);
        new Resizer(this.content);
    }

    createSplitLine(): void {
        this.splitLine = document.createElement('div');
        this.splitLine.setAttribute('class', 'splitLine');
        this.pane.element.appendChild(this.splitLine);
    }
}

