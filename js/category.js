const handleCategory = (categories) => {
	var queryCategory = [];
	for (i = 0; i < categories.length; i++) {
		category = categories[i].value;

		// Test in case the bot isn't trained enough
		if (categories[i].entities !== undefined) {
			object = categories[i].entities[category][0].value;
			queryCategory.push(category, object);
		} else {
			queryCategory.push(category);
		}
	}
	return queryCategory;
};

module.exports = handleCategory;