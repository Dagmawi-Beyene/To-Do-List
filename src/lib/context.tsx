import React, { createContext  } from 'react'
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const UserContext = createContext({
	user: null as any,	
})

export const ContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
	const [user] = useAuthState(auth as any);

	const contextValue = {
		user: user,
	}
	return (
		<UserContext.Provider value={contextValue}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext
