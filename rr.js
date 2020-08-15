/*
 * RRJS (Request-Response JavaScript) is a comfort library 
 * for sending requests via XMLHttp or AJAX

 ****   ****
 *   *  *   *
 ****   ****
 * *    * *
 *  *   *  *

 * RRJS 1.0
 * by Chechkenev Andrew (DarkCat09/CodePicker13)
 */

var Xhreq = function(reqAddress, reqHeaders, reqFunction, reqMethod, reqData) {
	onreadyfunction	= (reqFunction ? reqFunction : function(s,r){});
	this.address			= String(reqAddress);
	this.headers			= (reqHeaders ? (reqHeaders.constructor === Array ? reqHeaders : [String(reqHeaders)]) : []);
	this.onreadyfunction	= onreadyfunction;
	this.method				= (reqMethod ? reqMethod : "GET");
	this.reqdata			= reqData;
	
	req = new XMLHttpRequest();
	req.open(this.method, this.address);
	this.headers.forEach(function(item, index, array) {
		req.setRequestHeader(item.split(": ")[0], item.split(": ")[1]);
	});
	req.onreadystatechange = function() {
		if (req.readyState == 4)
			onreadyfunction(req.status, req.response);
	};
	try {
		if (!this.reqdata)
			req.send();
		else if (this.method == "POST")
			req.send(this.reqdata);
	}
	catch (err) {
		alert(err);
	}
	this.req = req;
};

Xhreq.prototype.cancel = function() {
	this.req.abort();
};

