var xaraSwidgets_slidorionTemplates = {

	effect:		'{effect}',
	
	slide:		'<div class="slide">'
				+'<table width=100% height=100% border=0 cellpadding=0 cellspacing=5><tr>'
				+'<td align=center valign=middle class="imageTd" style="background-image:url({image});">&nbsp;'
				
				+'</td></tr></table>'
				+'</div>',
	
	accordian:	'<div class="link-header">{title}</div>'
				+'<div class="link-content">'
				+'{content}'
				+'</div>',
				
	mainleft:		'<div id="shadow"><div id="slidorion">'
	
				+'	<div id="accordion">'
				+'		{accordion}'
				+'	</div>'
				
				+'	<div id="slider">'
				+'		{slider}'
				+'	</div>'
				+''
				
				+'</div></div>',
				
	mainright:		'<div id="shadow"><div id="slidorion">'
	
				
				
				+'	<div id="slider">'
				+'		{slider}'
				+'	</div>'
				+''
				
				+'	<div id="accordion">'
				+'		{accordion}'
				+'	</div>'
				
				+'</div></div>'				
            
};

function xaraSwidgets_slidorionTemplateConstructor(divID, data, side)
{
	var shadowGap = 5;
	
	var sizes = {
		
		'width_slider':488,
		'width_accordion':280,
		'height_accordionPart':180
		
	};
	
	if(side==null)
	{
		side = 'left';
	}
	
	var templateName = 'main' + side;
	
	var newSizes = {};
	
	var originalWidth = 768;
	var originalHeight = 400;
	
	var widget = $('#' + divID);
	var container = widget.parent();
	
	var widthPercent = container.width() / originalWidth;
	var heightPercent = container.height() / originalHeight;
	
	widget.width(container.width()).height(container.height());
	
	for(var i in sizes)
	{
		var coeff = i.match(/^width/) ? widthPercent : heightPercent;
		
		newSizes[i] = Math.round(coeff * sizes[i]);
	}
	
	var slideHTML = '';
	var accordianHTML = '';
	
	var configData = data[0];
	
	var autoScroll = 10;
	
	if(configData.autoscroll!=null)
	{
		val = parseInt(configData.autoscroll);
		
		if(!isNaN(val))
		{
			autoScroll = val;
		}
	}
	
	var maxIndex = data.length < 7 ? data.length : 7;
	
	function htmlbr(str) {
	if (str == undefined)
	return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=1; i<maxIndex; i++)
	{
		var entryData = data[i];
		data[i].content = htmlbr(data[i].content);
		
//		entryData.content = entryData.content.replace(/\n\r?/g, '<br />');
//		console.log(entryData.content)
		
		slideHTML += xaraSwidgets_compileTemplate(xaraSwidgets_slidorionTemplates.slide, entryData);
		accordianHTML += xaraSwidgets_compileTemplate(xaraSwidgets_slidorionTemplates.accordian, entryData);
		effect = (data[0].effect);

	}
		
		var defaultTransition = 1;
		var enteredTransition = parseInt(effect);
		var effect = isNaN(enteredTransition) ? defaultTransition : enteredTransition
		var effect = parseInt(effect);
		if(!isNaN(effect))
			{
			useEffect = effect;
			}	
		if (effect ==1){
			effect ='fade'
			}
		else if (effect ==2){
			effect ='slideRandom'
			}
		else if (effect ==3){
			effect ='overRandom'
			}
		else if (effect ==4){
			effect ='slideUp'
			}
		else if (effect ==5){
			effect ='slideDown'
			}
		else if (effect ==6){
			effect ='slideLeft'
			}
		else if (effect ==7){
			effect ='slideRight'
			}
		else if (effect ==8){
			effect ='overUp'
			}
		else if (effect ==9){
			effect ='overDown'
			}
		else if (effect ==10){
			effect ='overLeft'
			}
		else if (effect ==11){
			effect ='overRight'
			}
		else if (effect ==12){
			effect ='none'
			}
		
	// now lets compile the 'main' template which acts as a wrapper for each entry
	var mainData = {
		component_id:divID,
		slider:slideHTML,
		accordion:accordianHTML,
	//	ie:$.browser.msie && $.browser.version <= 8 ? 'ie' : ''
		ie:document.all && !document.addEventListener ? 'ie' : ''
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_slidorionTemplates[templateName], mainData);
	
	widget.html(mainTemplate);
	
	widget.find('#slidorion').width(widget.width()-shadowGap).height(widget.height()-shadowGap);
	widget.find('#slider').width(newSizes.width_slider-shadowGap).height(widget.height()-shadowGap);
	
	widget.find('#accordion').width(newSizes.width_accordion).height(widget.height()-shadowGap);
	
	
	var headerHeight = widget.find('#accordion > .link-header:first').height() * widget.find('#accordion > .link-header').length * 2;
	
	widget.find('#accordion > .link-content').height(widget.height() - headerHeight - 10);
	
	widget.slidorion({
		interval: autoScroll*1000,
		effect: effect
	});
	
	widget.find('#shadow').width(widget.width()-shadowGap).height(widget.height()-shadowGap);
	widget.find('#shadow').addClass('slidorionShadow');
}
