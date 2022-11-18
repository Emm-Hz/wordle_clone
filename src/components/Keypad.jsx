import React, { useEffect, useState } from 'react';
import { letters } from '../../data/db.json';

const Keypad = ({ usedKeys }) => {
	const [lette, setLette] = useState(null);

	useEffect(() => {
		const letter = letters.map((a) => a);
		setLette(letter);
	}, []);

	return (
		<div className="keypad">
			{lette &&
				lette.map((l) => {
					const color = usedKeys[l.key];
					return (
						<div key={l.key} className={color}>
							{l.key}
						</div>
					);
				})}
		</div>
	);
};

export default Keypad;
