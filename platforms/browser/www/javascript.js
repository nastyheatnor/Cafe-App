<<<<<<< HEAD
if(PushbotsPlugin.isIOS) {
	PushbotsPlugin.initializeiOS("5c180f800540a37cd570ccdf");
}
if(PushbotsPlugin.isAndroid) {
	PushbotsPlugin.initializeAndroid("5c180f800540a37cd570ccdf", "633747534823");
}
=======
>>>>>>> 1322010c59c440220bfa60f9eef939b3b0fce67c
var xml;
function getIP()
{
	return "http://100.16.105.198/cafe/CafeAppServer/";
}

function retrieveParser()
{
	if(xml == null || typeof xml == "undefined")
	{	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
				xml = this.responseXML;
			}
	    };
	    xhttp.open("POST", getIP() + "Menu.xml", false);
	    xhttp.send();
		return xml.getElementsByTagName("Item");
	}else
	{
		return xml.getElementsByTagName("Item");
	}
}

function getImageUrl(id)
{
	return getIP() + "images/MenuImages/" + id + "_icon.png";
}

function parseFromMenu(xml, mechanism)
{
  	var menarr = retrieveParser();
	var htm = document.getElementById("base-table");

	for(var i = 0; i < menarr.length; i++)
	{
		if(menarr[i].getAttribute("mechanism").indexOf(mechanism) !== -1)
		{
			var id = readAttribute(menarr[i],"id");
			var itm = document.createElement("button");
			itm.className = "order";
			var itmnm = readAttribute(menarr[i], "name");
			var optionsxml = menarr[i].getElementsByTagName("options")[0];

			itm.onclick = function() {
			   var elem = this.getElementsByTagName("p")[0].innerHTML;
			   var modal = document.getElementById("myModal").style.display = "block";
			   document.getElementById("current-id-listing").innerHTML = elem;
			   document.getElementById("item-name").innerHTML = itmnm;
			   var optionstable = document.getElementById("options-table");
			   optionstable.innerHTML = "";
			   var optionsxmlarr = optionsxml.getElementsByTagName("option");
			   for(var j = 0; j < optionsxmlarr.length; j++)
			   {
				var type = optionsxmlarr[j].attributes[0].nodeValue;
				var tabler = document.createElement("tr");
				var tag = document.createElement("p");
				tag.style.display = "none";
				tag.innerHTML = type;
				tabler.appendChild(tag);
				if(type == "Text")
				{
					var opinputtd = document.createElement("td");
					var opinput = document.createElement("input");
					opinput.type = "text";
					opinput.placeholder = optionsxmlarr[j].getElementsByTagName("name")[0].innerHTML;
					opinputtd.appendChild(opinput);
					tabler.appendChild(opinputtd);
				}else if(type == "Addition")
				{
					var opbuttontd = document.createElement("td");
					var opbutton = document.createElement("button");
					opbutton.innerHTML = optionsxmlarr[j].getElementsByTagName("name")[0].innerHTML + "- $" +  parseFloat(optionsxmlarr[j].getElementsByTagName("price")[0].innerHTML).toFixed(2);
					opbuttontd.appendChild(opbutton);
					opbutton.onclick = function() {
						alert("Woah!");
					}
					tabler.appendChild(opbuttontd);
				}else if(type == "Options")
				{
					var op = document.createElement("td");
					var opdesc = document.createElement("label");
					opdesc.innerHTML = optionsxmlarr[j].getElementsByTagName("name")[0].innerHTML;
					op.appendChild(opdesc);
					var opselection = document.createElement("select");
					opdesc.for = opselection;
					var suboptionsxml = optionsxmlarr[j].getElementsByTagName("suboption");
					for(var k = 0; k < suboptionsxml.length; k++)
					{
						var optionoptiontiny = document.createElement("option");
						var text = suboptionsxml[k].getElementsByTagName("name")[0].innerHTML + "- $" + parseFloat(suboptionsxml[k].getElementsByTagName("price")[0].innerHTML).toFixed(2);
						optionoptiontiny.innerHTML = text;
						opselection.appendChild(optionoptiontiny);
					}
					op.appendChild(opselection);
					tabler.appendChild(op);
				}
				optionstable.appendChild(tabler);
			   }
			};

			itm.style="background-image: url(" + getImageUrl(id) + ");";

			var txt = document.createElement("span");
			txt.className="btn-text";
			txt.innerHTML=readAttribute(menarr[i],"name");

			var idDisp = document.createElement("p");
			idDisp.style="display:none;";
			idDisp.innerHTML = id;

			itm.appendChild(idDisp);
			itm.appendChild(txt);
			htm.appendChild(itm);
		}
	}
	var lwhl = document.getElementById("loading-wheel");
	lwhl.style.visibility = "hidden";
	var basetable = document.getElementById("base-table");
	basetable.style.visibility = "visible";
}
function readAttribute(elem, attr)
{
	return elem.getElementsByTagName(attr)[0].getAttribute("value");
}

function parseDirect(id, attr)
{
	var menarr = retrieveParser();
	var htmtext = "";

	for(var i = 0; i < menarr.length; i++)
	{
		if(menarr[i].getElementsByTagName("id")[0].getAttribute("value") === id)
		{
    		return menarr[i].getElementsByTagName(attr)[0].getAttribute("value");
		}
	}
}
function load(mechanism)
{
	parseFromMenu(xml,mechanism);
	retrieveCart();
}

