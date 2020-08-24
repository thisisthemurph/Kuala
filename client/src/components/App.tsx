import React, { useEffect, useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

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
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/register">
						<SignUpPage />
					</Route>
					<Route path="/">
						{state.currentUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}

						{/* {state.currentUser && (
							<div>
								<pre>{JSON.stringify(state.currentUser, null, 2)}</pre>
							</div>
						)} */}
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
