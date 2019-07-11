function getEnv() {
	var env = {};
    if (typeof navigator === 'undefined') {
        // In node
        env = {
            browser: {},
            os: {},
            node: true,
            // Assume canvas is supported
            canvasSupported: true
        };
    }
    else {
        env = detect(navigator.userAgent);
    }

    return env;

    // Zepto.js
    // (c) 2010-2013 Thomas Fuchs
    // Zepto.js may be freely distributed under the MIT license.

    function detect(ua) {
        var os = {};
        var browser = {};
        // var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
        // var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        // var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        // var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        // var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        // var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
        // var touchpad = webos && ua.match(/TouchPad/);
        // var kindle = ua.match(/Kindle\/([\d.]+)/);
        // var silk = ua.match(/Silk\/([\d._]+)/);
        // var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
        // var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
        // var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
        // var playbook = ua.match(/PlayBook/);
        // var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
        var firefox = ua.match(/Firefox\/([\d.]+)/);
        // var safari = webkit && ua.match(/Mobile\//) && !chrome;
        // var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
        var ie = ua.match(/MSIE\s([\d.]+)/)
            // IE 11 Trident/7.0; rv:11.0
            || ua.match(/Trident\/.+?rv:(([\d.]+))/);
        var edge = ua.match(/Edge\/([\d.]+)/); // IE 12 and 12+

        var weChat = (/micromessenger/i).test(ua);

        // Todo: clean this up with a better OS/browser seperation:
        // - discern (more) between multiple browsers on android
        // - decide if kindle fire in silk mode is android or not
        // - Firefox on Android doesn't specify the Android version
        // - possibly devide in os, device and browser hashes

        // if (browser.webkit = !!webkit) browser.version = webkit[1];

        // if (android) os.android = true, os.version = android[2];
        // if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
        // if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
        // if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        // if (webos) os.webos = true, os.version = webos[2];
        // if (touchpad) os.touchpad = true;
        // if (blackberry) os.blackberry = true, os.version = blackberry[2];
        // if (bb10) os.bb10 = true, os.version = bb10[2];
        // if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
        // if (playbook) browser.playbook = true;
        // if (kindle) os.kindle = true, os.version = kindle[1];
        // if (silk) browser.silk = true, browser.version = silk[1];
        // if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
        // if (chrome) browser.chrome = true, browser.version = chrome[1];
        if (firefox) {
            browser.firefox = true;
            browser.version = firefox[1];
        }
        // if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
        // if (webview) browser.webview = true;

        if (ie) {
            browser.ie = true;
            browser.version = ie[1];
        }

        if (edge) {
            browser.edge = true;
            browser.version = edge[1];
        }

        // It is difficult to detect WeChat in Win Phone precisely, because ua can
        // not be set on win phone. So we do not consider Win Phone.
        if (weChat) {
            browser.weChat = true;
        }

        // os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
        //     (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
        // os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos ||
        //     (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        //     (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

        return {
            browser: browser,
            os: os,
            node: false,
            // 原生canvas支持，改极端点了
            // canvasSupported : !(browser.ie && parseFloat(browser.version) < 9)
            canvasSupported : document.createElement('canvas').getContext ? true : false,
            // @see <http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript>
            // works on most browsers
            // IE10/11 does not support touch event, and MS Edge supports them but not by
            // default, so we dont check navigator.maxTouchPoints for them here.
            touchEventsSupported: 'ontouchstart' in window && !browser.ie && !browser.edge,
            // <http://caniuse.com/#search=pointer%20event>.
            pointerEventsSupported: 'onpointerdown' in window
                // Firefox supports pointer but not by default, only MS browsers are reliable on pointer
                // events currently. So we dont use that on other browsers unless tested sufficiently.
                // Although IE 10 supports pointer event, it use old style and is different from the
                // standard. So we exclude that. (IE 10 is hardly used on touch device)
                && (browser.edge || (browser.ie && browser.version >= 11))
        };
    }
}

var env = getEnv();

function Base64() {
 
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
 
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
 
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
        return utftext;
    }
 
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

