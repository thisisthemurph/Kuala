import React from "react"

import DropzoneUploader from "../components/DropzoneUploader"

const NewCasePage = () => {
	return (
		<>
			<h1>New Case</h1>
			<p>
				Create a new case, or add exhibits to an existing case, by using your InfoPath log
				for below.
			</p>

			<DropzoneUploader />
		</>
	)
}

export default NewCasePage
