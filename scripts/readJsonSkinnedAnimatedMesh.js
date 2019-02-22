
//  readJsonSkinnedAnimatedMesh.js

    //  READ JSON SKINNED MESH.
    
    function readJsonSkinnedAnimatedMesh(event){

    //  Abort.

        if ( event.currentTarget.files.length == 0 ) return; 

        debugMode && console.log("Importing skinned mesh from JSON file.");

    //  FileList object.

        var file = event.target.files[0];                           debugMode && console.log("file:", file);
        var filename = file.name;                                   debugMode && console.log("filename:", filename);
		var extension = filename.split( '.' ).pop().toLowerCase();  debugMode && console.log("extension:", extension);
		var name = filename.split( '.' )[0];                        debugMode && console.log("name:", name);

    //  Read json file as text.

        var reader = new FileReader();

    //  On error...

        reader.onerror = function(err){

            console.error(err);

            var msg = [ "Sorry. An error occured.", 
                "Please try to upload a skinned mesh json file.",
            err ].join(" ");  
            
            alert(msg); 

        };

    //  When reading competed...

        reader.onloadend = function(event){
    
            try {

            //  debugMode && console.log(event.target.result);
                var contents = event.target.result;
            //  Skinned Json data for skinned collection input.
                var skinnedJsonData = event.target.result;
            //  debugMode && console.log("contents:", contents);
                debugMode && console.log("json contents readed as text.");

    //      1. Parse json string as json data with JSON parser.

            //  Parse json contents string as json data.
                var data = JSON.parse( contents );
                debugMode && console.log("json contents parsed as data:", data);
            //  Get Json contents metadata.
                var metadata = data.metadata;
                debugMode && console.log("json metadata:", metadata);

    //      2. Parse again json data with a new JSONLoader to get the geometry/material.

                var loader = new THREE.JSONLoader();
                var result = loader.parse( data );
            //  debugMode && console.log("json data parsed with THREE.JSONLoader as JSON object {geometry, materials}.");
                debugMode && console.log("result:", result);

            //  Check if this is skinned.
                if  (  !result.geometry 
                    || !result.geometry.bones 
                    || !result.geometry.bones.length ) {

                    var msg = [
                        "Sorry. This doesn't seem to be a skinned mesh file.", 
                        "Please try to upload a valid skinned mesh json file."
                    ].join(" ");  

                    console.warn(msg);

                    alert(msg);

                    return;
                }

    //      3. Create the geometry from json results.

                var geometry = result.geometry;
                debugMode && console.log("geometry:", geometry);
                geometry.computeVertexNormals();
    	        geometry.computeBoundingBox();
                geometry.sourceType = "ascii";
    		    geometry.sourceFile = file.name;
    	    //
    
    //      4. Create the materials from json results.

                var material;
    			if ( result.materials !== undefined ) {
    
                    for ( var i = 0; i < result.materials.length; i++ ) {
                        var originalMaterial = result.materials[ i ];
                        originalMaterial.skinning = true;
                    }
    
                    if ( result.materials.length > 1 )
    					material = new THREE.MeshFaceMaterial( result.materials );
    				else 
    					material = result.materials[ 0 ];
    
    			} else {
    
    				material = new THREE.MeshPhongMaterial();
    
    			}
    
    			debugMode && console.log("material:", material);

    //      5.  Create the json skinned mesh object.

    			if ( !!geometry.bones && !!geometry.bones.length ) {

                //  Remove old skinnedmesh from scene.
                    if (!!avatar) scene.remove(avatar);
                //  Remove old armature helper.
                    if (!!armatureHelper) scene.remove(armatureHelper);

                    avatar = new THREE.SkinnedMesh(geometry, material, false);
                    avatar.name = "AVATAR";
                    avatar.position.set( 0, 0, 0 );
                    avatar.scale.set( 1, 1, 1 );
                    avatar.rotation.set( 0, 0, 0 );
                    avatar.userData.animationData = {};
                //  scene.add(avatar);
                    skins.push(avatar);
                    debugMode && console.log("Avatar loaded:", avatar);
                    
    			} else {
    
                    var msg = [
                        "Sorry. This is not a skinned mesh.", 
                        "Please try to upload skinned mesh json file."
                    ].join(" ");  debugMode && console.log(msg);
                    
                    alert(msg);

                    return;
    			}
    
        //  --------------------------------------------------------------------------  //
        //  VERY IMPORTANT: This is for not disappear avatar when camera come to close. //
    
                avatar.frustumCulled = false;                  //  VERY IMPORTANT  //
    
        //  VERY IMPORTANT: This is for not disappear avatar when camera come to close. //
        //  --------------------------------------------------------------------------  //
    
    //      6. Add new mesh in SKIN scene.
            //
    			scene.add(avatar);
    			debugMode && console.log("avatar added in Animator scene:", scene.children);
            //  Loading completed.
                debugMode && console.log("Loading skinned json file", filename, "completed.");
            //  Focus Editor controls.
                controls.focus(avatar, true);
                
    //      7. Add all the rest things in scene.

                armatureHelper = newSkeletonHelper(avatar);
                scene.add(armatureHelper);
                armatureHelper.visible = false;
                debugMode && console.log("Armature Helper created:", armatureHelper);
            
            //  Initialize Bones Drop list.
                initBonesSelect(avatar);
                debugMode && console.log("Bones select initialized.");
                
            //  Define the animationData object to create the init animation.
                var animationData = {"name":null, "fps":null, "length":null, "hierarchy":[]};
                animationData.name = nameAnimField.value;
                animationData.fps = Number(fpsSlider.value);
                animationData.length = Number(animtimerSlider.max);
    
            //  Prepear animationData for first init animation keys.
    
            //  Create the init key (time:0) for every bone of avatar in animationData.hierarchy.
                for (var i in avatar.skeleton.bones) {
                    animationData.hierarchy.push({"keys":[]});
                    var initAnimationKey = {"pos":[0,0,0], "rot":[0,0,0,1], "scl":[1,1,1], "time":0};
                    initAnimationKey.pos = avatar.skeleton.bones[i].position.toArray();
                    initAnimationKey.rot = avatar.skeleton.bones[i].quaternion.toArray();
                    initAnimationKey.scl = avatar.skeleton.bones[i].scale.toArray();
                    animationData.hierarchy[i].keys.push(initAnimationKey);
                }

                debugMode && console.log( "Animation Data created:", animationData );

            //  Create the animation.
                THREE.AnimationHandler.animations = [];
                animation = new THREE.Animation( avatar, animationData );
                animation.isPlaying = false;
                animation.currentTime = 0;
                timescaleSlider.value = 0;
                playButton.innerHTML = "Play";
                debugMode && console.log("Animation created:", animation);
            //
                ensureLooping();

            //  Create a userData array to store rest pose.
                avatar.userData.restPose = [];
    
            //  Store init key as rest pose in userData.
                for (var i in animation.hierarchy) {
                    var restPoseKey = {"pos":[0,0,0], "rot":[0,0,0,1], "scl":[1,1,1]};
                    restPoseKey.pos = animation.hierarchy[i].position.toArray();
                    restPoseKey.rot = animation.hierarchy[i].quaternion.toArray();
                    restPoseKey.scl = animation.hierarchy[i].scale.toArray();
                    avatar.userData.restPose.push( restPoseKey );
                }

                debugMode && console.log( "Rest pose saved:", avatar.userData.restPose );

            //  Now that we have create the animation
            //  we can get the currentBone and initialize
            //  the bones values in bone adjust sliders.

                getCurrentBone(); 
    
                initBonesAdjustValues();
    
                debugMode && console.log("Avatar loading completed and ready to animate.");
    
                removeKeymarks();  //  IMPORTANT //  ??? WHY ???
                
            } catch(err) {

                reader.onerror(err);

            }
	   };

    //  Read json file as a text.
        reader.readAsText(file);

    }


