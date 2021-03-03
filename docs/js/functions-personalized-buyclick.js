jQuery('document').ready(function(){
	
	jQuery('.wc-block-components-main.wc-block-checkout__main .wc-block-checkout__actions').prepend('<div id="politics-box" class="form-group"><input type="checkbox" required name="politics" id="politics"><label for="politics">Aceptar las <a href="https://buyclick.es/politica-privacidad_aviso-legal/" target="_blank">Políticas de Privacidad</a> y los <a href="https://buyclick.es/terminos-condiciones/" target="_blank">Términos y condiciones</a> </label><br><small><strong>Importante: </strong>Al finalizar esta compra con el botón de Realizar Pedido, usted acepta las Políticas de Privacidad y lo Terminos y Condiciones.</small></div>');
	
	jQuery('.wc-block-components-main.wc-block-checkout__main .wc-block-checkout__actions .components-button.wc-block-components-button.wc-block-components-checkout-place-order-button').prop('disabled', true);
	
	jQuery('.wc-block-checkout__actions #politics').click(function(){
		if(jQuery(this).is(":checked") == true){
			jQuery('.wc-block-components-main.wc-block-checkout__main .wc-block-checkout__actions .components-button.wc-block-components-button.wc-block-components-checkout-place-order-button').prop('disabled', false);
		}else{
			jQuery('.wc-block-components-main.wc-block-checkout__main .wc-block-checkout__actions .components-button.wc-block-components-button.wc-block-components-checkout-place-order-button').prop('disabled', true);
		}
		
	});
	
	setTimeout(function(){
	jQuery('.wc-block-components-sidebar-layout.wc-block-cart').css('opacity','1');
	},2000);
	//1. Agrega Checkbox en el formulario de Registro:	
	jQuery('.woocommerce-form-register.register .woocommerce-privacy-policy-text').prepend('<input type="checkbox" required style="margin-top: 5px;">');
	//1. END
	
	//2. Agrega mensaje de se agregó al carrito:
	jQuery('.owp-cart-overlay').append('<div class="message_add_product"><h3>Se ha agregado un producto en el carrito</h3></div>');
	//2. END
	setInterval(checkError,100);
	var error_exits = false;
	function checkError(){
		if(error_exits == false){ 
		if(jQuery('.wp-block-woocommerce-cart .wc-block-error.wc-block-components-error').length > 0){
			jQuery('.wp-block-woocommerce-cart .wc-block-error.wc-block-components-error').css('display','none');
			 location.reload();
			error_exits = true;
		}
		}
	}
	 
	
	//3. Quita código incorrecto en el FINALIZAR COMPRA en los productos:
	setInterval(cleanSpan,1000);	
	
function cleanSpan(){
		jQuery('.wc-block-components-order-summary-item *').each(function(){
			if(jQuery(this).text().includes('<span') == true){
				var text = jQuery(this).text().replace('<span class="wcpdf-currency-symbol">','');
				text = text.replace('</span>','');
		
				jQuery(this).text() = text;
			}
	});	
}
	
	//3. END
	
//4. Organización del CARRITO: 
	
//4.1 Verifica cada 1 segundo si se organizó el carrito y si no lo manda a organizar:	
setInterval(organizateCarrito,1000);	
	
var organizate_exits = false;
	
function organizateCarrito(){
	if(organizate_exits == false){
		organization();
	}
	
	if(jQuery('.store_block').length > 0){
		organizate_exits = true;
	}
	
}
//4.1 END	

//4.2 Variables: 
var visible_products = '.wp-block-woocommerce-cart.alignfull .wc-block-components-main tbody tr.wc-block-cart-items__row';
var hidden_products = '.elementor-sticky__spacer .elementor-menu-cart__products.woocommerce-mini-cart.cart.woocommerce-cart-form__contents .elementor-menu-cart__product.woocommerce-cart-form__cart-item.cart_item';
//4.2 END

//4.3. Función que organiz el carrito: 
function organization(){
//4.3.1 Busca los nombres de las tiendas y Agrega los títulos en la tabla: 
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
		  jQuery(visible_products_tbody).append('<tr id="store_'+n+'" class="store_block" data-name="'+jQuery(this).find(hidden_product_title).text()+'"><div class="content"><h3 class="store_title">'+jQuery(this).find('.variation a.wcfm_dashboard_item_title').text()+'</h3></div></tr>'); 
	  }
  });
//4.3.1 END
	
//4.3.2 Compara los nombres de los productos para buscar en que tienda se clasifican y organizarlos:	
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
		
		jQuery(this).appendTo('#'+id_store+' .content');
		jQuery('.store_block').css('width','100%');
		/*jQuery( window ).resize(function() {
  jQuery('.store_block').css('width',jQuery('.wp-block-woocommerce-cart.alignfull table.wc-block-cart-items tbody').width());
		});*/
	});
//4.3.2 END
}
//4.3 END	

	
//5. Organización del Pago por envío: 
	
	//5.1  Establece variable que revisa cada minuto si existe el envío:
	setInterval(paymentFields,1000);
	//5.1 END
	
	// 5.2 Variables:
	var pays_per_store = '.wc-block-components-shipping-rates-control__package';
	var pays_per_store_title = '.wc-block-components-title.wc-block-components-shipping-rates-control__package-title';
	var fields_exits = false;
	//5.2 END
	
	//5.3 Función que cuando existen lo de los enviós los organiza por tienda:
	function paymentFields(){
		var store = '';
		var id_store = '';
		
		if(jQuery('.owp-cart-overlay').length){
			if(jQuery('.owp-cart-overlay').css('display') == 'block'){
				jQuery('.owp-cart-overlay .message_add_product').addClass('show_anim');
				setTimeout(function(){
					jQuery('.owp-cart-overlay .message_add_product').removeClass('show_anim');
					
				}, 7000)
				setTimeout(function(){
					jQuery('.owp-cart-overlay').css('display','none');
					
				}, 9000)
			}
		}
		
		if(jQuery(pays_per_store).length > 0 && (jQuery('.wc-block-components-totals-shipping__fieldset').find(pays_per_store)).length > 0){
			fields_exits = true;
			
		}
		
		if(fields_exits == true){
			if(jQuery(pays_per_store).length == 1){
				jQuery('#store_0.store_block .wc-block-components-shipping-rates-control__package').detach();
				jQuery(pays_per_store).appendTo('#store_0 .content');
				console.log(wcSettings);
			}
			else{
			jQuery(pays_per_store).each(function(){
				var pay_store = jQuery(this);
				jQuery('.store_block').each(function(){
					var longtext = pay_store.find(pays_per_store_title).text();
					var shortext = jQuery(this).data("name");
					
					if(longtext.includes(shortext) == true){
						id_store = jQuery(this).attr('id');
					}
				});
				jQuery('#'+id_store+'.store_block .wc-block-components-shipping-rates-control__package').detach();
				jQuery(this).appendTo('#'+id_store+' .content');
				
			});
			}
			fields_exits = false;
		}
	}
	//5.3 END
	
});
