import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Checkbox,
	Anchor,
	Stack
} from '@mantine/core'
import { GoogleButton } from './SocialButtons'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	auth,
	firestore,
	googleAuthProvider,
	serverTimestamp
} from '../lib/firebase'
import UserContext from '../lib/context'

export function AuthenticationForm(props: PaperProps) {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const [type, toggle] = useToggle(['login', 'register'])
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
			terms: true
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) =>
				val.length <= 6 ? 'Password should include at least 6 characters' : null
		}
	})

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	// login with google
	const loginWithGoogle = () => {
		auth.signInWithPopup(googleAuthProvider).then(async (result) => {
			// add to users collection
			if (result?.additionalUserInfo?.isNewUser) {
				//@ts-ignore
				let profile = result?.user?.multiFactor?.user
				const newUser = {
					phoneNumber: profile.phoneNumber,
					photoURL: profile.photoURL,
					displayName: profile.displayName,
					email: profile.email,
					createdAt: serverTimestamp(),
					emailVerifer: profile.emailVerified,
					role: 'user'
				}
				let userDoc = firestore.doc(`users/${profile.uid}`)
				const batch = firestore.batch()
				batch.set(userDoc, newUser)
				await batch.commit()
			}
			// redirect to /
			navigate('/')
		})
	}

	// login with email and password
	const loginWithEmail = async () => {
		const { email, password } = form.values
		try {
			await auth.signInWithEmailAndPassword(email, password)
			navigate('/')
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	// register with email and password
	const registerWithEmail = async () => {
		const { email, password, name } = form.values
		try {
			const result = await auth.createUserWithEmailAndPassword(email, password)
			// add to users collection
			if (result?.user) {
				const newUser = {
					phoneNumber: result?.user?.phoneNumber,
					photoURL: result?.user?.photoURL,
					displayName: name,
					email: result?.user?.email,
					createdAt: serverTimestamp(),
					emailVerifer: result?.user?.emailVerified,
					role: 'user'
				}
				let userDoc = firestore.doc(`users/${result?.user?.uid}`)
				const batch = firestore.batch()
				batch.set(userDoc, newUser)
				await batch.commit()
			}
			// redirect to /
			navigate('/')
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	return (
		<Paper mx={300} radius="md" p="xl" withBorder {...props}>
			<Text size="lg" weight={500}>
				Welcome to Todolist app, {type} with
			</Text>

			<Group grow mb="md" mt="md">
				<GoogleButton type="button" onClick={loginWithGoogle} fullWidth>
					Google
				</GoogleButton>
			</Group>

			<Divider label="Or continue with email" labelPosition="center" my="lg" />

			<form
				onSubmit={form.onSubmit(() => {
					if (type === 'login') {
						loginWithEmail()
					} else {
						registerWithEmail()
					}
				})}
			>
				<Stack>
					{type === 'register' && (
						<TextInput
							label="Name"
							placeholder="Your name"
							value={form.values.name}
							onChange={(event) =>
								form.setFieldValue('name', event.currentTarget.value)
							}
						/>
					)}

					<TextInput
						required
						label="Email"
						placeholder="hello@mantine.dev"
						value={form.values.email}
						onChange={(event) =>
							form.setFieldValue('email', event.currentTarget.value)
						}
						error={form.errors.email && 'Invalid email'}
					/>

					<PasswordInput
						required
						label="Password"
						placeholder="Your password"
						value={form.values.password}
						onChange={(event) =>
							form.setFieldValue('password', event.currentTarget.value)
						}
						error={
							form.errors.password &&
							'Password should include at least 6 characters'
						}
					/>

					{type === 'register' && (
						<Checkbox
							label="I accept terms and conditions"
							checked={form.values.terms}
							onChange={(event) =>
								form.setFieldValue('terms', event.currentTarget.checked)
							}
						/>
					)}
				</Stack>

				<Group position="apart" mt="xl">
					<Anchor
						component="button"
						type="button"
						color="dimmed"
						onClick={() => toggle()}
						size="xs"
					>
						{type === 'register'
							? 'Already have an account? Login'
							: "Don't have an account? Register"}
					</Anchor>
					<Button type="submit">{upperFirst(type)}</Button>
				</Group>
			</form>
		</Paper>
	)
}
