
const writeInFile  = require('./stories');
const sendQuery = require('./query');

const handleCategory = (category, sender, bp, pathStories) => {
    var text;
    switch(category) {
        case 'bijoux':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'hamacs':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        default: 
            console.log('>> not understood');
            text = 'Je n\'ai pas compris ce que vous avez essayé de dire.';
            break;
    }
    
    sendQuery(category);
    bp.messenger.sendText(sender, text);
    writeInFile(pathStories, 'Bot - ' + text + '\n');
};

module.exports = handleCategory;
