///<reference path="ResizeObserver.ts"/>

class Scroll {
    private readonly parent: HTMLElement;
    private readonly content: HTMLElement;
    private readonly thumb: HTMLElement = document.createElement('div');
    private readonly track: HTMLElement = document.createElement('div');
    private initY: number = 0;
    private initTop: number = 0;
    private timer: number = 0;
    private boundPointerMoveHandler: EventListener;
    private lastHeight: number = 0;
    private pointerID: number;
    private cssTouchAction: string;
    thumbWidth: number = 15;
    thumbClosedWidth: number = 5;
    trackWidth: number = 15;
    animTime: number = 2000;

    constructor(content: HTMLElement, parent: HTMLElement) {
        this.content = content;
        this.parent = parent;
        this.styleScroll();
        this.thumb.setAttribute('class', 'scroll-thumb');
        this.track.setAttribute('class', 'scroll-track');
        this.parent.appendChild(this.track);
        this.parent.appendChild(this.thumb);
        this.thumb.addEventListener('pointerdown', event => this.eventStartHandler(event));
        this.track.addEventListener('pointerdown', event  => this.trackClickHandler(event));
        content.parentElement.addEventListener('scroll', () => this.scrollHandler());
        document.addEventListener('pointerup', event => this.eventEndHandler(event));

        new ResizeObserver(this.update.bind(this)).observe(this.content);
    }

    private update(): void {
        if(this.lastHeight !== this.content.scrollHeight) {
            const parentHeight = this.content.parentElement.clientHeight;
            const newHeight = (parentHeight / this.content.scrollHeight) * parentHeight;
            if(newHeight >= parentHeight) {
                this.thumb.style.display = 'none';
                this.track.style.display = 'none';
            } else {
                this.thumb.style.display = 'block';
                this.track.style.display = 'block';

                this.thumb.style.height = newHeight + 'px';

                const scrollArea = this.parent.clientHeight - this.thumb.clientHeight;
                const scrollAble = this.content.scrollHeight - this.content.parentElement.clientHeight;
                const ratio = this.content.parentElement.scrollTop / scrollAble;
                this.setTop(scrollArea * ratio);
            }
        }
        this.lastHeight = this.content.scrollHeight;
    }

    private styleScroll(): void {
        Scroll.styleElement(this.track);
        Scroll.styleElement(this.thumb);
        this.track.style.height = '100%';
        const parentHeight = this.content.parentElement.clientHeight;
        this.thumb.style.height = (parentHeight / this.content.scrollHeight) * parentHeight + 'px';
    }

    private static styleElement(element: HTMLElement) {
        const elementStyle: CSSStyleDeclaration = element.style;
        elementStyle.position = 'absolute';
        elementStyle.left = '0';
        elementStyle.top = '0';
    }

    private trackClickHandler(event: PointerEvent): void {
        const clientY = event.clientY;
        const trackTop = this.track.getBoundingClientRect().top;
        const difY = clientY - trackTop;

        const parentHeight = this.parent.clientHeight;
        const scrollArea = parentHeight - this.thumb.clientHeight;
        const ratio = difY / scrollArea;
        const scrollAble = this.content.scrollHeight - parentHeight;
        this.parent.scrollTop = scrollAble * ratio;
    }

    private eventEndHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundPointerMoveHandler);
            this.parent.style.touchAction = this.cssTouchAction;
        }
    }

    private eventStartHandler(event: PointerEvent): void {
        event.preventDefault();
        this.cssTouchAction = getComputedStyle(this.parent).getPropertyValue('touch-action');
        this.parent.style.touchAction = 'none';
        this.pointerID = event.pointerId;
        this.initY = event.clientY;
        this.initTop = this.thumb.offsetTop;
        document.addEventListener('pointermove', this.boundPointerMoveHandler = this.eventMoveHandler.bind(this));
    }

    private eventMoveHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            event.preventDefault();
            const difY: number = event.clientY - this.initY;
            this.setTop(this.initTop + difY);

            const parentHeight = this.parent.clientHeight;
            const scrollArea = parentHeight - this.thumb.clientHeight;
            const scrollAble = this.content.scrollHeight - parentHeight;
            const ratio = this.thumb.offsetTop / scrollArea;
            this.parent.scrollTop = scrollAble * ratio;
        }
    }

    private scrollHandler(): void {
        clearTimeout(this.timer);
        if(this.thumb.clientWidth !== this.thumbWidth) {
            this.thumb.style.width = this.thumbWidth + 'px';
        }
        if(this.track.clientWidth !== this.trackWidth) {
            this.track.style.width = this.trackWidth + 'px';
        }
        const scrollArea = this.parent.clientHeight - this.thumb.clientHeight;
        const scrollAble = this.content.scrollHeight - this.content.parentElement.clientHeight;
        const ratio = this.content.parentElement.scrollTop / scrollAble;
        this.setTop(scrollArea * ratio);
        const self: Scroll = this;
        this.timer = setTimeout(function () {
            self.thumb.style.width = self.thumbClosedWidth + 'px';
            self.track.style.width = '0';
        }, this.animTime);
    }

    private setTop(top: number): void {
        const limit = this.parent.clientHeight - this.thumb.offsetHeight;
        if(top > limit) {
            top = limit;
        } else if (top < 0) {
            top = 0;
        }
        this.thumb.style.top = top + 'px';
    }
}