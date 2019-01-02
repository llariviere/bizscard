/* 
* exchange, card offer functions...
*/

function card_offer(context,id) {
	
	$$("#"+context+" .thumb").show();
	$$('#'+context).css({ 'top': $$('#'+context).data('top') })
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

var cancelModal = '';

function card_offered(context,id) {
   cancelModal = myApp.modal({
   	title: 'Card offered...', 
   	text: 'Clic below to cancel', 
   	buttons: [
			{ text: "Cancel", onClick: function(){
				card_offer_cancel(id);
			} }
		]
	});
	//setTimeout(function () { myApp.closeModal(cancelModal); },30000)
   card_offer_complete(id);
   card_offer_completed(context);
}

function card_offer_cancel(id) {
	socket.emit('card offer cancel', {"cardid":id});
}

function card_offer_complete(id) {
	var p = geoLocation(function(p){
		console.log({"cardid":B.cards.mycard.id, "id":id ,"lat":p.latitude, "lng":p.longitude, "alt":p.altitude})
		socket.emit('card offer', {"cardid":B.cards.mycard.id, "id":id ,"lat":p.latitude, "lng":p.longitude, "alt":p.altitude});
	});
}

function card_offer_completed(context) {
	$$('#'+context+' .thumb').hide();
	$$('#'+context).animate( 
		{ 'top': $$('#'+context).data('top') }, 
		{ complete: function(){ $$(".no-thumb").show() } }
	);
} 


socket.on('cards list', function(data){
	
	myApp.closeModal();

	if (!data) return false; 
	
	$$("#pulser").hide();
 		
	if (data.length > 1) {
		var text = '<div class="list-block" id="cards_found"><table style="width:100%;">';
		var fnds = [];
 			
		var titre = (data.length > 1 ? "We found those offers<br>(clic a name to accept)" : "We found this offer<br>(clic to accept)");
 			
		$$.each(data, function(i,card){
			var fullname = (card.firstname && card.lastname ? card.firstname+' '+card.lastname : card.email);
			var linked = (card.accepted ? "fa-id-card-o" : (card.added ? "fa-id-card" : "fa-check-square-o"));
 				
			if (card.card!=B.cards.mycard.id) fnds.push('<tr style="border-bottom:solid 1px #bbb;" onClick="card_auth('+card.card+',\'offer auth\');myApp.closeModal()">\
<td align="left">'+fullname+'<span style="float:right">'+(30-card.delais)+'s</span></td>\
<td align="right"><i class="fa '+linked+'"></i></td>\
</tr>');
		});
 			
		text += fnds.join('<tr><td colspan="3"><hr></td></tr>') + '</table></div>';
 			
		myApp.modal({title: titre, text: text, buttons: [
			{ text: "Cancel", onClick: function(){}}
		]});
		
		var timers = [];		
		$$('#cards_found').find('span').each(function(i,e){
			var timer = $$(this);			
			timers[i] = setInterval(function() {
				var sec = parseInt(timer.text());
				sec--;
				timer.text(sec+'s')
			  // If the count down is finished, write some text 
			  if (sec < 0) {
			    clearInterval(timers[i]);
			    timer.parent().parent().remove();
			    if ($$('#cards_found').find('span').length<1) myApp.closeModal();
			  }
			}, 1000);
		});
	}

});
