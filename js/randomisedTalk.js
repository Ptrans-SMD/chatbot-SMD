const randomInteger = require('./utils');

/*
 * randomPhrase(+kindOfMsg)
 *		return a string to send
 *
 * +kindOfMsg:        if it's either a aide msg, a greeting msg etc...
 *
 */

const greetings = [
	`Bonjour bonjour, ici Sébastien !`,
	`Bon, il semble que votre recherche n'ai rien donné, mais qu'à cela ne tienne, je suis là pour vous aider !`,
	`Pour ça, vous n'avez qu'à me dire ce que vous voulez, naturellement.`,
	`Par exemple vous pouvez me demander une phrase du genre "Je veux du thé bio au jasmin" et si tout se passe bien je trouverais votre bonheur !`,
	`Si vous voulez de nouveau des explications au cours de notre conversation, n'hésitez pas, et demandez moi simplement de l'aide !`
];
const aide = [
	`Vous avez besoin d'aide ? Sébastien à la rescousse !`,
	`Alors, pour rappel : Je suis là pour vous aider à reformuler votre demande.`,
	`En fait, dans l'idéal, il faudrait que vous me donniez un type de produit et des caractéristiques voulues.`,
	`Par exemple, envoyez moi une phrase de la forme :`,
	`"Je veux du thé bio au jasmin."`
];
const thanks = [
	['De rien.'],
	['Ce fut un plaisir.'],
	['Ne le mentionnez pas. ;)']
];


const randomPhrase = (kindOfMsg) => {

	switch (kindOfMsg) {
		case 'aide':
			return aide;
		case 'greetings':
			return greetings;
		case 'thanks':
			return thanks[randomInteger(thanks.length - 1)];
	}
};

module.exports = randomPhrase;