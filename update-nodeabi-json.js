const http = require('https');

const requestGet = async (url, {responseType='text/html'}={}) => {
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			// console.log(res);
			const {
				statusCode,
				headers
			} = res;
			const contentType = res.headers['content-type'];
			console.log('contentType', contentType);
			let error;
			if (statusCode !== 200) {
				error = new Error('Request Failed.\n' +
					`Status Code: ${statusCode}`);
			} else if (contentType !== responseType) {
				error = new Error('Invalid content-type.\n' +
					`Expected ${responseType} but received ${contentType}`);
			}
			if (error) {
				// console.error(error.message);
				throw error;
				res.resume();
				return;
			}
			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				try {
					if(responseType === 'application/json') {
						const parsedData = JSON.parse(rawData);
						resolve(parsedData);
					} else {
						resolve(rawData);
					}
				} catch (e) {
					throw e;
				}
			});
		})
		.on('error', (e) => {
			reject(e);
		});;
	});
};

(async () => {
	try {
		const urlOfABI = 'https://nodejs.org/en/download/releases/';
		const outputFilePath = './versions-list';
		/**/
		const data = await requestGet(urlOfABI);
		const startTag = '<tbody>';
		const endOfTag = '</tbody>';
		const outputData = data.substring(data.indexOf(startTag), data.lastIndexOf(endOfTag) + endOfTag.length);
		const fs = require('fs');
		const ws = fs.createWriteStream(outputFilePath);
		const lines = outputData.split('\n');
		for(let i = 0; i < lines.length; i++) {
			let line = lines[i];
			ws.write(line.trim());
		}
		ws.end();
		ws.on('close', () => {
			const parser = require('./abi-map-html-parser.js');
			parser.parse(function(err, abiVersionsMap) {
				console.log('Update nodeabi.json complete!');
			});
		});
	} catch(err) {
		console.log('Error: ', err);
	}
})();
