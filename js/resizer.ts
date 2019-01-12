class Resizer {
    private readonly parent;
    private initLineLen: number;
    private images: NodeList;
    private target: EventTarget;
    private boundPinchZoomMoveHandler: EventListener;
    private cssTouchAction: string;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        parent.addEventListener('touchstart', this.startPinchZoom.bind(this));
        document.addEventListener('touchend', this.endPinchZoom.bind(this));
    }

    private startPinchZoom(event: TouchEvent): void {
        if(event.touches.length === 2) {
            event.preventDefault();
            this.cssTouchAction = getComputedStyle(this.parent).touchAction;
            this.parent.style.touchAction = 'none';
            this.target = event.touches[0].target;
            this.initLineLen = Resizer.getLineLen(event);
            this.images = this.parent.querySelectorAll('img');
            for(let i = 0; i < this.images.length; i++) {
                const img: HTMLElement = this.images[i] as HTMLElement;
                img.setAttribute('data-initWidth', img.clientWidth.toString());
            }
            this.parent.addEventListener('touchmove', this.boundPinchZoomMoveHandler = this.pinchZoom.bind(this));
        }
    }

    private pinchZoom(event: TouchEvent): void {
        if(event.touches.length === 2) {
            const lineLen: number = Resizer.getLineLen(event);
            const dif: number = lineLen - this.initLineLen;
            for(let i = 0; i < this.images.length; i++) {
                const img: HTMLElement = this.images[i] as HTMLElement;
                img.style.width = ((1 + (dif / 200)) * parseInt(img.getAttribute('data-initWidth'))) + 'px';
                img.style.height = 'auto';
            }
            (this.target as HTMLElement).scrollIntoView();
        }
    }

    private endPinchZoom(event: TouchEvent): void {
        if(event.changedTouches.length > 0) {
            this.parent.removeEventListener('touchmove', this.boundPinchZoomMoveHandler);
            this.parent.style.touchAction = this.cssTouchAction;
        }
    }

    private static getLineLen(event: TouchEvent): number {
        if(event.touches.length >= 2) {
            const a = Math.abs(event.touches[0].clientX - event.touches[1].clientX);
            const b = Math.abs(event.touches[0].clientY - event.touches[1].clientY);
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        }
        return 0;
    }
}