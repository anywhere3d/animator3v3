//  animatorController.js (v3.3)

//  Scripts.

    var scriptsFolder = "scripts/";

    var loadBvhDataFileScript = scriptsFolder + "loadBvhDataFile.js";
    var readJsonSkinnedAnimatedMeshScript = scriptsFolder + "readJsonSkinnedAnimatedMesh.js";
    var readAnimationPoseFromJSONScript = scriptsFolder + "readAnimationPoseFromJSON.js";
    var readAnimationDataFromJSONScript = scriptsFolder + "readAnimationDataFromJSON.js";
    var exportAnimationPoseAsJSONScript = scriptsFolder + "exportAnimationPoseAsJSON.js";
    var exportAnimationDataAsJSONScript = scriptsFolder + "exportAnimationDataAsJSON.js";
    var initTimeLinerScript = scriptsFolder + "initTimeLiner.js";
//  var toggleKeyExistClassScript = scriptsFolder + "toggleKeyExistClass.js";

//  Holders.

    var bonesHolderSelector = "#bones-holder";
    var positionHolderSelector = "#position-holder";
    var rotationHolderSelector = "#rotation-holder";
    var scaleHolderSelector = "#scale-holder";
    var settingsHolderSelector = "#settings-holder";
    var animatorContainerSelector = "#animator-container";
    var importbvhHolderSelector = "#import-bvh-holder";
    var importSkinnedHolderSelector = "#import-skinned-holder";
    var importPoseHolderSelector = "#import-pose-holder";
    var importAnimHolderSelector = "#import-anim-holder";
    var exportPoseHolderSelector = "#export-pose-holder";
    var exportAnimHolderSelector = "#export-anim-holder";

//  BVH loader.js
    
    var importBvhBtnSelector = "#import-bvh-button";
    var loadBvhInputSelector = "#load-bvh-input";
    var bvhClipAnimation;
    var bvhAnimation;
    var bvhMesh;
    var bvhSkeletonHelper;

//  ImportersExporters.js

    var importSkinnedBtnSelector = "#import-skinned-button";
    var readSkinnedInputSelector = "#read-skinned";
    var importPoseBtnSelector = "#import-pose-button";
    var readPoseInputSelector = "#read-pose";
    var importDataBtnSelector = "#import-animation-button";
    var readDataInputSelector = "#read-animation";
    var exportPoseBtnSelector = "#export-pose-data";
    var exportDataBtnSelector = "#export-animation-data";
    var boneLabelSelectedNameSelector = "#bone-label-selected-name";
    var selectBonesSelector = "#select-bones";
    var bonesSelectDroplist = $(selectBonesSelector)[0];

//  Position sliders.
    var sliderPosXSelector = "#slider-pos-x";
    var sliderPosYSelector = "#slider-pos-y";
    var sliderPosZSelector = "#slider-pos-z";
    var outputPosXSelector = "#output-pos-x";
    var outputPosYSelector = "#output-pos-y";
    var outputPosZSelector = "#output-pos-z";
    var positionOutputSelector = ".position-output";
    var resetPositionSelector = "#reset-position";
    var posSliderX = $(sliderPosXSelector)[0];
    var posSliderY = $(sliderPosYSelector)[0];
    var posSliderZ = $(sliderPosZSelector)[0];
    var posOutputX = $(outputPosXSelector)[0];
    var posOutputY = $(outputPosYSelector)[0];
    var posOutputZ = $(outputPosZSelector)[0];
    

//  Rotation sliders.
    var sliderRotXSelector = "#slider-rot-x";
    var sliderRotYSelector = "#slider-rot-y";
    var sliderRotZSelector = "#slider-rot-z";
    var outputRotXSelector = "#output-rot-x";
    var outputRotYSelector = "#output-rot-y";
    var outputRotZSelector = "#output-rot-z";
    var rotationOutputSelector = ".rotation-output";
    var resetRotationSelector = "#reset-rotation";
    var rotSliderX = $(sliderRotXSelector)[0];
    var rotSliderY = $(sliderRotYSelector)[0];
    var rotSliderZ = $(sliderRotZSelector)[0];
    var rotOutputX = $(outputRotXSelector)[0];
    var rotOutputY = $(outputRotYSelector)[0];
    var rotOutputZ = $(outputRotZSelector)[0];

//  Scale sliders.
    var sliderSclXSelector = "#slider-scl-x";
    var sliderSclYSelector = "#slider-scl-y";
    var sliderSclZSelector = "#slider-scl-z";
    var outputSclXSelector = "#output-scl-x";
    var outputSclYSelector = "#output-scl-y";
    var outputSclZSelector = "#output-scl-z";
    var scaleOutputSelector = ".scale-output";
    var resetScaleSelector = "#reset-scale";
    var sclSliderX = $(sliderSclXSelector)[0];
    var sclSliderY = $(sliderSclYSelector)[0];
    var sclSliderZ = $(sliderSclZSelector)[0];
    var sclOutputX = $(outputSclXSelector)[0];
    var sclOutputY = $(outputSclYSelector)[0];
    var sclOutputZ = $(outputSclZSelector)[0];

