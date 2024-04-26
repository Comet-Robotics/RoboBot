const dotenv = require('dotenv');
import * as Discord from 'discord.js';
dotenv.config();

export interface Printer {
	name: string;
	ip: string;
	model: string;
	apikey: string;
	color: string;
	thumbnail: string;
	enabled: boolean;
	ssl: boolean;
	emoji: string;
	key?: string;
}

// Are you a contributor? Add your Discord ID to this array!
export const contributors: String[] = [
	'164134588275228674',
	'201049866967711744',
	'143179553529921536',
	'264617528217567233',
	'714700986601570335',
	'221081030562414593'
];

export const printers: Record<string, Printer> = {
	europa: {
		name: 'Europa', // [name].utd.ms, should be capitalized
		ip: 'europa.cometrobotics.org', // Tailscale address
		model: 'SV06', // Model of the printer, manufacturer should not be included unless necessary (ex. Prusa Mini+)
		apikey: process.env.EUROPA_API ?? '', // API key to use REST API
		color: '#31373d', // DEPRECATED! Hex code that matches emoji color on Discord
		thumbnail: 'https://cdn.simplyprint.io/i/printer_types/sovol/sv06_plus/product_photo_md.png?643d63a68bb38', // Transparent image of the printer (preferably 512x512 max)
		enabled: true, // Whether or not the printer should be accessible via BitBot
		ssl: false, // Whether or not the printer uses an SSL certificate
		emoji: '<:ender3max:1086129147367145542>' // A 3D printer emoji matching the model of the printer (used in farm status embed)
	},
	io: {
		name: 'Io',
		ip: 'io.cometrobotics.org',
		model: 'SV06',
		apikey: process.env.IO_API ?? '',
		color: '#e6e7e8',
		thumbnail: 'https://cdn.simplyprint.io/i/printer_types/sovol/sv06_plus/product_photo_md.png?643d63a68bb38',
		enabled: true,
		ssl: false,
		emoji: '<:ender3:908451113806729296>'
	},
	callisto: {
		name: 'Callisto',
		ip: 'callisto.cometrobotics.org',
		model: 'SV06 Plus',
		apikey: process.env.CALLISTO_API ?? '',
		color: '#fdcb58',
		thumbnail: 'https://cdn.simplyprint.io/i/printer_types/sovol/sv06_plus/product_photo_md.png?643d63a68bb38',
		enabled: true,
		ssl: false,
		emoji: '<:ender3:908451113806729296>'
	}
};

export const printerChoices: [name: string, value: string][] = Object.keys(
	printers
).map((key) => {
	return [printers[key].name, key];
});

export const printerSelectChoices: Discord.StringSelectMenuOptionBuilder[] =
	Object.keys(printers).map((key) => {
		return new Discord.StringSelectMenuOptionBuilder()
			.setLabel(printers[key].name)
			.setDescription(`${printers[key].model}`)
			.setEmoji(printers[key].emoji)
			.setValue(key);
	});

export const status = {
	detailsButtonId: 'details',
	cancelButtonId: 'cancel',
	printerSelectId: 'printerselect',
	showButtonText: 'View Details',
	hideButtonText: 'Hide Details',
	cancelButtonText: 'Cancel Print',
	refreshButtonText: 'Refresh'
};

export const officerRoleName = 'Officer';

export const technicianRoleId = '929562510779093022';

export const states: Map<string, string> = new Map([
	['operational', 'available'],
	['printing', 'busy'],
	['pausing', 'busy'],
	['paused', 'busy'],
	['cancelling', 'busy'],
	['error', 'offline'],
	['offline', 'offline'],
	['offline after error', 'offline'],
	['opening serial connection', 'available'],
	['maintenance', 'maintenance'],
	['under maintenance', 'maintenance']
]);
