export class LengthInvalidError extends Error {
	constructor (text: string) {
		super(`Invalid length: ${text}`);
		this.name = 'LengthInvalidError';
	}
}
