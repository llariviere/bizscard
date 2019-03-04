/* Bizswiper specific /var/www/node/socket/bizswiper/app/js/bizswap.js */

 var myApp = new Framework7({
	precompileTemplates: true,
	template7Pages: true,
	allowDuplicateUrls:true,
	modalTitle: 'Bizswiper',
	modalButtonCancel: 'Cancel...',
	modalPreloaderTitle: 'One moment please...',
	scrollTopOnStatusbarClick: true,
	uniqueHistory: true,
	routerRemoveWithTimeout: true,
	swipeBackPage: false
});

var mySwiper = myApp.swiper('.swiper-container', {
   pagination:'.swiper-pagination',
   allowSlideNext: false
});

var $$ = Dom7;
// {width:100, height:100, type: 'square'}
var B = {
	about:'Bizswiper v0.4.3<br>2019-03',
	server:'https://bizswiper.com:3333/',
	croper:{},
	crop_opts:{"img":'img/b.png',"card":{ width: ($$("body").width() - 10), height: (($$("body").width() - 10) / 3.5 * 2), type: 'square' },"boundary":{ width: ($$("body").width() - 10), height: (($$("body").width() - 10) / 3.5 * 2)}},
	swiper:{},
	container:'',
	input_text:'',
	input_name:'',
	input_type:'',
	input_labl:'',
	card_side:'',
	options: {
		ocr_match: false,
		shake_level: 40
	},
	cards: {
		mycard: {},
		current: [],
		waiting: []
	},
	fields: {},
	cards_fields: {}
};



var templates_name = ["Standard","Classical","Centered"];

$$.each(cards_templates, function(i,e){
	var data = {
		firstname:"John",
		lastname:"Doe",
		title:"Job Title",
		company:"Company name",
		address:"123 street",
		city:"City",
		state_prov:"Region",
		zip_postal:"zip code",
		country:"Country",
		website:"www.some_domain",
		email:"john.doe@some_domain",
		cellphone:"555-555-1234",
		fax:"555-555-6789",
		template:i
	};
	
	var HTML = '<div class="card_template" id="'+i+'" data-name="'+templates_name[i]+'">\
	       <div class="content">';
	HTML += card_populate(0,data);
	HTML += '</div>\
	       <div class="points"><img src="img/badge_none.png" alt="points"></div>\
	       <div class="card_template_on"><i class="fa fa-check fa-4x"></i></div>\
	     </div>';
	
	$$(".popup-templates > .content-block").append(HTML);
});

var currentList = Template7.compile($$('#current-list').html());

var waitingList = Template7.compile($$('#waiting-list').html());

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

var mySearchbar = {};

$$(document).on("click", ".card-item", function(){
	
	var list 	= $$(this).parent().attr("id");
	var index 	= $$(this).index();
	
	B.container = '#card-form-list';
	
	B.card_side = '';
	
	card_form_open(list, index);
	
});

$$(document).on("click", ".initial-setup", card_initial_setup);

$$(document).on('form:success', 'form.ajax-submit', function (e) {
	
	myApp.alert("Recorded!");
	
	if ($$("form.ajax-submit input[name='id']").val()!=B.cards.mycard.id) return false;
	
	$$.each($$(this).find("input, select"), function(i,e){
		if (e.name) {
			B.cards.mycard[e.name] = e.value;
			window.localStorage.setItem('B', JSON.stringify(B));
		}
	})
	
	card_populate("mycard",B.cards.mycard);
	card_populate("thecard",B.cards.mycard);
	
});

$$(".index-open").on("click", function(){
	
	mainView.router.load({pageName: 'index'});
	
});

$$(".current-list-open").on("click", function(){
	var list = { current:[] };
	for(var i=0; i<B.cards.current.length; i++) {
		list.current[i] = {"id":B.cards.current[i].id};
		$$.each(B.cards_fields, function(ii,cf){
			if(cf.cid==B.cards.current[i].id) {
				switch(cf.fid) {
					case 35: list.current[i]['firstname']	=cf.v; break;
					case 38: list.current[i]['lastname']	=cf.v; break;
					case 29: list.current[i]['company']		=cf.v; break;
					case 26: list.current[i]['cellphone']	=cf.v.replace(/[^0-9]/g, ''); break;
				}
			}
		});	
	}
	
	var html = currentList(list);
	
	mainView.router.loadContent(html);
	
});

$$(".waiting-list-open").on("click", function(){
	var list = { waiting:[] };
	for(var i=0; i<B.cards.waiting.length; i++) {
		list.waiting[i] = {"id":B.cards.waiting[i].id};
		$$.each(B.cards_fields, function(ii,cf){
			if(cf.cid==B.cards.waiting[i].id) {
				switch(cf.fid) {
					case 35: list.waiting[i]['firstname']	=cf.v; break;
					case 38: list.waiting[i]['lastname']	=cf.v; break;
					case 29: list.waiting[i]['company']		=cf.v; break;
				}
			}
		});	
	}
	
	var html = waitingList(list);
	
	mainView.router.loadContent(html);
	
});


$$('.a-swipeout.delete').on('click', function () {
	console.log($$(this).data("id"))
});

$$('.a-swipeout').on('click', function () {
	console.log($$(this).data("id"))
	return false;
});

$$(".card-camera-open").on("click", function(){
	$$(".card-back-camera-open").show();
	$$("#card-entry").find("img").attr("src","");
	mainView.router.load({pageName: 'card-entry'});
	B.card_side = 'recto';
	$$("#add_card_list").html('');
	$$("#card_ocr_words").html('');
	camera_open(false);
});

$$(".card-back-camera-open").on("click", function(){
	B.card_side = 'verso';
	camera_open(false);
});

$$(".card-other-camera-open").on("click", function(){
	B.card_side = 'other';
	camera_open(false);
});

$$('.popup-crop').on('popup:open', function () {
	console.log('Crop Popup open');
	
	//var container_width = $$("#crop-box").width();	// 2"x3.5" ou 600px x 1050px
	//B.crop_opts.card = { width: ($$("#crop-box").width() - 10), height: (($$("#crop-box").width() - 10) / 3.5 * 2), type: 'square' }
	
	//B.crop_opts.img = 'img/b.png';
	
	var options =
	{
        url: B.crop_opts.img,
        enableOrientation: true,
        boundary: B.crop_opts.boundary
   }
   
	if ($$('#img_select').val()==44 || $$('#img_select').val()==45) {
		options['viewport'] = B.crop_opts.card;
	} 
	
	$$('#img_input').val(0);
	$$('#img_output').val(0);
	
   B.croper = new Croppie(document.getElementById('crop-box'), options);
   
});

$$('.popup-crop').on('popup:close', function () {
	console.log('Crop Popup close');
	
	B.croper.destroy();
});

$$('#img_input').on("change", function() {
	console.log('Crop input change');
	
	var found = false;
	var cid = $$(B.container).data("id");
	var fid = $$(this).val();
	for (var i=0; i<B.cards_fields.length; i++) {
		var f = B.cards_fields[i];
		if (f.cid==cid && f.fid==fid) {
			found = f;
			break;
		}
	}
	if (!found) { 
		myApp.alert("No image for that field yet"); 
	}
	else {
		B.croper.destroy();
		
		var options = { url:found.v, enableOrientation:true,
        boundary: B.crop_opts.boundary };
		
		if (fid == 44 || fid == 45) { options['viewport'] = B.crop_opts.card; }
		
		B.croper = new Croppie(document.getElementById('crop-box'), options);
	}
});

function croper_format(f) {
	if (f=='card') {
		if (B.croper.options.viewport.width > 100) return false;
		var options =
		{
			url: B.croper.data.url,
			viewport: B.crop_opts.card,
			enableOrientation: true,
			boundary: B.crop_opts.boundary
	   }
		B.croper.destroy();
	   B.croper = new Croppie(document.getElementById('crop-box'), options);
	} else {
		if (B.croper.options.viewport.width == 100) return false;
		var options =
		{
			url: B.croper.data.url,
			viewport: {width:100, height:100, type: 'square'},
			enableOrientation: true,
			boundary: B.crop_opts.boundary
	   }
		B.croper.destroy();
	   B.croper = new Croppie(document.getElementById('crop-box'), options);
	}
}

function croper_record() {
	var opts = { "type":"base64", "size":"viewport", "format":"png", "quality":1, "circle":false };
	B.croper.result(opts).then(function(dataUrl){
		var cid = $$(B.container).data("id");
		var own = B.cards.mycard.id;
		var fid = ($$('#img_output').val()==0 ? $$('#img_input').val() : $$('#img_output').val())
		
		for(var i=0; i<B.cards_fields.length; i++) {
			if (cid==B.cards_fields[i].cid && fid==B.cards_fields[i].fid) { 
				B.cards_fields[i].v = dataUrl;
				break;
			}
		}
		
		if (cid==own) {
			$$("#mycard").find("div.img").css({"background-image":"url("+dataUrl+")"});
			
		} else {
			if (fid==50) $$("#thecard").find("div.img").css({"background-image":"url("+dataUrl+")"});
			
			if (fid==52) {
				 $$("#card-form").find("div.card-info-pastille").css({"background-image":"url("+dataUrl+")"});
				 $$("#card-form").find("div.card-info-pastille").text('');
			}
		}
		
		var pars = { 
			"id":cid,
			"owner":own
		};
		pars[fid] = dataUrl;
		socket.emit('card record', pars);
	}); 
}