//  ---------------------------- !!! DEPRECATED !!! ----------------------------  //

    function loadJsonSkinnedAnimatedMesh(event){

        readJsonSkinnedAnimatedMesh(event);

        console.warn("!!!DEPRECATED!!!", 
            "'loadJsonSkinnedAnimatedMesh(event)' is deprecated.", 
            "Use 'readJsonSkinnedAnimatedMesh(event)' instead."
        );

    }

//  ---------------------------- !!! DEPRECATED !!! ----------------------------  //

//  loadJsonSkinnedAnimatedMesh.js 
/*
    //  LOAD JSON SKINNED MESH.

    function loadJsonSkinnedAnimatedMesh(event){
    //  Remove old skinnedmesh from scene.
        if (!!avatar) scene.remove(avatar);
    //  Remove old armature helper.
        if (!!armatureHelper) scene.remove(armatureHelper);

    //  JSON TEXT CONTENTS READER.
        var reader = new FileReader();
        
    //  FileList object.
        var file = event.target.files[0];
        console.log("file:", file);
        var filename = file.name;
        console.log("filename:", filename);
		var extension = filename.split( '.' ).pop().toLowerCase();
		console.log("extension:", extension);
		var name = filename.split( '.' )[0];
		console.log("name:", name);
		
//      1. First we read json file as text.

    //  Read json file as a text string.
        reader.readAsText(file);
        
    //  When reading competed...
        reader.onloadend = function(event){
            //console.log(event.target.result);
            contents = event.target.result;
        //  Skinned Json data for skinned collection input.
            skinnedJsonData = event.target.result;
            //console.log("contents:", contents);
            console.log("json contents readed as text string.");
//      2. Then we parse json string as json data with JSON parser.
        //  Parse json contents string as json data.
            var data = JSON.parse( contents );
            console.log("json contents parsed as data:", data);
        //  Get Json contents metadata.
            var metadata = data.metadata;
            console.log("json metadata:", metadata);
//      3. Last we parse again json data with a new JSONLoader to get the geometry.
            var loader = new THREE.JSONLoader();
            var result = loader.parse( data );
            console.log("json data parsed with THREE.JSONLoader as JSON object {geometry, materials}.");
            console.log("result:", result);
            var geometry = result.geometry;
            console.log("geometry:", geometry);
            
//      4. We create the materials from json results.
            geometry.computeVertexNormals();
	        geometry.computeBoundingBox();
	    //
            var material;
			if ( result.materials !== undefined ) {

                for ( var i = 0; i < result.materials.length; i++ ) {
                    var originalMaterial = result.materials[ i ];
                    originalMaterial.skinning = true;
                }

                if ( result.materials.length > 1 )
					material = new THREE.MeshFaceMaterial( result.materials );
				else 
					material = result.materials[ 0 ];

			} else {

				material = new THREE.MeshPhongMaterial();

			}

			console.log("material:", material);
        //
            geometry.sourceType = "ascii";
		    geometry.sourceFile = file.name;
		    
//      5. We create the json skinned mesh object.
			if ( geometry.bones && geometry.bones.length > 0 ) {

				// var material = new THREE.MeshFaceMaterial(result.materials);
                avatar = new THREE.SkinnedMesh(geometry, material, false);
                avatar.name = "AVATAR";
                avatar.position.set( 0, 0, 0 );
                avatar.scale.set( 1, 1, 1 );
                avatar.rotation.set( 0, 0, 0 );
                avatar.userData.animationData = {};
                // scene.add(avatar);
                skins.push(avatar);
                console.log("Avatar loaded:", avatar);
                
			} else {
			
                var msg = "Sorry. This is not a skinned mesh. Try to upload with Easy Meshes Upload Form.";
                console.log(msg);
                alert(msg);
                return;
			}
        
//  VERY IMPORTANT: This is for not disappear avatar when camera come to close //
            avatar.frustumCulled = false; //  VERY IMPORTANT  //
//  VERY IMPORTANT: This is for not disappear avatar when camera come to close //

//      6. We add new mesh in SKIN scene.
			scene.add(avatar);
			console.log("avatar added in Animator scene:", scene.children);
        //  Loading completed.
            console.log("Loading skinned json file", filename, "completed.");
        //  Focus Editor controls.
            controls.focus(avatar, true);
            
//      7. We add all the rest things in scene.
            armatureHelper = newSkeletonHelper(avatar);
            scene.add(armatureHelper);
            armatureHelper.visible = false;
            console.log("Armature Helper created:", armatureHelper);
        
        //  Initialize Bones Drop list.
            initBonesSelect(avatar);
            console.log("Bones select initialized.");
            
        //  Define the animationData object to create the init animation.
            var animationData = {"name":null, "fps":null, "length":null, "hierarchy":[]};
            animationData.name = nameAnimField.value;
            animationData.fps = Number(fpsSlider.value);
            animationData.length = Number(animtimerSlider.max);
            
        //  Prepear animationData for first init animation keys.

        //  Create the init key (time:0) for every bone of avatar in animationData.hierarchy.
            for (var i in avatar.skeleton.bones) {
                animationData.hierarchy.push({"keys":[]});
                var initAnimationKey = {"pos":[0,0,0], "rot":[0,0,0,1], "scl":[1,1,1], "time":0};
                initAnimationKey.pos = avatar.skeleton.bones[i].position.toArray();
                initAnimationKey.rot = avatar.skeleton.bones[i].quaternion.toArray();
                initAnimationKey.scl = avatar.skeleton.bones[i].scale.toArray();
                animationData.hierarchy[i].keys.push(initAnimationKey);
            }

            console.log( "Animation Data created:", animationData );
            
        //  Create the animation.
            THREE.AnimationHandler.animations = [];
            animation = new THREE.Animation( avatar, animationData );
            animation.isPlaying = false;
            animation.currentTime = 0;
            timescaleSlider.value = 0;
            playButton.innerHTML = "Play";
            console.log("Animation created:", animation);
        //
            ensureLooping();

        //  Create a userData array to store rest pose.
            avatar.userData.restPose = [];

        //  Store init key as rest pose in userData.
            for (var i in animation.hierarchy) {
                var restPoseKey = {"pos":[0,0,0], "rot":[0,0,0,1], "scl":[1,1,1]};
                restPoseKey.pos = animation.hierarchy[i].position.toArray();
                restPoseKey.rot = animation.hierarchy[i].quaternion.toArray();
                restPoseKey.scl = animation.hierarchy[i].scale.toArray();
                avatar.userData.restPose.push( restPoseKey );
            }

            console.log( "Rest pose saved:", avatar.userData.restPose );
            
        //  Now that we have create the animation
        //  we can get the currentBone and initialize
        //  the bones values in bone adjust sliders.

            getCurrentBone(); 

            initBonesAdjustValues();

            console.log("Avatar loading completed and ready to animate.");

            removeKeymarks();  //  IMPORTANT //
		};
    }
*/
//  ----------------------------------------------------------------------------  //
