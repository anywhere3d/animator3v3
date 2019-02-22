//  readAnimationDataFromJSON.js

    function readAnimationDataFromJSON(event){

        if (event.target.files.length == 0) return false;

        debugMode && console.log("Importing animation data object from JSON file.");
        
    //  FileList object.

        var file = event.target.files[0];
        var filename = file.name;
        var extension = filename.split( '.' ).pop().toLowerCase();
        var name = filename.split( '.' )[0];

    //  Read json file as a text.

        var reader = new FileReader();

    //  On error...

        reader.onerror = function(err){

            console.error(err);

            var msg = [ "Sorry. An error occured.", 
                "Please try to upload an animation json file.",
            err ].join(" ");  

            alert(msg); 

        };


    //  When reading competed...

        var contents, dataObject;
        reader.onloadend = function( event ){

            try {

                contents = event.target.result;
                dataObject = JSON.parse( contents );
                debugMode && console.log("animation dataObject:", dataObject);

            //  Replace the animation.
                THREE.AnimationHandler.animations = [];
                animation = new THREE.Animation( avatar, dataObject );
                animation.currentTime = 0;
                durOutput.value = animation.data.length;
                animtimerSlider.max = animation.data.length;
                timescaleSlider.value = 0;
                nameAnimField.value = animation.data.name;
            //  animation.isPlaying = true;
                animation.play(0);
                playButton.innerHTML = "Play";

                debugMode && console.log("Animation created:", animation);

                displayKeymarks(); // IMPORTANT //

            } catch(err) {

                reader.onerror(err);

            }
        };

    //  Read json file as a text string.
        reader.readAsText(file);

    }

//  ---------------------------- !!! DEPRECATED !!! ----------------------------  //

    function importAnimationDataFromJSON(event){

        readAnimationDataFromJSON(event);

        console.warn("!!!DEPRECATED!!!", 
            "'importAnimationDataFromJSON(event)' is deprecated.", 
            "Use 'readAnimationDataFromJSON(event)' instead."
        );

    }

//  ---------------------------- !!! DEPRECATED !!! ----------------------------  //