var base64 = (function() {
	var _PADCHAR = "=",
    _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    _VERSION = "1.0";


  function _getbyte64( s, i ) {
    // This is oddly fast, except on Chrome/V8.
    // Minimal or no improvement in performance by using a
    // object with properties mapping chars to value (eg. 'A': 0)

    var idx = _ALPHA.indexOf( s.charAt( i ) );

    if ( idx === -1 ) {
      throw "Cannot decode base64";
    }

    return idx;
  }
  
  
  function _decode( s ) {
    var pads = 0,
      i,
      b10,
      imax = s.length,
      x = [];

    s = String( s );
    
    if ( imax === 0 ) {
      return s;
    }

    if ( imax % 4 !== 0 ) {
      throw "Cannot decode base64";
    }

    if ( s.charAt( imax - 1 ) === _PADCHAR ) {
      pads = 1;

      if ( s.charAt( imax - 2 ) === _PADCHAR ) {
        pads = 2;
      }

      // either way, we want to ignore this last block
      imax -= 4;
    }

    for ( i = 0; i < imax; i += 4 ) {
      b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 ) | _getbyte64( s, i + 3 );
      x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff, b10 & 0xff ) );
    }

    switch ( pads ) {
      case 1:
        b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 );
        x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff ) );
        break;

      case 2:
        b10 = ( _getbyte64( s, i ) << 18) | ( _getbyte64( s, i + 1 ) << 12 );
        x.push( String.fromCharCode( b10 >> 16 ) );
        break;
    }

    return x.join( "" );
  }
  
  
  function _getbyte( s, i ) {
    var x = s.charCodeAt( i );
/*
    if ( x > 255 ) {
      throw new Error("INVALID_CHARACTER_ERR: DOM Exception 5");
    }
  */  
    return x;
  }


  function _encode( s ) {
    if ( arguments.length !== 1 ) {
      throw "SyntaxError: exactly one argument required";
    }

    s = String( s );

    var i,
      b10,
      x = [],
      imax = s.length - s.length % 3;

    if ( s.length === 0 ) {
      return s;
    }

    for ( i = 0; i < imax; i += 3 ) {
      b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 ) | _getbyte( s, i + 2 );
      x.push( _ALPHA.charAt( b10 >> 18 ) );
      x.push( _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) );
      x.push( _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) );
      x.push( _ALPHA.charAt( b10 & 0x3f ) );
    }

    switch ( s.length - imax ) {
      case 1:
        b10 = _getbyte( s, i ) << 16;
        x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _PADCHAR + _PADCHAR );
        break;

      case 2:
        b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 );
        x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) + _PADCHAR );
        break;
    }

    return x.join( "" );
  }
  return {
    decode: _decode,
    encode: _encode,
    VERSION: _VERSION
  };
}());


function tableExport(options) {
    var defaults = {
			separator: ',',
			ignoreColumn: [],
			tableName:'yourTableName',
			type:'csv',
			pdfFontSize:14,
			pdfLeftMargin:20,
			escape:'true',
			htmlContent:'false',
			consoleLog:'false'
	};
    
	var options = $.extend(defaults, options);
	var el = options.dom;
	
	if(defaults.type == 'excel' || defaults.type == 'doc'|| defaults.type == 'powerpoint'){
		//console.log($(this).html());
		var excel="<table>";
		// Header
		el.find('thead').find('tr').each(function() {
			excel += "<tr>";
			$(this).filter(':visible').find('th').each(function(index,data) {
				if ($(this).css('display') != 'none'){					
					if(defaults.ignoreColumn.indexOf(index) == -1){
						excel += "<td>" + parseString($(this))+ "</td>";
					}
				}
			});	
			excel += '</tr>';						
			
		});					
		
		
		// Row Vs Column
		var rowCount=1;
		el.find('tbody').find('tr').each(function() {
			excel += "<tr>";
			var colCount=0;
			$(this).filter(':visible').find('td').each(function(index,data) {
				if ($(this).css('display') != 'none'){	
					if(defaults.ignoreColumn.indexOf(index) == -1){
						excel += "<td>"+parseString($(this))+"</td>";
					}
				}
				colCount++;
			});															
			rowCount++;
			excel += '</tr>';
		});					
		excel += '</table>'
		
		if(defaults.consoleLog == 'true'){
			console.log(excel);
		}
		
		var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+defaults.type+"' xmlns='http://www.w3.org/TR/REC-html40'>";
		excelFile += "<head>";
		excelFile += "<title>" + options.tableName + "</title>";
		excelFile += "<!--[if gte mso 9]>";
		excelFile += "<xml>";
		excelFile += "<x:ExcelWorkbook>";
		excelFile += "<x:ExcelWorksheets>";
		excelFile += "<x:ExcelWorksheet>";
		excelFile += "<x:Name>";
		excelFile += "{worksheet}";
		excelFile += "</x:Name>";
		excelFile += "<x:WorksheetOptions>";
		excelFile += "<x:DisplayGridlines/>";
		excelFile += "</x:WorksheetOptions>";
		excelFile += "</x:ExcelWorksheet>";
		excelFile += "</x:ExcelWorksheets>";
		excelFile += "</x:ExcelWorkbook>";
		excelFile += "</xml>";
		excelFile += "<![endif]-->";
		excelFile += "</head>";
		excelFile += "<body>";
		excelFile += excel;
		excelFile += "</body>";
		excelFile += "</html>";
		var base64a = new Base64();
		var base64data = "base64," + base64a.encode(excelFile);
		var $a = document.createElement("a");
		$a.download = options.tableName + '.xls';
		$a.setAttribute('target', '_blank');
		var url = 'data:application/vnd.ms-excel;' + base64data;
		$a.href = url;

		if (typeof MouseEvent === 'function' && !env.browser.ie && !env.browser.edge) {
			var evt = new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: false
			});
			$a.dispatchEvent(evt);
		} else {
			//window.open(url);
			//var tab = window.open();
			//tab.document.write(excelFile);
		/*
			var ieExport  = function(){
             
                var oXL = new ActiveXObject("Excel.Sheet"),
	                oWB = oXL.Workbooks.Add(),
	                oSheet = oWB.ActiveSheet,
	                i = 0,
	                j; 
                var elem = el;
               	var sel = document.body.createTextRange(); 
                sel.moveToElementText(elem); 
                try{
                     sel.select(); 
                    //there ie10、11 will be error, i don't know why, but also can export
                } catch(e){}
                sel.execCommand("Copy"); 
                oSheet.Paste();
        		oXL.Visible = true;           
          	}
          	ieExport();
		*/
		}		
	}

	function parseString(data){
	
		if(defaults.htmlContent == 'true'){
			content_data = data.html().trim();
		}else{
			content_data = data.text().trim();
		}
		
		if(defaults.escape == 'true'){
			content_data = escape(content_data);
		}
		
		
		
		return content_data;
	}

}


