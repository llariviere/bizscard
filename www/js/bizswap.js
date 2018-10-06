/* Bizswiper specific /var/www/node/socket/bizswiper/app/js/bizswap.js */

 var myApp = new Framework7({
	precompileTemplates: true,
	template7Pages: true,
	allowDuplicateUrls:true,
	modalTitle: 'Bizswiper',
	modalButtonCancel: 'Cancel...',
	modalPreloaderTitle: 'One moment please...',
	scrollTopOnStatusbarClick: true
});

var B = {
	about:'Bizswiper v0.3<br>2018-10'
};

var welcomescreen_slides = [
  {
    id: 'slide0', 
    title: 'Bizswiper',
    picture: '<form id="login_form" autocomplete="off"> \
              <div class="list-block" style="font-size:20px;">\
                <ul style="background: transparent;">\
                  <li class="item-content">\
                    <div class="item-inner">\
                      <div class="item-title label" style="text-align:right;">Email:&nbsp;</div>\
                      <div class="item-input">\
                        <input type="email" id="email" style="color:white" placeholder="Email" autocomplete="off">\
                      </div>\
                    </div>\
                  </li>\
                </ul>\
              </div>\
              <div class="list-block" style="font-size:20px;">\
                <ul style="background: transparent;">\
                  <li>\
                    <a href="#" onclick="card_login($$(\'#email\').val(),0,0)" class="item-link list-button color-white">Enter</a>\
                  </li>\
                </ul>\
              </div>\
            </form>',
    text: ''
  },
  {
    id: 'slide1',
    //title: 'Slide 1', // optional
    picture: '<div class="tutorialicon">✲</div>',
    text: ''
  },
  {
    id: 'slide2',
    //title: 'Slide 2', // optional
    picture: '<div class="tutorialicon">♫</div>',
    text: ''
  },
  {
    id: 'slide3',
    //title: 'NO TITLE', 
    picture: '<div class="tutorialicon">☆</div>',
    text: 'Thanks for reading! Enjoy this app.'
  }
];

var welcomescreen_options = {
  'bgcolor': 'rgb(65, 141, 175)',
  'fontcolor': '#fff',
  
  'closeButton': false,
  'open': false
}

var welcomescreen = myApp.welcomescreen(welcomescreen_slides, welcomescreen_options);



var $$ = Dom7;

var mycard = {};
var fields = {};
var cards_fields = {};
var cards = {
	current:[],
	waiting:[]
};
var fields_list = [];

var cards_templates = [
	'<div style="top:4px;left:0px;font-weight:bold;font-size:16px;">{{complete name}}{{firstname}} {{lastname}}</div>\
	<div style="top:28px;left:0px;">{{title}}</div>\
	<div style="top:46px;left:0px;">{{company name}}{{company}}</div>\
	<div style="top:75px;left:120px;">{{address}}</div>\
	<div style="top:90px;left:120px;">{{city}}, {{state_prov}} {{country}} {{postal code}}</div>\
	<div style="top:105px;left:120px;">{{website}}</div>\
	<div style="top:120px;left:120px;">E: {{email}}</div>\
	<div style="top:135px;left:120px;">C: {{cellphone}}</div>\
	<div style="top:150px;left:120px;">F: {{fax}}</div>\
	<div class="img" style="top:75px;left:0px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:20px;"></i>\
	</div>',
	
	'<div style="top:4px;left:120px;font-weight:bold;font-size:16px;">{{complete name}}{{firstname}} {{lastname}}</div>\
	<div style="top:28px;left:120px;">{{title}}</div>\
	<div style="top:46px;left:120px;">{{company name}}{{company}}</div>\
	<div style="top:75px;left:120px;">{{address}}</div>\
	<div style="top:90px;left:120px;">{{city}}, {{state_prov}} {{country}} {{postal code}}</div>\
	<div style="top:105px;left:120px;">{{website}}</div>\
	<div style="top:120px;left:120px;">E: {{email}}</div>\
	<div style="top:135px;left:120px;">C: {{cellphone}}</div>\
	<div style="top:150px;left:120px;">F: {{fax}}</div>\
	<div class="img" style="top:0px;left:0px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:20px;"></i>\
	</div>',
	
	'<div style="top:84px;width:50%;text-align:right;font-weight:bold;font-size:16px;">{{complete name}}{{firstname}} {{lastname}} |</div>\
	<div style="top:88px;left:50%;width:50%;text-align:left;">&nbsp;{{title}}</div>\
	<div style="top:104px;width:100%;text-align:center;">{{company name}}{{company}}</div>\
	<div style="top:120px;width:100%;text-align:center;">{{address}}, {{city}}</div>\
	<div style="top:136px;width:100%;text-align:center;">{{state_prov}} {{country}} {{postal code}}</div>\
	<div style="top:152px;width:50%;text-align:right;">{{website}} |</div>\
	<div style="top:152px;left:50%;width:50%;text-align:left;">&nbsp;E: {{email}}</div>\
	<div style="top:168px;width:50%;text-align:right;">C: {{cellphone}} |</div>\
	<div style="top:168px;left:50%;width:50%;text-align:left;">&nbsp;F: {{fax}}</div>\
	<div class="img" style="top:0px;width:75px;height:75px;left:50%;margin-left:-38px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:10px;"></i>\
	</div>'
];

