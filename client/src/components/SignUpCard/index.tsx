import React from "react"
import { useHistory, useLocation, Redirect } from "react-router-dom"
import { History } from "history"
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik"

import { Center } from "../Center"
import { Card, CardDivider } from "../Card"
import FormGroup from "../FormComponents/FormGroup"

import { RightArrow } from "../../utils/icons"
import { validateName, validateUsername, validatePassword } from "../../utils/validation"

import { register } from "../../services/authenticatonServices"
import { StoreContext } from "../../store/user/userStore"
import { isErrReturnType } from "../../types"

interface FormValues {
	name: string
	username: string
	password: string
}

const InnerForm = (props: FormikProps<FormValues>) => {
	const { touched, errors, isSubmitting } = props

	// const setUsername = (name: string): string => {
	// 	(props.getFieldProps("name"))
	// 	return name.trim().replace(" ", ".").toLowerCase()
	// }

	return (
		<Form>
			<FormGroup>
				<label className="formgroup__label" htmlFor="name">
					Name:
				</label>
				<Field id="name" className="formgroup__input" type="text" name="name" />
				{touched.name && errors.name && <p className="formgroup__error">{errors.name}</p>}
			</FormGroup>
			<FormGroup>
				<label className="formgroup__label" htmlFor="username">
					Username:
				</label>
				<Field
					id="username"
					className="formgroup__input"
					type="text"
					name="username"
					// value={setUsername(props.getFieldProps("name").value)}
					// disabled={true}
				/>
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
				<button type="submit" className="button formgroup__button">
					Sign up <RightArrow />
				</button>
			</FormGroup>

			<CardDivider>OR</CardDivider>

			<Center>
				<p className="small">
					Already have an account? <a href="/login">Log in</a>
				</p>
			</Center>
		</Form>
	)
}

interface SignUpFormProps {
	initialName?: string
	initialUsername?: string
	initialPassword?: string
	history: History
}

const SignUpForm = withFormik<SignUpFormProps, FormValues>({
	mapPropsToValues: (props) => {
		return {
			name: props.initialName || "",
			username: props.initialUsername || "",
			password: props.initialPassword || "",
		}
	},
	validate: (values: FormValues) => {
		const errors: FormikErrors<FormValues> = {}

		const nameError = validateName(values.name)
		if (nameError) errors.name = nameError

		const usernameError = validateUsername(values.username)
		if (usernameError) errors.username = usernameError

		const passwordError = validatePassword(values.password)
		if (passwordError) errors.password = passwordError

		return errors
	},
	handleSubmit: ({ name, username, password }, { props, setSubmitting }) => {
		setSubmitting(true)
		register(name, username, password).then((result) => {
			if (isErrReturnType(result)) {
				props.history.push("/register", { error: result.message })
			} else {
				props.history.push("/login")
			}
		})
		setSubmitting(false)
	},
})(InnerForm)

const SignUpCard: React.FC = () => {
	const history = useHistory()
	const location = useLocation<{ error?: string }>()

	const { state } = React.useContext(StoreContext)
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
		<Card header="Kuala">
			{error && <p className="error">{error}</p>}
			<SignUpForm history={history} />
		</Card>
	)
}

export default SignUpCard
