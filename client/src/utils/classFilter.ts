interface ClassesObject {
	[key: string]: boolean
}

/**
 * Converts an object of classes into a string of classes based on the boolean value
 * @param classes the object of classes to be processed
 */
const classFilter = (classes: ClassesObject): string => {
	return Object.keys(classes)
		.filter((cl) => classes[cl])
		.join(" ")
}

export default classFilter
