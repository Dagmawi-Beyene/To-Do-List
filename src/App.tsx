import React, { useContext } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import TodoList from './containers/TodoList'
import './styles.scss'
import UserContext, { ContextProvider } from './lib/context'
import AuthCheck from './components/AuthCheck'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthenticationForm } from './components/Authentication'

export default () => {
	const { user } = useContext(UserContext)
	return (
		<Provider store={store}>
			<ContextProvider>
				<Router>
					<Routes>
						<Route
							path="/"
							element={
								<AuthCheck>
									<TodoList />
								</AuthCheck>
							}
						/>
						<Route path="/auth" element={<AuthenticationForm />} />
					</Routes>
				</Router>
			</ContextProvider>
		</Provider>
	)
}
