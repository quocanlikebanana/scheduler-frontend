import { Route, Routes } from 'react-router'
import DashboardLayout from '../pages/dashboard/layout'
import { paths } from './paths'
import HomePage from '../pages/home/page'
import CalendarPage from '../pages/dashboard/calendar/page'

export default function Router() {
	return (
		<Routes>
			{/* For quick nav */}
			<Route element={<DashboardLayout />}>
				<Route index element={<CalendarPage />} />
			</Route>



			<Route element={<DashboardLayout />}>
				<Route path={paths._dashboard.calendar} element={<CalendarPage />} />
			</Route>
			<Route path={paths.home} element={<HomePage />} />
		</Routes>
	)
}
