class queryProducts {
    constructor(products, query) {
        this.products = products;
        this.query = query;
    }

    categoryQuery = () => {
        this.products = this.query.categoryId
            ? this.products.filter(
                  (p) =>
                      p.category._id.toString() ===
                      this.query.categoryId.toString()
              )
            : this.products;

        return this;
    };

    priceQuery = () => {
        this.products = this.products.filter(
            (p) =>
                (p.price <= this.query.highPrice) &
                (p.price >= this.query.lowPrice)
        );
        return this;
    };

    sortPriceQuery = () => {
        if (this.query.sortPrice) {
            if (this.query.sortPrice === "low-to-high") {
                this.products = this.products.sort(function (a, b) {
                    return a.price - b.price;
                });
            } else {
                this.products = this.products.sort(function (a, b) {
                    return b.price - a.price;
                });
            }
        }
        return this;
    };

    skip = () => {
        const { currentPage } = this.query;

        const skip = parseInt(currentPage - 1) * this.query.parPage;

        let skipProduct = [];
        for (let i = skip; i < this.products.length; i++) {
            skipProduct.push(this.products[i]);
        }
        this.products = skipProduct;
        return this;
    };

    limit = () => {
        let temp = [];
        if (this.products.length > this.query.parPage) {
            for (let i = 0; i < this.query.parPage; i++) {
                temp.push(this.products[i]);
            }
        } else {
            temp = this.products;
        }
        this.products = temp;
        return this;
    };

    getProducts = () => {
        return this.products;
    };

    countProducts = () => {
        return this.products.length;
    };
}

module.exports = queryProducts;
