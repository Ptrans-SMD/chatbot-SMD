
const writeInFile  = require('./stories');

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
            text = 'Vous avez demandé de l\'aide.';
            break;
        case 'defineColor':
            console.log('>> define color');
            text = 'Vous cherchez à définir la couleur.';
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
