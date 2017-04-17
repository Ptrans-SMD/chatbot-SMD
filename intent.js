
/*
 * handleIntent(+intent, +sender)
 *    gets the right intent from Wit.ai
 *    answers accordingly
 *
 * +intent : the intent value received
 * +sender : the sender id
 */

const handleIntent = (intent, sender) => {
    switch(intent) {
        case 'aide':
            console.log('>> help');
            bp.messenger.sendText(sender, "Vous avez demandé de l'aide.");
            break;
        case 'couleur':
            console.log('>> couleur');
            bp.messenger.sendText(sender, "Vous parlez de couleur.");
            break;
        default: 
            console.log('>> incompris');
            bp.messenger.sendText(sender, "Je n'ai pas compris ce que vous avez essayé de dire.");
            break;
    }
};

module.exports = handleIntent;