var li_tpl = '<li> \
            <div class="item-content"> \
              <div class="item-inner"> \
                <div class="item-title label">{{label}}</div> \
                <div class="item-input"> \
                  {{input}} \
                </div> \
              </div> \
            </div> \
          </li>';
var input_tpl = '<input type="text" name="{{name}}" placeholder="{{placeholder}}" value="{{value}}"/>';

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

//var template = $$('#card-form').html();
var cardForm = Template7.compile($$('#card-form').html());

//var template = $$('#current-list').html();
var currentList = Template7.compile($$('#current-list').html());

//var template = $$('#waiting-list').html();
var waitingList = Template7.compile($$('#waiting-list').html());

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

var mySearchbar = {};

$$(document).on("click", ".card-item .item-content", function(){
	
	var context = $$(this).parent().dataset();
	
	context["titre"] = context.firstname + ' ' + context.lastname;
	
	card_form_open(context);
	
});

$$(document).on('form:success', 'form.ajax-submit', function (e) {
	
	myApp.alert("Recorded!");
	
	if ($$("form.ajax-submit input[name='id']").val()!=mycard.id) return false;
	
	$$.each($$(this).find("input, select"), function(i,e){
		if (e.name) mycard[e.name] = e.value;
	})
	
	card_populate("mycard",mycard);
	card_populate("thecard",mycard);
	
});


$$(".current-list-open").on("click", function(){
	
	var html = currentList(cards);
	
	mainView.router.loadContent(html);
	
	mySearchbar = myApp.searchbar('.searchbar', {
	    searchList: '.list-block-search',
	    searchIn: '.item-title'
	});   
	
});

$$(".waiting-list-open").on("click", function(){
	
	var html = waitingList(cards);
	
	mainView.router.loadContent(html);
	
});

$$(".card-camera-open").on("click", function(){
	$$("#add_card_list").html('');
	mainView.router.load({pageName: 'card-entry'});
	camera_open(false);
});

$$(".my-card-open").on("click", function(){
	card_form_open(mycard);
});

