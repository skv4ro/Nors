///<reference path="ResizeObserver.ts"/>
var Scroll = /** @class */ (function () {
    function Scroll(content, parent) {
        var _this = this;
        this.thumb = document.createElement('div');
        this.track = document.createElement('div');
        this.initY = 0;
        this.initTop = 0;
        this.timer = 0;
        this.lastHeight = 0;
        this.thumbWidth = 15;
        this.thumbClosedWidth = 5;
        this.trackWidth = 15;
        this.animTime = 2000;
        this.content = content;
        this.parent = parent;
        this.styleScroll();
        this.thumb.setAttribute('class', 'scroll-thumb');
        this.track.setAttribute('class', 'scroll-track');
        this.parent.appendChild(this.track);
        this.parent.appendChild(this.thumb);
        this.thumb.addEventListener('pointerdown', function (event) { return _this.eventStartHandler(event); });
        this.track.addEventListener('pointerdown', function (event) { return _this.trackClickHandler(event); });
        content.parentElement.addEventListener('scroll', function () { return _this.scrollHandler(); });
        document.addEventListener('pointerup', function (event) { return _this.eventEndHandler(event); });
        new ResizeObserver(this.update.bind(this)).observe(this.content);
    }
    Scroll.prototype.update = function () {
        if (this.lastHeight !== this.content.scrollHeight) {
            var parentHeight = this.content.parentElement.clientHeight;
            var newHeight = (parentHeight / this.content.scrollHeight) * parentHeight;
            if (newHeight >= parentHeight) {
                this.thumb.style.display = 'none';
                this.track.style.display = 'none';
            }
            else {
                this.thumb.style.display = 'block';
                this.track.style.display = 'block';
                this.thumb.style.height = newHeight + 'px';
                var scrollArea = this.parent.clientHeight - this.thumb.clientHeight;
                var scrollAble = this.content.scrollHeight - this.content.parentElement.clientHeight;
                var ratio = this.content.parentElement.scrollTop / scrollAble;
                this.setTop(scrollArea * ratio);
            }
        }
        this.lastHeight = this.content.scrollHeight;
    };
    Scroll.prototype.styleScroll = function () {
        Scroll.styleElement(this.track);
        Scroll.styleElement(this.thumb);
        this.track.style.height = '100%';
        var parentHeight = this.content.parentElement.clientHeight;
        this.thumb.style.height = (parentHeight / this.content.scrollHeight) * parentHeight + 'px';
    };
    Scroll.styleElement = function (element) {
        var elementStyle = element.style;
        elementStyle.position = 'absolute';
        elementStyle.left = '0';
        elementStyle.top = '0';
    };
    Scroll.prototype.trackClickHandler = function (event) {
        var clientY = event.clientY;
        var trackTop = this.track.getBoundingClientRect().top;
        var difY = clientY - trackTop;
        var parentHeight = this.parent.clientHeight;
        var scrollArea = parentHeight - this.thumb.clientHeight;
        var ratio = difY / scrollArea;
        var scrollAble = this.content.scrollHeight - parentHeight;
        this.parent.scrollTop = scrollAble * ratio;
    };
    Scroll.prototype.eventEndHandler = function (event) {
        if (event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundPointerMoveHandler);
            this.parent.style.touchAction = this.cssTouchAction;
        }
    };
    Scroll.prototype.eventStartHandler = function (event) {
        event.preventDefault();
        this.cssTouchAction = getComputedStyle(this.parent).getPropertyValue('touch-action');
        this.parent.style.touchAction = 'none';
        this.pointerID = event.pointerId;
        this.initY = event.clientY;
        this.initTop = this.thumb.offsetTop;
        document.addEventListener('pointermove', this.boundPointerMoveHandler = this.eventMoveHandler.bind(this));
    };
    Scroll.prototype.eventMoveHandler = function (event) {
        if (event.pointerId === this.pointerID) {
            event.preventDefault();
            var difY = event.clientY - this.initY;
            this.setTop(this.initTop + difY);
            var parentHeight = this.parent.clientHeight;
            var scrollArea = parentHeight - this.thumb.clientHeight;
            var scrollAble = this.content.scrollHeight - parentHeight;
            var ratio = this.thumb.offsetTop / scrollArea;
            this.parent.scrollTop = scrollAble * ratio;
        }
    };
    Scroll.prototype.scrollHandler = function () {
        clearTimeout(this.timer);
        if (this.thumb.clientWidth !== this.thumbWidth) {
            this.thumb.style.width = this.thumbWidth + 'px';
        }
        if (this.track.clientWidth !== this.trackWidth) {
            this.track.style.width = this.trackWidth + 'px';
        }
        var scrollArea = this.parent.clientHeight - this.thumb.clientHeight;
        var scrollAble = this.content.scrollHeight - this.content.parentElement.clientHeight;
        var ratio = this.content.parentElement.scrollTop / scrollAble;
        this.setTop(scrollArea * ratio);
        var self = this;
        this.timer = setTimeout(function () {
            self.thumb.style.width = self.thumbClosedWidth + 'px';
            self.track.style.width = '0';
        }, this.animTime);
    };
    Scroll.prototype.setTop = function (top) {
        var limit = this.parent.clientHeight - this.thumb.offsetHeight;
        if (top > limit) {
            top = limit;
        }
        else if (top < 0) {
            top = 0;
        }
        this.thumb.style.top = top + 'px';
    };
    return Scroll;
}());
