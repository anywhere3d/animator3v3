//  exportAnimationDataAsJSON.js

    function exportAnimationDataAsJSON(){
        console.log("Exporting animation data as JSON.");
        ensureLooping();
        ensureKeysIndexing();
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        var jsonExport;
        if (animationDataKeyExist) {
            var dataExport = {"name":"", "fps":0, "length":0, "hierarchy":[]}
            dataExport.name = animation.data.name;
            dataExport.fps = animation.data.fps;
            dataExport.length = animation.data.length;
            
            for (var i in animation.data.hierarchy){
                var keysExport = {keys:[]}
                for (var j in animation.data.hierarchy[i].keys){
                    var key = {"pos":[], "rot":[], "scl":[], "time":0};
                    key.pos = animation.data.hierarchy[i].keys[j].pos;
                    key.rot = animation.data.hierarchy[i].keys[j].rot.toArray();
                    key.scl = animation.data.hierarchy[i].keys[j].scl;
                    key.time = animation.data.hierarchy[i].keys[j].time;
                    keysExport.keys.push(key);
                }
                dataExport.hierarchy.push(keysExport);
            }
            console.log(dataExport);
        //
            jsonExport = JSON.stringify(dataExport);
            console.log(jsonExport);
        //
            alert("Animation data exported succesfully.");
        }
        else {
            var a = "Current animation data key does not exists.";
            var b = "You can not export animation data.";
            console.log(a, b, "\n" + jsonExport, "returned.");
            alert(a + "\n" + b);
        }
        return jsonExport;
    }