$$(".home-open").on("click", function () {
	mainView.router.load({pageName: 'index'});
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

$$(document).on("click", "i.fa-edit", function () {
	$$("ul.thecard, #thecard").toggleClass("disabled");
	$$("ul.card-form-ul-acc, div.card-form-buttons").toggleClass("hidden");
});



$$(".log-off").on("click", function(){
	myApp.formDeleteData('login_form');
	welcomescreen.open();
});

$$(".card_template").on("click", function() {
	$$(".card_template").removeClass("on");
	welcomescreen.open();
	$$(this).addClass("on");
	$$("#template_text").text($$(this).data("name"));
	$$("#template").val($$(this).attr("id"));
});

function card_about() {
	myApp.alert(B.about);
}
 
function card_form_star(star) {
	star = parseFloat(star*1);
	$$('li.reputation').find('input').val(star);
	$$.each($$('li.reputation').find('i.fa'), function(i,e){
		$$(e).removeClass("fa-star").removeClass("fa-star-o").removeClass("fa-star-half-o");
		var cls = ((i+0.5)==star?"-half-o":((i+1)>star?"-o":""));
		$$(e).addClass("fa-star"+cls);
	});
}

var draggie2 = '';

function card_form_open(context) {       else {
       	h = input_tpl.replace(/{{name}}/, fieldid).replace(/{{placeholder}}/, 'Your '+n.toLowerCase()).replace(/{{value}}/, v);
       	h = li_tpl.replace(/{{input}}/, h).replace(/{{label}}/, n);
       }
       
       (f.base ? h1 += h : h2 += h);
     }
	});
	
	context["template_text"] = templates_name[context.template];
	
	var html = cardForm(context);
	
	mainView.router.loadContent(html);
	
	card_populate('thecard',context);
	
	$$(".card-form-ul-"+cardid).html(h1+h2);
	
	//card_form_star(context.reputation);
	
	if (cardid != mycard.id) {	
	
		var h = $$("#thecard").width() / 3.5 * 2.0;
		var t = $$("#thecard").offset().top;
		$$("#thecard").data("top", t);
		$$("#thecard").css({"height": h, "bottom":t+h});
		
		if (!draggie2) {
			draggie2 = new Draggabilly( '#thecard', { axis:"y" });
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

function qrcode_open() {
	
	if (storageAvailable()) {
		if (localStorage.getItem('card_qr')) {
			qr_src = 'data:image/png;base64,' + localStorage.getItem('card_qr');
			$$("#qr_img").attr("src", qr_src);
		}
		else {
			socket.emit('card qr', {"cardid":mycard.id});
		}
	}
	
	myApp.pickerModal(".picker-qrcode");

}

function template_open(no) {
	$$(".card_template").eq(no).addClass("on")
	myApp.popup(".popup-templates");
}

function category_open() {
	myApp.popup(".popup-category");
	var code = '', code_text = '';
	var li = '<li><label class="label-radio item-content"><input type="radio" name="scian_level1" value="{{k}}"><div class="item-inner"><div class="item-title">{{v}}</div></div></label></li>';
	var HTML = $$(".scian-level1 ul").html();
	
	if (!HTML) {
		scian.a.map(function(obj) {
	   HTML += li.replace(/\{\{k\}\}/,obj.code).replace(/\{\{v\}\}/,obj.fr);
	});
	$$(".scian-level1 ul").html(HTML);
}
	
	$$(".scian-level1 ul > li").click(function(){
		code = $$(this).find("input").val();
		code_text = $$(this).find("div.item-title").text();
		$$("#scian").val(code);
		$$("#scian_text").text(code_text);
		myApp.accordionClose(".scian-level1");
		HTML = '';
		scian.b.map(function(obj) {
			if (obj.code.substr(0,2)==$$("#scian").val().substr(0,2)) {
				HTML += li.replace(/\{\{k\}\}/,obj.code).replace(/\{\{v\}\}/,obj.fr).replace(/level1/,'level2');
			}
		});
		$$(".scian-level2 ul").html(HTML);
		myApp.accordionOpen(".scian-level2") 
		
		$$(".scian-level2 ul > li").click(function(){
			code = $$(this).find("input").val();
			code_text = $$(this).find("div.item-title").text();
			$$("#scian").val(code);
			$$("#scian_text").text(code_text);
			myApp.accordionClose(".scian-level2");
			HTML = '';
			scian.c.map(function(obj) {
				if (obj.code.substr(0,3)==$$("#scian").val().substr(0,3)) {
					HTML += li.replace(/\{\{k\}\}/,obj.code).replace(/\{\{v\}\}/,obj.fr).replace(/level1/,'level3');
				}
			});
			$$(".scian-level3 ul").html(HTML);
			myApp.accordionOpen(".scian-level3") 
		
			$$(".scian-level3 ul > li").click(function(){
				code = $$(this).find("input").val();
				code_text = $$(this).find("div.item-title").text();
				$$("#scian").val(code);
				$$("#scian_text").text(code_text);
				myApp.accordionClose(".scian-level3");
				HTML = '';
				scian.d.map(function(obj) {
					if (obj.code.substr(0,4)==$$("#scian").val().substr(0,4)) {
						HTML += li.replace(/\{\{k\}\}/,obj.code).replace(/\{\{v\}\}/,obj.fr).replace(/level1/,'level4');
					}
				});
				$$(".scian-level4 ul").html(HTML);
				myApp.accordionOpen(".scian-level4");
		
				$$(".scian-level4 ul > li").click(function(){
					code = $$(this).find("input").val();
					code_text = $$(this).find("div.item-title").text();
					$$("#scian").val(code);
					$$("#scian_text").text(code_text);
					myApp.closeModal(".popup-scian");
				});
			});
		});
	});
}

function card_record(container) {	
	var pars = {};
	
	if ($$(container).data('id')) pars['id'] = $$(container).data('id');
	
	$$.each($$(container+" li"), function(i,li) {
		var label = $$(li).find(".label").text();
		var champ = $$(li).find("input").attr("name").toLowerCase();
		var valeur = $$(li).find("input").val().replace('-change-','').trim();
		var oblige = ($$(li).find("input").hasClass('base')); //  || $$(li).find("input").hasClass('category')
		
		// Skip incomplete fields name...
		if (!champ) return true;
		
		// For phone-like fields we filter all except number...
		if (['24','26','34','43','53','54'].indexOf(champ)>=0) valeur = valeur.replace(/[^0-9]/g, '');
		pars[champ] = valeur;
		
		// Delete non-mandatory field without value...
		if (valeur=='') {
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
		
		// If card exist, we update fields list...
		if (pars.id) {
			var updated = false;
			$$.each(cards_fields, function(i,cf){
				if (cf.card_id==pars['id'] && cf.field_id==champ) {
					cf.value = valeur;
					updated = true;
					return false;
				}
			});
			if (!updated) {
				cards_fields.push({
					"card_id": pars.id,
					"field_id":champ,
					"value":valeur
				});
			}
		}
	});
	
	if (!pars) return false;
	
	// Validate that email field is present and valid...
	if (pars['33']==undefined || !validateEmail(pars['33'])) {
		myApp.alert("You MUST have a valid value for the 'Email' field!");
		return false;
	}
	
	// Always identify the user...
	pars['owner'] = mycard.id;
	
	// For scan entry we record the original image...
	if (container=='#add_card_list' && scanImg.dataUrl!=undefined) pars['44'] = scanImg.dataUrl;
	
	// Send to sender...
	console.log(pars); //return;
	socket.emit('card record', pars);
	
	card_populate("thecard", pars);
	
	if ($$("#thecard_form input[name='id']").val()==mycard.id) {
		card_populate("mycard", pars);
	}
	
}

function card_recorder(data) {
	var list_field = ['company','companyname','firstname','lastname','email','id','poinst_img']
	var pars = {};
	$$.each($$("#add_card_list > li"), function(i,li) {
		var name = $$(li).find(".label").text().toLowerCase().replace(/\s/g,'');
		if (list_field.indexOf(name)!==false) pars[name] = $$(li).find("input").val();
	});
	pars['cardid'] = mycard.id;
	pars["accepted"] = 1;
	pars["id"] = data.id;
	cards.current.push(pars);
	for (var i=0; i<data.cards_fields.length; i++) {
		cards_fields.push(data.cards_fields[i]);
	}
	myApp.alert("New card added to your current list!");
	$$(".badge.current-list-nbr").html(cards.current.length);
	mainView.router.load({pageName: 'index'});
}

function card_populate(id,data) { 

	console.log(data)
	
	var cardid = data.id;
	var html = cards_templates[(data.template ? data.template : 0)];
	$$.each(['lastname','firstname','complete name','title','company','company name','address','city','state_prov','postal code','country','website','email','cellphone','fax','logo'], function(i,e){
		var v = '';
 		$$.each(fields, function (ii,f) {
			if(e==f.en) {
			  $$.each(cards_fields, function(iii,cf) {
			  	 if (cf.card_id==cardid && cf.field_id==f.id) {
			  	 	v = cf.value + '';
			  	 	return false;
			  	 }
			  });
			  return false;
			}
		});
		html = html.replace(new RegExp('{{'+e+'}}', 'g'), v);
	});
	
	if (id) {
		$$("#"+id+" .content").html(html);
		data.points_img = (data.points_img ? data.points_img : 'none');
		$$("#"+id+" .points > img").attr("src", "img/badge_"+ data.points_img.toLowerCase() +".png");
	}
	else {
		return html;
	}
			
}

function card_auth(id,action) {

	socket.emit('card '+action, {"cardid":mycard.id, "authid":id});
	
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

function card_login(email,password,create,auto_login) {
	
	// validation des champs de login...
	if (!email) return false;
	var regexp = /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/gi;
	if (!email.match(regexp)) {
		myApp.alert("Your email address doesn't respect the standards. Please correct it and try again.")
		welcomescreen.open();
		$$("#email").val('');
		$$("#email").focus();
		return false;
	}

	myApp.formStoreData('login_form', {
		"email":email
   });
   
   var uuid = '';
   if (typeof device === 'undefined') {
   	uuid = 'portable_louis';
   } else {
   	uuid = device.uuid;
   }
		   
	var login_data = {
		"email":email,
		"uuid":uuid
	}
	
	socket.emit('card login', login_data);

}

function card_reload() {
	socket.emit('card load', mycard["id"]);
}

var socket = io('https://bizswiper.com:3333/');
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
	
	switch(data.msg) {
		case "card not found":
			myApp.formDeleteData('login_form');
			myApp.alert("It's the first time you use this email from this device.<b>We sent a message to confirm ownership so please open it to have access.");
			welcomescreen.open();
			$$("#email").focus();
			break;
		case "card not confirmed":
			myApp.formDeleteData('login_form');
			myApp.alert("This email is not confirmed on this device.<br>We sent a new message to confirm ownership so please open it to have access.");
			welcomescreen.open();
			$$("#email").focus();
			break;
		case "card login try count":
			myApp.formDeleteData('login_form');
			myApp.alert("This email is not confirmed on this device and you exceeded the number of try without confirming.");
			welcomescreen.open();
			$$("#email").html('');
			$$("#email").focus();
			break;
		case "card logged in":
			socket.emit('card load', data.id);
		   welcomescreen.close();
		   myApp.alert('Synchronizing your data...<br>Please wait.');
		   geoPermission();
	}
	
});


socket.on('card load', function (data) {
	
	if (data.fields) fields = data.fields;
	if (data.cards_fields) cards_fields = data.cards_fields;
	
	mycard["id"] = data.id;
	mycard["points"] = parseInt(data.points);
	mycard["points_target"] = data.points_target;
	mycard["points_img"] = data.points_img;
	mycard["points_color"] = data.points_color;
	mycard["gender"] = data.gender;
	mycard["language"] = data.language;
	mycard["titre"] = "My profile";
	mycard["current"] = "0";
	mycard["own"] = "1";
	
	$$(".pieID.pie_text").html(mycard.points_img +'<br>'+ Math.round(mycard.points/mycard.points_target*100)+"%");
	$$(".pieID.legend span.actual").html(mycard.points+"");
	$$(".pieID.legend span.missing").html(mycard.points_target-mycard.points+"");
	$$(".pieID.legend span.target").html(mycard.points_target+"");
	
	var next_target = "Your next target:<br>Bronze";
	switch(mycard.points_img) {
		case "Bronze":	next_target = "Your next target:<br>Silver"; break;
		case "Silver": next_target = "Your next target:<br>Gold"; 	break;
		case "Gold": 	next_target = "Your next target:<br>Diamond";break;
		case "Diamond":
			next_target = "You're at the TOP!"; 			
			$$(".pieID.legend li.missing, .pieID.legend li.target").hide();
			break;
	}
	$$(".pieID.legend span.next_target").html(next_target);
	$$(".pieID.pie").addClass(mycard.points_img.toLowerCase());
	pie_create(".pieID.legend", ".pieID.pie");
	
	card_populate('mycard',mycard);
	
	
	
	var h = $$("#mycard").width() / 3.5 * 2.0;
	var t = $$("#mycard").offset().top;
	$$("#mycard").data("top", t);
	$$("#mycard").css({"height": h, "bottom":t+h});
	
	var draggie = new Draggabilly( '#mycard', { axis:"y" });
	draggie.on( 'dragEnd', function( event, pointer ) {
		if (this.position.y < (t-h)) {
			card_offered('mycard',mycard.id);
		} else {
			card_offer_completed('mycard');
		}
	});
	draggie.on( 'staticClick', function(){ card_offer('mycard',mycard.id); });
	
	if (data.cards) {
		cards = data.cards;
		if (cards.current) $$(".badge.current-list-nbr").html(cards.current.length);
		if (cards.waiting) $$(".badge.waiting-list-nbr").html(cards.waiting.length);
	}
	
	/*
	if (!data.firstname || !data.lastname || !data.cellphone) {
		card_form_open(mycard);
		myApp.alert("Your card is not complete<br>Please enter something in the mandatory fields.");
	}
	*/
	myApp.hidePreloader();
	
}); // socket on load
				
socket.on('card record', function (data) {
	
	switch(data.msg) {
		case "UPDATED":
			myApp.alert("Card updated!");
			break;
		case "EMAIL_EXIST":
			if (data.id==mycard.id) {
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
							card_auth(data.id,'accept')
							mainView.router.load({pageName: 'index'});
						}}
					]
				});
			} else {
				myApp.modal({
					title: 'Existing email?', 
					text: '<b>This email address is already used on a card!</b><br>Do you want to add it?', 
					buttons: [
						{ text: "No thanks", onClick: function(){
							myApp.alert("You should change the email address...");
							$$("#add_card_list input[type='email']").focus();
						} },
						{ text: "Yes, add it", onClick: function(){
							data["cardid"] = mycard.id;
							socket.emit("card add",data);
							mainView.router.load({pageName: 'index'});
						}}
					]
				});
			}
			break;
		case "INSERTED":
			card_recorder(data);
			break;
	}
	
});

