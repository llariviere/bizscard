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
                        <input type="email" id="email" placeholder="Email" autocomplete="off">\
                      </div>\
                    </div>\
                  </li>\
                  <li class="item-content">\
                    <div class="item-inner">\
                      <div class="item-title label" style="text-align:right;">Password:&nbsp;</div>\
                      <div class="item-input">\
                        <input type="password" id="password" placeholder="Password" autocomplete="off">\
                      </div>\
                    </div>\
                  </li>\
                </ul>\
              </div>\
              <div class="list-block" style="font-size:20px;">\
                <ul style="background: transparent;">\
                  <li>\
                    <a href="#" onclick="card_login($$(\'#email\').val(),$$(\'#password\').val(),0,0)" class="item-link list-button color-white">Log in</a>\
                  </li>\
                  <li>\
                    <a href="#" onclick="card_login($$(\'#email\').val(),$$(\'#password\').val(),1,0)" class="item-link list-button color-white">Create an account</a>\
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
var cards = {
	current:[],
	waiting:[]
};
var cards_templates = [
	'<div style="top:4px;left:0px;font-weight:bold;font-size:16px;">{{firstname}} {{lastname}}</div>\
	<div style="top:28px;left:0px;">{{title}}</div>\
	<div style="top:46px;left:0px;">{{company}}</div>\
	<div style="top:75px;left:120px;">{{address}}</div>\
	<div style="top:90px;left:120px;">{{city}}, {{state_prov}} {{country}} {{zip_postal}}</div>\
	<div style="top:105px;left:120px;">{{website}}</div>\
	<div style="top:120px;left:120px;">E: {{email}}</div>\
	<div style="top:135px;left:120px;">C: {{cellphone}}</div>\
	<div style="top:150px;left:120px;">F: {{fax}}</div>\
	<div class="img" style="top:75px;left:0px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:20px;"></i>\
	</div>',
	
	'<div style="top:4px;left:120px;font-weight:bold;font-size:16px;">{{firstname}} {{lastname}}</div>\
	<div style="top:28px;left:120px;">{{title}}</div>\
	<div style="top:46px;left:120px;">{{company}}</div>\
	<div style="top:75px;left:120px;">{{address}}</div>\
	<div style="top:90px;left:120px;">{{city}}, {{state_prov}} {{country}} {{zip_postal}}</div>\
	<div style="top:105px;left:120px;">{{website}}</div>\
	<div style="top:120px;left:120px;">E: {{email}}</div>\
	<div style="top:135px;left:120px;">C: {{cellphone}}</div>\
	<div style="top:150px;left:120px;">F: {{fax}}</div>\
	<div class="img" style="top:0px;left:0px;background-image:url({{logo}});">\
		<i class="fa fa-user fa-4x" style="margin-top:20px;"></i>\
	</div>',
	
	'<div style="top:84px;width:50%;text-align:right;font-weight:bold;font-size:16px;">{{firstname}} {{lastname}} |</div>\
	<div style="top:88px;left:50%;width:50%;text-align:left;">&nbsp;{{title}}</div>\
	<div style="top:104px;width:100%;text-align:center;">{{company}}</div>\
	<div style="top:120px;width:100%;text-align:center;">{{address}}, {{city}}</div>\
	<div style="top:136px;width:100%;text-align:center;">{{state_prov}} {{country}} {{zip_postal}}</div>\
	<div style="top:152px;width:50%;text-align:right;">{{website}} |</div>\
	<div style="top:152px;left:50%;width:50%;text-align:left;">&nbsp;E: {{email}}</div>\
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

$$(".share").on("click", function(){
	var buttons1 = [
        {
            text: '<i class="fa fa-envelope fa-lg"></i><div class="eq_nutton"> Email</div>',
            bold: true,
            color: 'gray'
        },
        {
            text: '<i class="fa fa-comment fa-lg"></i><div class="eq_nutton"> SMS</div>',
            bold: true,
            color: 'gray'
        },
        {
            text: '<i class="fa fa-qrcode fa-lg"></i><div onclick="qrcode_open()" class="eq_nutton"> QR code</div>',
            bold: true,
            color: 'gray'
        },
        {
            text: '<i class="fa fa-twitter fa-lg"></i><div class="eq_nutton"> Twitter</div>',
            bold: true,
            color: 'gray'
        },
        {
            text: '<i class="fa fa-facebook-official fa-lg"></i><div class="eq_nutton"> Facebook</div>',
            bold: true,
            color: 'gray'
        },
        {
            text: '<i class="fa fa-facebook-official fa-lg"></i><div class="eq_nutton"> Messenger</div>',
            bold: true,
            color: 'gray'
        },
        {
            text: '<i class="fa fa-linkedin-square fa-lg"></i><div class="eq_nutton"> LinkedIn</div>',
            bold: true,
            color: 'gray'
        }
    ];
    var buttons2 = [
        {
            text: 'Cancel',
            color: 'red'
        }
    ];
    var groups = [buttons1, buttons2];
    myApp.actions(groups);
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

$$(".create-card-open").on("click", function(){
	
	mainView.router.load({pageName: 'create-card'});
	
});

$$(".my-card-open").on("click", function(){
	
	card_form_open(mycard);
	
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

function card_offer() {
	
	//$$(".no-thumb").hide();
	
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


$$('#create-card-btn').on("click", function(){
	openCamera(false)
	//$$('#file_upload').click();
});

$$('#file_upload').on("change", function(event) {
   var tmppath = URL.createObjectURL(event.target.files[0]);
   $$("#img_upload").attr('src',tmppath);
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
	
	//card_form_star(context.reputation);
	
}

function card_form_record(){
	
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
	
	var html = cards_templates[(data.template ? data.template : 0)];
	$$.each(['firstname','lastname','title','company','address','city','state_prov','zip_postal','country','website','email','cellphone','fax','logo'], function(i,e){
		var v = (data[e] ? data[e] : '') 
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
	
	/*
	if (password.length<8) {
		myApp.alert("Your password has to be 8 characters or more. Please correct it and try again.")
		welcomescreen.open();
		$$("#password").val('');
		$$("#password").focus();
		return false;
	}
	*/
	

	myApp.formStoreData('login_form', {
		"email":email, 
		"password":password
   });
		   
	var login_data = {
		"email":email, 
		"password":password,
		"create":create
	}
	
	socket.emit('card login', login_data);
	
	myApp.alert('Synchronizing your data...<br>Please wait.');

}

//var socket = io('https://bizswiper.com:3333/');
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
socket.on('card login', function (data) {
	
	switch(data.msg) {
		case "card not found":
			myApp.formDeleteData('login_form');
			myApp.alert("<b>Your email was not found!</b><br>Please correct and try again<br>or clic on '<b>Create an account</b>'.");
			welcomescreen.open();
			$$("#email").focus();
			break;
		case "card not logged in":
			myApp.formDeleteData('login_form');
			myApp.alert("<b>Password error!</b><br>Please correct and try again.");
			welcomescreen.open();
			$$("#email").focus();
			break;
		case "card logged in":
			console.log('card load')
			socket.emit('card load', data.id);
		   welcomescreen.close();
	}
	
});


socket.on('card load', function (data) {
	
	mycard = data;
	mycard["titre"] = "My profile";
	mycard["current"] = "0";
	mycard["own"] = "1";
	
	mycard.points = parseInt(mycard.points);
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
		if (this.position.y < 30) {
			card_offered();
		} else {
			card_offer_complete();
		}
	});
	draggie.on( 'staticClick', card_offer);
	
	if (mycard.cards) {
		cards = mycard.cards;
		if (cards.current) $$(".badge.current-list-nbr").html(cards.current.length);
		if (cards.waiting) $$(".badge.waiting-list-nbr").html(cards.waiting.length);
	}
	
	if (!mycard.firstname || !mycard.lastname || !mycard.cellphone) {
		card_form_open(mycard);
		myApp.alert("Your card is not complete<br>Please enter something in the mandatory fields.");
	}
	
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

function online(event) {
  $online = (event.type=='online');
}

function _init() {
	
	console.log($connected)
	
	var storedData = myApp.formGetData('login_form');
	
	if (storedData) {
		card_login(storedData.email,storedData.password,false,true);
	} else {
		welcomescreen.open();
		$$("#email").focus();
	}
	
}

_init();

var doch = $$("body").height();
var docw = $$("body").width();
var coords = [];
	
$$("#tab1 > div").css({
	"width": docw +'px',
	"height": (doch-88) +'px',
	"position": "absolute",
	"top": "88px",
	"left": 0
});
$$("#tab1 canvas").css({
	"width": docw +'px',
	"height": (doch-88) +'px'
});
$$("#tab1 > div > img").css({
	"max-width": docw +'px',
	"max-height": (doch-88) +'px'
});

function _init_image_crop(document) {
    'use strict';
    
    var drawPoly = function() {
        var canvas = document.getElementById("cropCanvas");
        
        var c2 = canvas.getContext("2d");

        c2.clearRect(0, 0, 2000, 2000);
        c2.beginPath();
        c2.moveTo(0,0);
        c2.lineTo(320, 0);
        c2.lineTo(320, 240);
        c2.lineTo(0, 240);
        c2.closePath();
        c2.fillStyle = "rgba(0, 0, 0, .5)";
        c2.fill();
        
        c2.globalCompositeOperation='destination-out';
        
        c2.beginPath();
        
        var $vs = document.querySelectorAll("#cornercontainer .corner")
        for (var i=0; i<$vs.length; i++) {
        		var p = $($vs[i]).position();
        		var x = 2+p.left;
        		var y = 2+p.top;
        		if (i) {
        			c2.lineTo(x, y);
        		} else {
        			c2.moveTo(x, y);
        		}
        		coords[i] = '('+x+', '+y+')';
        }

        c2.closePath();
        c2.fill();
        
  		  c2.globalCompositeOperation='source-over';
        c2.strokeStyle = "rgba(0, 255, 0, .5)";
		  c2.stroke();

    };

    drawPoly();
    
    var draggable = document.getElementsByClassName('corner'),
        draggableCount = draggable.length, i;
        
    function startDrag(evt) {
        evt.preventDefault();
        
	     for (i=0; i<draggableCount; i++) {
	        draggable[i].classList.remove("currenthandle");
	     }
    
        this.className += ' currenthandle';
        
        drawPoly();
        
        var diffX = evt.clientX - this.offsetLeft,
            diffY = evt.clientY - this.offsetTop,
            that = this;
            
        function moveAlong(evt) {
            evt.preventDefault();
            var left = parseInt(evt.clientX - diffX);
            var top = parseInt(evt.clientY - diffY);
            
            if (top < 0) { top = 0; }
            if (left < 0) { left = 0; }
            if (top > window.innerHeight-1) 
                { top = window.innerHeight-1; }
            if (left > window.innerWidth-1) 
                { left = window.innerWidth-1; }
                
            that.style.left = left + 'px';
            that.style.top = top + 'px';
            
            drawPoly();
        }
        
        function stopDrag() {
            document.removeEventListener('mousemove', moveAlong);
            document.removeEventListener('mouseup', stopDrag);
            drawPoly();
        }

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', moveAlong);
        return false;
    }
    
    if (draggableCount > 0) for (i = 0; i < draggableCount; i += 1) {
        draggable[i].addEventListener('mousedown', startDrag);
    }

}

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
	        allowEdit: true,
	        correctOrientation: false  //Corrects Android orientation quirks
	    }
	    return options;
	}
	
	function openCamera(selection) {
 
	    var srcType = Camera.PictureSourceType.CAMERA;
	    var options = setOptions(srcType);
	    var func = createNewFileEntry;
	 
	    navigator.camera.getPicture(function cameraSuccess(imageUri) {
	 
	        displayImage(imageUri);
	        // You may choose to copy the picture, save it somewhere, or upload.
	        func(imageUri);
	 
	    }, function cameraError(error) {
	        console.debug("Unable to obtain picture: " + error, "app");
	    }, options);
	}
	
	function displayImage(imgUri) {
	 	 $$("#img_upload").attr('src',imgUri);
	}
	
	function createNewFileEntry(imgUri) {
	    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
	 
	        // JPEG file
	        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
	 
	            // Do something with it, like write to it, upload it, etc.
	            // writeFile(fileEntry, imgUri);
	            console.log("got file: " + fileEntry.fullPath);
	            // displayFileData(fileEntry.fullPath, "File copied to");
	 
	        }, onErrorCreateFile);
	 
	    }, onErrorResolveUrl);
	}
