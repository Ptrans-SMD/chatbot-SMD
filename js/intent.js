
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

const handleIntent = (intents, text) => {
    // let text = '';
    for(i = 0; i < intents.length; i++) {
        intent = intents[i].value;
        switch(intent) {
            case 'aide':
                console.log('>> help');
                text += randomPhrase(intent);
                break;
            case 'greetings':
                console.log('>> greetings');
                text += randomPhrase(intent);
                break;
            case 'thanks':
                console.log('>> thanks');
                text += randomPhrase(intent);
                break;
            default: 
                console.log('>> not understood');
                text += 'Je n\'ai pas compris ce que vous avez essayé de dire.';
                break;
        }
        text += '\n';
    }
    return text;
};

module.exports = handleIntent;
