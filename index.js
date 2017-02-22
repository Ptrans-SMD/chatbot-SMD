/*
 * Entry point of the botpress bot
 * Accepts bp which is the global botpress context object
 * 
 * @bp : contains the default botpress API
 *
 */

module.exports = function(bp) {

	/*
	 * middlewares : process incoming and outgoing messages
	 */
 	bp.middlewares.load()

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

	bp.hear(/id/i, (event, next) => {
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
	})
}