export default class ClickDetector {
    constructor (callback) {
        this.callback = callback
    }

    bind () {
        document.addEventListener('click', this.callback)
    }

    unbind () {
        document.removeEventListener('click', this.callback)
    }
}