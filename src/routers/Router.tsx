import { Route, Routes } from 'react-router'
import HomePage from '../pages/page'

export default function Router() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
		</Routes>
	)
}
