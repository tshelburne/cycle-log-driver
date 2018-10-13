function makeLogDriver({include = null}) {
	const colorMap = {}

	return ins =>
		ins.setDebugListener({
			next: ({name, message, messages, color}) => {
				if (include && !include.includes(name)) return
				const output = messages || [message]
				console.log(
					`%c${name}`,
					`font-weight: bold; color: ${color || randomColor(name)}`,
					...output
				)
			},
		})

	function randomColor(name) {
		if (colorMap[name]) return colorMap[name]
		return (colorMap[name] = `#${Array.from(Array(6))
			.map(_ => Math.floor(Math.random() * 10))
			.join(``)}`)
	}
}

export default makeLogDriver