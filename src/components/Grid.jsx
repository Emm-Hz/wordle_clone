import React from 'react';
import Row from './Row';

const Grid = ({ guesses, currentGuess, turn, error }) => {
	return (
		<div>
			{guesses.map((g, i) => {
				if (turn === i) {
					return <Row key={i} currentGuess={currentGuess} error={error} />;
				}
				return <Row key={i} guess={g} />;
			})}
		</div>
	);
};

export default Grid;
