var Resizer = /** @class */ (function () {
    function Resizer(parent) {
        this.parent = parent;
        parent.addEventListener('touchstart', this.startPinchZoom.bind(this));
        document.addEventListener('touchend', this.endPinchZoom.bind(this));
    }
    Resizer.prototype.startPinchZoom = function (event) {
        if (event.touches.length === 2) {
            event.preventDefault();
            this.cssTouchAction = getComputedStyle(this.parent).touchAction;
            this.parent.style.touchAction = 'none';
            this.target = event.touches[0].target;
            this.initLineLen = Resizer.getLineLen(event);
            this.images = this.parent.querySelectorAll('img');
            for (var i = 0; i < this.images.length; i++) {
                var img = this.images[i];
                img.setAttribute('data-initWidth', img.clientWidth.toString());
            }
            this.parent.addEventListener('touchmove', this.boundPinchZoomMoveHandler = this.pinchZoom.bind(this));
        }
    };
    Resizer.prototype.pinchZoom = function (event) {
        if (event.touches.length === 2) {
            var lineLen = Resizer.getLineLen(event);
            var dif = lineLen - this.initLineLen;
            for (var i = 0; i < this.images.length; i++) {
                var img = this.images[i];
                img.style.width = ((1 + (dif / 200)) * parseInt(img.getAttribute('data-initWidth'))) + 'px';
                img.style.height = 'auto';
            }
            this.target.scrollIntoView();
        }
    };
    Resizer.prototype.endPinchZoom = function (event) {
        if (event.changedTouches.length > 0) {
            this.parent.removeEventListener('touchmove', this.boundPinchZoomMoveHandler);
            this.parent.style.touchAction = this.cssTouchAction;
        }
    };
    Resizer.getLineLen = function (event) {
        if (event.touches.length >= 2) {
            var a = Math.abs(event.touches[0].clientX - event.touches[1].clientX);
            var b = Math.abs(event.touches[0].clientY - event.touches[1].clientY);
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        }
        return 0;
    };
    return Resizer;
}());
