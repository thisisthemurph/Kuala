import React from "react"

export const AbsoluteCenter: React.FC = ({ children, ...rest }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100vw",
				height: "100vh",
			}}
			{...rest}
		>
			<div
				style={{
					width: "100%",
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{children}
			</div>
		</div>
	)
}

export const Center: React.FC = ({ children, ...rest }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				justifyContent: "center",
			}}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Center