//  Uniform Scale slider.
    var sliderScaleUniformSelector = "#slider-scale-uniform";
    var outputScaleUniformSelector = "#output-scale-uniform";
    var sclUniformSlider = $(sliderScaleUniformSelector)[0];
    var sclUniformOutput = $(outputScaleUniformSelector)[0];
    var uniformScaleOutputSelector = ".uniform-scale-output";

//  Settings controls.
    var sliderDurSelector = "#slider-dur";
    var outputDurSelector = "#output-dur";
    var sliderTimescaleSelector = "#slider-timescale";
    var outputTimescaleSelector = "#output-timescale";
    var sliderFpsSelector = "#slider-fps";
    var outputFpsSelector = "#output-fps";
    var animationNameSelector = "#animation-name";
    var durSlider = $(sliderDurSelector)[0];
    var durOutput = $(outputDurSelector)[0];
    var timescaleSlider = $(sliderTimescaleSelector)[0];
    var timescaleOutput = $(outputTimescaleSelector)[0];
    var fpsSlider = $(sliderFpsSelector)[0];
    var fpsOutput = $(outputFpsSelector)[0];
    var nameAnimField = $(animationNameSelector)[0];

//  Timeliner controls.
    var keysContainerSelector = "#keys-container";
    var timeContainerSelector = "#time-container";
    var sliderTimerSelector = "#slider-timer";
    var outputTimerSelector = "#output-timer";
    var animationPlayBtnSelector = "#animation-play";
    var animationAddKeyBtnSelector = "#animation-add";
    var animationRemoveKeySelector = "#animation-remove";
    var statusMsgrSelector = "#status-msgr";
    var slidertimer      = $(sliderTimerSelector)[0];
    var timeContainer  = $(timeContainerSelector)[0];
    var keyscontainer  = $(keysContainerSelector)[0];
    var animtimerSlider  = $(sliderTimerSelector)[0];
    var animtimerOutput  = $(outputTimerSelector)[0];
    var playButton  = $(animationPlayBtnSelector)[0];
    var addKey    = $(animationAddKeyBtnSelector)[0];
    var removeKey = $(animationRemoveKeySelector)[0];
    var statusMsgr = $(statusMsgrSelector)[0];

//  Avatar helpers.
    var avatarHelperSelector = "#avatar-helper";
    var bonesHelperSelector = "#bones-helper";
    var resetPoseSelector = "#reset-pose";
    var removeKeysSelector = "#remove-keys";



                    //  Functions as a Services  //



//  BVH loader.js



    $.getScript(loadBvhDataFileScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("insertNewAnimateDataTimeFrameKey:", status);

        $(loadBvhInputSelector).on("change", function(e){

        //  Abort.
            if ( e.currentTarget.files.length == 0 ) return; 

        //  Remove old skinnedmesh from scene.
            if (!!avatar) scene.remove(avatar);
        //  Remove old armature helper.
            if (!!armatureHelper) scene.remove(armatureHelper);

        //  Read file.
    		var file = e.target.files[0];
    		var reader = new FileReader();
            reader.onload = loadBvhDataFile;
    		reader.readAsText(file);

        });

    //  BVH loader.js
    
        $(importBvhBtnSelector).on("click", function(){ 
    
        //  Reset file input Filelist.
            $(loadBvhInputSelector).val("");
    
        //  Open file input window.
            $(loadBvhInputSelector).click(); 
        });

    //  loadBvhDataFile.js
    
        $(importSkinnedBtnSelector).on("click", function(){ 
    
        //  Reset file input Filelist.
            $(readSkinnedInputSelector).val("");
    
        //  Open file input window.
            $(readSkinnedInputSelector).click(); 
        });

    });



//  readJsonSkinnedAnimatedMesh.js



    $.getScript(readJsonSkinnedAnimatedMeshScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("readJsonSkinnedAnimatedMesh:", status);

        $(readSkinnedInputSelector).on("change", readJsonSkinnedAnimatedMesh);


        $(importPoseBtnSelector).on("click", function(){ 
    
        //  Reset file input Filelist.
            $(readPoseInputSelector).val("");
    
        //  Open file input window.
            $(readPoseInputSelector).click(); 
    
        });

    });



//  readAnimationPoseFromJSONScript.js



    $.getScript(readAnimationPoseFromJSONScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("readAnimationPoseFromJSON:", status);

        $(readPoseInputSelector).on("change", readAnimationPoseFromJSON);


        $(importDataBtnSelector).on("click", function(){ 
    
        //  Reset file input Filelist.
            $(readDataInputSelector).val("");
    
        //  Open file input window.
            $(readDataInputSelector).click(); 
        });

    });