socket.on('card add', function(data){
	var list_field = ['company','firstname','lastname','email','id','poinst_img']
	var pars = {};
	for (var i=0; i<data.cards_fields.length; i++) {
		var name = '';
		for (var ii=0; ii<fields.length; ii++) {
			if (fields[ii].id==data.cards_fields[i].field_id) {
				name = fields[ii].en.toLowerCase().replace(/\s/g,'');
				break;
			}
		}
		if (list_field.indexOf(name)!==false) pars[name] = data.cards_fields[i].value;
		cards_fields.push(data.cards_fields[i]);
	}
	pars['cardid'] = mycard.id;
	pars["accepted"] = data.card.accepted;
	pars["id"] = data.card.id;
	if (data.card.accepted==null) {
		myApp.alert("Card added to your waiting list!")
		cards.waiting.push(data.card);
		$$(".badge.waiting-list-nbr").html(cards.waiting.length);
	} 
	else {
		myApp.alert("Card added to your current list!")
		cards.current.push(data.card);
		$$(".badge.current-list-nbr").html(cards.current.length);
	}
	
	mainView.router.load({pageName: 'index'});
});

socket.on('card details', function(data){
	// si la carte n'est pas deja dans mes listes (added!=null)...
	for (var i=0; i<data.cards_fields.length; i++) {
		cards_fields.push(data.cards_fields[i]);
	}
	if (data.card.accepted==null) {
		myApp.alert("Card added to your waiting list!")
		cards.waiting.push(data.card);
		$$(".badge.waiting-list-nbr").html(cards.waiting.length);
	} 
	else {
		myApp.alert("Card added to your current list!")
		cards.current.push(data.card);
		$$(".badge.current-list-nbr").html(cards.current.length);
	}
});
socket.on('card accepted', function(data){
	if (data.msg=='OK') {
		myApp.alert("Card accepted and transfered to your current card list!");
		
		for (var i=0; i<cards.waiting.length; i++) {
			if (cards.waiting[i].id==data.id) {
				cards.current.push(cards.waiting[i]);
				cards.waiting.splice(i,1);
				mainView.router.load({pageName: 'index'});
			}
		}
		
		if (cards.current) $$(".badge.current-list-nbr").html(cards.current.length);
		if (cards.waiting) $$(".badge.waiting-list-nbr").html(cards.waiting.length);
	}
});
socket.on('card refused', function(data){
	if (data.msg=='OK') {
		myApp.alert("Card deleted from your waiting card list!");
		
		for (var i=0; i<cards.waiting.length; i++) {
			if (cards.waiting[i].id==data.id) {
				cards.waiting.splice(i,1);
				mainView.router.load({pageName: 'index'});
			}
		}
		
		if (cards.waiting) $$(".badge.waiting-list-nbr").html(cards.waiting.length);
	}
});
socket.on('card deleted', function(data){
	if (data.msg=='OK') {
		myApp.alert("Card deleted from your current card list!");
		
		for (var i=0; i<cards.current.length; i++) {
			if (cards.current[i].id==data.id) {
				cards.current.splice(i,1);
				$$("li.card-item.item"+data.id).remove();
				mainView.router.back();
				//mainView.router.load({pageName: 'index'});
			}
		}
		
		if (cards.current) $$(".badge.current-list-nbr").html(cards.current.length);
	}
});
socket.on('card qr', function(data){
  if (data.image) {
  	 if (storageAvailable()) localStorage.setItem('card_qr', data.buffer);
    qr_src = 'data:image/png;base64,' + data.buffer;
    $$("#qr_img").attr("src", qr_src);
  }
});
socket.on('card connected', function(data){
  console.log("card connected response: "+data)
});
socket.on('custom field', function(data){
  	myApp.alert(data.msg);
			
  	fields.push({"id":data.id,"en":data.field,"fr":data.field,"base":0,"order":255});
  	
	var li = $$("#add_card_list").find("li.ii_"+data.ii);
	li.find(".label").attr("data-i",data.id);
	li.find(".label").text(data.field);
	li.find("input").attr("name",data.id);
	myApp.closeModal(".choseModal");
});

