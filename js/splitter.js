var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractElement = /** @class */ (function () {
    function AbstractElement() {
        this.element = AbstractElement.createPaneElement();
    }
    AbstractElement.prototype.getLeft = function () {
        return parseInt(this.element.style.left);
    };
    AbstractElement.prototype.setLeft = function (left) {
        this.element.style.left = left + 'px';
    };
    AbstractElement.prototype.getWidth = function () {
        return this.element.clientWidth;
    };
    AbstractElement.prototype.setWidth = function (width) {
        this.element.style.width = width + 'px';
    };
    AbstractElement.prototype.setZIndex = function (zIndex) {
        this.zIndex = zIndex;
        this.element.style.zIndex = this.zIndex.toString();
    };
    AbstractElement.createPaneElement = function () {
        var element = document.createElement('div');
        element.style.position = 'absolute';
        return element;
    };
    return AbstractElement;
}());
var Pane = /** @class */ (function (_super) {
    __extends(Pane, _super);
    function Pane() {
        var _this = _super.call(this) || this;
        _this.minWidth = 0;
        _this.setZIndex(0);
        _this.element.style.height = '100%';
        _this.element.style.left = '0';
        _this.element.setAttribute('class', 'splitter-pane');
        return _this;
    }
    return Pane;
}(AbstractElement));
var Mover = /** @class */ (function (_super) {
    __extends(Mover, _super);
    function Mover(leftMate, rightMate) {
        var _this = _super.call(this) || this;
        _this.initX = 0;
        _this.initY = 0;
        _this.initLeft = 0;
        _this.initTop = 0;
        _this.scaleFactor = .2;
        _this.leftMate = leftMate;
        _this.rightMate = rightMate;
        _this.element.setAttribute('class', 'splitter-mover');
        _this.element.addEventListener('dblclick', function () { return _this.dblClickHandler(); });
        _this.element.addEventListener('pointerdown', function (event) { return _this.eventStartHandler(event); });
        document.addEventListener('pointerup', function (event) { return _this.eventEndHandler(event); });
        return _this;
    }
    Mover.prototype.getHeight = function () {
        return this.element.clientHeight;
    };
    Mover.prototype.getTop = function () {
        return parseInt(this.element.style.top);
    };
    Mover.prototype.setTop = function (top) {
        var bound = this.leftMate.element.clientHeight - this.getHeight();
        if (top > bound) {
            top = bound;
        }
        else if (top < 0) {
            top = 0;
        }
        this.element.style.top = top + 'px';
    };
    Mover.prototype.setLeft = function (left) {
        var leftPane = this.leftMate;
        var rightPane = this.rightMate;
        var halfWidth = this.getWidth() / 2;
        var leftLimit = leftPane.getLeft() + leftPane.minWidth - halfWidth;
        var rightLimit = rightPane.getLeft() + rightPane.getWidth() - rightPane.minWidth - halfWidth;
        if (left < leftLimit) {
            left = leftLimit;
        }
        else if (left > rightLimit) {
            left = rightLimit;
        }
        _super.prototype.setLeft.call(this, left);
    };
    Mover.prototype.eventStartHandler = function (event) {
        event.preventDefault();
        this.pointerID = event.pointerId;
        var scale = 1 - this.scaleFactor;
        this.element.style.transform = 'scale(' + scale + ',' + scale + ')';
        this.initX = event.clientX;
        this.initY = event.clientY;
        this.initLeft = this.getLeft();
        this.initTop = this.getTop();
        document.addEventListener('pointermove', this.boundMouseMoveHandle = this.eventMoveHandler.bind(this));
    };
    Mover.prototype.dblClickHandler = function () {
        var leftWidth = this.leftMate.getWidth();
        var leftLeft = this.leftMate.getLeft();
        var rightWidth = this.rightMate.getWidth();
        var rightLeft = this.rightMate.getLeft();
        var leftElement = this.leftMate.element;
        var rightElement = this.rightMate.element;
        var temp;
        temp = leftElement;
        this.leftMate.element = rightElement;
        this.rightMate.element = temp;
        this.leftMate.setWidth(leftWidth);
        this.leftMate.setLeft(leftLeft);
        this.rightMate.setWidth(rightWidth);
        this.rightMate.setLeft(rightLeft);
    };
    Mover.prototype.eventMoveHandler = function (event) {
        if (event.pointerId === this.pointerID) {
            event.preventDefault();
            var difX = event.clientX - this.initX;
            var difY = event.clientY - this.initY;
            this.setTop(this.initTop + difY);
            this.setLeft(this.initLeft + difX);
            var moverOffset = this.getLeft() + this.getWidth() / 2;
            this.leftMate.setWidth(moverOffset - this.leftMate.getLeft());
            this.rightMate.setWidth(this.rightMate.getLeft() + this.rightMate.getWidth() - moverOffset);
            this.rightMate.setLeft(moverOffset);
        }
    };
    Mover.prototype.eventEndHandler = function (event) {
        if (event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundMouseMoveHandle);
            this.element.style.transform = 'scale(1, 1)';
        }
    };
    return Mover;
}(AbstractElement));
var Splitter = /** @class */ (function () {
    function Splitter(parent, numOfPanes) {
        this.panes = [];
        this.movers = [];
        this.parent = parent;
        this.build(numOfPanes);
        //addEventListener('resize', this.updateStyle.bind(this));
    }
    Splitter.prototype.build = function (numOfPanes) {
        var i;
        for (i = 0; i < numOfPanes; i++) {
            var pane = new Pane();
            pane.element.id = 'splitter-pane-' + i.toString();
            this.panes.push(pane);
            this.parent.appendChild(pane.element);
        }
        for (i = 0; i < numOfPanes - 1; i++) {
            var mover = new Mover(this.panes[i], this.panes[i + 1]);
            mover.element.id = 'splitter-mover-' + i.toString() + '-' + (i + 1).toString();
            this.movers.push(mover);
            this.parent.appendChild(mover.element);
        }
        this.initStyle();
    };
    Splitter.prototype.initStyle = function () {
        var xValue = this.parent.clientWidth / this.panes.length;
        var yValue = this.parent.clientHeight / 2;
        var xOffset = 0;
        var i = 0;
        var len = this.panes.length;
        for (i; i < len; i++) {
            var pane = this.panes[i];
            pane.setLeft(xOffset);
            if (i === len - 1) {
                pane.setWidth(this.parent.clientWidth - this.panes[i - 1].getLeft() - this.panes[i - 1].getWidth());
            }
            else {
                pane.setWidth(xValue);
            }
            xOffset += xValue;
        }
        for (var _i = 0, _a = this.movers; _i < _a.length; _i++) {
            var mover = _a[_i];
            mover.setLeft(mover.rightMate.getLeft() - mover.getWidth() / 2);
            mover.setTop(yValue - mover.getHeight() / 2);
        }
    };
    Splitter.prototype.updateStyle = function () {
        var fullPanesWidth = 0;
        var panesWidths = [];
        var panesLefts = [];
        for (var _i = 0, _a = this.panes; _i < _a.length; _i++) {
            var pane = _a[_i];
            panesWidths.push(pane.getWidth());
            panesLefts.push(pane.getLeft());
            fullPanesWidth += pane.getWidth();
        }
        var panesRation = [];
        //const xResizeRation: number = this.parent.clientWidth / fullPanesWidth;
        for (var i = 0; i < this.panes.length; i++) {
            var pane = this.panes[i];
            panesRation.push(panesWidths[i] / this.parent.clientWidth);
            pane.setLeft(panesLefts[i] * panesRation[i]);
            pane.setWidth(panesWidths[i] * panesRation[i]);
        }
    };
    return Splitter;
}());