//  readAnimationDataFromJSON.js



    $.getScript(readAnimationDataFromJSONScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("readAnimationDataFromJSON:", status);

        $(readDataInputSelector).on("change", readAnimationDataFromJSON);
    });



//  exportAnimationPoseAsJSON.js



    $.getScript(exportAnimationPoseAsJSONScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("exportAnimationPoseAsJSON:", status);

        $(exportPoseBtnSelector).on("click", function(){
            saveJSONtoFile( exportAnimationPoseAsJSON() );
        });

    });



//  exportAnimationDataAsJSON.js



    $.getScript(exportAnimationDataAsJSONScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("exportAnimationDataAsJSON:", status);

        $(exportDataBtnSelector).on("click", function(){
            saveJSONtoFile( exportAnimationDataAsJSON() );
        });

    });



//  boneSelector.js



    $(selectBonesSelector).on("change", function(e){ 
        new CurrentBoneSelected(); 
    });

    function initBonesSelect(theAvatar){
    //  Remove all options from select.
        bonesSelectDroplist.innerHTML = null;
    //  Create new options list from avatar bones.
        for (var i in theAvatar.skeleton.bones){
            var option = document.createElement("option");
            option.value = theAvatar.skeleton.bones[i].name;
            option.text  = theAvatar.skeleton.bones[i].name;
            bonesSelectDroplist.options.add( option );
        }
    }



//  toggleKeyExistClass.js



//    $.getScript(toggleKeyExistClassScript, function(data, status, xhr){ 
//        if (status == "error") console.error( status, xhr.status, xhr.statusText );
//        if (status == "success") debugMode && console.log("toggleKeyExistClass:", status);
//    });




//  positionControls.js



//  Initialize Position sliders.
    var pmin, pmax, pstep;
    pmin = -1; pmax = 1; pstep = 0.01; 
    initSlider(posSliderX, pmin, pmax, pstep);
    initSlider(posSliderY, pmin, pmax, pstep);
    initSlider(posSliderZ, pmin, pmax, pstep);

    $(sliderPosXSelector).on("mousedown", function(){ dynamicSliderPressed('pos-x', true,  0); });
    $(sliderPosYSelector).on("mousedown", function(){ dynamicSliderPressed('pos-y', true,  0); });
    $(sliderPosZSelector).on("mousedown", function(){ dynamicSliderPressed('pos-z', true,  0); });
    $(sliderPosXSelector).on("mouseup",   function(){ dynamicSliderPressed('pos-x', false, 0); });
    $(sliderPosYSelector).on("mouseup",   function(){ dynamicSliderPressed('pos-y', false, 0); });
    $(sliderPosZSelector).on("mouseup",   function(){ dynamicSliderPressed('pos-z', false, 0); });

    $(resetPositionSelector).on("click",  function(){ bonesResetPosition(avatar); });

    $(outputPosXSelector).on("mousedown", function(){ outputSliderPressed('pos-x', true);  });
    $(outputPosYSelector).on("mousedown", function(){ outputSliderPressed('pos-y', true);  });
    $(outputPosZSelector).on("mousedown", function(){ outputSliderPressed('pos-z', true);  });
    $(outputPosXSelector).on("mouseup",   function(){ outputSliderPressed('pos-x', false); });
    $(outputPosYSelector).on("mouseup",   function(){ outputSliderPressed('pos-y', false); });
    $(outputPosZSelector).on("mouseup",   function(){ outputSliderPressed('pos-z', false); });

    $(posOutputX).on("input", function(e){
        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }
    //  Submit value to object.
        currentDataBone.keys[currentAnimationKeyIndex].pos[0] = parseFloat(this.value);     // number toFixed(2)
    });

    $(posOutputY).on("input", function(e){
        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }
    //  Submit value to object.
        currentDataBone.keys[currentAnimationKeyIndex].pos[1] = parseFloat(this.value);     // number toFixed(2)
    });

    $(posOutputZ).on("input", function(e){
        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }
    //  Submit value to object.
        currentDataBone.keys[currentAnimationKeyIndex].pos[2] = parseFloat(this.value);     // number toFixed(2)
    });


    function submitPositionValue(){
    //  Submit value to object.
        currentDataBone.keys[currentAnimationKeyIndex].pos[0] += parseFloat(posSliderX.value);   // number  toFixed(2)
        currentDataBone.keys[currentAnimationKeyIndex].pos[1] += parseFloat(posSliderY.value);   // number  toFixed(2)
        currentDataBone.keys[currentAnimationKeyIndex].pos[2] += parseFloat(posSliderZ.value);   // number  toFixed(2)
        
    //  Play the frame.
        timescaleSlider.value = 0;
        animation.play( animation.currentTime );
        
    //  Return value to output.
        posOutputX.value = currentBone.position.x.toFixed(1);   // string  toFixed(2)
        posOutputY.value = currentBone.position.y.toFixed(1);   // string  toFixed(2)
        posOutputZ.value = currentBone.position.z.toFixed(1);   // string  toFixed(2)
    }

    function reversePositionValue(){
    //  Update output values.
        if (animation){
            posOutputX.value = currentBone.position.x.toFixed(1);   // string  toFixed(2)
            posOutputY.value = currentBone.position.y.toFixed(1);   // string  toFixed(2)
            posOutputZ.value = currentBone.position.z.toFixed(1);   // string  toFixed(2)
        }
    }