function add_card_load(container) {

	var html = '<li class="list-item ii_1">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="35" data-id="1">Email</div>\
	                <div class="item-input">\
	                  <input type="email" name="33" value="" placeholder="your email" class="base" />\
	                </div>\
	              </div>\
	            </div>\
	          <li class="list-item ii_2">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="35" data-id="2">Firstname</div>\
	                <div class="item-input">\
	                  <input type="text" name="35" value="" placeholder="your firstname" class="base" />\
	                </div>\
	              </div>\
	            </div>\
	          </li>\
	          <li class="list-item ii_3">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="38" data-id="3">Lastname</div>\
	                <div class="item-input">\
	                  <input type="text" name="38" value="" placeholder="your lastname" class="base" />\
	                </div>\
	              </div>\
	            </div>\
	          </li>\
	          <li class="list-item ii_4">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="26" data-id="4">Cellphone</div>\
	                <div class="item-input">\
	                  <input type="tel" name="26" value="" placeholder="your callphone" class="base" />\
	                </div>\
	              </div>\
	            </div>\
	          </li>\
	          <li class="list-item ii_5">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="29" data-id="5">Company</div>\
	                <div class="item-input">\
	                  <input type="text" name="29" value="" placeholder="your company name" class="base" />\
	                </div>\
	              </div>\
	            </div>\
	          </li>\
	          <li class="list-item ii_6">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="49" data-id="6">Category</div>\
	                <div class="item-input">\
	                  <input type="text" name="49" value="" placeholder="your company category" class="category" />\
	                </div>\
	              </div>\
	            </div>\
	          </li>';
	
	$$(container).html(html);

}

