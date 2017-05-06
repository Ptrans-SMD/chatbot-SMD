const handleCategory = (categories, text) => {
	for (i = 0; i < categories.length; i++) {
		category = categories[i].value;

		// Test in case the bot isn't trained enough
		if (categories[i].entities !== undefined) {
			object = categories[i].entities[category][0].value;
			text += '[' + category + '] : ' + object;
		} else {
			text += '[' + category + ']';
		}
	}
	return text;
};

module.exports = handleCategory;