//  rotationControls.js



//  Initialize Static Rotation sliders.
    var rmin, rmax, rstep;
    rmin = -180; rmax = 180; rstep = 1;
    initSlider(rotSliderX, rmin, rmax, rstep);
    initSlider(rotSliderY, rmin, rmax, rstep);
    initSlider(rotSliderZ, rmin, rmax, rstep);

    $(sliderRotXSelector).on("mousedown", function(){ staticSliderPressed('rot-x', true);  });
    $(sliderRotYSelector).on("mousedown", function(){ staticSliderPressed('rot-y', true);  });
    $(sliderRotZSelector).on("mousedown", function(){ staticSliderPressed('rot-z', true);  });
    $(sliderRotXSelector).on("mouseup",   function(){ staticSliderPressed('rot-x', false); });
    $(sliderRotYSelector).on("mouseup",   function(){ staticSliderPressed('rot-y', false); });
    $(sliderRotZSelector).on("mouseup",   function(){ staticSliderPressed('rot-z', false); });

    $(resetRotationSelector).on("click",  function(){ bonesResetQuaternion(avatar); });

    $(outputRotXSelector).on("mousedown", function(){ outputSliderPressed('rot-x', true);  });
    $(outputRotYSelector).on("mousedown", function(){ outputSliderPressed('rot-y', true);  });
    $(outputRotZSelector).on("mousedown", function(){ outputSliderPressed('rot-z', true);  });
    $(outputRotXSelector).on("mouseup",   function(){ outputSliderPressed('rot-x', false); });
    $(outputRotYSelector).on("mouseup",   function(){ outputSliderPressed('rot-y', false); });
    $(outputRotZSelector).on("mouseup",   function(){ outputSliderPressed('rot-z', false); });

    $(rotationOutputSelector).on("input", function(){
        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }

    //  Submit value to object.
        var x = parseFloat( THREE.Math.degToRad( Number( rotOutputX.value ) ) ); // number rad
        var y = parseFloat( THREE.Math.degToRad( Number( rotOutputY.value ) ) ); // number rad
        var z = parseFloat( THREE.Math.degToRad( Number( rotOutputZ.value ) ) ); // number rad

        var euler = new THREE.Euler(x, y, z, "XYZ");
        var quaternion = new THREE.Quaternion();
        quaternion.setFromEuler( euler );
        currentDataBone.keys[ currentAnimationKeyIndex ].rot.copy( quaternion );

    //  Play the frame.
    //  timescaleSlider.value = 0;
    //  animation.play( animation.currentTime );

    //  Update slider values.
        var xrad = currentBone.rotation._x;                      // number rad
        var yrad = currentBone.rotation._y;                      // number rad
        var zrad = currentBone.rotation._z;                      // number rad
        rotSliderX.value = THREE.Math.radToDeg(xrad).toFixed(0); // string degrees
        rotSliderY.value = THREE.Math.radToDeg(yrad).toFixed(0); // string degrees
        rotSliderZ.value = THREE.Math.radToDeg(zrad).toFixed(0); // string degrees
    });



    function submitRotationValue(){

        var x = parseFloat( THREE.Math.degToRad( Number( rotSliderX.value ) ) ); // number rad
        var y = parseFloat( THREE.Math.degToRad( Number( rotSliderY.value ) ) ); // number rad
        var z = parseFloat( THREE.Math.degToRad( Number( rotSliderZ.value ) ) ); // number rad
        
        var euler = new THREE.Euler(x, y, z, "XYZ");
        var quaternion = new THREE.Quaternion();
        quaternion.setFromEuler( euler );
        currentDataBone.keys[ currentAnimationKeyIndex ].rot.copy( quaternion );
    
    //  Play the frame.
    //  timescaleSlider.value = 0;
    //  animation.play( animation.currentTime );
        
    //  Update output values.
        var xrad = currentBone.rotation._x;                      // number rad
        var yrad = currentBone.rotation._y;                      // number rad
        var zrad = currentBone.rotation._z;                      // number rad

        var xdeg = parseInt( THREE.Math.radToDeg(xrad) );
        var ydeg = parseInt( THREE.Math.radToDeg(yrad) );
        var zdeg = parseInt( THREE.Math.radToDeg(zrad) );

        rotOutputX.value = xdeg.toFixed(0); // string degrees
        rotOutputY.value = ydeg.toFixed(0); // string degrees
        rotOutputZ.value = zdeg.toFixed(0); // string degrees
    }

    function reverseRotationValue(){
    //  Update output values.
        if (animation){
            var xrad = currentBone.rotation._x;                      // number rad
            var yrad = currentBone.rotation._y;                      // number rad
            var zrad = currentBone.rotation._z;                      // number rad
        //  Always rotation y first because of quaternion.
            rotOutputY.value = rotSliderY.value = THREE.Math.radToDeg(yrad).toFixed(0); // string degrees
            rotOutputX.value = rotSliderX.value = THREE.Math.radToDeg(xrad).toFixed(0); // string degrees
            rotOutputZ.value = rotSliderZ.value = THREE.Math.radToDeg(zrad).toFixed(0); // string degrees
        }
    }



