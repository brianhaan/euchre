import type { Card } from './Card';

export type Trick = {
	id: number;
	cards: [Card | undefined, Card | undefined, Card | undefined, Card | undefined];
};
