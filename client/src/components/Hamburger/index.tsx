import React from "react"

import "./Hamburger.scss"

interface HamburgerProps {
	isActive: boolean
	onClick: () => void
}

export const Hamburger = ({ isActive, onClick }: HamburgerProps) => {
	const [burgerClasses, setBurgerClasses] = React.useState("hamburger hamburger--spin")

	React.useEffect(() => {
		if (isActive) {
			setBurgerClasses("hamburger hamburger--spin is-active")
		} else {
			setBurgerClasses("hamburger hamburger--spin")
		}
	}, [isActive])

	return (
		<button className={burgerClasses} type="button" onClick={onClick}>
			<span className="hamburger-box">
				<span className="hamburger-inner"></span>
			</span>
		</button>
	)
}

export default Hamburger
