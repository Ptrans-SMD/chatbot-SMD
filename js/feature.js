/*
 * handleFeature(+features, +text)
 *      gets every features
 *
 * +intent:           the chart of features
 * +text:             the answer of the bot
 *
 */

const handleFeature = (features, text) => {
    text += ' [feature]';
    for (i = 0; i < features.length; i++) {
        feature = features[i].value;
        text += ' ' + feature;
    }
    return text;
};

module.exports = handleFeature;