function getCartMenu()
{
	var cart = getCart();
	var display = document.getElementById("menu-listing");
	var count = document.getElementById("count");
	var price = document.getElementById("price");
	var result = "";
	for(var i = 0; i < cart.length; i++)
	{
		var xm = getById(cart[i]["id"]);
		result += "<button class=\"cart-item\" onClick=\"remove(" + cart[i]["cartid"] +
			")\" style=\"background-image: url(" + getImageUrl(cart[i]["id"]) +
			"); height:100px; width:25%; margin-left:2%; margin-right:2%; \"><span class=\"cart-item-txt\">" + readAttribute(xm, "name") + "</span><p style=\"display:none\"> " + cart[i]["cartid"] + " </p></button>";
	}
	if(cart.length == 1)
	{
		count.innerHTML = cart.length + " Item"; 
	}else
	{
		count.innerHTML = cart.length + " Items"; 
	}
	
	price.innerHTML = "$" + getTotalPrice().toFixed(2);
	display.innerHTML = result;
}

function retrieveCart()
{
	var display = document.getElementById("current-order");
	var count = document.getElementById("count");
	var price = document.getElementById("price");
	var result = "";
	var cart = getCart();
	for(var i = 0; i < cart.length; i++)
	{
		var xm = getById(cart[i]["id"]);
		result += "<button class=\"cart-item\" onClick=\"removeFromCart(" + cart[i]["cartid"] +
			")\" style=\"background-image: url(" + getImageUrl(cart[i]["id"]) +
			"); \"><span class=\"cart-item-txt\">" + readAttribute(xm, "name") + "</span></button>";
	}
	if(cart.length == 1)
	{
		count.innerHTML = cart.length + " Item"; 
	}else
	{
		count.innerHTML = cart.length + " Items"; 
	}
	
		price.innerHTML = "$" + getTotalPrice().toFixed(2);
	display.innerHTML = result;

}

function clearCart()
{
	var cart = getCart();
	for(var i = 0; i < cart.length; i++)
	{
		removeFromCart(0);
	}
}

function getCart()
{
	var storedNames = localStorage.getItem("cart").split("/");
	var result = [];
	for(var i = 0; i < storedNames.length; i++)
	{
		var splitarr = storedNames[i].split("-");
		var splitsplitarr = splitarr[0].split(":");
		var item = new Object();
		item.cartid = splitsplitarr[0];
		item.id = splitsplitarr[1];
		item.options = splitarr[1];
		if(item.id !== null && item.id !== undefined && item.id !== "" && item.cartid !== null && item.cartid !== undefined && item.cartid !== "" && item.options !== null && item.options !== undefined && item.options !== "")
		{
			result.push(item);
		}
	}
	return result;
}

function getById(id)
{
	var menarr = retrieveParser();
	for(var i = 0; i < menarr.length; i++)
	{
		var element = menarr[i];
		if(menarr[i] !== null)
		{
			if(readAttribute(element, "id").toString() === id.toString())
			{
				return element;
			}
		}
	}
}

function addToCart(id, options)
{
	var cart = localStorage.getItem("cart");
	var cartid = 1;
	if(cart.length > 0)
	{
		cart += "/";
		cartid = parseInt(cart.split("/")[cart.split("/").length - 2].split(":")[0]) + 1;
	}
	cart += cartid + ":" + id + "-" + options;
	localStorage.setItem("cart", cart);
	retrieveCart();
}

function remove(id)
{
	var cartItemsArr = localStorage.getItem("cart").split("/");
	var cart = "";
	var rmbool = false;
	for(var j = 0; j < cartItemsArr.length; j++)
	{
		if(cartItemsArr[j] !== null && cartItemsArr[j] !== undefined && cartItemsArr[j] !== "")
			{
				if(cartItemsArr[j].cartid.toString() !== id.toString() || rmbool)
				{
					cart += cartItemsArr[j].cartid + ":" + cartItemsArr[j].id + "-" + cartItemsArr[j].options + "/";
				}else
				{
					rmbool = true;
				}
			}
		localStorage.setItem("cart", cart);
	}
	getCartMenu();
}

function removeFromCart(id)
{
	var cartItemsArr = getCart();
	var cart = "";
	var rmbool = false;
	for(var j = 0; j < cartItemsArr.length; j++)
	{
		if(cartItemsArr[j] !== null && cartItemsArr[j] !== undefined && cartItemsArr[j] !== "")
			{
				if(cartItemsArr[j].cartid.toString() !== id.toString() || rmbool)
				{
					cart += cartItemsArr[j].cartid + ":" + cartItemsArr[j].id + "-" + cartItemsArr[j].options + "/";
				}else
				{
					rmbool = true;
				}
			}
		localStorage.setItem("cart", cart);
	}
	retrieveCart();
}

function getTotalPrice()
{
	var cart = getCart();
	var price = 0;
	for(var i = 0; i < cart.length; i++)
	{
		price += parseFloat(getPrice(cart[i].id));
	}
	return price;
}

function getPrice(id)
{
	return parseDirect(id, "price");
}

function goback()
{
	location.href='OrderCart.html'
}
