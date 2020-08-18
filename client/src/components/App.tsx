import React, { useEffect, useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AbsoluteCenter } from "./Center"
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
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						{state.currentUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}

						{state.currentUser && (
							<div>
								<pre>{JSON.stringify(state.currentUser, null, 2)}</pre>
							</div>
						)}
					</Route>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/register">
						<SignUpPage />
					</Route>
					<Route path="*">
						<AbsoluteCenter>
							<h1>404!</h1>
							<br />
							<img
								src="https://i.pinimg.com/originals/d8/b6/fc/d8b6fc95b4675796d728e29dfd3d130b.jpg"
								alt="404 error"
							/>
							<br />
							<h2>I think you're in the wrong place, mate!</h2>
						</AbsoluteCenter>
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
