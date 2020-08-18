import React from "react"
import { useHistory, useLocation, Redirect } from "react-router-dom"
import { History } from "history"
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik"

import { Center } from "../Center"
import { Card, CardDivider } from "../Card"
import FormGroup from "../FormComponents/FormGroup"

import { RightArrow } from "../../utils/icons"
import { validateUsername, validatePassword } from "../../utils/validation"

import { login } from "../../services/authenticatonServices"
import { StoreContext } from "../../store/user/userStore"
import { isErrReturnType } from "../../types"

interface FormValues {
	username: string
	password: string
}

const InnerForm = (props: FormikProps<FormValues>) => {
	const { touched, errors, isSubmitting } = props

	return (
		<Form>
			<FormGroup>
				<label className="formgroup__label" htmlFor="username">
					Username:
				</label>
				<Field id="username" className="formgroup__input" type="text" name="username" />
				{touched.username && errors.username && (
					<p className="formgroup__error">{errors.username}</p>
				)}
			</FormGroup>
			<FormGroup>
				<label className="formgroup__label" htmlFor="password">
					Password:
				</label>
				<Field id="password" className="formgroup__input" type="password" name="password" />
				{touched.password && errors.password && (
					<p className="formgroup__error">{errors.password}</p>
				)}
			</FormGroup>
			<FormGroup>
				<button type="submit" className="button formgroup__button" disabled={isSubmitting}>
					Login <RightArrow />
				</button>
			</FormGroup>

			<CardDivider>OR</CardDivider>

			<Center>
				<p className="small">Forgot your password?</p>
			</Center>
		</Form>
	)
}

interface LoginFormProps {
	initialUsername?: string
	initialPassword?: string
	history: History
	loginSuccess: any
}

const LoginForm = withFormik<LoginFormProps, FormValues>({
	mapPropsToValues: (props) => {
		return {
			username: props.initialUsername || "michael.murphy",
			password: props.initialPassword || "password",
		}
	},
	validate: (values: FormValues) => {
		const errors: FormikErrors<FormValues> = {}

		const usernameError = validateUsername(values.username)
		if (usernameError) errors.username = usernameError

		const passwordError = validatePassword(values.password)
		if (passwordError) errors.password = passwordError

		return errors
	},
	handleSubmit: ({ username, password }, { props, resetForm, setErrors, setSubmitting }) => {
		setSubmitting(true)

		login(username, password)
			.then((result) => {
				if (!isErrReturnType(result)) {
					props.loginSuccess({ user: result, token: localStorage.getItem("token") })
					return { isError: false, error: null }
				}

				return { isError: true, errorMessage: result.message }
			})
			.then((error) => {
				if (error.isError) {
					props.history.push("/login", { error: error.errorMessage })
				} else {
					props.history.push("/")
				}
			})

		setSubmitting(false)
	},
})(InnerForm)

const LoginCard: React.FC = () => {
	const history = useHistory()
	const location = useLocation<{ error?: string }>()

	const { state, actions } = React.useContext(StoreContext)
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		if (location.state?.error) {
			if (location.state && location.state.error) {
				setError(location.state.error)
			}
		}
	}, [location.state?.error])

	if (state.currentUser !== null) {
		return <Redirect to="/" />
	}

	return (
		<>
			<Card header="Kuala">
				{error && <p className="error">{error}</p>}
				<LoginForm history={history} loginSuccess={actions.loginSuccess} />
			</Card>
			<Card>
				<Center>
					<p className="small">
						Don't have an account? <a href="/register">Sign up</a>
					</p>
				</Center>
			</Card>
		</>
	)
}

export default LoginCard
