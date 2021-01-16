jQuery('document').ready(function(){
  
  jQuery('.elementor-menu-cart__wrapper .elementor-menu-cart__product.woocommerce-cart-form__cart-item.cart_item').each(function(){
    jQuery('table.wc-block-cart-items tbody').append('<h3>'+jQuery(this).children('.wcfm_dashboard_item_title').text()+'</h3>');
  });
  
  
  //var product = jQuery('.elementor-menu-cart__wrapper .elementor-menu-cart__product.woocommerce-cart-form__cart-item.cart_item');
  
  //title = product.children('.elementor-menu-cart__product-name.product-name')
  
});
