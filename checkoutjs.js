<!-- Send data to Klaviyo. ->
<!-- use this to test: https://cad.eagle-eye.com/58079641800/orders/4055cf17d1b7fc92213c0d0fc303eb76 -->
<script type="text/javascript" async="" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UrduUr"></script>

<script type="text/javascript">

    // tossing around the idea of placing everything in on load
    document.addEventListener("DOMContentLoaded", function() {

        var _learnq = _learnq || [];

        {% for line_item in checkout.line_items %}

            const item = {
                "customer_properties": {
                    "$email": "{{ checkout.customer.email }}",
                    "$first_name": "{{ checkout.customer.first_name }}",
                    "$last_name": "{{ checkout.customer.last_name }}"
                },
                "properties": {
                    "$event_id": "{{ checkout.order_id }}-{{ line_item.product_id | json }}",
                    "$value": {{ line_item.price | money_without_currency | remove: "," | json }},
                    "OrderId": "{{ checkout.order_id }}",
                    "ProductID": "{{ line_item.product_id | json }}",
                    {% if line_item.sku != null  %}
                    "SKU": "{{ line_item.sku }}",
                    {% endif %}
                    "ProductName": {{ line_item.title | json }}: {{ line_item.variant.title | json }},
                    "Quantity": {{ line_item.quantity | json }}
                },
                "time": {{ 'now' | date: "%s"}}
            };
            
         

            {% if first_time_accessed %}

                {% if customer %}
                  // Identifying a person and tracking special Klaviyo properties.
                  console.log("hello person: " + '{{ customer.email }}' );
                
                  _learnq.push(['identify', {
                    '$email' : '{{ customer.email }}',
                    '$first_name' : '{{ customer.first_name }}',
                    '$last_name' : '{{ customer.last_name }}'
                  }]);
                {%  endif %}


                //console.log('Klaviyo event "Ordered Product" fired');
                //console.log( item );
                 _learnq.push(["track", "Ordered CAD Product", item ]);

            {% endif %}

        {% endfor %}
    }); 
</script>