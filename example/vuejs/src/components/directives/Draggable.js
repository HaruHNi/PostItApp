class Draggable {
    constructor (element, binding) {
        this.$el = element
        this.binding = binding

        this.$target = null
        this.distance = null
        this.canceled = ['input', 'textarea', 'button', 'select', 'option']
    }

    init () {
        this.bindStart = this.start.bind(this)
        this.bindMove = this.move.bind(this)
        this.bindEnd = this.end.bind(this)

        this.$el.addEventListener('mousedown', this.bindStart)
        document.addEventListener('mouseup', this.bindEnd)
    }

    start (e) {
        const { target } = e
        const { nodeName = '' } = target

        if (this.canceled.includes(nodeName.toLowerCase())) {
            return
        }

        this.$target = target
        const { pageX, pageY } = e
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.$el

        const distance = {
            x: pageX - offsetLeft,
            y: pageY - offsetTop,
            targetWidth: offsetWidth,
            targetHeight: offsetHeight
        }

        this.distance = distance
        document.addEventListener('mousemove', this.bindMove)
    }

    move (e) {
        const { clientWidth, clientHeight } = document.body
        const { pageX, pageY } = e
        const { x, y, targetWidth, targetHeight } = this.distance

        let left = pageX - x
        let top = pageY - y

        if (left < 0 || left + targetWidth > clientWidth) {
            left = left < 0 ? 0 : clientWidth - targetWidth
        }

        if (top < 0 || top + targetHeight > clientHeight) {
            top = top < 0 ? 0 : clientHeight - targetHeight
        }

        const param = {
            type: 'draggable',
            target: this.$target,
            position: {
                left,
                top
            }
        }

        if (this.isBinging()) {
            this.binding(param)
        } else {
            this.updatePosition(param)
        }
    }

    end () {
        this.$target = null
        document.removeEventListener('mousemove', this.bindMove)
    }

    isBinging () {
        return !!this.binding
    }

    updatePosition ({position = {}}) {
        const {left = 0, top = 0} = position
        const { cssText = '' } = this.$el.style 
        const newCssText = `${cssText} left: ${left}px; top: ${top}px;`

        this.$el.style.cssText = newCssText
    }
}

export default {
    bind (el, binding) {
        const { value = null } = binding
        const draggable = new Draggable(el, value)
        draggable.init()
    }
}