function add_card_li_match(container,ii,v) {
	
	if (typeof v === "undefined") return false;
	if (v.toString().replace(/^[^\d\w]$/,'')=='') return false;
	
	
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
		if (!$$(container).find("input[name='29']").val()) {
			$$(container+" input[name='29']").val(v);
			cls = 'off';
		}
	}
	else if (v.match(Name)) {
		if (!$$(container).find("input[name='35']").val()) {
			var names = v.split(' ');
			$$(container+" input[name='35']").val(names[0]);
			$$(container+" input[name='38']").val(names[1]);
			cls = 'off';
		}
	}
	else if (v.match(Email)) {
		if (!$$(container).find("input[name='33']").val()) {
			$$(container+" input[name='33']").val(v);
			cls = 'off';
		}
	}
	else if (v.match(Cel)) {
		if (!$$(container).find("input[name='26']").val()) {
			var telno = v.replace(/[^\d]/g,'');
			$$(container+" input[name='26']").val(telno);
			cls = 'off';
		}
	}
	/*
	else if (v.match(Website)) {
		if ($$(container).find("input[name='41']").length==0) i = 41;
		cls = 'off';
	}
	else if (v.match(Fax)) {
		if ($$(container).find("input[name='34']").length==0) i = 34;
		cls = 'off';
	}
	else if (v.match(Tel)) {
		if ($$(container).find("input[name='24']").length==0) i = 24;
		cls = 'off';
	}
	else if (v.match(Add)) {
		if ($$(container).find("input[name='22']").length==0) i = 22;
		cls = 'off';
	}
	*/
	
	//var ocr_words = v.replace(/\b([\u00C0-\u00FFa-zA-Z0-9\.\-\@]+)\b/g, '<span class="word '+cls+'">$1</span>');
	var ocr_words = v.trim().split(' ');
	for (var i=0; i<ocr_words.length; i++) {
		ocr_words[i] = '<span class="word '+cls+'">'+ocr_words[i].trim()+'</span>';
	}
	$$("#card_ocr_words").append('<div>'+ocr_words.join('')+'</div>');
	
}
function add_card_li(container,ii,v) {
	
	var l = '-change-', n = '', p = '', i = '';
	
	$$.each(fields, function(ii,kv) {
		if (i==kv.id) {
			n = kv["en"];
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			return false;
		}
	});
	
	if (v=="-change-") {
		p = v; v = '';
	}
	
	var li = '<li class="list-item ii_'+ii+'">\
	            <div class="item-content">\
	              <div class="item-inner"> \
	                <div class="item-title label" data-i="'+i+'" data-id="'+ii+'">'+l+'</div>\
	                <div class="item-input">\
	                  <input type="text" name="'+i+'" value="'+v+'" placeholder="'+p+'" class="new"/>\
	                </div>\
	              </div>\
	            </div>\
	          </li>';
	
	          
	$$(container).append(li);
	
	$$(container).find(".item-input input.new").on("click", function(){
		if ($$(this).val()) return false;
		B['input_name'] = $$(this).attr("name");
		myApp.pickerModal(".picker-ocr-words");
	});
	
}

