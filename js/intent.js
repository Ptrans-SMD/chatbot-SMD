
const writeInFile  = require('./stories');
const randomPhrase = require('./randomisedTalk');

/*
 * handleIntent(+intent, +sender, +bp)
 *      gets the right intent from Wit.ai
 *      answers accordingly
 *
 * +intent : the intent value received
 * +sender : the sender id
 * +bp     : used to send messages
 *
 */

const handleIntent = (intent, sender, bp, pathStories) => {
    var text;
    switch(intent) {
        case 'aide':
            console.log('>> help');
            text = randomPhrase(intent);
            break;
        case 'defineColor':
            console.log('>> define color');
            text = 'Vous cherchez à définir la couleur.';
            break;
        case 'greetings':
            console.log('>> greetings');
            text = randomPhrase(intent);
            break;
        case 'thanks':
            console.log('>> thanks');
            text = randomPhrase(intent);
            break;
        default: 
            console.log('>> not understood');
            text = 'Je n\'ai pas compris ce que vous avez essayé de dire.';
            break;
    }
    bp.messenger.sendText(sender, text);
    writeInFile(pathStories, 'Bot - ' + text + '\n');
};

module.exports = handleIntent;
