(function($){
	const shade = '#00ff00';
	$.fn.greenify = function(){
		this.css('color',shade);
		return this;
	}
}(jQuery));