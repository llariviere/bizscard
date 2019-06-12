/* 
* camera, image and ocr functions...
*/

	B.fs_ = null;
	B.cwd_ = null;
	
	$$(".button.card-side").on("click", function(){
		$$(".button.card-side").removeClass("selected");
		$$(this).addClass("selected");
		B.card_side = ($$(this).hasClass("front") ? 'front' : 'back');
		$$("span.card-side").text(B.card_side);
		$$("#card-photo > img").addClass("hidden");
		$$("#card-photo > img."+B.card_side).removeClass("hidden");
	});

	$$("#capturePhoto").on("click", capturePhoto);
	$$("#listPhoto").on("click", listPhoto);
	$$("#savePhoto").on("click", savePhoto);
	$$("#processPhoto").on("click", processPhoto);
	
	function setOptions(srcType) {
	    var options = {
	        quality: 50,
	        targetHeight: 1024,
	        targetWidth: 1024,
	        destinationType: Camera.DestinationType.FILE_URI,
	        sourceType: srcType,
	        encodingType: Camera.EncodingType.PNG,
	        mediaType: Camera.MediaType.PICTURE,
	        allowEdit: false,
	        correctOrientation: true  //Corrects Android orientation quirks
	    }
	    return options;
	}
	
	function savePhoto() {
		
		if (B.fromfile) {
			$$('#card-photo-front').attr("src","");
			$$('#card-photo-back').attr("src","");
			$$(".button.card-side.back").trigger("click");
			$$(".button.card-side.front").trigger("click");
			return false;
		}
		var ImageUri = { 
			front:$$('#card-photo-front').attr("src"),
			back:$$('#card-photo-back').attr("src")
		}
		var now = Date.now();
		B.dirname = now.toString();

		if (ImageUri.front) {
			console.log("1 : "+ImageUri.front);
			window.resolveLocalFileSystemURL(ImageUri.front, function (fileEntry) {
				console.log("2");
				window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSys) {
					B.fs_ = fileSys;
					B.cwd_ = B.fs_.root;
					console.log("3");
					B.cwd_.getDirectory(B.dirname, {create:true, exclusive: false}, function(dirEntry) {
						B.cwd_ = dirEntry;
						fileEntry.moveTo(dirEntry, "front.png", function(){
							console.log("front.png moved!");
							$$('#card-photo-front').attr("src","");
					   	$$("#savePhoto, #processPhoto").parent().addClass("hidden");
					   	$$("#listPhoto").parent().removeClass("hidden");
						}, onFail0);
					}, onFail1);
				}, onFail2);
			}, onFail3);
			
		}
		
		if (ImageUri.back) {
			console.log("1 : "+ImageUri.back);
			window.resolveLocalFileSystemURL(ImageUri.back, function (fileEntry) {
				window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSys) {
					B.fs_ = fileSys;
					B.cwd_ = B.fs_.root;
					B.cwd_.getDirectory(B.dirname, {create:true, exclusive: false}, function(dirEntry) {
						B.cwd_ = dirEntry;
						fileEntry.moveTo(dirEntry, "back.png", function(){
							console.log("back.png moved!");
							$$('#card-photo-back').attr("src","");
					   	$$("#savePhoto, #processPhoto").parent().addClass("hidden");
					   	$$("#listPhoto").parent().removeClass("hidden");
						}, onFail0);
		         }, onFail1);
				}, onFail2);
			}, onFail3);
		}
	}
	
	function listPhoto() {
		
		myApp.popup('<div class="popup" style="overflow-y: scroll">\
		<div class="navbar">\
      <div class="navbar-inner">\
        <div class="left"></div>\
        <div class="title">List of saved card photos</div>\
        <div class="right"><a href="#" class="link close-popup">Close</a></div>\
      </div>\
    </div>\
	<div class="list-block media-list">\
		<ul id="ulPhoto"></ul>\
	</div>\
</div>');

		if (typeof LocalFileSystem === "undefined") {
			myApp.alert("Unable to open your file system!");
			return false;
		}

		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSys) {
			B.fs_ = fileSys;
			B.cwd_ = B.fs_.root;
			var html = [];
	  		// On liste les dossiers...
	  		ls_(function(dir_entries) {
	         if (dir_entries.length) {
	           console.log("dir_entries.length = "+dir_entries.length)
	           
	           for(var i=0; i<dir_entries.length; i++) {
	           	 var entry = dir_entries[i];
	           	 if (entry.isFile) {
	           	 	dir_entries[i].remove();
	           	 } else {
	           	 	
	           	 	B.dirname = entry.name;
	           	 	
	           	 	B.cwd_ = B.fs_.root;
						B.cwd_.getDirectory(B.dirname, {}, function(dirEntry) {
							B.cwd_ = dirEntry;
							var frontfile = '', backfile = '';
							ls_(function(file_entries) {
	           	 			
								if (file_entries.length) {
									
									for(var i=0; i<file_entries.length; i++) {
										
										if(file_entries[i].name=="front.png") frontfile = file_entries[i].nativeURL;
										if(file_entries[i].name=="back.png")  backfile = file_entries[i].nativeURL;
									}
									
									var dirDate = new Date(parseInt(dirEntry.name));
									
									$$("#ulPhoto").append('<li class="swipeout" onClick="loadPhoto(\''+dirEntry.name+'\')" id="dir_'+dirEntry.name+'"">\
								  <a href="#" class="swipeout-content item-content item-link">\
								      <div class="item-inner">\
								         <div class="item-title-row"> \
								           '+ dirDate.toString().substr(0,24) +'\
								         </div>\
								         <div class="item-after"></div>\
											<div class="item-subtitle row"> \
										      <div class="col-50 thumb"><img src="'+ frontfile +'" /></div> \
										      <div class="col-50 thumb"><img src="'+ backfile +'" /></div> \
											</div> \
								      </div>\
								  </a>\
							     <div class="swipeout-actions-left">\
						          <a href="#" onClick="delPhoto(\''+dirEntry.name+'\');event.stopPropagation();" class="delete  bg-red">Delete</a>\
						        </div>\
							   </li>')
	
								}
	      				});
						}, onFail);
	           	 }
	           }
	         } 
	         else {
		         console.log("No entries...")
	         }
	      });
      }, onFail);
	}

	function capturePhoto() {
	    if (typeof Camera === "undefined") {
			myApp.alert("The camera is not available");
	    }
	    else {
	    	var options = setOptions(Camera.PictureSourceType.CAMERA);
	    	navigator.camera.getPicture( function(imageUri) {
			    $$('#card-photo-'+B.card_side).attr("src", imageUri);
			    
				 B.fromfile = false;
			    $$("#savePhoto, #processPhoto").parent().removeClass("hidden");
			}, onFail, options);
	    }
	}
	
	function galleryPhoto() {
	    if (typeof Camera === "undefined") {
			myApp.alert("Photo library is not available");
	    }
	    else {
	    	var options = setOptions(Camera.PictureSourceType.PHOTOLIBRARY);
	    	navigator.camera.getPicture( function(imageUri) {
	    		B.croper.destroy();
				var options = { 
					url:imgUri, 
					enableOrientation:true,
        			boundary: B.crop_opts.boundary 
        		};
				B.croper = new Croppie(document.getElementById('crop-box'), options);
       	 	return false;
			}, onFail, options);
	    }
	}
	
	function loadPhoto(dirname) {
		B.cwd_ = B.fs_.root;
		B.cwd_.getDirectory(dirname, {}, function(dirEntry) {
			B.cwd_ = dirEntry;
			ls_(function(file_entries) {
				var frontfile = '', backfile = '';
				for(var i=0; i<file_entries.length; i++) {
					if(file_entries[i].name=="front.png") frontfile = file_entries[i].nativeURL;
					if(file_entries[i].name=="back.png")  backfile  = file_entries[i].nativeURL;
				}
				$$('#card-photo-front').attr("src", frontfile);
				$$('#card-photo-back').attr("src",  backfile);
				$$(".button.card-side.front").trigger("click");
				
				myApp.closeModal();
			   
			   $$("#processPhoto").parent().removeClass("hidden");
				B.fromfile = true;
			});
		}, onFail);
	}
	
	function processPhoto() {
		console.log('processPhoto()');
	
		myApp.showPreloader('Loading...');
		setTimeout(function () {
	   	myApp.hidePreloader();
		}, 8000);
		
		function getDataUri(url, callback) {
			var image = new Image();
			
			image.onload = function () {
				console.log(this);
				var canvas = document.createElement('canvas');
				canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
				canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
				
				canvas.getContext('2d').drawImage(this, 0, 0);
				
				// Get raw image data
				callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
			};
			
			image.src = url;
		}
		
		B.dataUrl = {};
		var initd = false;
		
		if ($$('#card-photo-front').attr("src")) {
			getDataUri($$('#card-photo-front').attr("src"), function(dataUrl){
				B.dataUrl.front = dataUrl;
				socket.emit('card ocr', {photo: dataUrl, cardid: mycard.id, card_side: "front"});
				if ($$('#card-photo-back').attr("src")) {
					getDataUri($$('#card-photo-back').attr("src"), function(dataUrl){
						B.dataUrl.back = dataUrl;
						socket.emit('card ocr', {photo: dataUrl, cardid: mycard.id, card_side: "back"});
					});
				}
			});
			card_ocr_init();
		} else if ($$('#card-photo-back').attr("src")) {
			getDataUri($$('#card-photo-back').attr("src"), function(dataUrl){
				B.dataUrl.back = dataUrl;
				socket.emit('card ocr', {photo: dataUrl, cardid: mycard.id, card_side: "front"});
			});
			card_ocr_init();
		}
	}
	
	function card_ocr_init() {
		B.container="#add_card_list";
		B.list = "current";
		B.index = false;
		B.cardid = false;
		$$(".card-fields").removeClass("hidden");
		$$(B.container).html(base_tpl.replace(/lock/g,'unlock').replace(/{{unlock}}/g,'unlock').replace(/{{class}}/g, ''));
		$$(".button-photo").addClass("hidden");
		$$(".card-fields").parent().removeClass("hidden");
		$$("#card_ocr_words").html('');
	}
	
	socket.on('card ocr', function(data) {
		console.log('card_ocr_process()');
		
		// Using text detection result from vision, we add a formatted list of fields...
		var ocrLines = data.description.split("\n");
		
		for (var ii=0; ii<ocrLines.length; ii++) {
			var ocrLine = ocrLines[ii].replace(/^[ ]+|[ ]+$/g,'');
			if (ocrLine.length) add_card_li_match(ii, ocrLine);
		}
		
		card_init(data.card_side);
		
		myApp.hidePreloader();
	});
	
	function delPhoto(dirname) {
		console.log('delPhoto('+dirname+')');
		B.cwd_ = B.fs_.root;		
		B.cwd_.getDirectory(dirname, {}, function(dirEntry) {
			$$("#dir_"+dirname).remove();
			dirEntry.removeRecursively();			
		}, onFail);
	}
	
	function onFail(message) {
	    myApp.alert('Failed because: ' + message);
	}
	
	function onFail0(message) {
	    myApp.alert('Failed "fileEntry.moveTo"');
	    console.log(message)
	}
	
	function onFail1(message) {
	    myApp.alert('Failed "B.cwd_.getDirectory"');
	    console.log(message)
	}
	
	function onFail2(message) {
	    myApp.alert('Failed "requestFileSystem"');
	    console.log(message)
	}
	
	function onFail3(message) {
	    myApp.alert('Failed "resolveLocalFileSystemURL"');
	    console.log(message)
	}
	
	function ls_(successCallback) {
    if (!B.fs_) {
      return;
    }
    
    var entries = [];
    var reader = B.cwd_.createReader();

    var readEntries = function() {
      reader.readEntries(function(results) {
        if (!results.length) {
          entries.sort();
          successCallback(entries);
        } else {
          entries = entries.concat(util.toArray(results));
          readEntries();
        }
      }, onFail);
    };

    readEntries();
  }
  
	var util = util || {};
	util.toArray = function(list) {
	  return Array.prototype.slice.call(list || [], 0);
	};
	
