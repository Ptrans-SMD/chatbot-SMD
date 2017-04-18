
const fs = require('fs');

/*
 * writeInFile(+file, +message)
 *		write message in the file 
 * 
 * +file    : string of the file location
 * +message : string of the message to write
 *
 */

const writeInFile = (message, file) => {
	console.log('message : ', message);
	console.log('file : ', file);
	fs.writeFile(message, file, (err) => {
		if (err) throw err;
		console.log('Message saved.');
	})

	fs.readFile(file, (err, data) => {
		if (err) throw err;
		console.log(data);
	});
};

module.exports = writeInFile;
