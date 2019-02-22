//  initTimeLiner.js


    function initTimeLiner() {
    
    //  Timeliner.
        timeContainer.innerHTML = "";
            
    //  Settings.
        var duration = Number(animtimerSlider.max);  //  var duration = 3; // (sec).
        var defaultTimeScale = Math.floor(timeContainer.offsetWidth / duration); // (pixels).
    
    //  Dimensions.
        var markerTrackHeight = 20;
        var width = animtimerSlider.offsetWidth; // duration * defaultTimeScale;
        var height = 50;
        var timeScale = defaultTimeScale; // number of pixels to 1 second.
    
    //  Utilities.
        function proxy_ctx(ctx) {
    	//  Creates a proxy 2d context wrapper which 
    	//  allows the fluent / chaining API.
        	var wrapper = {};
        
        	function proxy_function(c) {
        		return function() {
    			//  Warning: this doesn't return value of function call
        			ctx[c].apply(ctx, arguments);
        			return wrapper;
        		};
        	}
        
        	function proxy_property(c) {
        		return function(v) {
        			ctx[c] = v;
        			return wrapper;
        		};
        	}
        
        	wrapper.run = function(args) {
        		args(wrapper);
        		return wrapper;
        	};
            
        	for (var c in ctx) {
    		//  if (!ctx.hasOwnProperty(c)) continue;
    		//  console.log(c, typeof(ctx[c]), ctx.hasOwnProperty(c));
    		//  string, number, boolean, function, object
        
        		var type = typeof(ctx[c]);
        		switch(type) {
        			case "object":
        				break;
        			case "function":
        				wrapper[c] = proxy_function(c);
        				break;
        			default:
        				wrapper[c] = proxy_property(c);
        				break;
        		}
        	}
        
        	return wrapper;
        }
    
    //  View Panel.
        var frame_start = 0; // this is the current scroll position.
        
    //  This class contains the view for the right main section of timeliner
        var tickMark1;
        var tickMark2;
        var tickMark3;
            
    //  Subdivison LOD
    //  timeScale refers to number of pixels per unit
    //  Eg. 1 inch - 60s, 1 inch - 60fps, 1 inch - 6 mins.    
        function time_scaled() {

        	var subDivision = 60;
        
        	tickMark1 = Math.round( (timeScale / subDivision) * 100 ) / 100;
        	tickMark2 = 2 * tickMark1;
        	tickMark3 = 10 * tickMark1;
        
        }
        
        time_scaled();

    //  Timeline Panel.
        var dpr = window.devicePixelRatio;
        var canvas = document.createElement("canvas");
        canvas.width = width; // * dpr;
        canvas.height = height; // * dpr;
        timeContainer.appendChild(canvas);
        
        var ctx = canvas.getContext("2d");
    	var ctx_wrap = proxy_ctx(ctx);
        
        var currentTime; // measured in seconds.
	//  Technically it could be in frames or have it in string format (0:00:00:1-60).
	
    	var LEFT_GUTTER = 0;
    	var i, x, y, il, j;
        	
    //	function paint() {
    
        //  Background.
            ctx.fillStyle = "#ffffff";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    		ctx.save();
    		ctx.scale(dpr, dpr);
            
            ctx.lineWidth = 2; // options: | 0.5 | 1 | 2 |
            
            var units = Math.round(timeScale / tickMark1);
    		var offsetUnits = (frame_start * timeScale) % units;
    		var count = Math.ceil( width / units );
  
        //  timeScale = pixels to 1 second (40)
		//  tickMark1 = marks per second (marks / s)
		//  units = pixels to every mark (40)
            var t =  Math.floor(units * 100 / timeScale);
            //debugMode && console.log("t:", t);
            
        //  1.Labels only.
    		for (i = 0; i < count + 1; i++) {
    			x = i * units + LEFT_GUTTER - offsetUnits;
                
    			ctx.fillStyle = "#535353";
    			ctx.textAlign = "center";
                
    			var ti = ( t * i / 100 ).toFixed(2).replace(/\./g, ":");
    			//debugMode && console.log("t" + i + ":", ti);
                
    			ctx.fillText(ti, x, 50);
    		}
    
    		units = Math.round( timeScale / tickMark2 );
    		count =  Math.round( (width - LEFT_GUTTER + offsetUnits) / units );

        //  2.Marker lines - main.
    		for (i = 0; i < count + 1; i++) {
    			ctx.strokeStyle = "#b8b8b8";
    			ctx.beginPath();
    			x = i * units + LEFT_GUTTER - offsetUnits;
    			ctx.moveTo(x, markerTrackHeight + 14);
    			ctx.lineTo(x, markerTrackHeight - 16);
    			ctx.stroke();
    		}
    
    		var mul = tickMark3 / tickMark2;
    		units = Math.round( timeScale / tickMark3 );
    		count =  Math.round( (width - LEFT_GUTTER + offsetUnits) / units );

        //  3.Small ticks.
            for (i = 0; i < count + 1; i++) {
            	if (i % mul === 0) continue;
            	ctx.strokeStyle = "#b8b8b8";
            	ctx.beginPath();
            	x = i * units + LEFT_GUTTER - offsetUnits;
            	ctx.moveTo(x, markerTrackHeight + 5);
            	ctx.lineTo(x, markerTrackHeight - 10);
            	ctx.stroke();
            }
        
    //  }
        
    //  paint();

    }
