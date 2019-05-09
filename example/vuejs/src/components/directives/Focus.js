export default {
    name: 'focus',
    inserted (el, binding) {
        const { value = null } = binding

        if (value) {
            el.focus()
        } else {
            el.blur()
        }
    },
    componentUpdated (el, binding) {
        const { value = null } = binding

        if (value) {
            el.focus()
        } else {
            el.blur()
        }
    }
}