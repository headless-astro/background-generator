var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var txt = document.getElementsByClassName("txt")
var button = document.querySelector("button");


function setGradient() {
	
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	css.textContent = body.style.background + ";";
	
	for (var i = 0; i < txt.length; i++) {
		txt[i].style.background = 
	"linear-gradient(to right, " 
	+ getContrast(color1.value)
	+ ", " 
	+ "rgba(140,140,140,1)"
	+ ", " 
	+ getContrast(color2.value)
	+ ")";
	txt[i].style["-webkit-text-fill-color"] = "transparent";
	txt[i].style["-webkit-background-clip"] = "text";
}
}

var assignRandomColor = function (){

	color1.value = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
	color2.value = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
	setGradient();
};



var getContrast = function (hexcolor){

	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === '#') {
		hexcolor = hexcolor.slice(1);
	}

	// If a three-character hexcode, make six-character
	if (hexcolor.length === 3) {
		hexcolor = hexcolor.split('').map(function (hex) {
			return hex + hex;
		}).join('');
	}

	// Convert to RGB value
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);

	// Get YIQ ratio
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

	// Check contrast
	return (yiq >= 128) ? "rgba(20,20,20,1)" : "rgba(250,250,250,1)";

};


setGradient(color1,color2);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
button.addEventListener("click", assignRandomColor);