$$(".my-card-open").on("click", function(){
	B.container='#card-form-list';
	card_form_open("mycard", false);
});

$$(document).on("click", ".radio_btn", function () {
	$$(this).parent().find(".button").removeClass("active");
	$$(this).addClass("active");
	$$(this).parent().find("input").val($$(this).data("id"))
});

$$(document).on("click", "li.reputation i.fa", function () {
	if ($$(this).hasClass('own')) return false;
	card_form_star($$(this).data("star"));
});

$$(document).on("click", "#card-form-edit", function () {
	$$(this).toggleClass('fa-edit').toggleClass('fa-times-circle');
	$$("#card-form > div > div.current").toggleClass("hidden");
	$$("#card-form > div > div.edit").toggleClass("hidden");
});

$$(".log-off").on("click", function(){
	myApp.formDeleteData('login_form');
	//welcomescreen.open();
	myApp.loginScreen();
});

$$(".card_template").on("click", function() {
	$$(".card_template").removeClass("on");
	//welcomescreen.open();
	myApp.loginScreen(".login-screen.modal-in");
	$$(this).addClass("on");
	$$("#template_text").text($$(this).data("name"));
	$$("#template").val($$(this).attr("id"));
});

function card_about() {
	console.log('card_about()');
	myApp.alert(B.about);
}

function card_payfor() {
	var title = 'Credit or debit card';
	var aftertext = '<div>\
						<div class="">\
						  <input type="text" class="cc-input cc-card" maxlength="19" id="cc-card" value="" placeholder="1111 1111 1111 1111"/>\
						</div>\
						<div class="row">\
						  <div class="col-50">\
						    <input type="number" class="cc-input cc-date" maxlength="2" id="cc-exp-month" value="" placeholder="MM"/>\
						    <input type="number" class="cc-input cc-date" maxlength="2" id="cc-exp-year" value="" placeholder="YY"/>\
						  </div>\
						  <div class="col-50" onClick="card_sms_test_code();">\
						    <input type="number" class="cc-input cc-cvv" maxlength="3" id="cc-cvv" value="" placeholder="CVV"/>\
						  </div>\
						</div>\
					</div>';
	
	
	var myModal= myApp.modal({
  		title:title,
  		afterText:aftertext,
  		buttons: [
  			{
  				text:'Cancel'
  			},
  			{
  				text:'Pay $20CAD',
  				onClick: function () {
  					if ($$(".cc-input.not").length>0) {
  						$$(".cc-input.not").css({"background-color":"#f99","color":"#fff"})
  						return false;
  					}
  					var pars = {
  						"ccnum":$$("#cc-card").val(),
  						"ccexp":$$("#cc-exp-month").val()+$$("#cc-exp-year").val(),
  						"cccvv":$$("#cc-cvv").val(),
  						"cardid":$$(B.container).data("id"),
  						"fromid":B.cards.mycard.id
  					};
  					socket.emit('card cc charge', pars);
  				}
  			}
  		]
   },
   function(){
   	// bouton cancel...
   });

	$$("#cc-card").on("keyup", function(){
		var cc = $$(this).val().replace(/[^\d]/g, '');
		var ccarr = [] 
		ccarr[0] = cc.substr(0,4);
		ccarr[1] = cc.substr(4,4);
		ccarr[2] = cc.substr(8,4);
		ccarr[3] = cc.substr(12,4);
		$$(this).val(ccarr.join(' ').trim());
	}).on("change", function(){
		var cc = $$(this).val().replace(/[^\d]/g, '');
		if (cc.length<16) { $$(this).addClass('not'); }
	});
	
	$$("#cc-exp-month").on("change", function(){
		$$(this).removeClass('not');
		var mo = parseInt($$(this).val().replace(/[^\d]/g, ''));
		if (mo>12) { $$(this).addClass('not'); }
		if (mo<10) { mo = '0'+mo; }
		$$(this).val(mo)
	});
	$$("#cc-exp-year").on("change", function(){
		$$(this).removeClass('not');
		var yy = parseInt($$(this).val().replace(/[^\d]/g, ''));
		if (yy<19) { $$(this).addClass('not'); }
		$$(this).val(yy)
	});
	$$("#cc-cvv").on("change", function(){
		$$(this).removeClass('not');
		var cvv = parseInt($$(this).val().replace(/[^\d]/g, ''));
		if (cvv.length<3) { $$(this).addClass('not'); }
		$$(this).val(cvv)
	});
   
}

function card_initial_setup() {
	mainView.router.load({pageName: 'initial-setup'});
	B.swiper = $$('.swiper-container-setup')[0].swiper;
	B.swiper.slideTo(0);
	
	// Initializing the fields for different actions...
	$$("#setup-1").find("input").on("keyup", function(){
		var fullname = $$("#setup-1").find("input[name='35']").val() + $$("#setup-1").find("input[name='38']").val();
		if (fullname.length>4) {
			$$("#setup-1").find(".card-info-button").removeClass("hidden");
		} else {
			$$("#setup-1").find(".card-info-button").addClass("hidden");
		}
	});
	$$("#setup-2").find("input").on("keyup", function(){
		var Tel = /(^\d{10,12}$)/;
		var cell = $$("#setup-2").find("input[name='26']").val().replace(/[^0-9]/g,'') 
		if (cell.match(Tel)) {
			$$("#setup-2").find(".reveal").removeClass("hidden");
		} else {
			$$("#setup-2").find(".reveal").addClass("hidden");
		}
	});
	$$("#setup-3").find("input.catg").on("click, focus", function() {
		B.container = '#setup-3';
		category_open($$(B.container).find("input.catg").val(), 'catg');
	});
	$$("#setup-3").find("input.func").on("click, focus", function() {
		B.container = '#setup-3';
		category_open($$(B.container).find("input.func").val(), 'func');
	});
	$$("#setup-3").find(".card-info-button").on("click", function() {
		var pars = {
			id:B.cards.mycard.id,
			owner:B.cards.mycard.id,
			33:B.cards.mycard.email
		};
		$$("#setup_page").find("input").each(function(i,f){
			pars[$$(this).attr("name")] = $$(this).val();
			//B.cards_fields.push({cid:pars.id, fid:$$(this).attr("name"), own:pars.id, v:$$(this).val()});
		});
		socket.emit('card record', pars);
			
		card_populate('mycard',pars)
		
		mainView.router.load({pageName: 'index'});
	});
}

function card_share(list, by) {
	var id = (list=='mycard' ? B.cards.mycard.id : $$(B.container).data("id"));
	var title = '';
	var aftertext = '<input type="text" value="">';
	
	switch(by) {
		case 'email':title='Email sharing';aftertext = 'Enter the email address:'+aftertext; break;
		case 'texto': title='SMS sharing'; aftertext = 'Enter the cellphone number:'+aftertext; break;
		case 'qrcode': socket.emit('card qr', {"cardid":id}); return false; break;
		case 'direct': 
			title='Direct sharing'; 
			var recipients = '<select><option value="">-- choose --</option>';
			$$.each(B.cards.current, function(i,card) {
				if (!card.payed_date) return true;
				var cid = card.id;
				var rec = {"35":'', "38":''};
				$$.each(B.cards_fields, function (ii,cf) {
					if(cf.cid>cid) return false;
					if(cf.cid==cid && (cf.fid=='35' || cf.fid=='38')) { rec[cf.fid.toString()]=cf.v; }
				});
				recipients += '<option value="'+card.id+'">'+rec['35']+' '+rec['38']+'</option>';
			});
			recipients += '</option>'
			aftertext = 'Choose the recipient and write a short message:'+recipients+aftertext; 
			break;
		default: return false;
	}
	
  	var myModal= myApp.modal({
  		title:title,
  		afterText:aftertext,
  		buttons: [
  			{
  				text:'Cancel'
  			},
  			{
  				text:'Send',
  				onClick: function () {
  					var value = $$(myModal).find('input').val().trim();
  					switch(by) {
  						case 'email':
  							var email = value;
  							var Email = /\w+@\w+/;
  							if (value.match(Email)) {
  								socket.emit('card share email', {"from":B.cards.mycard.id,"cardid":id,"email":email});
  							} else {
  								myApp.alert("The address is not valid. Send aborted");
  							}
  							break;
  						case 'texto':
  							var cell = value.replace(/[^0-9]/g,'');
  							var Tel = /(^\d{10,12}$)/;
  							if (value.match(Tel)) {
  								socket.emit('card share sms', {"from":B.cards.mycard.id,"cardid":id,"cell":cell});
  							} else {
  								myApp.alert("The number is not valid. Send aborted");
  							}
  							break;
  						case 'direct':
  							var dest = $$(myModal).find('select').val();
  							if (dest) {
  								socket.emit('card share direct', {"from":B.cards.mycard.id,"cardid":id,"dest":dest,"mesg":value});
  							} else {
  								myApp.alert("No recipient chosen. Send aborted");
  							}
  							break;
  					};
  				}
  			}
  		]
   },
   function(){
   	// bouton cancel...
   });
   
}

