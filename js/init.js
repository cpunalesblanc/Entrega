//const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
//const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
//const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
//const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
//const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
//const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
//const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
//const EXT_TYPE = ".json";

//const CATEGORIES_URL = require('../api/cats/cat.json');
//const PUBLISH_PRODUCT_URL = require('../api/sell/publish.json');
//const PRODUCTS_URL = require('../api/cats_products');
//const PRODUCT_INFO_URL = require('../api/products');
//const PRODUCT_INFO_COMMENTS_URL = require('../api/products_comments');
//const CART_INFO_URL = require('../api/user_cart/25801.json');
//const CART_BUY_URL = require('../api/cart/buy.json');
//const EXT_TYPE = ".json";

const CATEGORIES_URL = '../api/cats/cat.json';
const PUBLISH_PRODUCT_URL = '../api/sell/publish.json';
const PRODUCTS_URL = '../api/cats_products';
const PRODUCT_INFO_URL = '../api/products';
const PRODUCT_INFO_COMMENTS_URL = '../api/products_comments';
const CART_INFO_URL = '../api/user_cart/25801.json';
const CART_BUY_URL = '../api/cart/buy.json';
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}