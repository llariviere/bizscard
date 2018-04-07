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
var cards_templates = [
	'<div style="top:4px;left:0px;font-weight:bold;font-size:16px;">{{first name}} {{last name}}</div>\
	<div style="top:28px;left:0px;">{{title}}</div>\
	<div style="top:46px;left:0px;">{{company name}}</div>\
	<div style="top:75px;left:120px;">{{address}}</div>\
	<div style="top:90px;left:120px;">{{city}}, {{state_prov}} {{country}} {{postal code}}</div>\
	<div style="top:105px;left:120px;">{{website}}</div>\
	<div style="top:120px;left:120px;">E: {{email principal}}</div>\
	<div style="top:135px;left:120px;">C: {{cellphone}}</div>\
	<div style="top:150px;left:120px;">F: {{fax}}</div>\
	<div class="img" style="top:75px;left:0px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:20px;"></i>\
	</div>',
	
	'<div style="top:4px;left:120px;font-weight:bold;font-size:16px;">{{first name}} {{last name}}</div>\
	<div style="top:28px;left:120px;">{{title}}</div>\
	<div style="top:46px;left:120px;">{{company name}}</div>\
	<div style="top:75px;left:120px;">{{address}}</div>\
	<div style="top:90px;left:120px;">{{city}}, {{state_prov}} {{country}} {{postal code}}</div>\
	<div style="top:105px;left:120px;">{{website}}</div>\
	<div style="top:120px;left:120px;">E: {{email principal}}</div>\
	<div style="top:135px;left:120px;">C: {{cellphone}}</div>\
	<div style="top:150px;left:120px;">F: {{fax}}</div>\
	<div class="img" style="top:0px;left:0px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:20px;"></i>\
	</div>',
	
	'<div style="top:84px;width:50%;text-align:right;font-weight:bold;font-size:16px;">{{first name}} {{last name}} |</div>\
	<div style="top:88px;left:50%;width:50%;text-align:left;">&nbsp;{{title}}</div>\
	<div style="top:104px;width:100%;text-align:center;">{{company name}}</div>\
	<div style="top:120px;width:100%;text-align:center;">{{address}}, {{city}}</div>\
	<div style="top:136px;width:100%;text-align:center;">{{state_prov}} {{country}} {{postal code}}</div>\
	<div style="top:152px;width:50%;text-align:right;">{{website}} |</div>\
	<div style="top:152px;left:50%;width:50%;text-align:left;">&nbsp;E: {{email principal}}</div>\
	<div style="top:168px;width:50%;text-align:right;">C: {{cellphone}} |</div>\
	<div style="top:168px;left:50%;width:50%;text-align:left;">&nbsp;F: {{fax}}</div>\
	<div class="img" style="top:0px;width:75px;height:75px;left:50%;margin-left:-38px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:10px;"></i>\
	</div>'
];

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
	
	context["titre"] = context.firstname +" "+ context.lastname;
	
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

$$(".card-cropper-open").on("click", function(){
	mainView.router.load({pageName: 'card-cropper'});
	openCamera(false);
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
	$$("ul.thecard").toggleClass("disabled");
	$$("ul.card-form-ul-acc, div.card-form-buttons").toggleClass("hidden");
});

function card_offer() {
	
	$$("#mycard .thumb").show();
	$$('#mycard').css({ 'top': $$('#mycard').data('top') })
	
	if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/) && 0) {
		$$('#mycard').css("bottom", 500);
	} 
	else {
		
		$$('#mycard').animate(
		    { 'top': 10 },
		    {
		        duration: 500,
		        easing: 'swing',
		        begin: function (elements) {},
		        complete: card_offered
		    }
		);
	}
}

function card_offered() {
   myApp.alert('Card offered...');
   geoloc();
   card_offer_complete();
}

function card_offer_complete() {
	$$('#mycard .thumb').hide();
	$$('#mycard').animate( 
		{ 'top': $$('#mycard').data('top') }, 
		{ complete: function(){ $$(".no-thumb").show() } }
	);
} 

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

