import { DECK } from '$lib/types/Deck';

// Fisher-Yates Shuffle algorithm
export const shuffle = () => {
	const deck = [...DECK];
	for (let i = deck.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
	}
	return deck;
};