function card_sms_validate() {
	console.log('card_sms_validate()');
	
	var cell = $$("#setup-2").find("input[name='26']").val().replace(/[^0-9]/g,'');
	var Tel = /(^\d{10,12}$)/;
	if (cell.match(Tel)) {
		var data = {"cell":cell,"email":B.cards.mycard.email};
		socket.emit('send validate sms', data);
		
		myApp.modal({
			title: 'Cellphone validation', 
			text: '<div id="validation_modal_text"><b><span id="sms_test_msg">Please enter de validation-code from the SMS</span></b> \
						<div class="row"> \
						  <div class="col-50"> \
						    <input type="number" id="sms_test_code" value="" placeholder="999999" style="padding:3px;"/> \
						  </div> \
						  <div class="col-50" onClick="card_sms_test_code();"> \
						    <a href="#" class="button color-blue" style="margin:10px 0;">Submit</a> \
						  </div> \
						</div>', 
			buttons: [
				{ text: "Close" }
			]
		});
	
	} else {
		myApp.alert("This entry doesn't match a cellphone number.\nPlease correct and retry.");
	}
	
}

function card_sms_test_code() {
	console.log('card_sms_test_code()');
	
	var sms_test_code = $$("#sms_test_code").val();
	var Sms = /(^\d{6}$)/;
	
	if (sms_test_code.match(Sms)) {
		var cell = $$("#setup-2").find("input[name='26']").val().replace(/[^0-9]/g,'');
		var data = {"cell":cell,"email":B.cards.mycard.email,"code":sms_test_code};
		socket.emit('send sms test code', data);
	} else {
		$$("#sms_test_msg").text("The code should have 6 digit.<br>Please correct and retry.");
	}
}

function card_form_star(star) {
	console.log('card_form_star('+star+')');
	
	star = parseFloat(star*1);
	$$('li.reputation').find('input').val(star);
	$$.each($$('li.reputation').find('i.fa'), function(i,e){
		$$(e).removeClass("fa-star").removeClass("fa-star-o").removeClass("fa-star-half-o");
		var cls = ((i+0.5)==star?"-half-o":((i+1)>star?"-o":""));
		$$(e).addClass("fa-star"+cls);
	});
}

function card_form_open(list, index) {
	console.log('card_form_open('+list+', '+index+')');
	
	var card = (list=='mycard' ? B.cards[list] : B.cards[list][index]);	
	var cardid = (list=='mycard' ? B.cards.mycard.id : card.id);
	$$(B.container).data("id",cardid);
	
	mainView.router.load({pageName: 'card-form'});
	
	if (list=='mycard') {
		$$("#card-form > div > div").hide();
		$$("#card-form > div > div.edit, #card-form > div > div.parameters").show()
		$$("#card-form > div > div.edit, #card-form > div > div.parameters").removeClass("hidden");
		$$("#card-form-edit").hide();
		var pre_ph = 'your ';
	} else if (list=='waiting') {
		$$("#card-form > div > div").hide();
		$$("#card-form > div > div.waiting").show()
		$$("#card-form > div > div.waiting").removeClass("hidden");
		$$("#card-form-edit").hide();
		var pre_ph = 'the ';
	} else {
		$$("#card-form > div > div").hide()
		$$("#card-form > div > div.current").show	();
		$$("#card-form > div > div.edit").show()
		$$("#card-form > div > div.edit").addClass("hidden");
		$$("#card-form > div > div.current").removeClass("hidden");
		$$("#card-form-edit").addClass('fa-edit')
		$$("#card-form-edit").removeClass('fa-times-circle');
		$$("#card-form-edit").show();
		if (!B.cards.current[index].payed_date) {
			$$("#card-form > div > div.payfor").removeClass("hidden");
			$$("#card-form > div > div.payfor").show();
		}
		var pre_ph = 'the ';
	}
	
	
	var locked_base = (card.payed_date && B.cards.mycard.id!=card.id);
	$$(B.container).html(base_tpl.replace(/{{lock}}/g, (locked_base ? 'lock' : 'unlock')).replace(/{{class}}/g, (locked_base ? 'lock' : '')));
	
	// on batit la matrice de cles-valeurs de la carte... 
	for (var i=0; i<B.cards_fields.length; i++) {
		if (B.cards_fields[i].cid >cardid) break;
		if (B.cards_fields[i].cid==cardid) card[B.cards_fields[i].fid] = B.cards_fields[i];
	}
	
	var input_li = input_tpl;
	
	for (var i=0; i<B.fields.length; i++) {
		var f = B.fields[i];
		if (f.format=='pars' && list=='mycard') {
			if (f.id==10) {
				$$("#card-parameter input[name='"+f.id+"']").val((card[f.id] ? card[f.id].v : 40));
			} 
			if (f.id==11) {
				$$("#card-parameter input[name='"+f.id+"']").prop("checked",(card[f.id] ? true : false));
			}
			
		} else if (f.format=='img') {
			// Skip all image field...
		} else if (f.base) {
			$$(B.container+" input[name='"+f.id+"']").val((card[f.id] ? card[f.id].v : ''));
		} else if(card[f.id]) {
			var input = input_li.replace(/{{name}}/, f.id).replace(/{{value}}/, card[f.id].v).replace(/{{class}}/, f.format).replace(/{{label}}/, f['en']).replace(/{{placeholder}}/, pre_ph+f['en']);
			var li = li_tpl.replace(/{{data-id}}/g, i).replace(/{{data-i}}/, f.id).replace(/{{label}}/, f['en']);
			li = li.replace(/{{input}}/, input).replace(/{{lock}}/, (card[f.id].own==B.cards.mycard.id ? 'unlock' : 'lock'));
	      $$(B.container).append(li);
		}
	}
	
	card_init();
	
	card_populate('thecard',card);
	
	if (cardid != B.cards.mycard.id) {
		
		var h = $$('#thecard').width() / 3.5 * 2.0;
		var t = $$('#thecard').offset().top;
		$$('#thecard').data("top", t);
		$$('#thecard').css({"height": h, "bottom":t+h});
		
		var draggie2 = new Draggabilly( '#thecard', { axis:"y" });
		draggie2.on( 'dragEnd', function( event, pointer ) {
			if (this.position.y < (t-h)) {
				card_offered('thecard',cardid);
			} else {
				card_offer_completed('thecard');
			}
		});
		draggie2.on( 'staticClick', function(){ card_offer('thecard',cardid); });
	
	}
	
}

function storageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}


function template_open(no) {
	console.log('template_open('+no+')');
	$$(".card_template").eq(no).addClass("on")
	myApp.popup(".popup-templates");
}

