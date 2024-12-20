import type { Trick } from '$lib/types/Trick';

export class TrickState implements Trick {
	id = 0;
	cards = [undefined, undefined, undefined, undefined] as Trick['cards'];
}
