export const withTimeout = (ms: number, cb?: () => void) => {
	return new Promise<void>((resolve, reject) => {
		setTimeout(() => {
			try {
				cb?.();
				resolve();
			} catch (err) {
				reject(err);
			}
		}, ms);
	});
};
