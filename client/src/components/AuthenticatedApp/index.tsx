import React from "react"
import { Switch, Route } from "react-router-dom"

import NotFound from "../404"

import NewCasePage from "../../pages/NewCasePage"

export const AuthenticatedApplication = () => {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<h1>Profile</h1>
					<p>This is your profile</p>
				</Route>
				<Route path="/new">
					<NewCasePage />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</>
	)
}

export default AuthenticatedApplication
