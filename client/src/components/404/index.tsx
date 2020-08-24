import React from "react"

import { Center } from "../Center"

export const NotFound = () => {
	return (
		<Center>
			<h1 style={{ margin: "0.5em 0" }}>404!</h1>
			<br />
			<img
				src="https://i.pinimg.com/originals/d8/b6/fc/d8b6fc95b4675796d728e29dfd3d130b.jpg"
				alt="404 error"
			/>
			<br />
			<h2 style={{ marginTop: "0.5em" }}>I think you're in the wrong place, mate!</h2>
		</Center>
	)
}

export default NotFound