//  scaleControls.js



//  Initialize Scale sliders.
    var sclmin, sclmax, sclstep;
    sclmin = 0.99; sclmax = 1.01; sclstep = 0.001;
    initSlider(sclSliderX, sclmin, sclmax, sclstep);
    initSlider(sclSliderY, sclmin, sclmax, sclstep);
    initSlider(sclSliderZ, sclmin, sclmax, sclstep);
    initSlider(sclUniformSlider, sclmin, sclmax, sclstep);

    $(sliderSclXSelector).on("mousedown", function(){ dynamicSliderPressed("scl-x", true,  1); });
    $(sliderSclYSelector).on("mousedown", function(){ dynamicSliderPressed("scl-y", true,  1); });
    $(sliderSclZSelector).on("mousedown", function(){ dynamicSliderPressed("scl-z", true,  1); });
    $(sliderSclXSelector).on("mouseup",   function(){ dynamicSliderPressed("scl-x", false, 1); });
    $(sliderSclYSelector).on("mouseup",   function(){ dynamicSliderPressed("scl-y", false, 1); });
    $(sliderSclZSelector).on("mouseup",   function(){ dynamicSliderPressed("scl-z", false, 1); });
    $(sliderScaleUniformSelector).on("mousedown", function(){ dynamicSliderPressed("scale-uniform", true,  1); });
    $(sliderScaleUniformSelector).on("mouseup",   function(){ dynamicSliderPressed("scale-uniform", false, 1); });

    $(resetScaleSelector).on("click",     function(){ bonesResetScale(avatar); });

    $(outputSclXSelector).on("mousedown", function(){ outputSliderPressed("scl-x", true);  });
    $(outputSclYSelector).on("mousedown", function(){ outputSliderPressed("scl-y", true);  });
    $(outputSclZSelector).on("mousedown", function(){ outputSliderPressed("scl-z", true);  });
    $(outputSclXSelector).on("mouseup",   function(){ outputSliderPressed("scl-x", false); });
    $(outputSclYSelector).on("mouseup",   function(){ outputSliderPressed("scl-y", false); });
    $(outputSclZSelector).on("mouseup",   function(){ outputSliderPressed("scl-z", false); });
    $(outputScaleUniformSelector).on("mousedown", function(){ outputSliderPressed("scale-uniform", true);  });
    $(outputScaleUniformSelector).on("mouseup",   function(){ outputSliderPressed("scale-uniform", false); });

//  Keep scale ratio.

    var scaleRatioSelector = "#scale-ratio";
    var keepRatioSelector  = "#keep-ratio";

    $(keepRatioSelector).on("click", function(){
        if ( this.checked ) {
            $(scaleRatioSelector).css("color", "#0f0");
        } else {
            $(scaleRatioSelector).css("color", "#fff");
        }
    });

//  Uniform Output slider.

    $(uniformScaleOutputSelector).on("input", function(){

        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }

    //  Submit value to object.

        var s = parseFloat( this.value/100 ); // number

        if ( $(keepRatioSelector)[0].checked ) {
            
            s = s - currentBone.scale.y;

            currentDataBone.keys[currentAnimationKeyIndex].scl[0] += s;
            currentDataBone.keys[currentAnimationKeyIndex].scl[1] += s;
            currentDataBone.keys[currentAnimationKeyIndex].scl[2] += s;

        } else {
        
            currentDataBone.keys[currentAnimationKeyIndex].scl[0] = s;    // number
            currentDataBone.keys[currentAnimationKeyIndex].scl[1] = s;    // number
            currentDataBone.keys[currentAnimationKeyIndex].scl[2] = s;    // number

        }

    //  Update output values.
        sx = currentBone.scale.x * 100;      // number
        sy = currentBone.scale.y * 100;      // number
        sz = currentBone.scale.z * 100;      // number
        sclOutputX.value = sx.toFixed(1);    // string
        sclOutputY.value = sy.toFixed(1);    // string
        sclOutputZ.value = sz.toFixed(1);    // string

    });

//  Output slider x.

    $(sclOutputX).on("input", function(){

        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }

    //  Submit value to object.
        var s = parseFloat( this.value/100 ); // number
        currentDataBone.keys[currentAnimationKeyIndex].scl[0] = s;    // number

    });

