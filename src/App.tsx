import { BrowserRouter } from "react-router";
import Router from "./routers/Router";

function App() {
	return (
		<>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</>
	)
}

export default App;
