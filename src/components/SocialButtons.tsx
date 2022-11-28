import { Button, ButtonProps } from '@mantine/core'
import React from 'react'
import GoogleIcon from './GoogleIcon'

export function GoogleButton(props: any) {
	return (
		<Button
			leftIcon={<GoogleIcon />}
			variant="default"
			color="gray"
			{...props}
		/>
	)
}
