const uuid = function () {
	let d = new Date().getTime()
	let _uuid = 'xxxx-xxxx-yxxx'.replace(/[xy]/g, match => {
		let r = (d + Math.random() * 16) % 16 | 0
		d = Math.floor(d / 16)
		return (match === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
	})

	return _uuid
}

export {
    uuid
}