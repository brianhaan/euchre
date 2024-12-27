export const transition = (cb: () => void, next?: () => void) => {
	if (!document.startViewTransition) {
		cb();
		next?.();
		return;
	}
	const transition = document.startViewTransition(cb);
	transition.ready.then(() => {
		document.documentElement.animate(null);
	});
	transition.finished.then(() => {
		next?.();
	});
};