//  Output slider y.

    $(sclOutputY).on("input", function(){

        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }

    //  Submit value to object.
        var s = parseFloat( this.value/100 );    // number
        currentDataBone.keys[currentAnimationKeyIndex].scl[1] = s;    // number

    //  Update uniform output value.
        sy = currentBone.scale.y * 100;          // number
        sclUniformOutput.value = sy.toFixed(1);  // string

    });

//  Output slider z.

    $(sclOutputZ).on("input", function(){

        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                ( this.value == "" || isNaN(this.value) )
            );
            return;
        }

    //  Submit value to object.
        var s = parseFloat( this.value/100 ); // number
        currentDataBone.keys[currentAnimationKeyIndex].scl[2] = s;    // number

    });


    function submitNewScaleValue(){

    //  Submit value to object.
        var sx = parseFloat( sclSliderX.value ); // number
        var sy = parseFloat( sclSliderY.value ); // number
        var sz = parseFloat( sclSliderZ.value ); // number

    //  sx = Number(sx.toFixed(3));          // number
    //  sy = Number(sy.toFixed(3));          // number
    //  sz = Number(sz.toFixed(3));          // number
        
    //  currentDataBone.keys[currentAnimationKeyIndex].scl[0]
        currentDataBone.keys[currentAnimationKeyIndex].scl[0] *= sx;    // number
        currentDataBone.keys[currentAnimationKeyIndex].scl[1] *= sy;    // number
        currentDataBone.keys[currentAnimationKeyIndex].scl[2] *= sz;    // number
        
    //  Play the frame.
        timescaleSlider.value = 0;
        animation.play( animation.currentTime );
        
    //  Update output values.
        sx = currentBone.scale.x * 100;      // number
        sy = currentBone.scale.y * 100;      // number
        sz = currentBone.scale.z * 100;      // number
        sclOutputX.value = sx.toFixed(1);    // string
        sclOutputY.value = sy.toFixed(1);    // string
        sclOutputZ.value = sz.toFixed(1);    // string
        sclUniformOutput.value = sclOutputY.value;
    }

    function reverseNewScaleValue(){
    //  Update output values.
        if (animation){
            sx = currentBone.scale.x * 100;             // number
            sy = currentBone.scale.y * 100;             // number
            sz = currentBone.scale.z * 100;             // number
            sclOutputX.value = sx.toFixed(1);           // string
            sclOutputY.value = sy.toFixed(1);           // string
            sclOutputZ.value = sz.toFixed(1);           // string
            sclUniformOutput.value = sclOutputY.value;  // string
        }
    }

    function submitUniformScaleValue(){

    //  Submit value to object.
        var s = parseFloat( sclUniformSlider.value );
        
        if ( $(keepRatioSelector)[0].checked ) {

            currentDataBone.keys[currentAnimationKeyIndex].scl[0] *= s; // number scale x.
            currentDataBone.keys[currentAnimationKeyIndex].scl[1] *= s; // number scale y.
            currentDataBone.keys[currentAnimationKeyIndex].scl[2] *= s; // number scale z.

        } else {

            s *= currentBone.scale.y;

            currentDataBone.keys[currentAnimationKeyIndex].scl[0] = s; // number scale x.
            currentDataBone.keys[currentAnimationKeyIndex].scl[1] = s; // number scale y.
            currentDataBone.keys[currentAnimationKeyIndex].scl[2] = s; // number scale z.

        }

    //  Play the frame.
        timescaleSlider.value = 0;
        animation.play( animation.currentTime );
        
    //  Update output values.
        sx = currentBone.scale.x * 100;      // number
        sy = currentBone.scale.y * 100;      // number
        sz = currentBone.scale.z * 100;      // number
        sclOutputX.value = sx.toFixed(1);    // string
        sclOutputY.value = sy.toFixed(1);    // string
        sclOutputZ.value = sz.toFixed(1);    // string
        sclUniformOutput.value = sclOutputY.value;

    }



//  animatorSettings.js



