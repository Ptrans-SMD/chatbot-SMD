/*
 * handleFeature(+features, +text)
 *      gets every features
 *
 * +intent:           the chart of features
 * +text:             the answer of the bot
 *
 */

const handleFeature = (features) => {
    var queryFeatures = [];
    for (i = 0; i < features.length; i++) {
        feature = features[i].value;
        queryFeatures.push(feature);
    }
    return queryFeatures;
};

module.exports = handleFeature;