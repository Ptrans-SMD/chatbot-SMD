
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

/*
	bp.hear({'wit.entities.intent[0].value': 'aide'}, (event, next) => {
		console.log('----------------------------------\n');
		console.log('event wit : \n', event.wit);
		console.log('----------------------------------\n');
		console.log('event wit entity : \n', event.wit.entities);
		console.log('----------------------------------\n');
		console.log('event wit entity intent: \n', event.wit.entities.intent);
		console.log('----------------------------------\n');
		bp.messenger.sendText(event.user.id, "Vous avez demandé de l'aide.");
	})

	bp.hear({'wit.entities.intent[0].value': 'defineColor'}, (event, next) => {
		console.log('----------------------------------\n');
		console.log('event wit : \n', event.wit);
		console.log('----------------------------------\n');
		console.log('event wit entity : \n', event.wit.entities);
		console.log('----------------------------------\n');
		console.log('event wit entity intent: \n', event.wit.entities.intent);
		console.log('----------------------------------\n');
		bp.messenger.sendText(event.user.id, "Vous parlez de couleur.");
	})
	*/

/*console.log(event.wit.entities.intent[0].value);

 		console.log('----------------------------------\n');
		console.log('event wit : \n', event.wit);
		console.log('----------------------------------\n');
		console.log('event wit entity : \n', event.wit.entities);
		console.log('----------------------------------\n');
		console.log('event wit entity intent: \n', event.wit.entities.intent);
		console.log('----------------------------------\n');
 		console.log('WE ARE HERE.\n\n\n');*/

/*
 * Entry point of the botpress bot
 * Accepts bp which is the global botpress context object
 * 
 * @bp : contains the default botpress API
 *
 */

 	/*
 	const payload = {
    template_type: "button",
    text: "Have you seen our awesome website?",
    buttons: [
        {
            type: "web_url",
            url: "https://www.botpress.io",
            title: "Show Website"
        }
    ]
}

	bp.hear(/(\/id)/i, (event, next) => {
		bp.messenger.sendText(	event.user.id, 
								'Ton ID est : ' + event.user.id, 
								{typing: true});
	})

	bp.hear(/(\/help)|\/h/i, (event, next) => {
		bp.messenger.sendText(	event.user.id, 
								'Tu peux écrire "id" pour recevoir ton ID, ou "description" pour obtenir une description du bot.',
								{typing: true});
	})

	bp.hear(/(bonjour)|(hello)|(hi)|(salut)|(slt)|(hey)/i, (event, next) => {
		const first_name = event.user.first_name
		bp.messenger.sendText(	event.user.id, 
								'Bonjour ' + first_name + '.', 
								{typing: true});
	})

	bp.hear(/(keske)|(description)/i, (event, next) => {
		bp.messenger.sendText(	event.user.id, 
								'Je suis un bot conversationnel, créé dans le cadre du projet transversal de deux élèves.',
								{typing: true});
	})

	bp.hear(/test/i, (event, next) => {
		bp.messenger.sendTemplate(	event.user.id,
									payload
								);
	})*/

/*bp.hear({'wit.entities': value => value == undefined}, (event, next) => {
	console.log('>> incompris');
    bp.messenger.sendText(event.user.id, "Je n'ai pas compris ce que vous avez essayé de dire.");
})*/
