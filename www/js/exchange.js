/* 
* exchange, card offer functions...
*/

function card_offer(context,id) {
	
	$$("#"+context+" .thumb").show();
	$$('#'+context).css({ 'top': $$('#mycard'+context).data('top') })
	$$('#'+context).animate(
	    { 'top': 10 },
	    {
	        duration: 500,
	        easing: 'swing',
	        begin: function (elements) {},
	        complete: function(){ card_offered(context,id); }
	    }
	);
}

function card_offered(context,id) {
   myApp.modal({
   	title: 'Card offered...', 
   	text: 'Clic below to cancel', 
   	buttons: [
			{ text: "Cancel", onClick: card_offer_cancel }
		]
	});
   card_offer_complete(id);
   card_offer_completed(context);
}

function card_offer_cancel() {
	socket.emit('card offer cancel', {"cardid":mycard.id});
}

function card_offer_complete(id) {
		
	if (!navigator.geolocation){
		myApp.alert("Geolocation is not supported by your device!<br>Please activate in the application parameters.");
		return false;
	}

	function success(o) {
		//socket.emit('card offer', {"cardid":mycard.id, "lat":o.lat, "lng":o.lng, "alt":o.alt}); // manual override for testing...
		var p = o.coords;
		socket.emit('card offer', {"cardid":mycard.id, "id":id ,"lat":p.latitude, "lng":p.longitude, "alt":p.altitude});
	};

	function error(err) {
		console.log(err);
		myApp.hidePreloader();
		myApp.alert("Impossible to determine your location: "+err);
	}
	
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};
	
	navigator.geolocation.getCurrentPosition(success, error, options);
	//success({lat:45.6105491,lng:-73.5094794,alt:0}); // manual override for testing...
}

function card_offer_completed(context) {
	$$('#'+context+' .thumb').hide();
	$$('#'+context).animate( 
		{ 'top': $$('#'+context).data('top') }, 
		{ complete: function(){ $$(".no-thumb").show() } }
	);
} 
