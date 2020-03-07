import React from 'react';
import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import {
    Header,
    HeaderName
} from 'carbon-components-react';

import { Home } from './routes/home/index';
import { DashBoard } from './routes/dashboard/index';

function App() {
return (
		<>
			<Header>
				<HeaderName prefix=''>
					Profile Hero
				</HeaderName>
			</Header>
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
		</>
	);
}

export default App;
