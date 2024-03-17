import { startOfMonth } from 'date-fns';
import { v4, v5, validate } from 'uuid';

async function hash(...args: string[]) {
	const encoder = new TextEncoder();
	const data = encoder.encode(args.join(''));
	const hashBuffer = await crypto.subtle.digest('SHA-512', data); // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
}

export async function secret() {
	return hash(process.env.APP_SECRET || process.env.DATABASE_URL);
}

export async function salt() {
	const ROTATING_SALT = await hash(startOfMonth(new Date()).toUTCString());

	return hash(await secret(), ROTATING_SALT);
}

export async function uuid(...args: any) {
	if (!args.length) return v4();

	return v5(hash(...args, await salt()), v5.DNS);
}

export function isUuid(value: string) {
	return validate(value);
}