//  Initialize Animation sliders.
    var durmin, durmax, durstep;
    durmin = -0.1; durmax = 0.1; durstep = 0.01;
    initSlider(durSlider, durmin, durmax, durstep);

    $(sliderDurSelector).on("mousedown", function(){ 
        dynamicSliderPressed("dur", true,  0); 
    });

    $(sliderDurSelector).on("mouseup",   function(){ 
        dynamicSliderPressed("dur", false, 0); 
    });

    $(outputDurSelector).on("input", function(){

        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                this.value, isNaN( this.value ) 
            );
            return;
        }

        var value = round(this.value, 1);  // number
        var d = value;                     // number
        var min = 1;                       // sec.
        var max = 10;                      // sec.

        if (d > min && d < max) {
        
        //  Submit value to object.
            animtimerSlider.max = d.toFixed(1); // string
            durOutput.style.color = "#fff";

        } else if (d <= min) {

            animtimerSlider.max = min;          // number
            durOutput.style.color = "#f80";

        } else if (d >= max) {

            animtimerSlider.max = max;          // number
            durOutput.style.color = "#f00";
        }

    //  Update keyframes time.

    //  var v = Number(document.getElementById("slider-timer").value);
        var l = animation.data.hierarchy[0].keys.length;
        var v = animation.data.length; //  animation.data.hierarchy[0].keys[l - 1].time;
        var m = round(animtimerSlider.max, 1);
        var offset = ( m / v );

    //  animation.data.hierarchy[0] last key.
        animation.data.length = m; // VERY IMPORTANT // (sec.) 
        animation.data.hierarchy.forEach(function(bone, index){
            bone.keys[l - 1].time = m;
        });
    //  keys between [0] and [last].
        for ( var i = (l - 2); i > 0; i-- ){
            var key = animation.data.hierarchy[0].keys[i];
            var t = key.time * offset;
        //  key.time = newTime; 
            animation.data.hierarchy.forEach(function(bone, index){
                bone.keys[i].time = t;
            });
        }

        ensureLooping();  
        ensureKeysIndexing();
        displayKeymarks();

        animtimerSlider.value = 0;              // number
        animtimerSlider.value = value;          // number
        animtimerOutput.value = value;          // number

    });

    $(sliderTimescaleSelector).on("input", function(){ 
        outputUpdate(outputTimescaleSelector, this.value);
    });

    $(outputTimescaleSelector).on("input", function(){ 
        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                this.value, isNaN( this.value ) 
            );
            return;
        }
        outputUpdate(sliderTimescaleSelector, this.value);
    });

    $(sliderFpsSelector).on("input", function(){ 
        outputUpdate(outputFpsSelector, this.value); 
    });

    $(outputFpsSelector).on("input", function(){ 
        if ( this.value == "" || isNaN( this.value ) ) {
            console.log("this value is NaN:", 
                this.value, isNaN( this.value ) 
            );
            return;
        }
        outputUpdate(sliderFpsSelector, this.value); 
    });

    $(animationNameSelector).on("change", function(){ 
        submitAnimationName(); 
    });



//  avatarHelpers.js



    $(avatarHelperSelector).on("click", function(){ 
        toggleHelperVisible(avatar); 
        if (avatar.visible) $(this).text("Hide Avatar");
        else $(this).text("Show Avatar");
    });

    $(bonesHelperSelector).on("click", function(){ 
        toggleHelperVisible(armatureHelper); 
        if (armatureHelper.visible) $(this).text("Hide Bones");
        else $(this).text("Show Bones");
    });

    $(resetPoseSelector).on("click", function(){ 
        avatarRestPose(avatar); 
    });

    $(removeKeysSelector).on("click", function(){ 
        removeKeymarks();
    });

    function submitNewDurationValue(){
        var value = Number(animtimerSlider.value);
        var min = 1;  // sec.
        var max = 10; // sec.
    //  var d = Number(durSlider.value);        // number
    //  d = Number(animtimerSlider.max) + d;    // number

        var d = Number(animtimerSlider.max) + Number(durSlider.value); // number
        
        if (d > min && d < max) {
        
        //  Submit value to object.
            animtimerSlider.max = d.toFixed(1); // string
        //  Return value to output.
        //  d = Number(animtimerSlider.max);    // number
            var x = Number(animtimerSlider.max);// number
            durOutput.value = x;                // number
            durOutput.style.color = "#fff";

        } else if (d <= min) {

            animtimerSlider.max = min;          // number
            durOutput.value = min;              // number
            durOutput.style.color = "#f80";
            
        } else if (d >= max) {

            animtimerSlider.max = max;         // number
            durOutput.value = max;             // number
            durOutput.style.color = "#f00";
        }

//  Update keyframes time.

    //  var v = Number(document.getElementById("slider-timer").value);
        var l = animation.data.hierarchy[0].keys.length;
        var v = animation.data.length; //  animation.data.hierarchy[0].keys[l - 1].time;
        var m = Number( animtimerSlider.max );
        var offset = (m / v );

    //  animation.data.hierarchy[0] last key.
        animation.data.length = m; // VERY IMPORTANT // (sec.) 
        animation.data.hierarchy.forEach(function(bone, index){
            bone.keys[l - 1].time = m;
        });
    //  keys between [0] and [last].
        for ( var i = (l - 2); i > 0; i-- ){
            var key = animation.data.hierarchy[0].keys[i];
            var t = key.time * offset;
        //  key.time = newTime; 
            animation.data.hierarchy.forEach(function(bone, index){
                bone.keys[i].time = t;
            });
        }

        ensureLooping();  
        ensureKeysIndexing();
        displayKeymarks();

        animtimerSlider.value = 0;              // number
        animtimerSlider.value = value;          // number
        animtimerOutput.value = value;          // number
    }

    function submitAnimationName(){
        animation.data.name = $(animationNameSelector).val();
    }

    function initDurationOutputValue() {
        var duration = Number(animtimerSlider.max);
        durOutput.value = duration;
    }



