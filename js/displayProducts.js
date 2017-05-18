const displayProducts = (productsJSON) => {
    var tabProducts = [];

    productsJSON["products"].forEach(function (element) {
            tabProducts.push(element["designation"]);
    }, this);

    if (tabProducts.length === 1) {
        tabProducts.unshift("Voici le produit correspondant à votre recherche : ");
        return tabProducts;
    } else if (tabProducts.length > 1) {
        tabProducts.unshift("Voici les produits correspondants à votre recherche : ");
        return tabProducts;
    } else {
        return ["Oups là, il semble qu'il n'y ait aucun produit qui corresponde à votre recherche !"];
    }

};

module.exports = displayProducts;