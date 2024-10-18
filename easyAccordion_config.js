var xaraSwidgets_easyAccordionTemplates = {
	
	entry:		'<dt>{heading}</dt>'
			+	'<dd>'
			+	'<h2>{title}</h2>'
			+	'<p><img src="{image}" alt="" title="" />{text}<br /><a href="{link}">{link_title}</a></p>'
			+	'</dd>',
	
	main:		'<div id="{component_id}OuterDiv" class="accordion-1">'
			+ 	'<dl id ="{component_id}InnerDiv">'
			+ 	'{entryhtml}'
            + 	'</dl>'
            + 	'</div>'
            
};

function xsw_ea_htmlbr(str)
{
    if (str == undefined)
        return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}

// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_easyAccordionConstructor(divID, data)
{
	var entryHTML = '';

	// loop through each entry in the array and compile the entry template for it
	for(var i=0; i<data.length; i++)
	{
	    data[i].heading = xsw_ea_htmlbr(data[i].heading);
	    data[i].title = xsw_ea_htmlbr(data[i].title);
	    data[i].text = xsw_ea_htmlbr(data[i].text);
	    data[i].link_title = xsw_ea_htmlbr(data[i].link_title);
	    entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_easyAccordionTemplates.entry, data[i]);
	}

	// now lets compile the 'main' template which acts as a wrapper for each entry
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_easyAccordionTemplates.main, mainData);

	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	$('#' + divID).html(mainTemplate);

	// now we have the components DOM on the page - we can use the 'OuterDiv' as the jquery initiation point
	$('#' + divID + 'OuterDiv').easyAccordion({ 
		autoStart: true,
		slideInterval: 5000
	});
}