const displayProducts = (productsJSON) => {
    var tabProducts = [];

    productsJSON[0]["products"].forEach(function (element) {
        tabProducts.push(element["designation"])
    }, this);

    if (tabProducts.length === 1) {
        return "Voici le produit correspondant à votre recherche : " + tabProducts;
    } else {
        return "Voici les produits correspondants à votre recherche : " + tabProducts;
    }

};

module.exports = displayProducts;