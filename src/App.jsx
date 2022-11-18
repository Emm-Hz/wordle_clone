import { useEffect, useState } from 'react';
import { solutions } from '../data/db.json';
import './App.css';
import Wordle from './components/Wordle';

function App() {
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		const solution = solutions[Math.floor(Math.random() * solutions.length)];
		setSolution(solution.word);
	}, []);

	return (
		<div className="App">
			<h1>Wordle</h1>
			{solution && <Wordle solution={solution} />}
		</div>
	);
}

export default App;
