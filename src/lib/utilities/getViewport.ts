export type Viewport = 'base' | 'sm' | 'md' | 'lg' | 'xl';

export function getViewport(): Viewport {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	if (vw < 640 || vh < 640) {
		return 'base';
	} else if (vw < 960 || vh < 960) {
		return 'sm';
	} else if (vw < 1280 || vh < 1280) {
		return 'md';
	} else if (vw < 1600 || vh < 1600) {
		return 'lg';
	}
	return 'xl';
}
