
/*
 * handleIntent(+intent, +sender, +bp)
 *    gets the right intent from Wit.ai
 *    answers accordingly
 *
 * +intent : the intent value received
 * +sender : the sender id
 * +bp     : user to send/receive messages
 */

const handleIntent = (intent, sender, bp) => {
    switch(intent) {
        case 'aide':
            console.log('>> help');
            bp.messenger.sendText(sender, "Vous avez demandé de l'aide.");
            break;
        case 'defineColor':
            console.log('>> couleur');
            bp.messenger.sendText(sender, "Vous cherchez à définir la couleur.");
            break;
        default: 
            console.log('>> incompris');
            bp.messenger.sendText(sender, "Je n'ai pas compris ce que vous avez essayé de dire.");
            break;
    }
};

module.exports = handleIntent;