function category_open(code_name,cls) {
	console.log('category_open('+code_name+','+cls+')');
	
	if (code_name) {
		var cname = code_name.split(": ");
		var code = cname[0];
	} else {
		var code = '';
	}
	var li_tpl = '<li data-groups="{{groups}}"> \
      <label class="label-radio item-content"> \
        <input type="radio" name="{{level}}" value="{{value}}" {{checked}} > \
        <div class="item-inner"> \
          <div class="item-title">{{name}}</div> \
        </div> \
      </label> \
    </li>';
   $$(".accordion-item").hide();
   $$("#popup-category-ok").hide();
    
	if (cls=='catg') {
		
		B["category_code_name"] = "";
		var codes = categories.groups, html = '';
		for (var i=0; i<codes.length; i++) {
			html += li_tpl.replace(/{{level}}/, 'groups').replace(/{{value}}/, codes[i].code).replace(/{{name}}/, codes[i].en);
		}
		$$("#groups").html(html);
		
		var codes = categories.industries, html1 = '', html2 = '';
		for (var i=0; i<codes.length; i++) {
			if (code==codes[i].code) {
				html1 += li_tpl.replace(/{{level}}/,'industries').replace(/{{value}}/, codes[i].code).replace(/{{name}}/, codes[i].en).replace(/{{groups}}/, codes[i].groups).replace(/{{checked}}/, 'checked="checked"');
			} else {
				html2 += li_tpl.replace(/{{level}}/,'industries').replace(/{{value}}/, codes[i].code).replace(/{{name}}/, codes[i].en).replace(/{{groups}}/, codes[i].groups);
			}
			
		}
		$$("#industries").html(html1+html2);
		$$(".category-level1,.category-level2").show()
		
		$$("#groups li").on("click", function(){
			var group = $$(this).find("input").val();
			$$("#industries li").hide();
			$$("#industries li").find("input").prop("checked", false);
			$$("#industries li").each(function(){
				if ($$(this).data('groups').indexOf(group)>-1) $$(this).show();
			});
			myApp.accordionOpen(".category-level2");
		}, true);
		
		$$("#industries li").on("click", function(){
			B["category_code_name"] = $$(this).find("input").val() + ': ' + $$(this).find(".item-title").text();
			$$("#popup-category-ok").show();
		}, true);
		
		$$("#popup-category-ok").off("click");
		$$("#popup-category-ok").on("click", function(){
			$$(B.container).find("input.catg").val(B.category_code_name);
		});
	
	}
	
	if (cls=='func') {
		
		B["function_code_name"] = "";
		var codes = categories.functions, html3 = '', html4 = '';
		for (var i=0; i<codes.length; i++) {
			if (code==codes[i].code) {
				html3 += li_tpl.replace(/{{level}}/,'functions').replace(/{{value}}/, codes[i].code).replace(/{{name}}/, codes[i].en).replace(/{{groups}}/, codes[i].functions).replace(/{{checked}}/, 'checked="checked"');
			} else {
				html4 += li_tpl.replace(/{{level}}/,'functions').replace(/{{value}}/, codes[i].code).replace(/{{name}}/, codes[i].en).replace(/{{groups}}/, codes[i].functions);
			}
			
		}
		html4 += '<div class="list-block inset" style="margin-bottom:0px;line-height:35px;"> \
					<input id="func_code_input" type="text" name="" value="'+code_name+'" placeholder="Enter your title..."/> \
				</div>';
		$$("#functions").html(html3+html4);
		$$(".category-level3").show()
		
		$$("#functions li").on("click", function(){
			B.function_code_name = $$(this).find("input").val() + ': ' + $$(this).find(".item-title").text();
			$$("#popup-category-ok").show();
		}, true);
		
		$$("#popup-category-ok").off("click");
		$$("#popup-category-ok").on("click", function(){
			$$(B.container).find("input.func").val(B.function_code_name);
		});
		
	}
	
	if (cls=='ctry') {
	
		B["country_code_name"] = "";
		var codes = categories.countries, html5 = '';
		for (var i=0; i<codes.length; i++) {
			if (code==codes[i]) {
				html5 += li_tpl.replace(/{{level}}/,'countries').replace(/{{value}}/, codes[i]).replace(/{{name}}/, codes[i]).replace(/{{groups}}/, '').replace(/{{checked}}/, 'checked="checked"');
			} else {
				html5 += li_tpl.replace(/{{level}}/,'countries').replace(/{{value}}/, codes[i]).replace(/{{name}}/, codes[i]).replace(/{{groups}}/, '').replace(/{{checked}}/, '');
			}
			
		}
		$$("#countries").html(html5);
		$$(".category-level4").show()
		
		$$("#countries li").on("click", function(){
			B.countries_code_name = $$(this).find("input").val();
			$$("#popup-category-ok").show();
		}, true);
		
		$$("#popup-category-ok").off("click");
		$$("#popup-category-ok").on("click", function(){
			$$(B.container).find("input.ctry").val(B.countries_code_name);
		});
	}
	
	myApp.popup(".popup-category");
	myApp.accordionOpen(".category-level"+(cls=='func'? 3 : (cls=='ctry' ? 4 : 1)));
	
}
function card_record() {
	console.log('card_record()');

	var pars = {};
	
	if ($$(B.container).data('id')) pars['id'] = $$(B.container).data('id');
	
	var parameters = (pars.id==B.cards.mycard.id ? ", #card-parameter li" : '');
	
	$$.each($$(B.container+" li"+parameters), function(i,li) {
		var label 	= $$(li).find(".label").text();
		var champ 	= parseInt($$(li).find("input").attr("name").toLowerCase());
		var valeur 	= $$(li).find("input").val().replace('-change-','').trim();
		var oblige 	= ($$(li).find("input").hasClass('base'));
		var phone 	= ($$(li).find("input").hasClass('tel')); 
		
		// Skip incomplete fields name...
		if (!champ) return true;
		
		// For phone-like fields we filter all except number...
		if (phone) valeur = valeur.replace(/[^0-9]/g, '');
		
		// Add to the parameters sent to server...
		pars[champ] = valeur;
		
		// Delete non-mandatory field without value...
		if (valeur=='' && pars.id==B.cards.mycard.id) {
			if (oblige) {
				myApp.alert("Field '"+label+"' is mandatory!<br>Please enter a value.");
				$$(li).find("input").focus();
				pars = false;
				return false;
			} else {
				$$(li).remove();
				return true;
			}
		}
		
		// If card exist, we update B.cards_fields list...
		var add_local = (B.container=='#add_card_list');
		if (pars.id) {
			$$.each(B.cards_fields, function(i,cf){
				if (cf.cid==pars['id'] && cf.fid==champ) {
					B.cards_fields[i].v = valeur;
					add_local = false;
					return false;
				}
			});
			// If we add a new field (we are the owner)...
			if (add_local) {
				B.cards_fields.push({
					"cid": pars.id,
					"fid":champ,
					"own":B.cards.mycard.id,
					"v":valeur
				});
			}
			window.localStorage.setItem("B", JSON.stringify(B));
		}
		
	});
	
	if (!pars) return false;
	
	// Validate that email field is present and valid...
	if (pars['33']==undefined || !validateEmail(pars['33'])) {
		myApp.alert("You MUST have a valid value for the 'Email' field!");
		return false;
	}
	
	// Always identify the owner...
	pars['owner'] = B.cards.mycard.id;
	
	// For scan entry we record the original image...
	if (B.container=='#add_card_list' && scanImg[B.card_side].dataUrl!=undefined) { 
		pars[(B.card_side=='recto' ? '44' : '45')] = scanImg[B.card_side].dataUrl;
	}
		
	// Send to sender...
	socket.emit('card record', pars);
	
	// For existing card update we refresh the card template...
	if (B.container!='#add_card_list') {
		card_populate("thecard", pars);
		
		if (pars['id']==B.cards.mycard.id) {
			card_populate("mycard", pars);
			if (typeof shake !== 'undefined') {
				shake.stopWatch();
				if (B.options.shake_level) shake.startWatch(onShake, B.options.shake_level);
			}
		}
	}
}

function card_recorder(data) {
	console.log('card_recorder('+data+')');
	
	if (data.cards) {
		if (data.cards.accepted) B.cards.current.push(data.cards);
		else B.cards.waiting.push(data.cards);
	}
	
	if (data.cards_fields) {
		for (var i=0; i<data.cards_fields.length; i++) B.cards_fields.push(data.cards_fields[i]);
	}
		
	myApp.alert("New card added to your current list!");
	$$(".badge.current-list-nbr").html(B.cards.current.length);
	$$(".current-list-open").trigger("click");
	window.localStorage.setItem('B', JSON.stringify(B));
}

function card_populate(container,data) {
	console.log('card_populate('+container+', '+data+')');
	
	var html2 = '<div class="card-info-name">{{firstname}} {{lastname}}</div><div class="card-info-add">{{email}}{{title}}{{address}} {{city}} {{state_prov}} {{country}} {{postal code}}</div>'
	var initials = '--', complete_name = 'No name card', avatar = false;
	var cardid = data.id;
	var html = cards_templates[(data.template ? data.template : 0)];
	$$.each(['firstname', 'lastname', 'title', 'company', 'company name', 'address', 'city', 'state_prov', 'postal code', 'country', 'website', 'email', 'cellphone', 'fax', 'logo', 'Avatar'], function(i,e){
		var v = '';
 		$$.each(B.fields, function (ii,f) {
			if(e==f.en) {
			  $$.each(B.cards_fields, function(iii,cf) {
			  	 if (cf.cid==B.cards.mycard.id && cf.fid==10) B.options.shake_level = cf.v;
		 		 if (cf.cid==B.cards.mycard.id && cf.fid==11) B.options.ocr_match = cf.v;
				 if (cardid!=B.cards.mycard.id && cf.cid==cardid && cf.fid==52) {
				 	avatar = cf.v+ '';
				 }
				 
			  	 if (cf.cid==cardid && cf.fid==f.id) {
			  	 	v = cf.v + '';
			  	 	switch (e) {
						case 'firstname': 
							initials = v.substr(0,1).toUpperCase(); 
							complete_name = v; 
							break;
						case 'lastname': 
							initials += v.substr(0,1).toUpperCase(); 
							complete_name += ' ' + v; 
							v += '<br>';
							break;
						case 'email': v = 'E: '+v+'<br>'; break;
						case 'cellphone': v = 'C: '+v; break;
						case 'fax': v = 'F: '+v; break;
						case 'title': v += '<br>'; break;
			  	 	}			  	 	
			  	 	return false;
			  	 }
			  });
			  return false;
			}
		});
		html = html.replace(new RegExp('{{'+e+'}}', 'g'), v);
		html2 = html2.replace(new RegExp('{{'+e+'}}', 'g'), v.replace('E: ',''));
	});
	
	if (container=='mycard' && complete_name.trim()=='No name card') {
		card_initial_setup();
		return false;
	}
	
	html = html.replace(new RegExp('{{.+}}', 'g'), '');
	html2 = html2.replace(new RegExp('{{.+}}', 'g'), '');
	
	if (container=='mycard') {
		
		var img = card_points_img(B.cards.mycard)
		B.cards.mycard["points_target"] = img.points_target;
		B.cards.mycard["points_img"] 	= img.points_img;
		B.cards.mycard["points_color"] 	= img.points_color;
		
		$$(".pieID.pie_text").html(B.cards.mycard.points_img +'<br>'+ Math.round(B.cards.mycard.points/B.cards.mycard.points_target*100)+"%");
		$$(".pieID.legend span.actual").html(B.cards.mycard.points+"");
		$$(".pieID.legend span.missing").html(B.cards.mycard.points_target-B.cards.mycard.points+"");
		$$(".pieID.legend span.target").html(B.cards.mycard.points_target+"");
		
		var next_target = "Your next target:<br>Bronze";
		switch(B.cards.mycard.points_img) {
			case "Bronze":	next_target = "Your next target:<br>Silver"; break;
			case "Silver": next_target = "Your next target:<br>Gold"; 	break;
			case "Gold": 	next_target = "Your next target:<br>Diamond";break;
			case "Diamond":
				next_target = "You're at the TOP!"; 			
				$$(".pieID.legend li.missing, .pieID.legend li.target").hide();
				break;
		}
		$$(".pieID.legend span.next_target").html(next_target);
		$$(".pieID.pie").addClass(B.cards.mycard.points_img.toLowerCase());
		pie_create(".pieID.legend", ".pieID.pie");
		
		var h = $$("#mycard").width() / 3.5 * 2.0;
		var t = $$("#mycard").offset().top;
		$$("#mycard").data("top", t);
		$$("#mycard").css({"height": h, "bottom":t+h});
		
		var draggie = new Draggabilly( '#mycard', { axis:"y" });
		draggie.on( 'dragEnd', function( event, pointer ) {
			if (this.position.y < (t-h)) {
				card_offered('mycard',B.cards.mycard.id);
			} else {
				card_offer_completed('mycard');
			}
		});
		draggie.on( 'staticClick', function(){ card_offer('mycard',B.cards.mycard.id); });
	
	}	
	
	if (container) {
		$$("#"+container+" .content").html(html);
		data.points_img = (data.points_img ? data.points_img : 'none');
		$$("#"+container+" .points > img").attr("src", "img/badge_"+ data.points_img.toLowerCase() +".png");
		$$("#card-form .card-info-txt").html(html2);
		if (avatar) {
			$$("#card-form .card-info-pastille").css({"background-image":"url("+avatar+")"});
			$$("#card-form .card-info-pastille").text('');
		} else {
			$$("#card-form .card-info-pastille").css({"background-image":"none"});
			$$("#card-form .card-info-pastille").text(initials);
		}		
		$$(".card-info-title").text(complete_name);
	}
	else {
		return html;
	}
			
}

