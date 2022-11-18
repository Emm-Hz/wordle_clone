import { useState } from 'react';

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([...Array(6)]);
	const [history, setHistory] = useState([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({});
	const [error, setError] = useState(false);

	const formatGuess = () => {
		let solutionArray = [...solution];
		let formattedGuess = [...currentGuess].map((l) => {
			return { key: l, color: 'grey' };
		});

		//find any green letters
		formattedGuess.forEach((act, i) => {
			if (solutionArray[i] === act.key) {
				formattedGuess[i].color = 'green';
				solutionArray[i] = null;
			}
		});

		//find any yellow colors
		formattedGuess.forEach((act, i) => {
			if (solutionArray.includes(act.key) && act.color !== 'green') {
				formattedGuess[i].color = 'yellow';
				solutionArray[solutionArray.indexOf(act.key)] = null;
			}
		});

		return formattedGuess;
	};

	const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}

		setGuesses((prevGuess) => {
			let newGuesses = [...prevGuess];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		});

		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		});

		setTurn((prevTurn) => {
			return prevTurn + 1;
		});

		setUsedKeys((prevUsedKeys) => {
			formattedGuess.forEach((l) => {
				const currentColor = prevUsedKeys[l.key];

				if (l.color === 'green') {
					prevUsedKeys[l.key] = 'green';
					return;
				}

				if (l.color === 'yellow' && currentColor !== 'green') {
					prevUsedKeys[l.key] = 'yellow';
					return;
				}

				if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
					prevUsedKeys[l.key] = 'grey';
					return;
				}
			});

			return prevUsedKeys;
		});

		setCurrentGuess('');
	};

	const handleKeyup = ({ key }) => {
		if (key === 'Enter') {
			// only add if turn is less that 5
			if (turn > 6) {
				return;
			}
			//do no allow duplicate words
			if (history.includes(currentGuess)) {
				alert('You already try that word');
				setError(true);
				return;
			}

			// check word is 5 chars long
			if (currentGuess.length !== 5) {
				alert('Word most be 5 chars long');
				return;
			}

			const formatted = formatGuess();
			addNewGuess(formatted);
		}

		if (key === 'Backspace') {
			setError(false);
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
			return;
		}

		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + key;
				});
			}
		}
	};

	return {
		turn,
		currentGuess,
		guesses,
		isCorrect,
		usedKeys,
		error,
		handleKeyup,
	};
};

export default useWordle;
