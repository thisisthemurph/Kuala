import React from "react"
import { Switch, Route } from "react-router-dom"

import NotFound from "../404"

import NewCasePage from "../../pages/NewCasePage"
import ProfilePage from "../../pages/ProfilePage"
import SubmitQAPage from "../../pages/SubmitQAPage"

export const AuthenticatedApplication = () => {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<ProfilePage />
				</Route>
				<Route path="/new">
					<NewCasePage />
				</Route>
				<Route path="/submit-qa/:caseRef">
					<SubmitQAPage />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</>
	)
}

export default AuthenticatedApplication
