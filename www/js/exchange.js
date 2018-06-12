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
	setTimeout(function () { myApp.closeModal(); },5000)
   card_offer_complete(id);
   card_offer_completed(context);
}

function card_offer_cancel() {
	socket.emit('card offer cancel', {"cardid":mycard.id});
}

function card_offer_complete(id) {
	var p = geoLocation();
	if (p) socket.emit('card offer', {"cardid":mycard.id, "id":id ,"lat":p.latitude, "lng":p.longitude, "alt":p.altitude});
}

function card_offer_completed(context) {
	$$('#'+context+' .thumb').hide();
	$$('#'+context).animate( 
		{ 'top': $$('#'+context).data('top') }, 
		{ complete: function(){ $$(".no-thumb").show() } }
	);
} 
