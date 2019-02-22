//  loadSkinnedAnimatedMesh.js

    function loadSkinnedAnimatedMesh(url, scale){
    //  Remove old avatar from scene.
        if (avatar) scene.remove(avatar);
    //  Remove old armature helper.
        if (!!armatureHelper) scene.remove(armatureHelper);
        
    //  Load Skinned Armatured Mesh.
        var loader = new THREE.JSONLoader();
        loader.load( url, function(geometry, materials){
            geometry.computeVertexNormals();
	        geometry.computeBoundingBox();
        //
	        for ( var i = 0, il = materials.length; i < il; i ++ ) {
                var originalMaterial = materials[ i ];
                originalMaterial.skinning = true;
            }
        //
            var material = new THREE.MeshFaceMaterial(materials);
            avatar = new THREE.SkinnedMesh(geometry, material, false);
            avatar.name = "AVATAR";
            avatar.position.set( 0, 0, 0 );
            avatar.scale.set( scale, scale, scale );
            avatar.rotation.set( 0, 0, 0 );
            avatar.userData.animationData = {};
        //

//  VERY IMPORTANT: This is for not disappear avatar when camera come to close //
            avatar.frustumCulled = false; //  VERY IMPORTANT  //
//  VERY IMPORTANT: This is for not disappear avatar when camera come to close //

        //
            scene.add(avatar);
            skins.push(avatar);
            console.log("Avatar loaded:", avatar);
        //
            armatureHelper = new SkeletonHelper(avatar);
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
                avatar.userData.restPose.push( restPoseKey );
            }

            console.log( "Rest pose saved:", avatar.userData.restPose );
            
        //  Now that we have create the animation
        //  we can get the currentBone and initialize
        //  the bones values in bone adjust sliders.
        
            getCurrentBone(); 

            initBonesAdjustValues();

        //  Activate animation.
            animation.play(0);   // IMPORTANT //

            console.log("Avatar loading completed and ready to animate.");

            removeKeymarks();    // IMPORTANT //

        //  Init avatar helper text.
            if (avatar.visible) 
                $(avatarHelperSelector).text("Hide Avatar");
            else 
                $(avatarHelperSelector).text("Show Avatar");
        
        //  Init armatureHelper helper text.
            if (armatureHelper.visible) 
                $(bonesHelperSelector).text("Hide Bones");
            else 
                $(bonesHelperSelector).text("Show Bones");

        });
    }