function card_form_star(star) {
	star = parseFloat(star*1);
	$$('li.reputation').find('input').val(star);
	$$.each($$('li.reputation').find('i.fa'), function(i,e){
		$$(e).removeClass("fa-star").removeClass("fa-star-o").removeClass("fa-star-half-o");
		var cls = ((i+0.5)==star?"-half-o":((i+1)>star?"-o":""));
		$$(e).addClass("fa-star"+cls);
	});
}

function card_form_open(context) {
	
	context["template_text"] = templates_name[context.template];
	
	if (context.birthdate) context["birthdate"] = context.birthdate.substr(0,10);
	
	var html = cardForm(context);
	
	mainView.router.loadContent(html);
	
	card_populate('thecard',context);
	
	var cardid = context.id;
	var v = '', n = '', fieldid = '', h = '', h2 = '';
	var h1 = '<input type="hidden" name="id" value="'+cardid+'"/>';
 	$$.each(fields, function (ii,f) {
 	  if (f.id == 36 || f.id == 37 || f.id == 30) return true;
 	  v = '';
	  $$.each(cards_fields, function(iii,cf) {
	  	 if (cf.card_id==cardid && cf.field_id==f.id) {
	  	 	v = cf.value + '';
	  	 	fieldid = cf.field_id;
	  	 	return false;
	  	 }
	  });
	  if (f.base || v!='') {
       n = f['en'].charAt(0).toUpperCase() + f['en'].substr(1)
       h = '<li> \
            <div class="item-content"> \
              <div class="item-inner"> \
                <div class="item-title label">'+n+'</div> \
                <div class="item-input"> \
                  <input type="text" name="'+fieldid+'" placeholder="Your '+n+'" value="'+v+'"/> \
                </div> \
              </div> \
            </div> \
          </li>';
       (f.base ? h1 += h : h2 += h);
     }
	});
	$$(".card-form-ul-"+cardid).html(h1+h2);
	
	//card_form_star(context.reputation);
	
}

function card_form_add_field(cardid) {
	
	var fields_keys = [];
	var fields_vals = [];
	$$.each(fields, function (k,v) {
		if ($$(".card-form-ul-"+cardid).find("input[name='"+v.id+"']").length==0) {
			fields_keys.push(v.id);
			fields_vals.push(v.en);
		}
	});
	fields_keys.push(0);
	fields_vals.push('custom field');
	
	console.log(fields_vals.length)
	
	var fields_picker = myApp.picker({
		input: ".card_form_add_field",
		toolbarCloseText: 'Close',
		cols: [
			{
				values: fields_keys,
				displayValues: fields_vals
			}
		],
		onClose: function(p){
       	h = '<li> \
            <div class="item-content"> \
              <div class="item-inner"> \
                <div class="item-title label">'+p.displayValue[0]+'</div> \
                <div class="item-input"> \
                  <input type="text" name="'+p.value[0]+'" placeholder="Your '+p.displayValue[0]+'" value=""/> \
                </div> \
              </div> \
            </div> \
          </li>';
         $$(".card-form-ul-acc").append(h);
			fields_picker.destroy();
		}
	});  
	fields_picker.open();
}