function card_auth(id, action) {		
	console.log('card_auth('+id+', '+action+')');
	
	socket.emit('card '+action, {"cardid":B.cards.mycard.id, "authid":id});
}

function card_del(id) {		
	console.log('card_del('+id+')');
	
	socket.emit('card delete', {"cardid":B.cards.mycard.id, "authid":id});
}



// section ranking...

function pie_slice_size(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

function pie_slice_add(sliceSize, pieElement, offset, sliceID, color) {
  $$(pieElement).append("<div class='slice "+sliceID+"'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;
  $$("."+sliceID).css({
    "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
  });
  $$("."+sliceID+" span").css({
    "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function pie_slice_each(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var sliceID = "s"+dataCount+"-"+sliceCount;
  var maxSize = 179;
  if(sliceSize<=maxSize) {
    pie_slice_add(sliceSize, pieElement, offset, sliceID, color);
  } else {
    pie_slice_add(maxSize, pieElement, offset, sliceID, color);
    pie_slice_each(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}

function pie_create(dataElement, pieElement) {
  var listData = [];
  $$(dataElement+" span.point").each(function() {
    listData.push(Number($$(this).html().replace(' points','').replace(',','')));
  });
  var listTotal = 0;
  for(var i=0; i<listData.length; i++) {
    listTotal += listData[i];
  }
  var offset = 0;
  var color = [
    "#888888",
    '#EEEEEE'
  ];
  for(var i=0; i<listData.length; i++) {
    var size = pie_slice_size(listData[i], listTotal);
    pie_slice_each(size, pieElement, offset, i, 0, color[i]);
    $$(dataElement+" li:nth-child("+(i+1)+")").css("border-color", color[i]);
    offset += size;
  }
}

// section ranking...




function card_login(email) {
	console.log('card_login('+email+')');
	
	if (!email) return false;
	
	// validation des champs de login...
	var regexp = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/gi;
	if (!email.match(regexp)) {
		myApp.alert("Your email address doesn't respect the standards. Please correct it and try again.")
		//welcomescreen.open();
		myApp.loginScreen();
		$$("#email").val('');
		$$("#email").focus();
		return false;
	}

	myApp.formStoreData('login_form', {
		"email":email
   });
   
   var uuid = window.localStorage.getItem('uuid');
   if (uuid === null) uuid = '';
		   
	var login_data = {
		"email":email,
		"uuid":uuid
	}
	
	socket.emit('card login2', login_data);

}

function card_reload() {
	console.log('card_reload()');
	
	myApp.alert('Synchronizing your data...<br>Please wait.');
	socket.emit('card load2', B.cards.mycard.id);
}

function card_remove() {
	console.log('card_remove('+cardid+')');
	
	var data = {"cardid":B.cards.mycard.id, email:B.cards.mycard.email};
	myApp.modal({
		title: 'Delete card...', 
		text: '<b>Are you sure?</b>', 
		buttons: [
			{ text: "Cancel", onClick: function(){
				mainView.router.load({pageName: 'index'});
			} },
			{ text: "Yes I am", onClick: function(){
				 socket.emit('card rem', data);
				 myApp.showPreloader('Delete...');
			    setTimeout(function () {
			        myApp.hidePreloader();
			    }, 10000);
			}}
		]
	});
}

var socket = io(B.server);
var $connected = false;
var $online = false;

socket.on('connect_error', function() {
    $connected = false;
    console.log('$connected = '+$connected);
});
socket.on('connect', function () {
    $connected = true;
    console.log('$connected = '+$connected);
});
socket.on('disconnect', function () {
    $connected = false;
    console.log('$connected = '+$connected);
});
socket.on('reconnect', function () {
    $connected = true;
    console.log('$connected = '+$connected);
});
socket.on('card msg', function(data){
	myApp.alert(data)
});
socket.on('card login', function (data) {
	console.log('on card login : '+data.msg)
	
	switch(data.msg) {
		case "card not found":
			myApp.formDeleteData('login_form');
			myApp.alert("It's the first time we see this email used from this device. <b>We sent a message to this address</b> to confirm ownership so please open it and follow the instructions to gain access.");
			//welcomescreen.open();
			myApp.loginScreen();
			$$("#email").focus();
			break;
		case "card not confirmed":
			myApp.formDeleteData('login_form');
			myApp.alert("This email is not confirmed on this device.<br>We sent a new message to confirm ownership so please open it to have access.");
			//welcomescreen.open();
			myApp.loginScreen();
			$$("#email").focus();
			break;
		case "card login try count":
			myApp.formDeleteData('login_form');
			myApp.alert("This email is not confirmed on this device and you exceeded the number of try without confirming.");
			//welcomescreen.open();
			myApp.loginScreen();
			$$("#email").html('');
			$$("#email").focus();
			break;
		case "card logged in":
		   myApp.closeModal(".login-screen.modal-in");
			var local_B = window.localStorage.getItem('_B');
			if (local_B) {
				console.log("Local_B");
				B = JSON.parse(local_B);
				var nb_cards = 0;
				if (B.cards.current) {
					$$(".badge.current-list-nbr").html(B.cards.current.length);
					nb_cards += B.cards.current.length;
				}
				if (B.cards.waiting) {
					$$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
					nb_cards += B.cards.waiting.length;
				}
				console.log(data.nb_links + ' == ' + nb_cards)
				if (data.nb_links == nb_cards) {
					card_populate('mycard',B.cards.mycard);
					break;	
				}
			}
			console.log('emit card load2')
			socket.emit('card load2', data.id);
		   myApp.alert('Synchronizing your data...<br>Please wait.');
		   geoPermission();
			break;
		case "card set uuid":
			window.localStorage.setItem('uuid',data.uuid);
			break;
	}
	
});

socket.on('card rem', function() {
	myApp.formDeleteData('login_form');
	myApp.loginScreen(".login-screen.modal-in");
	myApp.hidePreloader();
});

socket.on('card load', function (data) {
	
	if (data.fields) B.fields = data.fields;
	if (data.cards_fields2) B.cards_fields = data.cards_fields2;
	
	B.cards = {
		mycard: {},
		current: [],
		waiting: []
	}
	
	B.cards.mycard = data.mycard;
	
	for(var i=0; i<data.cards.length; i++) {
		if (data.cards[i].accepted) {
			B.cards.current.push(data.cards[i]);
		} else {
			B.cards.waiting.push(data.cards[i]);
		}
	}
	
	window.localStorage.setItem('_B', JSON.stringify(B));	
	
	if (B.cards.current) $$(".badge.current-list-nbr").html(B.cards.current.length);
	if (B.cards.waiting) $$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
	
	card_populate('mycard',B.cards.mycard);
	
	myApp.hidePreloader();
	myApp.closeModal();
	
	if (typeof shake !== 'undefined') shake.startWatch(onShake, B.options.shake_level);

	
}); // socket on load

socket.on('card shared data', function(card) {
	B.cards.waiting.push(card.cards);
	$$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
	for(var i=0; i<card.cards_fields.length; i++) B.cards_fields.push(card.cards_fields[i]);
	myApp.alert("A new card in your waiting list!<br>Shared by someone"+(card.mesg ? " who wrote this:<br>\""+card.mesg+"\"" : '.'));
});
				
socket.on('card record', function (data) {
	
	switch(data.msg) {
		case "UPDATED":
			myApp.alert("Card updated!");
			break;
		case "EMAIL_EXIST":
			if (data.id==B.cards.mycard.id) {
				myApp.alert("<b>This email address is exactly like your's!</b><br>Please change it and try again.");
			} else if (data.accepted) {
				myApp.alert("<b>This email address is already in your current cards!</b>");
				mainView.router.load({pageName: 'index'});
			} else if (data.added) {
				myApp.modal({
					title: 'Existing card', 
					text: '<b>This email address is already in your waiting cards!</b><br>Do you want to accept it?', 
					buttons: [
						{ text: "No thanks", onClick: function(){
							mainView.router.load({pageName: 'index'});
						} },
						{ text: "Yes, accept it", onClick: function(){
							B.container = "#thecard";
							$$(B.container).data("id", data.id);
							card_auth(data.id, 'accept');
							mainView.router.load({pageName: 'index'});
						}}
					]
				});
			} else if (data.payed) {
				myApp.modal({
					title: 'Existing card?', 
					text: '<b>This email address is already used on a payed card!</b><br>Do you want to add it?', 
					buttons: [
						{ text: "No thanks", onClick: function(){
							myApp.alert("You should change the email address...");
							$$(B.container+" input[type='email']").focus();
						} },
						{ text: "Yes, add it", onClick: function(){
							data["cardid"] = B.cards.mycard.id;
							socket.emit("card add",data);
							mainView.router.load({pageName: 'index'});
						}}
					]
				});
			}
			break;
		case "INSERTED":
			console.log('B.cards_fields : '+data.cards_fields.length)
			if (data.cards_fields) card_recorder(data);
			break;
	}
	
});

socket.on('card add', function(data){
	var list_field = ['company','firstname','lastname','email','id','poinst_img']
	var pars = {};
	for (var i=0; i<data.cards_fields.length; i++) {
		var name = '';
		for (var ii=0; ii<B.fields.length; ii++) {
			if (B.fields[ii].id==data.cards_fields[i].field_id) {
				name = B.fields[ii].en.toLowerCase().replace(/\s/g,'');
				break;
			}
		}
		if (list_field.indexOf(name)!==false) pars[name] = data.cards_fields[i].value;
		B.cards_fields.push(data.cards_fields[i]);
	}
	pars['cardid'] = B.cards.mycard.id;
	pars["accepted"] = data.card.accepted;
	pars["id"] = data.card.id;
	if (data.card.accepted==null) {
		myApp.alert("Card added to your waiting list!")
		B.cards.waiting.push(data.card);
		$$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
	} 
	else {
		myApp.alert("Card added to your current list!")
		B.cards.current.push(data.card);
		$$(".badge.current-list-nbr").html(B.cards.current.length);
	}
	window.localStorage.setItem('B', JSON.stringify(B));
	mainView.router.load({pageName: 'index'});
});

socket.on('card details', function(data){
	// si la carte n'est pas deja dans mes listes (added!=null)...
	for (var i=0; i<data.cards_fields.length; i++) {
		B.cards_fields.push(data.cards_fields[i]);
	}
	if (data.card.accepted==null) {
		myApp.alert("Card added to your waiting list!")
		B.cards.waiting.push(data.card);
		$$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
	} 
	else {
		myApp.alert("Card added to your current list!")
		B.cards.current.push(data.card);
		$$(".badge.current-list-nbr").html(B.cards.current.length);
	}
	window.localStorage.setItem('B', JSON.stringify(B));
});
socket.on('card accepted', function(data){
	if (data.msg=='OK') {
		
		for (var i=0; i<B.cards.waiting.length; i++) {
			if (B.cards.waiting[i].id==data.id) {
				B.cards.current.push(B.cards.waiting[i]);
				B.cards.waiting.splice(i,1);
			}
		}
		
		if (B.cards.current) $$(".badge.current-list-nbr").html(B.cards.current.length);
		if (B.cards.waiting) $$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
		$$(".current-list-open").trigger("click");
		myApp.alert("Card accepted and transfered to your current card list!");
	}
	window.localStorage.setItem('B', JSON.stringify(B));
});
socket.on('card refused', function(data){
	if (data.msg=='OK') {
		
		for (var i=0; i<B.cards.waiting.length; i++) {
			if (B.cards.waiting[i].id==data.id) {
				B.cards.waiting.splice(i,1);
			}
		}
		
		if (B.cards.waiting) $$(".badge.waiting-list-nbr").html(B.cards.waiting.length);
		$$(".waiting-list-open").trigger("click");
		myApp.alert("Card deleted from your waiting card list!");
		window.localStorage.setItem('B', JSON.stringify(B));
	}
});
socket.on('card deleted', function(data){
	if (data.msg=='OK') {
		
		for (var i=0; i<B.cards.current.length; i++) {
			if (B.cards.current[i].id==data.id) {
				B.cards.current.splice(i,1);
				$$("li.card-item.item"+data.id).remove();
			}
		}
		$$(".current-list-open").trigger("click");
		if (B.cards.current) $$(".badge.current-list-nbr").html(B.cards.current.length);
		myApp.alert("Card deleted from your current card list!");
		window.localStorage.setItem('B', JSON.stringify(B));
	}
});
socket.on('card qr', function(data){

	if (data.image) {
  	 //if (storageAvailable()) localStorage.setItem('card_qr', data.buffer);
    //qr_src = 'data:image/png;base64,' + data.buffer;
    //$$("#qr_img").attr("src", qr_src);
		myApp.alert('<div class="picker-modal-inner"><div class="content-block" style="text-align: center;width:100%;"><img src="data:image/png;base64,'+data.buffer+'" align="middle" style="width:150px;" /></div></div>');
  
	}
  
});
socket.on('card connected', function(data){
  console.log("card connected response: "+data)
});
socket.on('custom field', function(data){
  	myApp.alert(data.msg);
			
  	B.fields.push({"id":data.id,"en":data.field,"fr":data.field,"base":0,"order":255});
  	window.localStorage.setItem('B', JSON.stringify(B));
  	
	var li = $$(B.container).find("li.ii_"+data.ii);
	li.find(".label").attr("data-i",data.id);
	li.find(".label").text(data.field);
	li.find("input").attr("name",data.id);
	myApp.closeModal(".choseModal");
});
socket.on('sms test result', function(data){
	switch(data.act) {
		case "good":
		case "not": $$("#validation_modal_text").html(data.msg); break;
		case "bad": $$("#sms_test_msg").text(data.msg); $$("#sms_test_code").val(''); break;
	}
});
socket.on('card cc charge', function(data){
	$$.each(B.cards.current, function(i,c){
		if (c.id==data.id) {
			B.cards.current[i].payed_date=Date().toString();
			window.localStorage.setItem('B', JSON.stringify(B));
		}
	});
	$$("#card-form .payfor").hide();
	myApp.alert("Payment complete!");
});
 

function add_card_li_match(ii,v) {
	console.log('add_card_li_match('+ii+', '+v+')');
	
	if (typeof v === "undefined") return false;
	if (v.toString().replace(/^[^\d\w]$/,'')=='') return false;
	
	if (B.options.ocr_match) {
		
		var Name = /^[a-zéè\-]{2,}\s[a-zéè\-]{2,}$/i;
		var Company = /\s(lt[eéè]e)|\s(inc)|\s(enr)/i;
		var Email = /\w+@\w+/;
		var Website = /(www.)|(.com)|(.ca)/i;
		var Fax = /(fax)|(telec)|(téléc)/i;
		var Cel = /(cel)/i;
		var Tel = /(.+\d{3}.{1,2}\d{3}.?\d{4})/i;
		var Add = /^(\d{1,2}[,\d]\d+[\s,].+)/i;
		var li = '';
		
		var i = '', cls = '';
		if (v.match(Company)) {
			if (!$$(B.container).find("input[name='29']").val()) {
				$$(B.container+" input[name='29']").val(v);
				cls = 'off';
			}
		}
		else if (v.match(Name)) {
			if (!$$(B.container).find("input[name='35']").val()) {
				var names = v.split(' ');
				$$(B.container+" input[name='35']").val(names[0]);
				$$(B.container+" input[name='38']").val(names[1]);
				cls = 'off';
			}
		}
		else if (v.match(Email)) {
			if (!$$(B.container).find("input[name='33']").val()) {
				$$(B.container+" input[name='33']").val(v);
				cls = 'off';
			}
		}
		else if (v.match(Cel)) {
			if (!$$(B.container).find("input[name='26']").val()) {
				var telno = v;//.replace(/[^\d]/g,'');
				$$(B.container+" input[name='26']").val(telno);
				cls = 'off';
			}
		}
		else if (v.match(Website)) {
			if ($$(B.container).find("input[name='41']").length==0) i = 41;
			cls = 'off';
		}
		else if (v.match(Fax)) {
			if ($$(B.container).find("input[name='34']").length==0) i = 34;
			cls = 'off';
		}
		else if (v.match(Tel)) {
			if ($$(B.container).find("input[name='24']").length==0) i = 24;
			cls = 'off';
		}
		else if (v.match(Add)) {
			if ($$(B.container).find("input[name='22']").length==0) i = 22;
			cls = 'off';
		}
		
	}
	
	v = v.replace(/(\()/g,' (').replace(/(\s\s)/g,' ');
	var ocr_words = v.trim().split(' ');
	for (var i=0; i<ocr_words.length; i++) {
		cls = '';
		ocr_words[i] = '<span class="word '+cls+'">'+ocr_words[i].trim()+'</span>';
	}
	$$("#card_ocr_words").append(ocr_words.join(''));
	
}

function add_card_li(ii,v,n,i) {
	console.log('add_card_li('+ii+','+v+','+n+','+i+')');
	
	var l = '-change-', p = '';
	
	$$.each(B.fields, function(iii,f) {
		if (i==f.id) {
			n = f["en"];
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			return false;
		}
	});
	
	if (v=="-change-") {
		p = v; v = '';
	}
	
	var input = input_tpl.replace(/{{name}}/, i).replace(/{{value}}/, v).replace(/{{class}}/, 'new').replace(/{{label}}/, l).replace(/{{placeholder}}/, p).replace(/{{readonly}}/, 'false');
	var li = li_tpl.replace(/{{data-i}}/, i).replace(/{{data-id}}/g, ii).replace(/{{label}}/, l).replace(/{{lock}}/, 'unlock').replace(/{{input}}/, input);
	          
	$$(B.container).append(li);
	
	if (B.container=="#card-form-list") {
		
		$$(B.container).find(".item-input input.new").off("click")
		$$(B.container).find(".item-input input.new").filter(is_locked).on("click", card_input_modal);
		$$(B.container).find(".item-input input.new").eq(0).trigger("click");
	
	} else {
	
		$$(B.container).find(".item-input input.new").on("click", function(){
			if ($$(this).val()) return false;
			B['input_name'] = $$(this).attr("name");
			myApp.pickerModal(".picker-ocr-words");
		});
		
	}
}

function add_card_word_detect() {
	console.log('add_card_word_detect()');
	
	var words_in_container = [];
	var words_in_input_text = B.input_text.split(" ");
	var card_ocr_picked_words = [];
	$$(B.container).find(".item-input input").each(function(){
		var txt = $$(this).val();
		var words = txt.split(" ");
		$$.each(words, function(i, word){
			words_in_container.push(word);
		});
		
	});
	
	$$("#card_ocr_words").find(".word").each(function(){
		var rem = false;
		$$(this).removeClass("on");
		$$(this).removeClass("off");
		if (words_in_input_text.indexOf($$(this).text()) > -1) {
			rem = "on";
		}
		else if (words_in_container.indexOf($$(this).text()) > -1) {
			rem = "off";
		}
		if (rem) {
			card_ocr_picked_words.push($$(this).addClass(rem))
			$$(this).remove();
		}
	});
	$$("#card_ocr_words").find("div").each(function(){
		//if ($$(this).html()=='') $$(this).remove();
	});
	$$("#card_ocr_words").append('<div class="picked_words"></div>');
	$$.each(card_ocr_picked_words, function(i,word){ $$("#card_ocr_words > div.picked_words").append(word); });
	
};

function is_locked() {
	return !$$(this).hasClass('lock');
}

function card_init() {
	console.log('card_init()');
	
	if (B.container!="#add_card_list") {
		
		$$(B.container).find(".item-input input").off("click")
		$$(B.container).find(".item-input input").filter(is_locked).on("click", card_input_modal);
	
	} 
	
	$$(B.container).find(".item-input input.catg").off("click")
	$$(B.container).find(".item-input input.catg").filter(is_locked).on("click", function(){
		category_open($$(B.container).find(".item-input input.catg").val(), 'catg');
	});
	
	$$(B.container).find(".item-input input.func").off("click")
	$$(B.container).find(".item-input input.func").filter(is_locked).on("click", function(){
		category_open($$(B.container).find(".item-input input.func").val(), 'func');
	});
	
	if (B.container=="#add_card_list") {
		
		$$(B.container).find(".item-input input.base").off("click");
		$$(B.container).find(".item-input input.base").filter(is_locked).on("click", function(){
			$$("#card_ocr_title").text($$(this).data("label"));
			B.input_text = $$(this).val();
			$$("#card_ocr_input").val(B.input_text);
			B['input_name'] = $$(this).attr("name");
			myApp.pickerModal(".picker-ocr-words");
			if (B.card_side) add_card_word_detect();
		});
		
		if (B.card_side=='recto') {
			
			var html = '<div class="list-block" style="margin:0px;line-height:35px;"> \
				<input id="card_ocr_input" type="text" name="" value="'+B.input_text+'" placeholder="Pick words or enter text..."/> \
					Words from the card: \
			</div>';
			
			$$("#card_ocr_words").prepend(html);
			
			
			$$("#card_ocr_input").on("change", add_card_word_detect);
			
			$$("#card_ocr_words").find(".word").off("click");
			$$("#card_ocr_words").find(".word").on("click", function(event) {
				var new_text = '';
				if ($$(this).hasClass("on")) {
					new_text = $$("#card_ocr_input").val().replace($$(this).text(),'').replace('  ',' ').trim();
				} else {
					new_text = $$("#card_ocr_input").val()+" "+$$(this).text();	
				}
				$$("#card_ocr_input").val(new_text.trim())
				$$(this).toggleClass("on");
			});
			
			$$("#card_ocr_ok").off("click");
			$$("#card_ocr_ok").on("click", function(){
					$$(B.container+" input[name='"+B.input_name+"']").val($$("#card_ocr_input").val());
			});
		}
		
	}

}

function card_input_modal() {
	console.log('card_input_modal()');
	
	B.input_text = $$(this).val();
	B.input_name = $$(this).attr("name");
	B.input_type = $$(this).attr("class").replace('active-state','').trim();
	B.input_labl = $$(this).data('label');
	var aftertext = '<input type="text" value="'+B.input_text+'">';
	var title = 'Enter value for <b>'+B.input_labl+'</b>';
	
	switch (B.input_type) {
		case 'catg' : 
		case 'func' : 
		case 'ctry' : 
			category_open(B.input_text, B.input_type);
			return false;
		case 'date' : 
			aftertext = '<input type="hidden" id="calendar-input"><div id="calendar-inline-container"></div>';
			title = 'Select value for <b>'+B.input_labl+'</b>';
			break;
		case 'img'  : break;
		case 'mail' : break;
		case 'www'  : break;
		case 'zip'  : break;
		case 'tel'  : break;
		case 'tpl'  : break;
		case 'en,fr': 
			aftertext = '<select><option value="en">english</option><option '+(B.input_text=='fr' ? 'selected' : '')+' value="fr">francais</option></select>';
			title = 'Select value for <b>'+B.input_labl+'</b>';
			break;
		case 'm,f'  : 
			aftertext = '<select><option value="m">Male</option><option '+(B.input_text=='f' ? 'selected' : '')+' value="f">Femalle</option></select>';
			title = 'Select value for <b>'+B.input_labl+'</b>';
			break;
	}
	
  	var myModal= myApp.modal({
  		title:title,
  		afterText:aftertext,
  		buttons: [
  			{
  				text:'Cancel'
  			},
  			{
  				text:'Ok',
  				onClick: function () {
  					var value = $$(myModal).find('input,select').val();
  					if (value.replace(/\s/g,'')=='') return false;
  					$$(B.container+" input[name='"+B.input_name+"']").val(value);
  				}
  			}
  		]
   },
   function(){
   	// bouton cancel...
   });
   
   if (B.input_type=='date') {
   	var calendarInline = myApp.calendar({
		    container: '#calendar-inline-container',
		    input:'#calendar-input',
		    value: [B.input_text],
		    weekHeader: false
		});
		$$(".modal.modal-in").css({"margin-top":"-150px", "width":"calc(100% - 10px)", "left":"5px", "margin-left":"0"})
   }
 }

function card_field_add() {
	console.log('card_field_add()');
	
	var ii = $$(B.container+" > li").length + 1;
	var i = 0;
	var add_new = true;
	var l = '', n = '', html = ['','','','','',''];
	var families = ['Families','Address fields','Personal infos','Phone numbers','Business infos','Other fields'];
	var li_tpl = '<li>' +
			      '<label class="label-checkbox item-content">' +
			        '<input type="checkbox" name="{{ii}}" value="{{i}}" data-name="{{l}}" class="other" {{checked}}>' +
			        '<div class="item-media">' +
			          '<i class="icon icon-form-checkbox"></i>' +
			        '</div>' +
			        '<div class="item-inner">' +
			          '<div class="item-title">{{l}}</div>' +
			        '</div>' +
			      '</label>' +
			    '</li>';
			    
	$$.each(B.fields, function(k,v) {
		if ($$(B.container).find("input[name='"+v.id+"']").length==0) {
			n = v.en;
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			html[v.family] += li_tpl.replace(/{{ii}}/,ii).replace(/{{i}}/,v.id).replace(/{{l}}/g,l);
		}
		if (v.id==i) {
			n = v.en;
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			html[v.family] += li_tpl.replace(/{{ii}}/,ii).replace(/{{i}}/,v.id).replace(/{{l}}/g,l).replace(/{{checked}}/,'checked="checked"');
		}
	});
	
	html[5] += li_tpl.replace(/{{ii}}/,ii).replace(/{{i}}/,"999").replace(/{{l}}/g,"Custom field");
	
	myApp.pickerModal(
    '<div class="picker-modal choseModal" style="height:100%">' +
      '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
          '<div class="left"><a href="#" class="close-picker">Cancel</a></div>' +
          'Choose fields to add' +
          '<div class="right"><a href="#" class="ok-picker">Ok</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="picker-modal-inner" style="overflow:scroll;">' +
			'<div class="list-block accordion-list">' +
			    '<ul>' +
			        '<li class="accordion-item">' +
			            '<a href="" class="item-link item-content">' +
			                '<div class="item-inner">' +
			                    '<div class="item-title">' +
			                    		families[1] +
			                    '</div>' +
			                '</div>' +
			            '</a> ' +
			            '<div class="accordion-item-content">' +
			            	'<ul>' +
			            		html[1] +
			            	'</ul>' +
			            '</div>' +
			        '</li>' +
			        '<li class="accordion-item">' +
			            '<a href="" class="item-link item-content">' +
			                '<div class="item-inner">' +
			                    '<div class="item-title">' +
			                    		families[2] +
			                    '</div>' +
			                '</div>' +
			            '</a> ' +
			            '<div class="accordion-item-content">' +
			            	'<ul>' +
			            		html[2] +
			            	'</ul>' +
			            '</div>' +
			        '</li>' +
			        '<li class="accordion-item">' +
			            '<a href="" class="item-link item-content">' +
			                '<div class="item-inner">' +
			                    '<div class="item-title">' +
			                    		families[3] +
			                    '</div>' +
			                '</div>' +
			            '</a> ' +
			            '<div class="accordion-item-content">' +
			            	'<ul>' +
			            		html[3] +
			            	'</ul>' +
			            '</div>' +
			        '</li>' +
			        '<li class="accordion-item">' +
			            '<a href="" class="item-link item-content">' +
			                '<div class="item-inner">' +
			                    '<div class="item-title">' +
			                    		families[4] +
			                    '</div>' +
			                '</div>' +
			            '</a> ' +
			            '<div class="accordion-item-content">' +
			            	'<ul>' +
			            		html[4] +
			            	'</ul>' +
			            '</div>' +
			        '</li>' +
			        '<li class="accordion-item">' +
			            '<a href="" class="item-link item-content">' +
			                '<div class="item-inner">' +
			                    '<div class="item-title">' +
			                    		families[5] +
			                    '</div>' +
			                '</div>' +
			            '</a> ' +
			            '<div class="accordion-item-content">' +
			            	'<ul>' +
			            		html[5] +
			            	'</ul>' +
			            '</div>' +
			        '</li>' +
			    '</ul>' +
			'</div>' +
      '</div>' +
    '</div>'
  );
  
  $$(".picker-modal .ok-picker").on("click", function(){
  		var n = '', i = '', n0 = '', i0 = '', iii = 0;
  		$$(".picker-modal").find("input[name='"+ii+"']:checked").each(function(){
  			n = $$(this).data("name");
  			i = $$(this).val();
  			if(iii==0) {
	  			n0 = n;
	  			i0 = i;
  			}
		  			
  			if (add_new) {
			 	add_card_li(ii,'-change-',n,i)
		  	}
	  		if (i==999) {
	  			myApp.prompt('What is the field\'s name?', 'Custom Field <i class="fa fa-cube"></i>', function (value) {
	  				if (value.replace(/\s/g,'')=='') return false;
	  				card_custom_field_validate(ii, value);
			   },
			   function(){
			   	$$(B.container+" li").eq($$(B.container+" li").length-1).remove();
			   });
	  		}  else {
				var li = $$(B.container).find("li.ii_"+ii);
				li.find(".label").attr("data-i",i);
				li.find(".label").text(n);
				li.find("input").attr("name",i);
				li.find("input").data("label",n);
			}
			ii++; iii++;
  		});
  		
  		if (B.container=="#card-form-list") {
		
			$$(B.container).find(".item-input input.new").off("click")
			$$(B.container).find(".item-input input.new").filter(is_locked).on("click", card_input_modal);
			$$(B.container).find(".item-input input.new").eq(0).trigger("click");
	  		
  		} else {
  		
			$$(B.container).find(".item-input input.new").off("click");
			$$(B.container).find(".item-input input.new").on("click", function(){
				$$("#card_ocr_title").text($$(this).data("label"));
				B.input_text = $$(this).val();
				$$("#card_ocr_input").val(B.input_text);
				B['input_name'] = $$(this).attr("name");
				myApp.pickerModal(".picker-ocr-words");
				add_card_word_detect();
			});
  		
			$$("#card_ocr_title").text(n0);
			B.input_text = '';
			$$("#card_ocr_input").val(B.input_text);
			B['input_name'] = i0;
	  		myApp.pickerModal(".picker-ocr-words");
	  		add_card_word_detect();
  		
  		}
  		
  		myApp.closeModal(".choseModal");
  });
}

function card_custom_field_picker(ii) {
	console.log('card_custom_field_picker('+ii+')');
	
	myApp.pickerModal(
    '<div class="picker-modal">' +
      '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
          '<div class="left"></div>' +
          '<div class="right"><a href="#" class="close-picker">Close</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="picker-modal-inner">' +
        '<div class="list-block">' +
				'<ul>' +
					'<li>' +
						'<div class="item-content">' +
							'<div class="item-inner">' +
								'<div class="item-title label">Custom Name</div>' +
								'<div class="item-input">' +
									'<input type="text" name="">' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</li>' +
					'<li>' +
						'<div class="item-content">' +
							'<div class="item-inner">' +
								'<div class="item-input">' +
									'<a href="#" onClick="card_custom_field_validate()" class="button button-fill color-green">Validate</a>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</li>' +
				'</ul>' +
		  '</div>' +
      '</div>' +
    '</div>'
  );
  
  $$(".picker-modal").on("close", function(){
  		var i = $$(".picker-modal").find("input").attr("name");
  		var n = $$(".picker-modal").find("input").val();
		var li = $$(B.container).find("li.ii_"+ii);
		li.find(".label").data("i",i);
		li.find(".label").text(n);
		li.find("input").attr("name",i);
  });
}

function card_custom_field_validate(ii, v) {
	console.log('card_custom_field_validate('+ii+', '+v+')');
	
	if (v=="") return false;
	var pars = {"owner":B.cards.mycard.id,"ii":ii,"field":v}
	socket.emit('custom field', pars);
}

function card_points_img(card) {
	var $data = {};
	if (card.points>30000000) {
		$data['points_img'] = 'Diamond';
		$data['points_target'] = points;
		$data['points_color'] = "#caf1f7";
	} else if(card.points>3500000) {
		$data['points_img'] = 'Gold';
		$data['points_target'] = 30000000;
		$data['points_color'] = "#ffeb56";
	} else if(card.points>100000) {
		$data['points_img'] = 'Silver';
		$data['points_target'] = 3500000;
		$data['points_color'] = "#ccd1f9";
	} else if(card.payed_date) {
		$data['points_img'] = 'Bronze';
		$data['points_target'] = 100000;
		$data['points_color'] = "Bronze";
	} else {
		$data['points_img'] = 'none';
		$data['points_target'] = 100000;
		$data['points_color'] = "#eeeeee";
	}
	return $data;
} 

function online(event) {
  $online = (event.type=='online');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function geoPermission() {
	if (typeof locationPermission!=="undefined") {
		locationPermission.getStatus(function(status) {
		    switch(status) {
		        case locationPermission.GRANTED: console.log('Granted !'); break;
		        case locationPermission.DENIED: myApp.modal({
				   	title: 'GeoLocation is not permitted on your device', 
				   	text: 'You have to activate GeoLocation in your app parameters for Bizswiper card exchange to work.', 
				   	buttons: [
							{ text: "Ok", onClick: function () {
								
							} }
						]
					});
		    }
		});
	}
	if (typeof navigator.permissions!=="undefined") {		
	  navigator.permissions.query({name:'geolocation'}).then(function(result) {
	    if (result.state !== 'granted') {
	      myApp.modal({
		   	title: 'GeoLocation is not permitted on your device', 
		   	text: 'You have to activate GeoLocation in your app parameters for Bizswiper card exchange to work.', 
		   	buttons: [
					{ text: "Ok", onClick: function () {} }
				]
	  		});
	    }
	  });
	}
}

function geoLocation(func) {
		
	if (!navigator.geolocation){
		myApp.modal({
	   	title: 'GeoLocation is not permitted on your device', 
	   	text: 'You have to activate GeoLocation in your app parameters for Bizswiper card exchange to work.1', 
	   	buttons: [
				{ text: "Ok", onClick: function () {} }
			]
  		});
		return false;
	}

	function success(o) {
		func(o.coords);
	};

	function error(err) {
		myApp.hidePreloader();
		myApp.modal({
	   	title: 'GeoLocation is not permitted on your device', 
	   	text: err.PositionError.code+' You have to activate GeoLocation in your app parameters for Bizswiper card exchange to work.', 
	   	buttons: [
				{ text: "Ok", onClick: function () {} }
			]
  		});
	}
	
	var options = {
	  enableHighAccuracy: true,
	  maximumAge: 0
	};
	
	navigator.geolocation.getCurrentPosition(success, error, options);
	//success({lat:45.6105491,lng:-73.5094794,alt:0}); // manual override for testing...
}


var onShake = function () {
	// Fired when a shake is detected
	card_offer('mycard',B.cards.mycard.id);
};

(function (document) {
	document.addEventListener("backbutton", function(e){
		e.preventDefault();
		mainView.router.back();
	}, false);
	
	var storedData = myApp.formGetData('login_form');
	
	if (storedData) {
		card_login(storedData.email);
	} else {
		//welcomescreen.open();
		$$("#email").focus();
	}
}(document));
