
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
	fs.appendFile(file, message, (err) => {
		if (err) throw err;
	})
};

module.exports = writeInFile;
