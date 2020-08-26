import React from "react"
import { Link } from "react-router-dom"

import Logo from "../../images/koala64.png"

import Hamburger from "../Hamburger"

import "./Nav.scss"

const Nav = () => {
	const [burgerIsActive, setBurgerIsActive] = React.useState(false)

	let menuClasses = "nav__menu"
	if (burgerIsActive) menuClasses = "nav__menu nav__menu--open"

	const closeMenu = () => {
		setBurgerIsActive(false)
	}

	return (
		<nav className="nav">
			<div className="container">
				<div className="nav__logo">
					<Link to="/" className="nav__logo-link" onClick={closeMenu}>
						<img className="nav__logo-img" src={Logo} alt="logo" />
					</Link>
				</div>

				<Hamburger
					isActive={burgerIsActive}
					onClick={() => setBurgerIsActive(!burgerIsActive)}
				/>

				<ul className={menuClasses}>
					<li className="nav__item">
						<Link to="/" className="nav__item-link" onClick={closeMenu}>
							Profile
						</Link>
					</li>
					<li className="nav__item">
						<Link to="/new" className="nav__item-link" onClick={closeMenu}>
							New Case
						</Link>
					</li>
					<li className="nav__item">
						<Link to="/history" className="nav__item-link" onClick={closeMenu}>
							History
						</Link>
					</li>
					<li className="nav__item">
						<Link to="/history" className="nav__item-link" onClick={closeMenu}>
							Settings
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Nav
