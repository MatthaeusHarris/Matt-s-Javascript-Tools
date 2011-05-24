(function() {
  var cache = {};
  
  function applyTemplates() {
    console.log("Applying templates now.");
    var reg = /%([\w-]*)%/g;
    
    $(".template").each(function(index, item) {
      var templateString = $(item).attr("template");
      var m;
      var matches = [];
      while (m = reg.exec(cache[templateString])) {
	matches.push(m);
      }
      console.log(matches);
      var scratch = cache[templateString];
      for (match in matches) {
	scratch = scratch.replace(matches[match][0], $(item).children("." + matches[match][1]).html());
      }
      $(item).html(scratch);
    });
    
    $("#template-scratch").remove();
    
//Add other page-ready callbacks here.
    
  }

  console.log("blarg!");  
  $().ready(function() {
    $("body").append('<div id="template-scratch"></div>');
    $("#template-scratch").hide();
    var templateCount = $(".template").size();
    var templatesLoaded = 0;
    $(".template").each(function(index, item) {
      //Load templates used on this page
      var templateString = $(item).attr("template");
      var inputString = $(item).html();
      
      if (cache[templateString] == undefined) {
	cache[templateString] = "loading";
	console.log("Loading " + templateString);
	$("#template-scratch").load(templateString, function() {
	  cache[templateString] = $("#template-scratch").html();
	  templatesLoaded++;
	  if (templatesLoaded == templateCount) {
	    applyTemplates();
	  }
	});
	
      } else {
	templatesLoaded++;
	if (templatesLoaded == templateCount) {
	  applyTemplates();
	}
      }
    });
  });
})();