function add_card_init(container) {
	
	$$(container).find(".item-input input.base").on("click", function(){
		if ($$(this).val()) return false;
		B['input_name'] = $$(this).attr("name");
		myApp.pickerModal(".picker-ocr-words");
	});
	
	$$(container).find(".item-input input.category").on("click", function(){
		B['input_name'] = $$(this).attr("name");
		category_open()
	});
	
	var html = 'OR<div class="list-block" style="margin-top:5px;"><input id="card_ocr_input" type="text" name="" value="" placeholder="Custom text..."/></div>';
	$$("#card_ocr_words").append(html);
	$$("#card_ocr_words").find(".word").on("click", function(event) {
		$$(event.target).toggleClass("on");
	});
	$$("#card_ocr_input").on("change", function(){
		$$("#card_ocr_words").find(".word").removeClass("on");
	});
	$$("#card_ocr_ok").on("click", function(){
			var txt = [];
			$$("#card_ocr_words .word.on").each(function(){ txt.push($$(this).text()); $$(this).addClass("off") });
			var txts = txt.join(" ") + ' ' + $$("#card_ocr_input").val();
			$$("#card_ocr_words").find(".word").removeClass("on");
			$$("#card_ocr_input").val('');
			if (txts.trim()!='') $$(container+" input[name='"+B.input_name+"']").val(txts);
	});
}

function card_field_add(container) {
	var ii = $$(container+" > li").length + 1;
	card_open_picker(container,ii,0,true);
}

