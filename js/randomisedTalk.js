const randomInteger = require('./utils');

/*
 * randomPhrase(+kindOfMsg)
 *		return a string to send
 *
 * +kindOfMsg:        if it's either a aide msg, a greeting msg etc...
 *
 */

const greetings = ['Bonjour.', 'Salut !', 'Hey.', 'Bien le bonjour.'];
const aide = ['Pour recommencer la conversation, envoyez /restart. \nSinon, envoyez une phrase de la forme : \n"Je veux une table en pin d\'exterieur."'];
const thanks = ['De rien.', 'Ce fut un plaisir.', 'Ne le mentionnez pas. ;)'];


const randomPhrase = (kindOfMsg) => {

	switch (kindOfMsg) {
		case 'aide':
			return aide[0];
		case 'greetings':
			return greetings[randomInteger(greetings.length - 1)];
		case 'thanks':
			return thanks[randomInteger(thanks.length - 1)];
	}
};

module.exports = randomPhrase;