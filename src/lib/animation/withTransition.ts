export const withTransition = (cb: () => void) => {
	if (!document.startViewTransition) {
		cb();
		return Promise.resolve();
	}
	const transition = document.startViewTransition(cb);
	return new Promise<void>((resolve) => {
		transition.ready.then(() => {
			document.documentElement.animate(null);
		});
		transition.finished.then(() => {
			resolve();
		});
	});
};
