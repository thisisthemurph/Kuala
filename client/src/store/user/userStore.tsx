import React, { createContext, useReducer } from "react"
import { userReducer, userInitialState } from "./userReducer"
import { userActions } from "./userActions"

import { UserState } from "../types"

interface StoreProviderProps {
	children: JSX.Element
}

interface ContextProps {
	state: UserState
	actions: any
}

const StoreContext = createContext<ContextProps>({ state: userInitialState, actions: userActions })

const StoreProvider = ({ children }: StoreProviderProps) => {
	const [state, dispatch] = useReducer(userReducer, userInitialState)
	const actions = userActions(state, dispatch)

	return <StoreContext.Provider value={{ state, actions }}>{children}</StoreContext.Provider>
}

export { StoreContext, StoreProvider }
