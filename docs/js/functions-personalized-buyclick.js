jQuery('document').ready(function(){
	
	
	jQuery('.wc-block-components-order-summary-item .wc-block-components-order-summary-item__total-price').each(function(){
		var text = jQuery(this).text().replace('<span class="wcpdf-currency-symbol">','');
		text = text.replace('</span>','');
		
		jQuery(this).text() = text;
	});
	
	var visible_products = '.wp-block-woocommerce-cart.alignfull .wc-block-components-main tbody tr.wc-block-cart-items__row';
	var hidden_products = '.elementor-sticky__spacer .elementor-menu-cart__products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents .elementor-menu-cart__product.woocommerce-cart-form__cart-item.cart_item';
 
  jQuery(hidden_products).each(function(n){
	  var exist_store = false;
	  var hidden_product_each = jQuery(this);
	  var hidden_product_title = '.variation a.wcfm_dashboard_item_title';
	  var visible_products_tbody = '.wp-block-woocommerce-cart.alignfull table.wc-block-cart-items tbody';

	  if(jQuery('.store_block') != undefined){
		  jQuery('.store_block').each(function(n){
			  if(hidden_product_each.find(hidden_product_title).text() == jQuery(this).data('name')){
				  exist_store = true;
			  }
		  });
	  }
	  if(exist_store != true){
		  jQuery(visible_products_tbody).append('<div id="store_'+n+'" class="store_block" data-name="'+jQuery(this).find(hidden_product_title).text()+'"><h3 class="store_title">'+jQuery(this).find('.variation a.wcfm_dashboard_item_title').text()+'</h3></div>'); 
	  }
	
    	
  });
    jQuery(visible_products).each(function(){
		var store = '';
		var id_store = '';
		var visible_product_each = jQuery(this);
		var hidden_product_title = '.variation a.wcfm_dashboard_item_title';
	  var visible_products_tbody = '.wp-block-woocommerce-cart.alignfull table.wc-block-cart-items tbody'; 
		
		  jQuery(hidden_products).each(function(n){
			  var longtext = (jQuery(this).find('.elementor-menu-cart__product-name.product-name a').text()).replace(" ","");
				var smalltext = (jQuery(visible_product_each).find('.wc-block-components-product-name').text()).replace(" ","");
			  longtext = longtext.replace("-","");
			  smalltext = smalltext.replace("-","");
			  longtext = longtext.replace("–","");
			  smalltext = smalltext.replace("–","");
			  longtext = longtext.replace(" ","");
			  smalltext = smalltext.replace(" ","");
			  longtext = longtext.replace(" ","");
			 smalltext = smalltext.replace(" ","");
			 
			  if(longtext.includes(smalltext) == true){
				store =   jQuery(this).find(hidden_product_title).text();
				
			  }
		  });
		
		jQuery('.store_block').each(function(){
			if(store == jQuery(this).data("name")){
				id_store = jQuery(this).attr('id');
			}
		});
		
		jQuery(this).appendTo('#'+id_store);
		jQuery('.store_block').css('width',jQuery('.wp-block-woocommerce-cart.alignfull table.wc-block-cart-items tbody').width());
		jQuery( window ).resize(function() {
  jQuery('.store_block').css('width',jQuery('.wp-block-woocommerce-cart.alignfull table.wc-block-cart-items tbody').width());
		});
	});
	
	setInterval(paymentFields,1000);
	
	var pays_per_store = '.wc-block-components-shipping-rates-control__package.wc-blocks-components-panel';
	var pays_per_store_title = '.wc-block-components-title.wc-block-components-shipping-rates-control__package-title';

	var fields_exits = false;
	
	
	function paymentFields(){
		var store = '';
		var id_store = '';
		
		if(jQuery(pays_per_store).length && (jQuery('.wc-block-components-totals-shipping__fieldset').find(pays_per_store)).length){
			fields_exits = true;
			
		}
		
		if(fields_exits == true){
			
			jQuery(pays_per_store).each(function(){
				var pay_store = jQuery(this);
				jQuery('.store_block').each(function(){
					var longtext = pay_store.find(pays_per_store_title).text();
					var shortext = jQuery(this).data("name");
					
					if(longtext.includes(shortext) == true){
						id_store = jQuery(this).attr('id');
					}
				});
				jQuery('#'+id_store+'.store_block .wc-block-components-shipping-rates-control__package.wc-blocks-components-panel').detach();
				jQuery(this).appendTo('#'+id_store);
			});
			
			fields_exits = false;
		}
	}	
	
});
