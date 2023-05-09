<!-- Tracking Scripts - Send data to Klaviyo.  -->

<script type="text/javascript" async="" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UrduUr"></script>


<script type="text/javascript"> 
    
  document.addEventListener("DOMContentLoaded", function() {
    
    var _learnq = _learnq || [];


    {% if customer %}
      // Identifying a person   
      _learnq.push(['identify', {
        '$email' : '{{ customer.email }}',
        '$first_name' : '{{ customer.first_name }}',
        '$last_name' : '{{ customer.last_name }}'
      }]);
    {%  endif %}
    

    
    
    {% case template.name %}
    
    /**
    *
    * Product 
    *
    */
    {% when 'product' %}
        
      const item = { 
        "ProductName": "{{ product.title | remove: "'" | remove: '"' }}: {{ product.selected_or_first_available_variant.title | remove: "'" | remove: '"' }}", 
        "ProductID": "{{ product.id }}", 
        "SKU": {{ product.selected_or_first_available_variant.sku | json }}, 
        "URL": "{{product.url}}", 
        "Brand": "Eagle-Eye Tours", 
        "Price": '{{ product.price | money_without_currency | remove: ","}}'
      }; 
    
      _learnq.push(["track", "Viewed CAD Product", item]);
      //console.log( item );
      //console.log('Klaviyo event "Viewed Product" fired.' );
      
      let addToCartElement = document.querySelector('form button.btn-success');
      
      if( addToCartElement )
      {
      
        addToCartElement.addEventListener('click', function (e) {
          
          const item = { 
            "$value": '{{ product.price | money_without_currency | remove: ","}}',
            "AddedItemProductName": "{{ product.title | remove: "'" | remove: '"' }}: {{ product.selected_or_first_available_variant.title | remove: "'" | remove: '"' }}",
            "AddedItemProductID": "{{ product.id }}",
            "AddedItemSKU": {{ product.selected_or_first_available_variant.sku | json }},
            "AddedItemPrice": '{{ product.price | money_without_currency | remove: ","}}',
            "AddedItemQuantity": 1
        
          }; 

          _learnq.push(["track", "Added to CAD Cart", item]); 
          //console.log( item );
          //console.log('Klaviyo event "Added to Cart" fired.' );
        });

      }
    
    {% endcase %}
    
  
  
  
  });

</script>

