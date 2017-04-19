
const writeInFile  = require('./js/stories');
const handleIntent = require('./js/intent');
const path         = require('path');

module.exports = function(bp) {

	/*
	 * middlewares : process incoming and outgoing messages
	 */
 	bp.middlewares.load()

 	bp.hear({ type: 'message' }, (event, next) => {
 		const pathName = './stories/' + event.user.first_name + '_' + event.user.last_name + '.txt';
 		const pathStories = path.resolve(__dirname, pathName);
 		const sender = event.user.id;
 		writeInFile(pathStories, event.user.first_name + ' - ' + event.text + '\n');
 		if(event.wit.entities.intent !== undefined) {
 			// console.log('>> defined');
 			const intent = event.wit.entities.intent[0].value;
 			handleIntent(intent, sender, bp, pathStories);
 		} else {
 			// console.log('>> undefined');
 			handleIntent('undefined', sender, bp, pathStories);
 		}
 	})
}
