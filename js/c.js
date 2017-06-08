/*!!!!!!!!!VPPS!!!!!!!!!!*/
(function(d, w) {
   
   
    var allow_domain=["zvonki.clickfrog.ru","stat.scroogefrog.com","stat.clickfrog.ru","adware.clickfrog.ru","a.clickfrog.ru","scroogefrog.com","support.clickfrog.ru","clickfrog.ru","a.scroogefrog.com","cdninstagram.com","instagram.com","vk.com","youtube.com","new.vk.com","scorecardresearch.com","mc.yandex.ru","connect.facebook.net","sibirix.ru","api-maps.yandex.ru","evaco-m.ru","bitrix.info","yadro.ru","google-analytics.com","plus.google.com","twitter.com","autobot.sb","facebook.com","mod.calltouch.ru","googletagmanager.com","yandex.ru","mail.ru"];
    var denied_domain='||';	
    var bad_domain=[];	
    var clfg_vpps_uid='10591701496695256740';
    var sid=587153;
    var ct=1496920570;
    var hp='573c44794d6e3c44ab2ff6c52f2b5962';
    var nc=0;	
    var config = {childList: true, subtree:true};
    var r_url='//stat.clickfrog.ru/vpps/queue/';
    var dp=/(?:\/\/)((?:[a-z](?:[-a-z0-9]*[a-z0-9])?)(?:\.[a-z](?:[-a-z0-9]*[a-z0-9])?)+)(?:[\/\\?#;'"\s]|$)/ig;	

    doPOSTCallOtherDomain(r_url+'stat.php','nc='+nc+'&hp='+hp+'&ct='+ct+'&sid='+sid+'&clfg_vpps_uid='+clfg_vpps_uid+'&ref='+escape(d.referrer!='' ? d.referrer : '0')+'');
    try {
        var observer = new MutationObserver(function(mutations){
            mutations.forEach(function(mutation) {
               
                if(mutation.addedNodes.length>0){
                    
                    var el=mutation.addedNodes[0];
                    
                  
                    if(typeof(el.outerHTML)!="undefined"){
                      
                        dp.lastIndex=0;
                        var tmp=dp.exec(el.outerHTML);
                       
                        if(tmp!=null){
                                //parentNode
                            tmp[1]=tmp[1].replace('www.','');  
                            
                                //if(!chDomain(tmp[1],allow_domain)){
                            if(allow_domain.indexOf(tmp[1])==-1){	
                                var lt=2;
                                if(denied_domain.indexOf('|'+tmp[1]+'|')!=-1){                                   
                                    lt=1;
                                    if(checkWL(el)){
                                        lt=0;    
                                    }
                                }
                                if((bad_domain.indexOf(tmp[1])==-1)&&(lt!=0)){
                                    if(lt==2){
                                        el.clfg_bad_d=tmp[1];
                                        addEvent(el,'click',bad_d_click);

                                    }
                                    bad_domain.push(tmp[1]);
                                    doPOSTCallOtherDomain(r_url+'bad_stat.php','lt='+lt+'&nc='+nc+'&hp='+hp+'&bad_domain='+tmp[1]+'&ct='+ct+'&sid='+sid+'&clfg_vpps_uid='+clfg_vpps_uid+'');
                                } 
                            }else{
                                observer.observe(el,config); 
                            }
                        }
                    }
                }
                if(sid==12165) {	
                    
					if((mutation.attributeName=='style')&&((mutation.target.tagName.toLowerCase()=='html')||(mutation.target.tagName.toLowerCase()=='body'))){
                        var el=mutation.target;
                        var attr=el.getAttribute('style');
                        var m=attr.match(/margin-top:\s?([0-9]+)px/);
                        if((m!=null)&&(m[1]!=0)){
                            el.setAttribute('style',attr.replace(/margin-top:\s?[0-9]+px/,'margin-top:0px'));
                        }
                        //t.replace(/margin-top:\s?[0-9]+px/,'margin-top:0px');
                        //alert(1); 
                    }
					
                }
               
                
            });    
        });
         
      
          
        observer.observe(d.head, config);
		 
        if(sid==12165) {			
            observer.observe(d.documentElement, {attributes:true,attributeFilter:['style']});
			observer.observe(d.body, {childList: true, subtree:true,attributes:true,attributeFilter:['style']});
        }else{
		    observer.observe(d.body, config);
		}
          check();
    }catch(err){
          
           check();
           w.setInterval(check,10000);
    }
    
    function addEvent(html_element, event_name, event_function) {
        if (html_element.addEventListener) { // Modern
            html_element.addEventListener(event_name, event_function, false);
        } else if (html_element.attachEvent) { // Internet Explorer
            html_element.attachEvent("on" + event_name, event_function);
        } else { // others
            html_element["on" + event_name] = event_function;
        }
    };
   
	function outerHTML(node){
    // if IE, Chrome take the internal method otherwise build one
      return node.outerHTML || (
          function(n){
              var div = document.createElement('div'), h;
              div.appendChild( n.cloneNode(true) );
              h = div.innerHTML;
              div = null;
              return h;
          })(node);
    }
    function bad_d_click(){
        doPOSTCallOtherDomain(r_url+'bad_click_stat.php','nc='+nc+'&hp='+hp+'&bad_domain='+this.clfg_bad_d+'&ct='+ct+'&sid='+sid+'&clfg_vpps_uid='+clfg_vpps_uid+'');
    }
    
    function getBodyParent(elem)
    {
        var parent = elem.parentElement;
      
        if(parent==null){
          parent = elem.parentNode; 
        }
        
       
        if(parent==null){
                  
            return elem;
         }
      
        /*var t=elem.tagName != "BODY";
        if((elem.tagName != "BODY")&&(elem.tagName != "HEAD")&&(elem.tagName != "HTML")){
            parent.removeChild(elem);
        } */
       
        if((parent.tagName == "BODY")||(parent.tagName == "HEAD")||(parent.tagName == "HTML")){
            return elem;
        }
        else {
            
            return getBodyParent(parent);
        }

    }

    function check(){
        try{
           var iframe=d.getElementsByTagName('iframe');
           checkBBlock(iframe);
           var script=d.getElementsByTagName('script');
           checkBBlock(script);
           var a=d.getElementsByTagName('a');
           checkBBlock(a,'href');
         
          
        }catch(error){
           console.log(error);  
        }
       
        
    }
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    function chDomain(domain,lists){
        var ends=false;
        lists.some(function(el){
	    if(domain==el){
		ends=true;
                return true;
	    }	
            if(endsWith(domain,'.'+el)){
                ends=true;
                return true;
            }
        })
        
        return ends;
    }
	
	function checkWL(elem){
        var tmp;
        dp.lastIndex=0;
		var html=outerHTML(elem);
        while((tmp=dp.exec(html))!=null){
			if(allow_domain.indexOf(tmp[1])!=-1){
                return true
            } 
            
        }
		
        if(elem.parentNode){
            elem.parentNode.removeChild(elem);
        }
        return false; 
    };

     function checkBBlock(el,attr){
        
        if(el.length==0){
            return;
        }
        attr=attr || 'src';
       
        var tmp;
       
            for (var i = el.length;i--;) {
                if(typeof(el[i])=='undefined'){
                     continue;
                }
              
              
               tmp=el[i].getAttribute(attr);
               if((tmp!='')&&(tmp!=null)){
                    dp.lastIndex=0;
                    tmp=dp.exec(tmp);
                    if(tmp!=null){
                       tmp[1]=tmp[1].replace('www.','');  
                                   
                        //if(!chDomain(tmp[1],allow_domain)){
                        if(allow_domain.indexOf(tmp[1])==-1){
                       
                            var lt=2;
                                
                            if(denied_domain.indexOf('|'+tmp[1]+'|')!=-1){
                                lt=1;
                                var elem=getBodyParent(el[i]);
                                if(checkWL(elem)){
                                    lt=0;    
                                }else{
                                   if(sid==12165){
                                       var t=document.documentElement.getAttribute('style');
                                       if(t!==null)
                                       {
                                            document.documentElement.setAttribute('style', t.replace(/margin-top:\s?38px/,'margin-top:0px')); 
                                       }
                                       
                                       t = d.body.getAttribute('style');
                                       if(t!==null)
                                       {
                                            d.body.setAttribute('style', t.replace(/margin-top:\s?30px/,'margin-top:0px'));
                                       }
								   
                                    } 
                                    
                                }
                            }
                            if((bad_domain.indexOf(tmp[1])==-1)&&(lt!=0)){
                                if(lt==2){
                                        el[i].clfg_bad_d=tmp[1];
                                        addEvent(el[i],'click',bad_d_click);
                                }
                                bad_domain.push(tmp[1]);
                                doPOSTCallOtherDomain(r_url+'bad_stat.php','lt='+lt+'&nc='+nc+'&hp='+hp+'&bad_domain='+tmp[1]+'&ct='+ct+'&sid='+sid+'&clfg_vpps_uid='+clfg_vpps_uid+'');
                            }
                        }
                    }  
                
                   
                } 
               
            }
      
        
    }

    function doPOSTCallOtherDomain(url, data) {
      var XHR = w.XDomainRequest || w.XMLHttpRequest;
      var xhr = new XHR();
      xhr.open("POST", url, true);
      
      try {
       xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      } catch (ex)
      {}
      
      xhr.onload = function() {
        
      }
      xhr.onerror = function() {  
      }
      xhr.send(data);
     }
})(document, window);


	



/*q2*/
(function(d,w,c8pad)
{
var sD=new Date();
var IE = d.all ? true : false;
var size = 0;
var sid = getRnd();
var fr_loaded = true;
var cooks_buf = 0;
var imgs = -1;
var m_move = 0, m_up = 0, m_down = 0;
var ga = "";
var main_domain = "stat.clickfrog.ru";
var clickfrogcontainer = d.getElementById('clickfrog_counter_container');
var csf = "0";
var fr = 0;

try {
	if(parent!=w) {
		fr=1;	
	}
}catch(ex){}

if(csf === "0")
{
	try {
		if(parent!=w) {
			//console.log("return 0 " + escape(d.URL));
			return 0;
		}
	}catch(ex){}
}

if(clickfrogcontainer == null)
{	
	var cfdiv = document.createElement('div');
	cfdiv.id = 'clickfrog_counter_container';
	d.body.appendChild(cfdiv);
	clickfrogcontainer = d.getElementById('clickfrog_counter_container');
}

clickfrogcontainer.innerHTML += '<iframe id="state_act" src="" style="width:'+size+'px; height:'+size+'px; border:0px;"></iframe>' +
'<iframe id="click_map_act" src="" style="width:'+size+'px; height:'+size+'px; border:0px;"></iframe>' +
'<iframe id="clickfrog_uid" src="//'+main_domain+'/queue2/c_q2.php?sid='+sid+'&u='+escape(d.URL)+'&ref=' + escape(d.referrer!='' ? d.referrer : '0') + '&mm='+m_move+'&c8pad='+escape(c8pad)+'&ga='+escape(ga)+'&fr='+fr+'" style="width:'+size+'px; height:'+size+'px; border:0px;"></iframe>';

var click_frame = d.getElementById('click_map_act');
click_frame.onload = frame_loaded;

var map_url = '//'+main_domain+'/queue2/map_action_q2.php';
var state_url = '//'+main_domain+'/queue2/pages_visited_action_q2.php';
var leave_page = '//'+main_domain+'/queue2/leave_page_q2.php';
var plt_url = '//'+main_domain+'/queue2/plt_action_q2.php';

//**** PAGE STATE *****
addEvent(d, 'click', map_action);
addEvent(d.body, 'mouseover', onBodyOver);
addEvent(d.body, 'mouseout', onBodyOut);
addEvent(w, "beforeunload", onBeforeUnloadHandler);
addEvent(w, "blur", onBlurHandler);
addEvent(d, 'mousedown', mouseDownHandler);
addEvent(d, 'mouseup', mouseUpHandler);
addEvent(d, 'mousemove', mouseMoveHandler);

if (navigator.userAgent.indexOf('Opera') > -1) {
	addEvent(w, "unload", onBeforeUnloadHandler);
}

addEvent(w, "load", onLoadHandler);
addImg(d, clickfrogcontainer);

function get_plt()
{
	var eD = new Date();	
	var plt = eD.getTime() - sD.getTime();		
	return plt/1000;
}

function onLoadHandler()
{	
	var plt = get_plt();	
	var query = "sid="+sid+"&plt="+plt+"&u="+escape(w.location.href);
	try {		
		doPOSTCallOtherDomain(plt_url, query);		
	}
	catch (ex) {
	}
	
	aClickEvents();
}

function addImg(doc, container)
{
	try
	{
		var images = doc.getElementsByTagName("img");		
		if(images.length == 0)
		{
			container.innerHTML += "<img src='//"+main_domain+"/clfg_img.gif' style='position:absolute;top:0;left:0;width:1px;height:1px;'/>";
		}
	}catch (ex)
	{
	}
}

function mouseDownHandler(e)
{	
	m_down++;
	removeEvent(d, 'mousedown', mouseDownHandler);
}

function mouseUpHandler(e)
{	
	m_up++;
	removeEvent(d, 'mouseup', mouseUpHandler);
}

function mouseMoveHandler(e)
{	
	m_move++;	
	removeEvent(d, 'mousemove', mouseMoveHandler);
}

function onBlurHandler(e)
{
	var e = e || w.event; 	
	if (e) {
		
	}
	
	var query = "sid="+sid+"&c_u="+escape(w.location.href)+"&mm="+m_move+"&t=3";
	try {	
		
		doPOSTCallOtherDomain(leave_page + "?" + query, query);
		setTimeout(function() {
			//doPOSTCallOtherDomain(leave_page + "?" + query, query);
		}, 0);	
		
		
	}catch (ex)
	{
	}
}

function onBeforeUnloadHandler(e)
{
	var e = e || w.event; 	
	if (e) {
		
	}
	
	var query = "sid="+sid+"&c_u="+escape(w.location.href)+"&mm="+m_move;
	try {	
		
		doPOSTCallOtherDomain(leave_page + "?" + query, query);
		setTimeout(function() {
			//doPOSTCallOtherDomain(leave_page + "?" + query, query);
		}, 0);	
		
		
	}catch (ex)
	{
	}
}

function aClickEvents()
{
	var objs = document.getElementsByTagName('a');
	for (var i = 0; i < objs.length; i++) {
		addEvent(objs[i], "click", aClickHandler);
	}
}

function aClickHandler(e)
{
	var clicked_uri = this.href;
	var clicked_d = this.host;
	var clicked_name = this.hostname;
	
	if(typeof(clicked_uri) == 'undefined') {
		clicked_uri = e.srcElement.href;
	}
	if(typeof(clicked_d) == 'undefined') {
		clicked_d = e.srcElement.host;
	}
	if(typeof(clicked_name) == 'undefined') {
		clicked_name = e.srcElement.hostname;
	}
	
	var current_uri = window.location.href;
	var current_d = window.location.host;	
	
	var query = "sid="+sid+"&c_u="+escape(current_uri)+"&c_d="+current_d+"&v_u="+escape(clicked_uri)+"&v_d="+clicked_name+"&mm="+m_move;;
	try {		
		doPOSTCallOtherDomain(leave_page + "?" + query, query);
		setTimeout(function() {
			//doPOSTCallOtherDomain(leave_page + "?" + query, query);
		}, 0);
		
	} catch (ex)
	{
	}	
}


function imgs_loded()
{
	try	{
		var images = d.getElementsByTagName("img");
		for (var i = 0; i < images.length; i++) {
			var img = images[i];
			var w, h;
			
			if (typeof img.naturalWidth == "undefined") {  
				// IE 6/7/8  
				var im = new Image();  
				im.src = img.src;  
				w = im.width;  
				h = im.height;  
			  }  
			  else {  
				// HTML5 browsers  
				w = img.naturalWidth;
				h = img.naturalHeight;
			  }		
			
			if(w > 0 || h > 0) {
				imgs = 1;
				return;
			}			
		}
	}
	catch(ex)
	{
		imgs = 2;
	}
	imgs = 0;	
}

function onBodyOut(event)
{
	try
	{
		var elem = event.relatedTarget;
		var action = false;
		//for ie
		if(typeof(event.relatedTarget) == 'undefined')
		{		
			elem = event.srcElement;
			if(elem.tagName == "BODY")
			{
				action = true;
			}
		}
		else if(elem == null)
		{
			//alert('null');
			action = true;
		}
		else if(elem.tagName == 'HTML')
		{				
				var pageH = d.documentElement.clientHeight;
				var pageW = d.documentElement.clientWidth;				
				var eventX = event.clientX;
				var eventY = event.clientY;				
				var pagePrecent = 0.05;
				
				if(eventY <= pageH * pagePrecent || (pageH - eventY) <= pageH * pagePrecent 
					|| eventX <= pageW * pagePrecent || (pageW - eventX) <= pageW * pagePrecent)
				{
					//alert('action OK! ');
					action = true;
				}
				else
				{
					//alert('action HTML coords err');
				}
				//count++;
				//action = true;
		}

		if(action)
		{
			if(imgs == -1 || imgs == 0)
				imgs_loded();			
				
			try
			{
				doPOSTCallOtherDomain(state_url, 'state=0&sid='+sid+'&i='+imgs+'&ref='+escape(d.URL)+"&mm="+m_move);
			}
			catch(ex)
			{
				body_over_script(state_url, 'state=0&sid='+sid+'&i='+imgs+'&ref='+escape(d.URL)+"&mm="+m_move);
				//cross domain not allowed
				/*
				var my_fr = d.getElementById('state_act');
				if(my_fr != null)
				{
					my_fr.src = state_url+'?'+'state=0&sid='+sid+'&i='+imgs+'&ref='+escape(d.URL);
				}
				*/
			}
		}
		else
		{
			//d.getElementById('state').innerHTML += ' '+name+' ';
		}
	}
	catch(ex)
	{
		//d.getElementById('state').innerHTML += ' '+ ex.message;
	}
}

function onBodyOver(event)
{
	try
	{
		var elem = event.relatedTarget;
		var action = false;
		//for ie
		if(typeof(event.relatedTarget) == 'undefined')
		{		
			elem = event.srcElement;
			if(elem == null)
			{
				action = true;
			}		
			
			if(elem.tagName == "BODY")
			{
				action = true;
			}
		}
		else if(elem == null)
		{
			//alert('null');
			action = true;
		}
		else if(elem.tagName == 'HTML')
		{
			var pageH = d.documentElement.clientHeight;
			var pageW = d.documentElement.clientWidth;				
			var eventX = event.clientX;
			var eventY = event.clientY;				
			var pagePrecent = 0.05;
				
			if(eventY <= pageH * pagePrecent || (pageH - eventY) <= pageH * pagePrecent 
				|| eventX <= pageW * pagePrecent || (pageW - eventX) <= pageW * pagePrecent)
			{
				//alert('action OK! ');
				action = true;
			}
			else
			{
				//alert('action HTML coords err');
			}
			//action = true;
		}
		
		if(action)
		{
			if(imgs == -1 || imgs == 0)
				imgs_loded();
				
			try
			{
				doPOSTCallOtherDomain(state_url, 'state=1&sid='+sid+'&i='+imgs+'&ref='+escape(d.URL)+'&mm='+m_move);
			}
			catch(ex)
			{
				body_over_script(state_url, 'state=1&sid='+sid+'&i='+imgs+'&ref='+escape(d.URL) + '&mm'+m_move);
				//cross domain not allowed
				/*
				var my_fr = d.getElementById('state_act');
				if(my_fr != null)
				{
					my_fr.src = state_url+'?'+'state=1&sid='+sid+'&i='+imgs+'&ref='+escape(d.URL);
				}*/			
			}			
		}
		else
		{
			//d.getElementById('state').innerHTML += ' '+name+' ';
		}
	}
	catch(ex)
	{
		//d.getElementById('state').innerHTML += ' '+ ex.message;
	}
}

//***** CLICK MAP *****
function insinf(val)
{
	var div = d.getElementById('info');
	div.innerHTML +=  '['+val+']';
}

function frame_loaded()
{
	//alert('loaded');
	fr_loaded = true;	
	var cookie = get_all_cooks();
	if(cookie == cooks_buf)
	{
		//alert('cl ' + cookie);
		//insinf('del ' + cookie);
		clear_cookies();
	}
	else
	{
		//insinf('no_del ' + cookie + ' : ' + cooks_buf);
		map_action(false);
		//alert('no');
	}
}

//click map
function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent('on' + evType, fn)
	}
	else {
		elem['on' + evType] = fn
	}
}

function removeEvent(elem, evType, fn) {
	if(elem.removeEventListener) {
		elem.removeEventListener(evType, fn, false);
	}
	else if(elem.detachEvent) {
		elem.detachEvent('on' + evType, fn);
	}	
}

function getMouseX(e)
{
	var tempY = 0;
	if (IE) {
		tempX = event.clientX + d.body.scrollLeft;
	} else {
		tempX = e.pageX;
	}
	if (tempX < 0){tempX = 0;}	
	return tempX;
}

function getMouseY(e)
{
	var tempY = 0;
	if (IE) {
		tempY = event.clientY + d.body.scrollTop;
	} else {
		tempY = e.pageY;
	}
	if (tempY < 0){tempY = 0;}	
	return tempY;
}

function map_action(e)
{
	var evt = false, x = -1, y = -1;
	
	if(e!=false)
	{
		evt=w.event || e;
		x = getMouseX(evt);
		y = getMouseY(evt);
	}
	
	var time = Math.round(new Date().getTime() / 1000);	
	//var val = x+','+y+','+sid+','+time;
	var val = x+','+y+','+sid+','+time+','+m_move+','+m_down+','+m_up;
	if(x == -1 && y == -1)
		val = '';
	
	
	//alert(my_fr);	
	//send_map_data(x+';'+y+';');
	var c_name ='cmc';
	var cookie = get_cookie(c_name);
	
	if(cookie == 0)
	{
		//alert('1cookie: ' + cookie);
		
		var ss = get_ls_cmc();
		var ls = get_ss_cmc();
		
		if(ss!=0)
		{
			cookie = ss+';'+val;			
		}
		else if (ls!=0)
			cookie = ls+';'+val;
		else
			cookie = val;
		
		set_cookie(c_name, cookie, 365);
		set_ls_cmc(cookie);
		set_ss_cmc(cookie);
	}
	else
	{
		//alert('2cookie: ' + cookie);
		cookie +=';'+val;
		set_cookie(c_name, cookie);
		set_ls_cmc(cookie);
		set_ss_cmc(cookie);
	}	
	
	if(fr_loaded == true)
	{
		fr_loaded = false;
		
		cooks_buf = cookie;		
		//data = 'd='+escape(x+';'+y)+'&uid=-1&r='+Math.random() + '&sid='+sid+'&u='+escape(d.URL)+'&t='+time+'&i='+imgs+'&c='+escape(cookie);
		data = 'd='+escape(x+';'+y)+'&uid=-1&r='+Math.random() + '&sid='+sid+'&u='+escape(d.URL)+'&t='+time+'&i='+imgs+'&c='+escape(cookie)+'&mm='+m_move+'&md='+m_down+'&mu='+m_up;
	
		try
		{
			if(x!=-1 || y!=-1 || cookie!='') {
				doPOSTCallOtherDomain(map_url, data);				
			}
		}
		catch(ex)
		{		
			click_by_script(map_url, data);				
		}		
	}		
}

function body_over_script(url, data)
{
	var id_script = 'counter_body_map_script';
	var elem = d.getElementById(id_script);
	if(typeof(elem) != 'undefined' && elem != null)
		remove(elem);
    add_click_script(id_script, url+'?'+data);
}

function click_by_script(url, data)
{
	var id_script = 'counter_click_map_script';
	var elem = d.getElementById(id_script);
	if(typeof(elem) != 'undefined' && elem != null)
		remove(elem);
    add_click_script(id_script, url+'?'+data);
}

function add_click_script(id, url)
{	
	var el = document.createElement('script');
    el.src = url;
	el.id=id;
	el.onload = function(e)
	{
		frame_loaded();
	}
    d.body.appendChild(el);
}

function remove(elem) {
  return elem.parentNode ? elem.parentNode.removeChild(elem) : elem;
}

function doPOSTCallOtherDomain(url, data)
{
	var XHR = w.XDomainRequest || w.XMLHttpRequest;
	var xhr = new XHR();
		
    //xhr.open('GET', url, true);
	xhr.open('POST', url, true);
	//xhr.contentType = "application/x-www-form-urlencoded";
	try
	{
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}catch (ex)
	{	}

    // замена onreadystatechange
	xhr.onload = function() {
		frame_loaded();
		//d.getElementById('response').innerHTML = '<pre>'+xhr.responseText+'<pre>'
    }
	xhr.onerror = function() {
		//alert("Error")
	}
	xhr.send(data);
}

function clear_cookies()
{
	set_cookie('cmc', 0, -100);
	set_ls_cmc(0);
	set_ss_cmc(0);
	
	//alert('del');
}

function get_all_cooks()
{
	var c_name ='cmc';
	var cookie = get_cookie(c_name);	
	if(cookie == 0)
	{	
		cookie = get_ls_cmc();
		if(cookie==0)			
			cookie = get_ss_cmc();		
	}
	
	//insinf(cookie);	
	return cookie;	
}

function set_cookie(c_name, value, exdays)
{
	try
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
		d.cookie=c_name + "=" + c_value;
	}
	catch(ex) {}
}
function get_cookie(c_name)
{
	try
	{
		var i,x,y,ARRcookies=d.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				return unescape(y);
			}
		}
	}
	catch(ex) {}	
	return 0;
}
function set_ls_cmc(val)
{
	try
	{
		localStorage.cmc = val;
	}
	catch(ex){}
}
function get_ls_cmc()
{
	try
	{
		var ls = localStorage.cmc;
		if(ls == null)
			return 0;
		return localStorage.cmc;
	}
	catch(ex){}
	return 0;
}
function set_ss_cmc(val)
{
	try
	{		 
		sessionStorage.cmc = val;
	}
	catch(ex){}
}
function get_ss_cmc(val)
{
	try
	{
		var ss = sessionStorage.cmc;
		if(ss == null)
			return 0;
		return sessionStorage.cmc;
	}
	catch(ex){}
	return 0;
}

function getRnd()
{
	var min = 1, max = 4294967295;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//********END CLICK MAP ********
})
(document, window, (typeof(clickfrogru_ref_host) !== 'undefined') ? clickfrogru_ref_host : '');

/* t=0s */