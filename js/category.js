
const writeInFile  = require('./stories');

const handleCategory = (category, sender, bp, pathStories) => {
    var text;
    switch(category) {
        case 'headband':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'boîte à bijoux':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'pendentif':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'bague':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'collier':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'porte clefs':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'montre':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'bracelet':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'boucle d\'oreille':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'pochon':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'pochette':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'sautoir':
            console.log('>> bijoux');
            text = 'Vous recherchez un ' + category;
            break;
        case 'table':
            console.log('>> mobilier');
            text = 'Vous recherchez un ' + category;
            break;
        case 'accroche nacelle':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'support hamac':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'support nacelle':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'cacoon':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'hamac':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'nacelle':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'nid-hamac':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'accroche hamac':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'toile hamac':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        case 'chaise hamac':
            console.log('>> hamacs');
            text = 'Vous recherchez un ' + category;
            break;
        default: 
            console.log('>> not understood');
            text = 'Je n\'ai pas compris ce que vous avez essayé de dire.';
            break;
    }
    bp.messenger.sendText(sender, text);
    writeInFile(pathStories, 'Bot - ' + text + '\n');
};

module.exports = handleCategory;
