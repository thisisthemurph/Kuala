import React from "react"

import "./Card.scss"

interface CardProps {
	header?: String
	children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ header, children }: CardProps) => {
	return (
		<section className="card">
			{header && (
				<header className="card__header">
					<header>
						<h2>{header}</h2>
					</header>
				</header>
			)}
			<main className="card__body">{children}</main>
		</section>
	)
}

interface CardDividerProps {
	children?: React.ReactNode
}

export const CardDivider = ({ children }: CardDividerProps) => {
	return (
		<div className={`card__divider${children ? " card__divider--split" : ""}`}>{children}</div>
	)
}

export default Card
