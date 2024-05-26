const MIN_SCALE = 0.1
const MAX_SCALE = 4

const defaultOptions = {
    scale: { min: MIN_SCALE, max: MAX_SCALE},
    controls: { zoomIn: false, zoomOut: false, reset: false },
    zoom: true,
    move: true
}

export default class GZoomMove {

    constructor(selector, options = {}) {
        this.elt = selector
        this.options = { ...defaultOptions, ...options }

        this.elt && this.initZooming();
    }

    initZooming() {
        this.initEltParams()
        this.touchEvent()
        this.disableDocumentZoom()
        this.mouseEvent()
        this.controlEvent()
    }

    initEltParams() {
        this.drag = false;
        this.isHover = false;
        this.start = { scale: 1, middle: { x: this.elt.offsetWidth/2, y : this.elt.offsetHeight/2 } }
        this.state = { x:0, y: 0, width:this.elt.offsetWidth, height: this.elt.offsetHeight, scale: 1, distance: 0, delta: { x: 0, y: 0} }
        
        this.parent = this.elt.parentNode;
    }

    touchEvent() {
        // Start
        this.parent.addEventListener('touchstart', (e) => this.handleTouchstart(e))

        // Move
        this.parent.addEventListener('touchmove', (e) => this.handleTouchMove(e))

        // End
        this.parent.addEventListener('touchend', (e) => this.handleTouchEnd(e))
    }

    mouseEvent() {
        this.options.zoom && this.parent.addEventListener('wheel', (e) => this.handleWheel(e))

        this.options.move && this.parent.addEventListener('mousedown', (e) => this.handleMouseDown(e))

        this.options.move && this.parent.addEventListener("mousemove", (e) => this.handleMouseMove(e))

        this.options.move && this.parent.addEventListener('mouseup', () => this.handleMouseCancel())

        this.options.move && this.parent.addEventListener('mouseleave', () => this.handleMouseCancel())

        this.elt.addEventListener('mouseover', () => { this.isHover = true }, false)

        this.elt.addEventListener('mouseleave', () => { this.isHover = false }, false)
    }

    controlEvent () {
        this.options.zoom && this.options.controls.zoomIn && this.options.controls.zoomIn.addEventListener('click', (e) => this.controlZoom(e, 0.5))
        this.options.zoom && this.options.controls.zoomOut && this.options.controls.zoomOut.addEventListener('click', (e) => this.controlZoom(e, -0.5))
        this.options.controls.reset && this.options.controls.reset.addEventListener('click', (e) => { e.preventDefault(); this.reset() })
    }

    handleWheel(e) {
        if (e.cancelable) e.preventDefault();

        this.start.middle.x = e.clientX - this.elt.offsetLeft
        this.start.middle.y = e.clientY - this.elt.offsetTop

        this.zoom(-(e.deltaY /1000))
    }

    handleMouseDown(e) {
        e.preventDefault();

        this.drag = true
        this.tempCoord = { x: e.clientX, y: e.clientY }
        this.start.x = this.state.x
        this.start.y = this.state.y
        this.deltaStart = { x: this.state.delta.x, y: this.state.delta.y }
    }

    handleMouseMove(e) {
        e.preventDefault();

        if (this.drag) {
            this.state.x = this.start.x + (e.clientX - this.tempCoord.x);
            this.state.y = this.start.y + (e.clientY - this.tempCoord.y);

            this.state.delta.x = this.deltaStart.x - (e.clientX - this.tempCoord.x);
            this.state.delta.y = this.deltaStart.y - (e.clientY - this.tempCoord.y);

            this.render()
        }
    }

    handleMouseCancel() {
        this.drag = false;
        this.tempCoord = {x:0, y:0};
    }

    handleTouchstart(e) {
        if (this.options.move && e.touches.length === 1) {
            this.drag = true;
            this.start.x = this.state.x
            this.start.y = this.state.y
            this.deltaStart = { x: this.state.delta.x, y: this.state.delta.y }
            this.tempCoord = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
        }

        if (this.options.zoom && e.touches.length === 2) {
            this.start.scale = this.state.scale;
            this.start.distance = this.distance(e);

            this.start.middle.x = (e.touches[0].clientX - this.elt.offsetLeft + e.touches[1].clientX - (2 * this.elt.offsetLeft)) / 2
            this.start.middle.y = (e.touches[0].clientY - this.elt.offsetTop + e.touches[1].clientY - (2 * this.elt.offsetTop)) / 2
        }
    }

    handleTouchMove(e) {
        if (e.cancelable && (this.options.move || this.options.zoom)) e.preventDefault();

        if (this.options.move && this.drag && e.touches.length === 1) {
            this.state.x = this.start.x + (e.changedTouches[0].clientX - this.tempCoord.x);
            this.state.y = this.start.y + (e.changedTouches[0].clientY - this.tempCoord.y);

            this.state.delta.x = this.deltaStart.x - (e.changedTouches[0].clientX - this.tempCoord.x);
            this.state.delta.y = this.deltaStart.y - (e.changedTouches[0].clientY - this.tempCoord.y);

            this.render()
        }

        if (this.options.zoom && e.touches.length === 2) {
            const deltaDistance = this.distance(e);
            let scale = deltaDistance / this.start.distance;

            this.state.scale = this.start.scale * Math.min(Math.max(0.12, scale), 4);

            this.reAdapt()
            this.render()
        }
    }

    handleTouchEnd(e) {
        if (e.cancelable && (this.options.move || this.options.zoom)) e.preventDefault();

        if (e.touches.length === 1) {
            this.drag = false;
            this.tempCoord = { x:0, y:0 };
        }
    }

    disableDocumentZoom() {
        document.addEventListener('wheel', (e) => {
            if (e.ctrlKey && this.isHover)
                e.preventDefault()
        }, {passive: false})
    }

    reAdapt() {
        const deltaScale = (((this.elt.offsetWidth * this.state.scale) / this.state.width) - 1);

        const escapeX = ((this.elt.offsetWidth * this.state.scale) - this.state.width) / 2
        const escapeY = ((this.elt.offsetHeight * this.state.scale) - this.state.height) / 2

        this.state.x += escapeX - ((this.start.middle.x + this.state.delta.x) * deltaScale)
        this.state.y += escapeY - ((this.start.middle.y + this.state.delta.y) * deltaScale)

        this.state.delta.x += (this.start.middle.x + this.state.delta.x) * deltaScale
        this.state.delta.y += (this.start.middle.y + this.state.delta.y) * deltaScale

        this.state.width = this.elt.offsetWidth * this.state.scale
        this.state.height = this.elt.offsetHeight * this.state.scale
    }

    render() {
        this.elt.style.transform = `translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.scale})`
    }

    distance(event) {
        return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    }

    controlZoom(e, step) {
        e.preventDefault();

        this.start.middle.x = this.elt.offsetWidth/2
        this.start.middle.y = this.elt.offsetHeight/2

        this.zoom(step)
    }

    zoom (step) {
        this.state.scale += step;

        const min = this.options.scale.min ? this.options.scale.min : MIN_SCALE
        const max = this.options.scale.max ? this.options.scale.max : Number.MAX_SAFE_INTEGER

        this.state.scale =  Math.min(Math.max(min, this.state.scale), max);

        this.reAdapt()
        this.render()
    }

    reset() {
        this.initEltParams();
        this.reAdapt()
        this.render()
    }
}