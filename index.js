
const writeInFile    = require('./js/stories');
const handleIntent   = require('./js/intent');
const handleCategory = require('./js/category');
const path           = require('path');

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
 			const intent = event.wit.entities.intent[0].value;
 			handleIntent(intent, sender, bp, pathStories);
 		} else if(event.wit.entities.categorie !== undefined) {
 			const category = event.wit.entities.categorie[0].value;
 			handleCategory(category, sender, bp, pathStories);
 		} else {
 			handleCategory('undefined', sender, bp, pathStories);
 		}

 	})
}
