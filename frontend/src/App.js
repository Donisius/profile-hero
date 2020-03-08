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
	HeaderName,
	HeaderNavigation,
	HeaderMenuItem
} from 'carbon-components-react';

import { Home } from './routes/home/index';
import { DashBoard } from './routes/dashboard/index';
import { css } from 'emotion';

const App = () => {
	const [personalityInsight, setPersonalityInsight] = useState(null);
	const [toneAnalysis, setToneAnalysis] = useState(null);
	const [selectedField, setSelectedField] = useState({ text: "Software Engineering", value: 'softwareEng' });

	return (
		<>
			<Router>
				<Header>
					<Link to='/' className={css`text-decoration-line: none`}>
						<HeaderName prefix=''>
							Profile Hero
						</HeaderName>
					</Link>
					<HeaderNavigation>
                		<HeaderMenuItem>
							<Link
								to='/dashboard'
								className={css`text-decoration: none; color: white`}>
								Dashboard
							</Link>
						</HeaderMenuItem>
    				</HeaderNavigation>
				</Header>
				<Switch>
					<Route path='/' exact>
						<Home
							setPersonalityInsight={setPersonalityInsight}
							setToneAnalysis={setToneAnalysis}
							selectedField={selectedField}
							setSelectedField={setSelectedField} />
					</Route>
					<Route path='/dashboard'>
						<div className={css`margin-top: 70px;`}>
							<DashBoard
								toneAnalysis={toneAnalysis}
								personalityInsight={personalityInsight}
								selectedField={selectedField} />
						</div>
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
