import React from "react"
import { Link } from "react-router-dom"
import Dropzone, { IDropzoneProps, ILayoutProps } from "react-dropzone-uploader"

import Card from "../Card"
import Center from "../Center"
import { TablerUpload } from "../../utils/icons"

import { StoreContext } from "../../store/user/userStore"
import { newExhibit } from "../../services/caseServices"

import "./DropzoneUploader.scss"

const Layout = ({
	input,
	previews,
	submitButton,
	dropzoneProps,
	files,
	extra: { maxFiles },
}: ILayoutProps) => {
	return (
		<div {...dropzoneProps}>
			{previews}

			<Center>
				{files.length < maxFiles && input}
				{files.length > 0 && submitButton}
			</Center>
		</div>
	)
}

interface DropzoneImitatorProps {
	children: React.ReactNode
	error?: boolean
}

const DropzoneImitator = ({ children, error = false }: DropzoneImitatorProps) => {
	return (
		<div className="dzu-dropzone">
			<Center>
				<div className="dzu-previewContainer">{children}</div>
				{error && (
					<div className="dzu-submitButtonContainer">
						<Link className="dzu-submitButton button" to="/new">
							Let's try that again...
						</Link>
					</div>
				)}
			</Center>
		</div>
	)
}

export const InputContentLayout = () => {
	return (
		<Center key="InputContentLayout">
			<TablerUpload />
			<p className="center">
				Drag and drop your InfoPath form here, or click to select it with the file browser.
			</p>
		</Center>
	)
}

export const DropzoneUploader = () => {
	const { state } = React.useContext(StoreContext)

	const [error, setError] = React.useState<{ status: boolean; message: string }>({
		status: false,
		message: "",
	})

	const [uploadComplete, setUploadComplete] = React.useState(false)
	const [uploadedCaseReference, setUploadedCaseReference] = React.useState<string | null>(null)
	const [uploadedCaseExhibits, setUploadedCaseExhibits] = React.useState<string[]>([])

	const handleSubmit: IDropzoneProps["onSubmit"] = (files, allFiles) => {
		if (state.currentUser) {
			let username = state.currentUser.user.username

			if (uploadedCaseReference && uploadedCaseExhibits.length > 0) {
				uploadedCaseExhibits.forEach((reference) => {
					newExhibit(username, uploadedCaseReference, reference)
				})

				setUploadComplete(true)
			}
		}

		allFiles.forEach((f) => f.remove())
	}

	const handleChange: IDropzoneProps["onChangeStatus"] = (file, status, allFiles) => {
		if (status === "done") {
			const reader = new FileReader()
			reader.readAsText(file.file)

			reader.onloadend = (evt) => {
				const data = evt.target?.result

				try {
					if (data && typeof data === "string") {
						const parser = new DOMParser()
						const xml = parser.parseFromString(data, "text/xml")

						const caseElem = xml.getElementsByTagName("case")[0]
						const caseReference = caseElem.getElementsByTagName("reference")[0]
							.textContent
						const exhibitsElem = caseElem.getElementsByTagName("exhibits")[0]

						const references: string[] = []
						for (let i = 0; i < exhibitsElem.children.length; i++) {
							const exhibit = exhibitsElem.children[i]
							const ref = exhibit.getElementsByTagName("reference")[0].textContent

							if (ref) references.push(ref)
						}

						setUploadedCaseReference(caseReference)
						setUploadedCaseExhibits(references)
					} else {
						setError({
							status: true,
							message: "Is the file you selected empty? 🤔",
						})
					}
				} catch (err) {
					setError({
						status: true,
						message: "Are you sure that file is an appropriate InfoPath log form? 😕",
					})
				}
			}
		}
	}

	if (error.status)
		return (
			<Center>
				<DropzoneImitator error={error.status}>
					<p className="center">{error.message}</p>
				</DropzoneImitator>
			</Center>
		)

	if (uploadComplete) {
		return (
			<Center>
				<DropzoneImitator>
					<p className="center">
						The exhibits for <strong>{uploadedCaseReference}</strong> have been uploaded
						successfully 🙌
					</p>
					<ul>
						{uploadedCaseExhibits.map((ref) => (
							<li key={ref}>{ref}</li>
						))}
					</ul>
					<Link
						className="button"
						to={`/submit-qa/${uploadedCaseReference?.toLowerCase()}`}
					>
						Submit for QA
					</Link>
				</DropzoneImitator>
			</Center>
		)
	}

	return (
		<>
			<Center>
				<Dropzone
					LayoutComponent={Layout}
					onSubmit={handleSubmit}
					onChangeStatus={handleChange}
					maxFiles={1}
					accept={"text/xml"}
					inputContent={InputContentLayout}
				/>
			</Center>

			{uploadedCaseExhibits.length > 0 && (
				<div>
					<h2>{uploadedCaseReference}</h2>

					{uploadedCaseExhibits.map((reference) => (
						<Card key={reference} header={reference}>
							<p>This is an example piece of text</p>
						</Card>
					))}
				</div>
			)}
		</>
	)
}

export default DropzoneUploader
