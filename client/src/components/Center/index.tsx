import React from "react"

export const AbsoluteCenter: React.FC = ({ children }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100vw",
				height: "100vh",
			}}
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

export const Center: React.FC = ({ children }) => {
	return (
		<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			{children}
		</div>
	)
}

export default Center