function card_form_record(){
	
	//////////////////////////////////////////
	mainView.router.load({pageName: 'index'});
	cropper_init();
	return false;
	//////////////////////////////////////////
	
	var pars = {};
	
	$$.each($$("#thecard_form").find("input, select"), function(i,e){
		if (e.name) {
			pars[e.name] = e.value;
		}
	});
	
	socket.emit('card record', pars);
	
	card_populate("thecard",pars);
	
	if ($$("#thecard_form input[name='id']").val()!=mycard.id) return false;
	
	mycard = pars;
	
	card_populate("mycard",mycard);
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

function card_add() {
	
	//////////////////////////////////////////
	mainView.router.load({pageName: 'index'});
	cropper_init();
	return false;
	//////////////////////////////////////////
	
	var pars = {};
	$$.each($$("#add_card_list > li"), function(i,li) {
		var name = $$(li).find(".label").text().toLowerCase();
		pars[name] = $$(li).find("input").val();
	});
	pars['cardid'] = mycard.id;
	socket.emit('card record', pars);
}


function geoloc() {
		
	if (!navigator.geolocation){
		myApp.alert("Geolocation is not supported by your device!");
		return false;
	}

	function success(o) {
		//socket.emit('card offer', {"cardid":mycard.id, "lat":o.lat, "lng":o.lng, "alt":o.alt}); // manual override for testing...
		var p = o.coords;
		socket.emit('card offer', {"cardid":mycard.id, "lat":p.latitude, "lng":p.longitude, "alt":p.altitude});
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




function card_populate(id,data) { 
	
	var cardid = data.id;
	var html = cards_templates[(data.template ? data.template : 0)];
	$$.each(['first name','last name','title','company name','address','city','state_prov','postal code','country','website','email principal','cellphone','fax','logo'], function(i,e){
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

// ...section ranking.


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
	
	console.log(login_data)
	
	socket.emit('card login', login_data);
	
	

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
    //myApp.alert("You have lost your connection with the server!")
});
socket.on('reconnect', function () {
    $connected = true;
    console.log('$connected = '+$connected);
    //myApp.alert("You are re-connected with the server!")
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
	}
	
});


socket.on('card load', function (data) {
	
	console.log(data);
	fields = data.fields;
	cards_fields = data.cards_fields;
	
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
			card_offered();
		} else {
			card_offer_complete();
		}
	});
	draggie.on( 'staticClick', card_offer);
	
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
			myApp.alert("<b>This email address is already used on a card!</b><br>Please change it and try again.");
			$$("#add_card_list input[type='email']").focus();
			break;
		case "INSERTED":
			var pars = {};
			$$.each($$("#add_card_list > li"), function(i,li) {
				var name = $$(li).find(".label").text().toLowerCase();
				pars[name] = $$(li).find("input").val();
			});
			pars['cardid'] = mycard.id;
			pars["id"] = data.id;
			cards.current.push(pars);
			myApp.alert("New card added to your current list!");
			mainView.router.load({pageName: 'index'});
			break;
	}
	
});
socket.on('cards list', function(data){
	
	myApp.hidePreloader();

	if (!data) return false; 
	
	$$("#pulser").hide();
 		
	if (data.length > 1) {
		var text = '<div class="list-block" id="cards_found"><table style="width:100%;">';
		var fnds = [];
 			
		var titre = (data.length > 2 ? "We found those offers<br>(clic to accept)" : "We found this offer<br>(clic to accept)");
 			
		$$.each(data, function(i,card){
			var fullname = (card.firstname && card.lastname ? card.firstname+' '+card.lastname : card.email);
			var linked = (card.accepted ? "fa-id-card-o" : (card.added ? "fa-id-card" : "fa-check-square-o"));
 				
			if (card.card!=mycard.id) fnds.push('<tr style="border-bottom:solid 1px #bbb;" onClick="card_auth('+card.card+',\'offer auth\');myApp.closeModal()">\
<td align="left">'+fullname+'</td>\
<td align="right"><i class="fa '+linked+'"></i></td>\
</tr>');
		});
 			
		text += fnds.join('<tr><td colspan="3"><hr></td></tr>') + '</table></div>';
 			
		myApp.modal({title: titre, text: text, buttons: [
			{ text: "Cancel", onClick: function(){}}
		]});
	}

});
socket.on('card details', function(data){
	// si la carte n'est pas deja dans mes listes (added!=null)...
	if (data.added==null) {
		myApp.alert("Card added to your waiting list!")
		cards.waiting.push(data);
		$$(".badge.waiting-list-nbr").html(cards.waiting.length);
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
				mainView.router.load({pageName: 'index'});
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

var add_card_li = function (ii,c,v) {
	var Name = /^[a-zéè\-]{2,}\s[a-zéè\-]{2,}$/i;
	var Company = /\s(lt[eéè]e)|\s(inc)|\s(enr)/i;
	var Email = /\w+@\w+/;
	var Website = /(www.)|(.com)|(.ca)/i;
	var i = '';
	if (v.match(Company)) {
		i = 29;
	}
	else if (v.match(Name)) {
		i = 30;
	}
	else if (v.match(Email)) {
		i = 33;
	}
	else if (v.match(Website)) {
		i = 41;
	} 
	
	var l = ii, n = '';
	
	$.each(fields, function(ii,kv) {
		if (i==kv.id) {
			n = kv["en"];
			l = n.substr(0,1).toUpperCase() + n.substr(1).toLowerCase();
			return false;
		}
	});
	
	var li = '<li class="list-item">\
	            <div class="item-content">\
	              <div class="item-media color-red"><i class="fa fa-times-circle"></i></div>\
	              <div class="item-inner"> \
	                <div class="item-title label" onClick="card_set_field(0,'+ii+')">'+l+'</div>\
	                <div class="item-input">\
	                  <input type="text" name="'+i+'" value="'+v+'"/>\
	                </div>\
	              </div>\
	            </div>\
	          </li>';
	$$("#add_card_list").html($$("#add_card_list").html()+li);
	
}

function card_field_add(p) {
 	h = '<li class="list-item"> \
      <div class="item-content"> \
	     <div class="item-media color-red"><i class="fa fa-times-circle"></i></div>\
        <div class="item-inner"> \
          <div class="item-title label">'+p.displayValue[0]+'</div> \
          <div class="item-input"> \
            <input type="text" name="'+p.value[0]+'" placeholder="Your '+p.displayValue[0]+'" value=""/> \
          </div> \
        </div> \
      </div> \
    </li>';
   $$("#add_card_list").append(h);
	p.destroy();
}

function card_set_field(add,id) {
	
	var fields_keys = [];
	var fields_vals = [];
	$$.each(fields, function (k,v) {
		if ($$("#add_card_list").find("input[name='"+v.id+"']").length==0) {
			fields_keys.push(v.id);
			fields_vals.push(v.en);
		}
	});
	fields_keys.push(0);
	fields_vals.push('custom field');
	
	var fields_picker = myApp.picker({
		input: ".card_set_field",
		toolbarCloseText: 'Close',
		cols: [
			{
				values: fields_keys,
				displayValues: fields_vals
			}
		],
		onClose: (add ? card_field_add : card_field_set)
	});  
	fields_picker.open();
}

socket.on('card ocr', function(data){
	$$("#add_card_list").html('');
	$$("#card-entry").find("img").attr("src",data.img);
	myApp.alert(data.ocr);
	var lignes = data.ocr.split("\n");
	for (var i=0; i<lignes.length; i++) {
		var ligne = lignes[i].replace(/^[ ]+|[ ]+$/g,'');
		if (ligne.length) add_card_li(i,'Comment',ligne);
	}
	$$("#add_card_list").find(".color-red").on("click", function () {
		$$(this).parents("li").remove();
	});
	mainView.router.load({pageName: 'card-entry'});
	
	$$("#img_upload").attr('src','').hide();
	cropper_init();
});

function online(event) {
  $online = (event.type=='online');
}

function _init() {
	
	var storedData = myApp.formGetData('login_form');
	
	if (storedData) {
		card_login(storedData.email,storedData.password,false,true);
	} else {
		welcomescreen.open();
		$$("#email").focus();
	}
	
}

_init();

// camera....

	function setOptions(srcType) {
	    var options = {
	        // Some common settings are 20, 50, and 100
	        quality: 50,
	        destinationType: Camera.DestinationType.FILE_URI,
	        // In this app, dynamically set the picture source, Camera or photo gallery
	        sourceType: srcType,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE,
	        allowEdit: false,
	        correctOrientation: true  //Corrects Android orientation quirks
	    }
	    return options;
	}
	
	function openCamera(selection) {
 
	    var srcType = Camera.PictureSourceType.CAMERA;
	    var options = setOptions(srcType);
	    var func = displayImage;
	 
	    navigator.camera.getPicture(function cameraSuccess(imageUri) {
	        func(imageUri);
	    }, function cameraError(error) {
	        console.debug("Unable to obtain picture: " + error, "app");
	    }, options);
	}
	
	function displayImage(imgUri) {
	 	 $$("#img_upload").attr('src',imgUri).show();
	 	 readImage(imgUri,  function(base64) {  
	 	 	img_base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
		 });
	}
	
	function readImage(url, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.onload = function() {
	    var reader = new FileReader();
	    reader.onloadend = function() {
	      callback(reader.result);
	    }
	    reader.readAsDataURL(xhr.response);
	  };
	  xhr.open('GET', url);
	  xhr.responseType = 'blob';
	  xhr.send();
	}
	
	
var opacity = .5;
function pulsation(e) { if (e.hasClass("on")) e.animate({opacity:opacity},{complete: pulsation(e)}); opacity = (opacity==.5 ? 1 : .5) }

var coords = [];
var doch = $$("body").height()-44;
var docw = $$("body").width();
var img_base64 = ''; 
var img_ratio = doch; 

	
function cropper_init() {
   'use strict';
    	
	$$("#img_record_btn").removeClass("on")
	$$("#img_record_btn").find('div').text("Save");
	
	$$(".container").css({
		"width": docw+'px',
		"height": doch+'px',
		"top": '44px',
		"left": '0'	
	});
	
	$$("#corner1").css({left:'0px', top:'0px'});
	$$("#corner2").css({left:(docw-60)+'px', top:'0px'});
	$$("#corner3").css({left:(docw-60)+'px', top:(doch-50)+'px'});
	$$("#corner4").css({left:'0px', top:(doch-50)+'px'});
	
	$$("#visualElements").append('<canvas id="demoCanvas" width="'+docw+'" height="'+doch+'"></canvas>');
		
	var canvas = document.getElementById("demoCanvas");
	var c2 = canvas.getContext("2d");
    
    var drawPoly = function() {
    	
        c2.clearRect(0, 0, docw, doch);
        c2.beginPath();
        c2.moveTo(0,0);
        c2.lineTo(docw, 0);
        c2.lineTo(docw, doch);
        c2.lineTo(0, doch);
        c2.closePath();
        c2.fillStyle = "rgba(0, 0, 0, .5)";
        c2.fill();
        
        c2.globalCompositeOperation='destination-out';
        
        c2.beginPath();
        
        var $vs = document.querySelectorAll("#cornercontainer .corner")
        for (var i=0; i<$vs.length; i++) {
        		var x = parseInt($$($vs[i]).css("left").replace('px',''));
        		var y = parseInt($$($vs[i]).css("top").replace('px',''));
        		
        		if (i==0) {
	        		c2.moveTo((x+25), (y+25));
	        		coords[i] = '('+(x+30)+', '+(y+35)+')';
        		}
        		else if (i==1) {
        			c2.lineTo((x+25), (y+25));
        			coords[i] = '('+(x+55)+', '+(y+35)+')';
        		}
        		else if (i==2) {
        			c2.lineTo((x+25), (y+25));
        			coords[i] = '('+(x+55)+', '+(y+80)+')';
        		}
        		else {
        			c2.lineTo((x+25), (y+25));
        			coords[i] = '('+(x+30)+', '+(y+80)+')';
        		}
        }

        c2.closePath();
        c2.fill();
  		  c2.globalCompositeOperation='source-over';
        c2.strokeStyle = "rgba(0, 255, 0, .5)";
		  c2.stroke();

    };

    drawPoly();
    
	var draggableElems = document.querySelectorAll('.corner');
	var draggies = []
	for ( var i=0, len = draggableElems.length; i < len; i++ ) {
		var draggableElem = draggableElems[i];
		var draggie = new Draggabilly( draggableElem );
		draggie.on( 'dragMove', function() {
			$$(this).css({
				"left": this.position.x + 'px', 
				"top": this.position.y + 'px'
			})
			drawPoly();
		});
		draggie.on( 'dragEnd', drawPoly);
	}
}

$$("#img_record_btn").on("click", function(){
	
	if (!img_base64) return;
	
	$$(this).addClass("on")
	$$(this).find('div').text("Saving");
	$$("#img_record_btn").off("click");		
	
	var photo_data = {"cardid":mycard.id, "photo":img_base64, "coords":coords, "ratio":img_ratio};
	
	socket.emit('card photo', photo_data);
	
});

(function (document) {
	cropper_init();
	
	document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#homepage')){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           navigator.app.backHistory();
       }
    }, false);
}(document));
