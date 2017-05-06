const writeInFile = require('./js/stories');
const handleIntent = require('./js/intent');
const handleCategory = require('./js/category');
const handleFeature = require('./js/feature');
const sendQuery = require('./js/queryBuilder');
const path = require('path');

module.exports = function (bp) {

	/*
	 * middlewares : process incoming and outgoing messages
	 */
	bp.middlewares.load()

	bp.hear({
		type: 'message'
	}, (event, next) => {

		// Setup to write in stories
		const pathName = './stories/' + event.user.first_name + '_' + event.user.last_name + '.txt';
		const pathStories = path.resolve(__dirname, pathName);
		const sender = event.user.id;
		writeInFile(pathStories, event.user.first_name + ' - ' + event.text + '\n');

		// Where we write the text we'll be sending
		let text = '';

		// Where we save the category and the features of the product
		let queryCategory = [];
		let queryFeatures = [];

		// Handle intents messages
		if (event.wit.entities.intent !== undefined) {
			console.log(' >> nb intents : ', event.wit.entities.intent.length);
			const intents = event.wit.entities.intent;
			text = handleIntent(intents, text);
		}

		// Handle categories
		if (event.wit.entities.categorie !== undefined) {
			console.log(' >> nb categories : ', event.wit.entities.categorie.length);
			const categories = event.wit.entities.categorie;
			queryCategory = handleCategory(categories);
			text += " [Category] : " + queryCategory;
		}

		// Handle features
		if (event.wit.entities.feature !== undefined) {
			console.log(' >> nb features : ', event.wit.entities.feature.length);
			const features = event.wit.entities.feature;
			queryFeatures = handleFeature(features);
			text += " [Features] : " + queryFeatures;
		}

		// Handle if we got nothing
		if (text == '') {
			text += 'Je n\'ai pas compris ce que vous avez essayé de dire.';
		}
		// Send the query
		if (queryCategory !== undefined || queryFeatures !== undefined) {
			sendQuery(queryCategory, queryFeatures);
		}
		console.log("text : " + text);
		bp.messenger.sendText(sender, text);
		writeInFile(pathStories, 'Bot - ' + text + '\n');
	})
}