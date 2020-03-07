import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import { Home } from './routes/home/index';
import { DashBoard } from './routes/dashboard/index';

function App() {
return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/dashboard'>
					<DashBoard />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
