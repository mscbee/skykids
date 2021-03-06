module.exports = function Cart(oldCart) {
    this.products = oldCart.products || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(product, id) {
        var storedProduct = this.products[id];
        if (!storedProduct) {
            storedProduct = this.products[id] = {product: product, qty: 0, price: 0};
        }
        storedProduct.qty++;
        storedProduct.price = storedProduct.product.productPrice * storedProduct.qty;
        this.totalQty++;
        this.totalPrice += storedProduct.product.productPrice;
    };

    this.reduceByOne = function(id) {
        this.products[id].qty--;
        this.products[id].price -= this.products[id].product.productPrice;
        this.totalQty--;
        this.totalPrice -= this.products[id].product.productPrice;

        if (this.products[id].qty <= 0) {
            delete this.products[id];
        }
    };

    // Not working properly, probably defualt to reducing by one
    this.updateByQty = function(id, qty){
      var difference = Math.abs(this.products[id].qty - qty);
      if(qty > this.products[id].qty){
        this.products[id].qty = qty;
        this.products[id].price += (this.products[id].product.productPrice * this.products[id].qty);
        this.totalQty += difference;
        this.totalPrice += this.products[id].product.productPrice * difference;
      }

      if(qty < this.products[id].qty){
        this.products[id].qty = qty;
        this.products[id].price -= (this.products[id].product.productPrice * this.products[id].qty);
        this.totalQty -= difference;
        this.totalPrice -= this.products[id].product.productPrice * difference;
      }

      if (this.products[id].qty <= 0) {
          delete this.products[id];
      }
    }

    this.removeItem = function(id) {
        this.totalQty -= parseInt(this.products[id].qty);
        this.totalPrice -= parseInt((this.products[id].product.productPrice * this.products[id].qty));
        delete this.products[id];
    };

    this.generateArray = function() {
        var arr = []; 
        for (var id in this.products) {
            arr.push(this.products[id]);
        }
        return arr;
    };
};
