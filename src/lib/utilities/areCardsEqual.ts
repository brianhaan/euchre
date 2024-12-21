import type { Card } from '$lib/types/Card';

export const areCardsEqual = (card1?: Card, card2?: Card) =>
	card1?.suit === card2?.suit && card1?.value === card2?.value;