$('.each-panel').on('mouseover', function(ev){
	$(this).find('.output-style').css("display", "inline-block");
	$(this).find('.tool-bar').show();
}).on('mouseout', function(ev){
	$(this).find('.output-style').hide();
	$(this).find('.tool-bar').hide();
});

function html2ToImg(dom, name) {
	html2canvas(dom, {
		useCORS: true,
		//background: 'rgba(0, 0, 0, 0)',
		origin: 'http://echarts.baidu.com',
		letterRendering: true,
		onrendered: function(canvas) {
			download(canvas, name);
		}
	})
}

function download(canvas, name) {
	var $a = document.createElement('a');
	$a.download = name + '.png';
	$a.setAttribute('target', '_blank');
	var url = canvas.toDataURL();
	$a.href = url;
	if (typeof MouseEvent === 'function' && !env.browser.ie && !env.browser.edge) {
		var evt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: false
		});
		$a.dispatchEvent(evt);
	} else {
		var html = ''
			+ '<body style="margin:0">'
			+ '<img src="' + url + '" style="max-width:100%;" title="点击鼠标右键另存为图片"/>'
			+ '</body>';
		var tab = window.open();
		tab.document.write(html);
	}
}
/*
$('.output-png').on('click', function() {
	var parent = $(this).parent();
	var name = parent.text();
	//var isgoal = parent.hasClass('each-panel');
	//while(!isgoal) {
		parent = parent.siblings();
		//isgoal = parent.hasClass('each-panel');
	//}
	if(parent.size() == 1) {
		var canvas = parent.find('canvas');
		if(canvas.length == 1) {
			download(canvas[0], name);
		} else {
			html2ToImg(parent[0], name);
		}
	} else {
		html2ToImg(parent[0], name);
	}
})
*/
$(".each-panel").on("click", ".output-png", function(e) {
	var _dom = $(this).parent().parent().siblings();
	if(_dom.hasClass("ouput-lines")) {
		var name = $(this).parent().siblings().text();
		html2ToImg(_dom[0], name);	
		return;
	}
	var name = $(this).parent().text();
	var canvas = $(this).parent().parent().find('canvas');
	download(canvas[0], name);
})
$('.output-page').on('click', function() {
	var dom = $(".content")[0];
	var name = $('h3').text();
	html2ToImg(dom, name);
})
$('.output-excel').on('click', function() {
	var name = $(this).parent().text();
	tableExport({dom: $(this).parent().siblings().find('table'), type: 'excel', escape:true, tableName: name});
})

$(window).scroll(function(ev) {
	if ($(window).scrollTop() > 200) {
		$('.tab-top').show();
	} else {
		$('.tab-top').hide();
	}
});

$(".j-trigger").on("mouseover", function() {
	$(this).addClass("j-triggered");
})
$(".j-trigger").on("mouseout", function() {
	$(this).removeClass("j-triggered");
})
