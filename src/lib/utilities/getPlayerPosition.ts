import type { Player } from '$lib/types/Player';

type Position = 'bottom' | 'left' | 'top' | 'right';

export const getPlayerPosition = (
	playerId: Player['id'],
	players: Player[],
	mainPlayer: Player['id']
): Position => {
	const mainPlayerIndex = players.findIndex((p) => p.id === mainPlayer);
	const playerByMain = [...players.slice(mainPlayerIndex), ...players.slice(0, mainPlayerIndex)];
	const index = playerByMain.findIndex((p) => p.id === playerId);
	return index === 0 ? 'bottom' : index === 1 ? 'left' : index === 2 ? 'top' : 'right';
};