function card_open_picker(container,ii,i,add_new) {
	var l = '', n = '', html = '';
	var li_tpl = '<li>' +
			      '<label class="label-radio item-content">' +
			        '<input type="radio" name="{{ii}}" value="{{i}}" data-name="{{l}}" {{checked}}>' +
			        '<div class="item-media">' +
			          '<i class="icon icon-form-checkbox"></i>' +
			        '</div>' +
			        '<div class="item-inner">' +
			          '<div class="item-title">{{l}}</div>' +
			        '</div>' +
			      '</label>' +
			    '</li>';
	
	var not_used = '';
	if (!add_new && 0) {
		not_used = '<li>' +
			      '<label class="label-radio item-content">' +
			        '<input type="radio" name="'+ii+'" value="" data-name="-change-">' +
			        '<div class="item-media">' +
			          '<i class="icon icon-form-checkbox"></i>' +
			        '</div>' +
			        '<div class="item-inner">' +
			          '<div class="item-title">Not used</div>' +
			        '</div>' +
			      '</label>' +
			    '</li>';
	}
	$$.each(fields, function(k,v) {
		if ($$(container).find("input[name='"+v.id+"']").length==0) {
			n = v["en"];
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			html += li_tpl.replace(/{{ii}}/,ii).replace(/{{i}}/,v.id).replace(/{{l}}/g,l);
		}
		if (v.id==i) {
			n = v["en"];
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			html += li_tpl.replace(/{{ii}}/,ii).replace(/{{i}}/,v.id).replace(/{{l}}/g,l).replace(/{{checked}}/,'checked="checked"');
		}
	});	
	
	myApp.pickerModal(
    '<div class="picker-modal choseModal" style="height:100%">' +
      '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
          '<div class="left"><a href="#" class="close-picker">Cancel</a></div>' +
          'Choose a field' +
          '<div class="right"><a href="#" class="ok-picker">Ok</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="picker-modal-inner" style="overflow:scroll;">' +
        '<div class="list-block" style="overflow:scroll;">' +
			  '<ul style="overflow:scroll;">' +
			  	 not_used +
			    html +
			  	 '<li>' +
			      '<label class="label-radio item-content">' +
			        '<input type="radio" name="'+ii+'" value="999" data-name="Custom field">' +
			        '<div class="item-media">' +
			          '<i class="icon icon-form-checkbox"></i>' +
			        '</div>' +
			        '<div class="item-inner">' +
			          '<div class="item-title">Custom Field <i class="fa fa-cube"></i></div>' +
			        '</div>' +
			      '</label>' +
			    '</li>' +
			  '</ul>' +
			'</div>' +
      '</div>' +
    '</div>'
  );
  
  $$(".picker-modal .ok-picker").on("click", function(){
  		var n = $$(".picker-modal").find("input[name='"+ii+"']:checked").data("name");
  		var i = $$(".picker-modal").find("input[name='"+ii+"']:checked").val();
  		
	  	if (add_new) {
		 	add_card_li(container, ii,'-change-')
	  	}
  		if (i==999) {
  			myApp.prompt('What is the field\'s name?', 'Custom Field <i class="fa fa-cube"></i>', function (value) {
  				if (value.replace(/\s/g,'')=='') return false;
  				card_custom_field_validate(ii, value);
		   },
		   function(){
		   	$$(container+" li").eq($$(container+" li").length-1).remove();
		   });

		   /*
  			$$(".picker-modal").on("closed", function(){
  				card_custom_field_picker(ii);
  			});
			*/
  		}  else {
			var li = $$(container).find("li.ii_"+ii);
			li.find(".label").attr("data-i",i);
			li.find(".label").text(n);
			li.find("input").attr("name",i);
			myApp.closeModal(".choseModal");
			B['input_name'] = i;
			myApp.pickerModal(".picker-ocr-words");
		}
		
  });
}

function card_custom_field_picker(ii) {
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
		var li = $$("#add_card_list").find("li.ii_"+ii);
		li.find(".label").data("i",i);
		li.find(".label").text(n);
		li.find("input").attr("name",i);
  });
}

function card_custom_field_validate(ii, v) {
	if (v=="") return false;
	var pars = {"owner":mycard.id,"ii":ii,"field":v}
	socket.emit('custom field', pars);
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
	   	text: err+'You have to activate GeoLocation in your app parameters for Bizswiper card exchange to work.', 
	   	buttons: [
				{ text: "Ok", onClick: function () {} }
			]
  		});
	}
	
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};
	
	navigator.geolocation.getCurrentPosition(success, error, options);
	//success({lat:45.6105491,lng:-73.5094794,alt:0}); // manual override for testing...
}

(function (document) {
	document.addEventListener("backbutton", function(e){
		e.preventDefault();
		mainView.router.back();
	}, false);
	
	var storedData = myApp.formGetData('login_form');
	
	if (storedData) {
		card_login(storedData.email,storedData.password,false,true);
	} else {
		welcomescreen.open();
		$$("#email").focus();
	}
}(document));
