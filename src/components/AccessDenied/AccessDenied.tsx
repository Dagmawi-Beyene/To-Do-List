import {
	createStyles,
	Title,
	Text,
	Button,
	Container,
	Group
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80
	},

	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 220,
		lineHeight: 1,
		marginBottom: theme.spacing.xl * 1.5,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[4]
				: theme.colors.gray[2],

		[theme.fn.smallerThan('sm')]: {
			fontSize: 120
		}
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32
		}
	},

	description: {
		maxWidth: 500,
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5
	}
}))

export default function AccessDenied() {
	const navigate = useNavigate()
	const { classes } = useStyles()

	setTimeout(() => {
		navigate('/auth')
	}, 3000)

	return (
		<Container className={classes.root}>
			<div className={classes.label}>401</div>
			<Title className={classes.title}>You have found a secret place.</Title>
			<Text
				color="dimmed"
				size="lg"
				align="center"
				className={classes.description}
			>
				You are not authorized to view this page. Please login to continue.
			</Text>
			<Group position="center">
				<Button
					variant="subtle"
					size="md"
					onClick={() => {
						window.location.href = '/auth'
					}}
				>
					Login / Register
				</Button>
			</Group>
		</Container>
	)
}
