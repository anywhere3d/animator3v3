//  readAnimationPoseFromJSON.js

    function readAnimationPoseFromJSON(event){

        if (event.target.files.length == 0) return false;

        debugMode && console.log("Importing animation pose keys from JSON file.");

    //  FileList object.

        var file = event.target.files[0];
        var filename = file.name;
		var extension = filename.split( '.' ).pop().toLowerCase();
		var name = filename.split( '.' )[0];

		debugMode && console.log("file:", file);
		debugMode && console.log("filename:", filename);
		debugMode && console.log("extension:", extension);
		debugMode && console.log("name:", name);

    //  Read json file as a text.

        var reader = new FileReader();

    //  On error...

        reader.onerror = function(err){

            console.error(err);

            var msg = [ "Sorry. An error occured.", 
                "Please try to upload a pose json file.",
            err ].join(" ");  

            alert(msg); 

        };

    //  When reading competed...

        reader.onloadend = function(event){

            try {

            //  debugMode && console.log(event.target.result);
                var contents = event.target.result;
            //  Pose Json data for pose animation collection input.
                var PoseJsonData = event.target.result;
            //  debugMode && console.log("contents:", contents);
                debugMode && console.log("json contents readed as text string.");
                
        //  Parse json string as json data with JSON parser.

            //  Parse json contents string as json data.
                var poseArray = JSON.parse( contents );
                debugMode && console.log("json contents parsed as poseArray:", poseArray);

    			bcaFrameKeyIndexesArray( animtimerSlider.value );
    
    			if (animationDataKeyExist){

    			//  Replace key if exist.
                    for (var i in poseArray){
                        animation.data.hierarchy[i].keys[currentAnimationKeyIndex].pos = poseArray[i].pos;
                        animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.fromArray(poseArray[i].rot);
                        animation.data.hierarchy[i].keys[currentAnimationKeyIndex].scl = poseArray[i].scl;
                    }

                    debugMode && console.log( 
                        "Animation pose key", currentAnimationKeyIndex, "replaced at", 
                        animtimerSlider.value, "sec.", animation.data.hierarchy
                    );

    			} else if (!animationDataKeyExist) {

    			//  Insert key if not exists.
                    var b = bcaAnimationDataIndexKeys[0];
                    var c = bcaAnimationDataIndexKeys[1];
                    var a = bcaAnimationDataIndexKeys[2];
                    if ( b &&  a ) { idx = b; spl = a; }          // splice to next key index.
                    else if (!b &&  a) { idx = 0; spl = a; }      // splice to next key index.
                    else if ( b && !a) { idx = b; spl = b + 1; }  // push to end of keys array.
                    else if (!b && !a) { idx = 0; spl = 0; }      // keys array is empty. unshift to beginning of keys array.

                    for (var i in animation.data.hierarchy){
                        var newKey = {"index":spl, "pos":[], "rot":new THREE.Quaternion(), "scl":[], "time":Number(animtimerSlider.value)};
                        newKey.pos = poseArray[i].pos;
                        newKey.rot.fromArray(poseArray[i].rot);
                        newKey.scl = poseArray[i].scl;
                    //  Add new key in animation data hierarchy keys array.
                        if (spl < animation.data.hierarchy[i].keys.length) 
                            animation.data.hierarchy[i].keys.splice(spl, 0, newKey);      // add new key before the after key.
                        else animation.data.hierarchy[i].keys.push(newKey);               // add new key at end of keys array.
                    //  Ensure keys indexing.
                        for (var j in animation.data.hierarchy[i].keys){
                            animation.data.hierarchy[i].keys[j].index = Number(j);
                        }
                    }

                    debugMode && console.log(
                        "New animation data key imported at", 
                        animtimerSlider.value, "sec.", 
                        animation.data.hierarchy
                    );

                }

                ensureLooping();
                ensureKeysIndexing();
                bcaFrameKeyIndexesArray( animtimerSlider.value );
                debugMode && console.log("Animation pose key completed.");

                animation.isPlaying = true;
                timescaleSlider.value = 0;
                animation.play( animation.currentTime );
                playButton.innerHTML = "Play";

            //  Update bca indexes to get the new currentAnimationKeyIndex.
                bcaFrameKeyIndexesArray( animtimerSlider.value );

            //  Get currentAnimationKeyIndex and 
            //  then define currentAnimationKeyObject.
                new CurrentBoneSelected();

                displayKeymarks(); // IMPORTANT //

            } catch(err) {

                reader.onerror(err);

            }
        };

    //  Read json file as a text.
        reader.readAsText(file);

    }

//  ---------------------------- !!! DEPRECATED !!! ----------------------------  //

    function importAnimationPoseKeyFromJSON(event){

        readAnimationPoseFromJSON(event);

        console.warn("!!!DEPRECATED!!!", 
            "'importAnimationPoseKeyFromJSON(event)' is deprecated.", 
            "Use 'readAnimationPoseFromJSON(event)' instead."
        );

    }

//  ---------------------------- !!! DEPRECATED !!! ----------------------------  //
