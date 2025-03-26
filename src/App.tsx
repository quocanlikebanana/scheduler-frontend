import { BrowserRouter } from "react-router";
import Router from "./routers/Router";
import { GlobalSpinnerProvider } from "./global/GlobalSpinner";

function App() {
	return (
		<>
			<GlobalSpinnerProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</GlobalSpinnerProvider>
		</>
	)
}

export default App;
