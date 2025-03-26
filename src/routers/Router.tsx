import { Route, Routes } from 'react-router'
import DashboardLayout from '../pages/dashboard/layout'
import CalendarPage from '../pages/dashboard/calendar/page'
import ErrorPage from '../components/error/ErrorPage'

export default function Router() {
	// TODO: change back to normal route

	return (
		<Routes >
			<Route errorElement={<ErrorPage />}>
				<Route element={<DashboardLayout />} >
					<Route index element={<CalendarPage />} />
				</Route>

				<Route path="*" element={<ErrorPage title="Page Not Found" />} />
			</Route>
		</Routes>
	)
}
