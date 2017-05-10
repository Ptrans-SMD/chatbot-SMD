const writeInFile = require('./js/stories');
const handleIntent = require('./js/intent');
const handleCategory = require('./js/category');
const handleFeature = require('./js/feature');
const sendQuery = require('./js/queryBuilder');
const displayProducts = require('./js/displayProducts');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const async = require('async');


module.exports = function (bp) {

	/*
	 * Informations de connection à la base de données.
	 * Les infos de connection sont dans le fichier .env qui est lui même dans le git ignore.
	 * Cela sert à éviter que les accès à la bdd se retrouvent sur github.
	 *
	 */

	const connection = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_ID,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	});

	connection.connect(function (err) {
		if (err) {
			console.error('error connecting : ' + err.stack);
			return;
		}
		console.log('>> connected to the database as id ' + connection.threadId);

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
			let text = [];

			// Where we save the category and the features of the product
			let queryCategory = [];
			let queryFeatures = [];

			// Products found by the query
			let products = '';

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
			}

			// Handle features
			if (event.wit.entities.feature !== undefined) {
				console.log(' >> nb features : ', event.wit.entities.feature.length);
				const features = event.wit.entities.feature;
				queryFeatures = handleFeature(features);
			}

			// Handle if we got nothing
			if (!Object.keys(event.wit.entities).length) {
				text.push('Je n\'ai pas compris ce que vous avez essayé de dire.');
			}

			// Send the query
			if (queryCategory.length > 0 && queryFeatures.length > 0) {
				Promise.all([sendQuery(connection, queryCategory, queryFeatures)])
					.then(() => new Promise((resolve, reject) => {
						fs.readFile(path.resolve(__dirname, './js/test.json'), (err, data) => {
							if (err) throw err;
							text = displayProducts(JSON.parse(data));
							console.log(">> file read");
							resolve();
						});
					}))
					.then(() => {
						console.log('>> answer to be sent : ' + text);
						async.eachSeries(text, function (element, callback) {
							bp.messenger.sendText(sender, element, {
								typing: true,
							});
							setTimeout(() => {
								callback()
							}, 1000);
						}, function (err) {
							if (err) {
								throw err;
							}
							console.log('>> answer sent');
						});
					});
			} else {
				console.log('>> answer to be sent : ' + text);
				async.eachSeries(text, function (element, callback) {
					bp.messenger.sendText(sender, element, {
						typing: true,
					});
					setTimeout(() => {
						callback()
					}, 1000);
				}, function (err) {
					if (err) {
						throw err;
					}
					console.log('>> answer sent');
				});
			}

			writeInFile(pathStories, 'Bot - ' + text + '\n');
		})

		if (process.platform === "win32") {
			var rl = require("readline").createInterface({
				input: process.stdin,
				output: process.stdout
			});

			rl.on("SIGINT", function () {
				console.log(">> SIGINT revceived: Terminating connection to the db");
				connection.end(function (err) {
					if (err) {
						console.log(err);
						process.exit();
					}

					console.log('>> The connection is terminated now');
					process.exit();
				});
			});
		}

		process.on("SIGINT", function () {
			console.log(">> SIGINT revceived: Terminating connection to the db");
			connection.end(function (err) {
				if (err) {
					console.log(err);
					process.exit();
				}

				console.log('>> The connection is terminated now');
				//graceful shutdown
				process.exit();
			});
		});
	});
}