import React from 'react'
import { useContext } from 'react'
import UserContext from '../../lib/context'
import AccessDenied from '../AccessDenied/AccessDenied'

// Component's children only shown to logged-in users
export default function AuthCheck(props: { children: any }) {
	const { user } = useContext(UserContext)
	console.log(user)

	return user ? props.children : <AccessDenied />
}
