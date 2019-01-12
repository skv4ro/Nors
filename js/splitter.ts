class AbstractElement {
    private zIndex: number;
    element: HTMLElement;

    constructor() {
        this.element = AbstractElement.createPaneElement();
    }

    getLeft(): number {
        return parseInt(this.element.style.left);
    }

    setLeft(left: number) {
        this.element.style.left = left + 'px';
    }

    getWidth(): number {
        return this.element.clientWidth;
    }

    setWidth(width: number) {
        this.element.style.width = width + 'px';
    }

    setZIndex(zIndex: number) {
        this.zIndex = zIndex;
        this.element.style.zIndex = this.zIndex.toString();
    }

    private static createPaneElement(): HTMLElement {
        const element: HTMLElement = document.createElement('div');
        element.style.position = 'absolute';
        return element;
    }
}

class Pane extends AbstractElement {
    minWidth: number = 0;

    constructor() {
        super();
        this.setZIndex(0);
        this.element.style.height = '100%';
        this.element.style.left = '0';
        this.element.setAttribute('class', 'splitter-pane');
    }
}

class Mover extends AbstractElement {
    readonly leftMate: Pane;
    readonly rightMate: Pane;
    private initX: number = 0;
    private initY: number = 0;
    private initLeft: number = 0;
    private initTop: number = 0;
    private scaleFactor: number = .2;
    private boundMouseMoveHandle: EventListener;
    private pointerID: number;

    constructor(leftMate: Pane, rightMate: Pane) {
        super();
        this.leftMate = leftMate;
        this.rightMate = rightMate;
        this.element.setAttribute('class', 'splitter-mover');

        this.element.addEventListener('dblclick', () => this.dblClickHandler());
        this.element.addEventListener('pointerdown', event => this.eventStartHandler(event));
        document.addEventListener('pointerup', event => this.eventEndHandler(event));
    }

    getHeight(): number {
        return this.element.clientHeight;
    }

    getTop(): number {
        return parseInt(this.element.style.top);
    }

    setTop(top: number): void {
        const bound = this.leftMate.element.clientHeight - this.getHeight();
        if(top > bound) {
            top = bound;
        } else if (top < 0) {
            top  = 0 ;
        }
        this.element.style.top = top + 'px';
    }

    setLeft(left: number) {
        const leftPane: Pane = this.leftMate;
        const rightPane: Pane = this.rightMate;
        const halfWidth: number = this.getWidth() / 2;
        const leftLimit: number = leftPane.getLeft() + leftPane.minWidth - halfWidth;
        const rightLimit: number = rightPane.getLeft() + rightPane.getWidth() - rightPane.minWidth - halfWidth;
        if(left < leftLimit) {
            left = leftLimit;
        } else if(left > rightLimit) {
            left = rightLimit;
        }
        super.setLeft(left);
    }

    private eventStartHandler(event: PointerEvent): void {
        event.preventDefault();
        this.pointerID = event.pointerId;
        const scale = 1 - this.scaleFactor;
        this.element.style.transform = 'scale(' + scale + ',' + scale +')';
        this.initX = event.clientX;
        this.initY = event.clientY;
        this.initLeft = this.getLeft();
        this.initTop = this.getTop();
        document.addEventListener('pointermove', this.boundMouseMoveHandle = this.eventMoveHandler.bind(this));
    }

    private dblClickHandler(): void {
        let leftWidth = this.leftMate.getWidth();
        let leftLeft = this.leftMate.getLeft();
        let rightWidth = this.rightMate.getWidth();
        let rightLeft = this.rightMate.getLeft();
        let leftElement = this.leftMate.element;
        let rightElement = this.rightMate.element;
        let temp;

        temp = leftElement;
        this.leftMate.element = rightElement;
        this.rightMate.element = temp;

        this.leftMate.setWidth(leftWidth);
        this.leftMate.setLeft(leftLeft);
        this.rightMate.setWidth(rightWidth);
        this.rightMate.setLeft(rightLeft);
    }

    private eventMoveHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            event.preventDefault();
            const difX: number = event.clientX - this.initX;
            const difY: number = event.clientY - this.initY;

            this.setTop(this.initTop + difY);
            this.setLeft(this.initLeft + difX);
            const moverOffset = this.getLeft() + this.getWidth() / 2;
            this.leftMate.setWidth(moverOffset - this.leftMate.getLeft());
            this.rightMate.setWidth(this.rightMate.getLeft() + this.rightMate.getWidth() - moverOffset);
            this.rightMate.setLeft(moverOffset);
        }
    }

    private eventEndHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundMouseMoveHandle);
            this.element.style.transform = 'scale(1, 1)';
        }
    }
}

class Splitter {
    readonly panes: Pane[] = [];
    readonly movers: Mover[] = [];
    private readonly parent: HTMLElement;

    constructor(parent: HTMLElement, numOfPanes: number) {
        this.parent = parent;
        this.build(numOfPanes);
        //addEventListener('resize', this.updateStyle.bind(this));
    }

    private build(numOfPanes: number): void {
        let i: number;
        for(i = 0; i < numOfPanes; i++) {
            const pane: Pane = new Pane();
            pane.element.id = 'splitter-pane-' + i.toString();
            this.panes.push(pane);
            this.parent.appendChild(pane.element);
        }

        for(i = 0; i < numOfPanes - 1; i++) {
            const mover: Mover = new Mover(this.panes[i], this.panes[i + 1]);
            mover.element.id = 'splitter-mover-' + i.toString() + '-' + (i + 1).toString();
            this.movers.push(mover);
            this.parent.appendChild(mover.element);
        }
        this.initStyle();
    }

    private initStyle(): void {
        const xValue: number = this.parent.clientWidth / this.panes.length;
        const yValue: number = this.parent.clientHeight / 2;
        let xOffset: number = 0;

        let i: number = 0;
        const len = this.panes.length;
        for(i; i < len; i++) {
            let pane = this.panes[i];
            pane.setLeft(xOffset);
            if(i === len - 1) {
                pane.setWidth(this.parent.clientWidth - this.panes[i - 1].getLeft() - this.panes[i - 1].getWidth());
            } else {
                pane.setWidth(xValue);
            }
            xOffset += xValue;
        }

        for(let mover of this.movers) {
            mover.setLeft(mover.rightMate.getLeft() - mover.getWidth() / 2);
            mover.setTop(yValue - mover.getHeight() / 2);
        }
    }

    private updateStyle(): void {
        let fullPanesWidth: number = 0;
        const panesWidths: number[] = [];
        const panesLefts: number[] = [];
        for(let pane of this.panes) {
            panesWidths.push(pane.getWidth());
            panesLefts.push(pane.getLeft());
            fullPanesWidth += pane.getWidth();
        }
        const panesRation: number[] = [];
        //const xResizeRation: number = this.parent.clientWidth / fullPanesWidth;
        for(let i = 0; i < this.panes.length; i++) {
            const pane = this.panes[i];
            panesRation.push(panesWidths[i] / this.parent.clientWidth);
            pane.setLeft(panesLefts[i] * panesRation[i]);
            pane.setWidth(panesWidths[i] * panesRation[i]);
        }

    }
}