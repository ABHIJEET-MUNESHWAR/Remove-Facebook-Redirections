// ==UserScript==
// @include        https://www.facebook.com/*
// @include        https://facebook.com/*
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @run-at         document-start
// ==/UserScript==

document.addEventListener('DOMNodeInserted',checksearch,false);
function checksearch()
{	
	if(window.location.hostname.match(/www\.facebook\.com/))
	{
		document.removeEventListener('DOMNodeInserted',checksearch,false);
		document.addEventListener('DOMNodeInserted',huntForLinks,false);
	}
}

var fixRedirect = function(event)
{
	var node = event.target;		
	node.removeEventListener('mouseenter',fixRedirect,false);
	var fbRedirectURL = "http://www.facebook.com/l.php?u=";
	var refString = /&h=(.+)$/;
	var realHref = node.href.replace(fbRedirectURL,"");	
	if(realHref && realHref != node.href)
	{	
		realHref = realHref.replace(refString,"");			
		node.href = unescape(realHref);		
	}		
};

function huntForLinks()
{	
	var items=document.getElementsByTagName('a');
	for(var i=0;i<items.length;i++)
	{	
		var hasMouseDown = items[i].getAttribute('onmousedown');
		if(hasMouseDown && /^UntrustedLink/.test(hasMouseDown))
		{
			items[i].removeAttribute('onmousedown');		
			items[i].addEventListener('mouseenter',fixRedirect,false);
		}		
	}	
}