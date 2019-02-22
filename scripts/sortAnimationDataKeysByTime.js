
//  sortAnimationDataKeysByTime.js

    function changeFrameKeyTimeDebuger(k, t){
        for (var i in animation.data.hierarchy){
            animation.data.hierarchy[i].keys[k].time = t;
        }
    }
    
    function sortAnimationDataKeysByTime(){
        for (var i in animation.data.hierarchy){
        //  Sort animation data keys by time.
            animation.data.hierarchy[i].keys.sort( function(a,b){return parseFloat(a.time) - parseFloat(b.time);} );
        //  Ensure animation data keys indexing.
            for (var j in animation.data.hierarchy[i].keys){
                animation.data.hierarchy[i].keys[j].index = Number(j);
            }
        }
        console.log("Sorting Animation Data Keys by time with internal Ensure Keys Indexing completed.");
    }

