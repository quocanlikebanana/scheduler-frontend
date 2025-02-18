import { Route, Routes } from 'react-router'
import HomePage from '../pages/page'
import CalendarPage from '../pages/calendar/page'

export default function Router() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="calendar" element={<CalendarPage />} />
		</Routes>
	)
}
