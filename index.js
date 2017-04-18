
const writeInFile  = require('./js/stories');
const handleIntent = require('./js/intent');

module.exports = function(bp) {

	/*
	 * middlewares : process incoming and outgoing messages
	 */
 	bp.middlewares.load()

 	writeInFile('ceci est un test.', './test.txt');

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
