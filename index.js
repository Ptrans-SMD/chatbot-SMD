
const writeInFile  = require('./js/stories');
const handleIntent = require('./js/intent');
const path         = require('path');

module.exports = function(bp) {

	/*
	 * middlewares : process incoming and outgoing messages
	 */
 	bp.middlewares.load()

 	console.log('current path', path.resolve('.'));

 	writeInFile(path.resolve(__dirname, './test.txt'), 'ceci est un test.');
 	writeInFile(path.resolve(__dirname, './test.txt'), 'allo allo.');

 	bp.hear({ type: 'message' }, (event, next) => {
 		const sender = event.user.id;
 		if(event.wit.entities.intent !== undefined) {
 			console.log('>> defined');
 			const intent = event.wit.entities.intent[0].value;
 			handleIntent(intent, sender, bp);
 		} else {
 			console.log('>> undefined');
 			handleIntent('undefined', sender, bp);
 		}
 	})
}
