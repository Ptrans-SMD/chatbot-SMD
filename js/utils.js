
/*
 * randomInteger(+max)
 *		return a random integer between 0 and the maximum given
 * 
 * +max : maximum value the user wants for the random
 *
 */

const randomInteger = (max) => {
	return (Math.floor(Math.random() * max) + 1);
}

module.exports = randomInteger;