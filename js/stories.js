
const fs = require('fs');

/*
 * writeInFile(+file, +message)
 *		write message in the file 
 * 
 * +file    : string of the file location
 * +message : string of the message to write
 *
 */

const writeInFile = (file, message) => {
	console.log('file : ', file);
	fs.appendFile(file, message, (err) => {
		if (err) throw err;
		console.log('The data was appended to the file.');
	})
};

module.exports = writeInFile;
