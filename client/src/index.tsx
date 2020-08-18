import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "./styles/index.scss"

import { StoreProvider } from "./store/user/userStore"

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
