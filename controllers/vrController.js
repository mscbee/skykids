var vrController = {};
var Product = require('../model/product');
var Cart = require('../model/cart');


var vrCart;


vrController.sendOrder = function(req, res){
  //console.log("got here1");
    console.log(req.body.data);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var idAndQuantityArray = getIdListFromString(req.body.data);
    //console.log("got here");
    var promises = idAndQuantityArray.map(function(item) {
      return new Promise(function(resolve,reject) {

        var interalName = getNameFromVrId(item[0]);
        Product.findOne({productName: interalName}, function(err,product) {
              if (err) {
              reject(err)
              }
              //console.log(item);
              for(var quantityCount = 0; quantityCount < item[1]; quantityCount++){
                //console.log("in nested for loop");
                console.log(product);
                   cart.add(product, product.id);
                 }

                 resolve();

            });
      })
    });

    Promise.all(promises).then(function(){
      vrCart = cart;
      res.send("success");
    });


  }

var getIdListFromString = function(idString){
  var idsAndQuantitys = [];
  var splitRes = idString.split("&");
  splitRes.forEach(function(tag){
    var tagSplit = tag.split("=");
    idsAndQuantitys.push([tagSplit[0], tagSplit[1]]);
  });

  return idsAndQuantitys;
}

var getNameFromVrId = function(externalId){
  switch(parseInt(externalId)) {
    case 1:
        return "Blossom";
        break;
    case 2:
        return "Bubbles"
        break;
    case 3:
        return "Buttercup"
        break;
    case 4:
        return "Buzz Lightyear"
        break;
    case 5:
        return "Dora"
        break;
    case 6:
        return "Kion"
        break;
    case 7:
        return "Olaf"
        break;
    case 8:
        return "Paw Patrol"
        break;
    case 9:
        return "Peppa Pig"
        break;
    case 10:
        return "Po"
        break;
    case 11:
        return "Sofia"
        break;
    case 12:
        return "WALL-E"
        break;
    default:
        return ""
      }
}

var getVrCart = function(){
  return vrCart;
}


module.exports = {
  vrController : vrController,
  getVrCart : getVrCart
}
