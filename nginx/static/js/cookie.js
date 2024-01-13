const cookie = {
	set: function(name, value, days){
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var exp = "; expires="+date.toGMTString();
		} else var exp = "";
			document.cookie = name + "=" + value + exp + "; path=/;SameSite=Strict";
	},
	get: function(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = ca.length-1; i >= 0; i--) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);	
			}
		}
		return null;
	},
	delete: function (name) {
		cookie.set(name, "", -1);
	}
};