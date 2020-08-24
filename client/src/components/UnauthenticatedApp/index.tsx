import React from "react"
import { Switch, Route, Link } from "react-router-dom"

import NotFound from "../404"

export const UnauthenticatedApplication = () => {
	return (
		<>
			<h1>Unauthenticated Application</h1>
			<p>
				This is an <strong>unauthenticated</strong> user!
			</p>

			<Switch>
				<Route path="/">
					<p>
						Please <Link to="/login">log in</Link> to access Kuala!
					</p>
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</>
	)
}

export default UnauthenticatedApplication