//  timelinerController.js



    $(sliderTimerSelector).on("mousedown", function(){ staticSliderPressed("timer", true);  });
    $(sliderTimerSelector).on("mouseup",   function(){ staticSliderPressed("timer", false); });

    $(animationPlayBtnSelector).on("click",   function(){ playAnimation(avatar); });
    $(animationAddKeyBtnSelector).on("click",   function(){ insertNewAnimateDataTimeFrameKey(); });
    $(animationRemoveKeySelector).on("click",   function(){ deleteCurrentAnimationDataKey(); });



//  Animator controller helpers.js



    function initSlider(slider, min, max, step, value){
        slider.min = min;
        slider.max = max;
        slider.step = step;
        if (value != null) slider.value = value;
    }

    function outputUpdate(selector, value) { 
        $(selector).val( value ); 
    }

    function CurrentBoneSelected(){ 
        getCurrentBone();           
        initBonesAdjustValues();
    }

    function getCurrentBone(){
    //  var bonesSelectDroplist = document.getElementById("select-bones");
        currentBoneIndex = bonesSelectDroplist.selectedIndex;                      // number  //  We can put this line in update().
        currentBone = animation.hierarchy[currentBoneIndex];                 // object  //  We can put this line in update().
        currentDataBone = animation.data.hierarchy[currentBoneIndex];        // object  //  We can put this line in update().
        $(boneLabelSelectedNameSelector).text( currentBone.name );
    }

    function initBonesAdjustValues(){
    
    //  INITIALAZE POSITION OUTPUT VALUES.
        posOutputX.value = currentBone.position.x.toFixed(1);     // string
        posOutputY.value = currentBone.position.y.toFixed(1);     // string
        posOutputZ.value = currentBone.position.z.toFixed(1);     // string
        
    //  INITIALAZE ROTATION OUTPUT VALUES.
        var xrad = currentBone.rotation._x;                       // number rad
        var yrad = currentBone.rotation._y;                       // number rad
        var zrad = currentBone.rotation._z;                       // number rad

        var x = Math.floor( THREE.Math.radToDeg(xrad) );          // number degrees
        var y = Math.floor( THREE.Math.radToDeg(yrad) );          // number degrees
        var z = Math.floor( THREE.Math.radToDeg(zrad) );          // number degrees
    //  Always return first rotation y because of quaternion.
        rotOutputY.value = rotSliderY.value = y.toFixed(0);        // string degrees
        rotOutputX.value = rotSliderX.value = x.toFixed(0);        // string degrees
        rotOutputZ.value = rotSliderZ.value = z.toFixed(0);        // string degrees

    //  INITIALAZE SCALE OUTPUT VALUES.
        sx = currentBone.scale.x * 100;      // number
        sy = currentBone.scale.y * 100;      // number
        sz = currentBone.scale.z * 100;      // number
        sclOutputX.value = sx.toFixed(1);    // string
        sclOutputY.value = sy.toFixed(1);    // string
        sclOutputZ.value = sz.toFixed(1);    // string
        sclUniformOutput.value = sclOutputY.value;

    }
/*
    function staticSliderPressed(identifier, status){ 
    //  debugMode && console.log("staticSliderPressed:", status);
        currentSlider = $( "#slider-" + identifier )[0];
        currentOutput = $( "#output-" + identifier )[0];
        currentSliderStatus = status;
    }

    function dynamicSliderPressed(identifier, status, restore){ 
    //  debugMode && console.log("dynamicSliderPressed:", status);
        currentSlider = $( "#slider-" + identifier )[0];
        currentOutput = $( "#output-" + identifier )[0];
        currentSliderStatus = status;
        currentSlider.value = restore;
    }
*/
    function staticSliderPressed(identifier, status){ 
    //  debugMode && console.log("staticSliderPressed:", status);
        currentSlider = $( "#slider-" + identifier )[0];
        currentOutput = $( "#output-" + identifier )[0];
        currentSliderStatus = status;
    }

    function outputSliderPressed(identifier, status){ 
    //  debugMode && console.log("outputSliderPressed:", status);
        currentSlider = $( "#output-" + identifier )[0];
        currentOutput = $( "#slider-" + identifier )[0];
        currentSliderStatus = status;
    }

    function dynamicSliderPressed(identifier, status, restore){ 
    //  debugMode && console.log("dynamicSliderPressed:", status);
        currentSlider = $( "#slider-" + identifier )[0];
        currentOutput = $( "#output-" + identifier )[0];
        currentSliderStatus = status;
        if (restore == null) 
            currentSlider.value = 0;
        else 
            currentSlider.value = restore;
    }

//  source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round"
    function round(number, precision) {
        var shift = function (number, precision, reverseShift) {
            if (reverseShift) {
                precision = -precision;
            }  
            numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    }
