import React, { useEffect, useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Nav from "./Nav"
import NotFound from "./404"
import AuthenticatedApp from "./AuthenticatedApp"
import UnauthenticatedApp from "./UnauthenticatedApp"

import SignUpPage from "../pages/SignUpPage"
import LoginPage from "../pages/LoginPage"

import { login } from "../services/authenticatonServices"
import { StoreContext } from "../store/user/userStore"

function App() {
	const { state, actions } = useContext(StoreContext)
	let token = localStorage.getItem("token")

	useEffect(() => {
		;(async () => {
			if (token && state.currentUser === null) {
				const user = await login(undefined, undefined, token)
				actions.loginSuccess({ user, token })
			}
		})()
	}, [token])

	return (
		<Router>
			<Nav />
			<div className="container">
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/register">
						<SignUpPage />
					</Route>
					<Route path="/">
						{state.currentUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
