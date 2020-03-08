import React, { useState } from 'react';
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

const App = () => {
	const [personalityInsight, setPersonalityInsight] = useState(null);
	const [selectedField, setSelectedField] = useState({ text: "Software Engineering", value: 'softwareEng' });

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
						<Home
							setPersonalityInsight={setPersonalityInsight}
							selectedField={selectedField}
							setSelectedField={setSelectedField} />
					</Route>
					<Route path='/dashboard'>
						<DashBoard
							personalityInsight={personalityInsight}
							selectedField={selectedField} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
