import React from "react"

export const RightArrow = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-arrow-narrow-right"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			strokeWidth="1.2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<line x1="5" y1="12" x2="19" y2="12" />
			<line x1="15" y1="16" x2="19" y2="12" />
			<line x1="15" y1="8" x2="19" y2="12" />
		</svg>
	)
}

export const TablerUpload = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-upload"
			width="44"
			height="44"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
			<polyline points="7 9 12 4 17 9" />
			<line x1="12" y1="4" x2="12" y2="16" />
		</svg>
	)
}
