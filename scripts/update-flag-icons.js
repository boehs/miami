const fs = require('fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const iso = Object.entries(JSON.parse(fs.readFileSync('./public/iso-3166-2.json', 'utf-8')))
	.map(([k]) => k.toLowerCase())
	.filter(k => k.startsWith('us'));

async function main() {
	const files = fs.readdirSync('./public/images/flags').map(f => f.replace('.png', ''));
	for (const f of files) {
		if (f == 'us-states') return;
		// eslint-disable-next-line no-console
		console.log(f);
		let res = await fetch(`https://flagcdn.com/40x30/${f}.png`);
		const w = fs.createWriteStream(`./public/images/flags/${f}.png`);
		await finished(Readable.fromWeb(res.body).pipe(w));
	}
	for (const code of iso) {
		if (code == 'us-dc') return;
		// eslint-disable-next-line no-console
		console.log(code);
		let res = await fetch(`https://flagcdn.com/40x30/${code}.png`);
		const w = fs.createWriteStream(`./public/images/flags/us-states/${code}.png`);
		await finished(Readable.fromWeb(res.body).pipe(w));
	}
}
main();
