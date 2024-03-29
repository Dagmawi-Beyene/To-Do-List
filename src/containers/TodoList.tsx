import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Header from '../components/Header'
import TodoFilters from '../components/TodoFilters'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'
import * as itemsActions from '../store/actions/items'
import { ApplicationState, Item, VisibilityFilters } from '../types'
import TodoMessage from '../components/TodoMessage'
import { Button, Group } from '@mantine/core'
import { auth } from '../lib/firebase'

interface StateProps {
	items: Item[]
	filterState: string
}

interface DispatchProps {
	addItem(text: string): void
	toggleItem(id: number, complete: boolean): void
	toggleEditItem(id: number): void
	updateItem(id: number, text: string): void
	removeItem(id: number): void
	loadRequest(): void
}

type Props = StateProps & DispatchProps

const TodoList = ({
	items,
	addItem,
	toggleItem,
	toggleEditItem,
	updateItem,
	removeItem,
	filterState,
	loadRequest
}: Props) => {
	const navigate = useNavigate()
	useEffect(() => {
		loadRequest()
	}, [loadRequest])

	const getTaskCounter = () =>
		filterState === VisibilityFilters.SHOW_COMPLETED
			? {
					counter: items.filter((item) => item.complete).length,
					text: 'completed tasks'
			  }
			: {
					counter: items.filter((item) => !item.complete).length,
					text: 'tasks left'
			  }
	function signOut() {
		auth.signOut().then(() => {
			navigate('/auth')
		})
	}

	return (
		<>
			<div className="todo-list">
				<Header title="To-do List" />
				<Group my="md" position="center">
					<Button
						variant="gradient"
						gradient={{ from: 'indigo', to: 'cyan' }}
						onClick={signOut}
					>
						Sign out of your account
					</Button>
				</Group>
				<div className="content">
					<TodoForm emptyList={!items.length} addItem={addItem} />

					{items.length === 0 ? (
						<TodoMessage
							filterState={filterState}
							getTaskCounter={getTaskCounter}
						/>
					) : (
						<>
							<ul className="items">
								{items.map((item) => (
									<TodoItem
										key={item.id}
										item={item}
										toggleItem={toggleItem}
										toggleEditItem={toggleEditItem}
										updateItem={updateItem}
										removeItem={removeItem}
									/>
								))}
							</ul>

							<TodoFilters taskCounter={getTaskCounter()} />
						</>
					)}
				</div>
			</div>
		</>
	)
}

const filterItems = (items: Item[], filter: string) => {
	switch (filter) {
		case VisibilityFilters.SHOW_ACTIVE:
			return items.filter((item) => !item.complete)
		case VisibilityFilters.SHOW_COMPLETED:
			return items.filter((item) => item.complete)
		default:
			return items
	}
}

const mapStateToProps = (state: ApplicationState) => ({
	items: filterItems(state.items.data, state.filterState),
	filterState: state.filterState
})

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(itemsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
