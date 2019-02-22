//  app.js - animator v0.3.3 - dev_r1


//  var scriptsFolder = "scripts/";

    var animatorEditorLeftPanelSelector  = "#animator-editor-left-panel";
    var animatorEditorRightPanelSelector = "#animator-editor-right-panel";

    var animationLoopSelector = "#animation-loop";
    var manualPlaySelector    = "#manual-play";
    var hiddenHelpersSelector = "#hidden-helpers";

    var loopCheckbox  = $(animationLoopSelector)[0];     
    var playManual    = $(manualPlaySelector)[0];
    var hiddenHelpers = $(hiddenHelpersSelector)[0];

    var boneHolderSelector     = "#bone-holder";               
    var positionHolderSelector = "#position-holder";       
    var rotationHolderSelector = "#rotation-holder";
    var scaleHolderSelector    = "#scale-holder";
    var optionsHolderSelector  = "#options-holder";



// AnimatorEditor.js

    animationsHandler = THREE.AnimationHandler.animations;   //  array

//  Current slider and bone.
    currentSliderStatus = false;            // boolean
    currentSpeed = 1;                       // number slider value
    currentSlider = undefined;              // slider element
    currentOutput = undefined;              // output element
    currentBoneIndex = undefined;           // number for animation.hierarchy[currentBoneIndex]
    currentBone = undefined;                // object animation.hierarchy[currentBoneIndex]
    currentDataBone = undefined;            // object animation.data.hierarchy[currentBoneIndex]
    currentAnimationKeyIndex = undefined;   // number for animation.data.hierarchy[currentBoneIndex].keys[currentAnimationKeyIndex]
    currentAnimationKeyObject = undefined;  // object animation.data.hierarchy[currentBoneIndex].keys[currentAnimationKeyIndex]
    currentFrameTime = undefined;           // number Number( document.getElementById("slider-timer").value )
    animationDataKeyExist = false;          // boolean
    bcaAnimationDataIndexKeys = [undefined, undefined, undefined];

//  Define an empty script for random pose generator button.
//  How it is works: When we change avatar from Animator-Avatars menu, we parse also the assocciated random poses function in currentCrazyPosesScript function.
//  When we click the Random Pose button we call the currentCrazyPosesScript() function that is the assocciated random poses function for the selected avatar.
//  Do not forget that it is important to parse the assocciated random pose avatar function in menu Animator-Avatars-[the selected avatar] menu item.
    function currentCrazyPoses(){};   // script for random pose generator depending on skinned avatar skeleton.



//  keyframes.js

    var currentkeymark;
    var currentkeytime;
    var currentkeyindex;
    keymarksArray = [];



//  scene.js

//  Initialize play options.
    loopCheckbox.checked = true;
    playManual.checked = false;
    hiddenHelpers.checked = false;

    var sceneContainerSelector = "#render-container";
    var animatorContainer = $(sceneContainerSelector)[0];

    var frameCount = 0;
    var mouse = new THREE.Vector2();
    var avatar;
    var armature, armatureHelper;
    var animation;
    var poseHelper;
    var normals;
    var morphs = [];
    var skins = [];

    var fontPath = "three/fonts/helvetiker_regular.typeface.json";
    var meshPath = "models/HF_MannySkeletonLayer-AvatarsBodyKitv04-v0.1.js";



//  Scripts as a Service.

    var alertsScript = scriptsFolder + "alerts.js";
    var SceneHelpersScript = scriptsFolder + "SceneHelpers.js";
    var SidePanelsScript = scriptsFolder + "SidePanels.js";
    var simpleAddEventScript = scriptsFolder + "simpleAddEvent.js";
    var keyframesScript = scriptsFolder + "keyframes.js";
    var bcaFrameKeyIndexesArrayScript = scriptsFolder + "bcaFrameKeyIndexesArray.js";
    var animationPlayScript = scriptsFolder + "animationPlay.js";
    var deepCopyScript = scriptsFolder + "deepCopy.js";
    var avatarRestPoseScript = scriptsFolder + "avatarRestPose.js";
    var bonesResetPositionScript = scriptsFolder + "bonesResetPosition.js";
    var bonesResetQuaternionScript = scriptsFolder + "bonesResetQuaternion.js";
    var bonesResetScaleScript = scriptsFolder + "bonesResetScale.js";
    var deleteCurrentAnimationDataKeyScript = scriptsFolder + "deleteCurrentAnimationDataKey.js";
    var sortAnimationDataKeysByTimeScript = scriptsFolder + "sortAnimationDataKeysByTime.js";
    var loadSkinnedAnimatedMeshScript = scriptsFolder + "loadSkinnedAnimatedMesh.js";
    var initSceneScript = scriptsFolder + "initScene.js";
    var initTimeLinerScript = scriptsFolder + "initTimeLiner.js";
//  var toggleKeyExistClassScript = scriptsFolder + "toggleKeyExistClass.js";
    var animateScript = scriptsFolder + "animate.js";
    var saveJSONtoFileScript = scriptsFolder + "saveJSONtoFile.js";


    //  alerts.js  //

//  var alertsScript = "/js/alerts.js";
    $.getScript(alertsScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("alerts:", status);
    });
    
    //  SceneHelpers.js  //

//  var SceneHelpersScript = "js/SceneHelpers.js";
    $.getScript(SceneHelpersScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("SceneHelpers:", status);
    });

    //  SidePanels.js  //

//  var SidePanelsScript = "js/SidePanels.js";
    $.getScript(SidePanelsScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("SidePanels:", status);
    });

    //  simpleAddEvent.js  //

//  var simpleAddEventScript = "js/simpleAddEvent.js";
    $.getScript(simpleAddEventScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("simpleAddEvent:", status);
    });




//  keyframes.js

//  var keyframesScript = scriptsFolder + "keyframes.js";
    $.getScript(keyframesScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("insertNewAnimateDataTimeFrameKey:", status);
    });

//  bcaFrameKeyIndexesArray.js

//  var bcaFrameKeyIndexesArrayScript = scriptsFolder + "bcaFrameKeyIndexesArray.js";
    $.getScript(bcaFrameKeyIndexesArrayScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("bcaFrameKeyIndexesArray:", status);
    });

//  playAnimation.js

//  var animationPlayScript = scriptsFolder + "animationPlay.js";
    $.getScript(animationPlayScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("animationPlay:", status);
    });

//  deepCopy.js !!! IMPORTANT !!!

//  var deepCopyScript = scriptsFolder + "deepCopy.js";
    $.getScript(deepCopyScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("deepCopy:", status);
    });

//  avatarRestPose.js

//    var avatarRestPoseScript = scriptsFolder + "avatarRestPose.js";
    $.getScript(avatarRestPoseScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("avatarRestPose:", status);
    });

//  bonesResetPosition.js

//  var bonesResetPositionScript = scriptsFolder + "bonesResetPosition.js";
    $.getScript(bonesResetPositionScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("bonesResetPosition:", status);
    });

//  bonesResetPosition.js

//  var bonesResetQuaternionScript = scriptsFolder + "bonesResetQuaternion.js";
    $.getScript(bonesResetQuaternionScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("bonesResetQuaternion:", status);
    });

//  bonesResetScale.js

//  var bonesResetScaleScript = scriptsFolder + "bonesResetScale.js";
    $.getScript(bonesResetScaleScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("bonesResetScale:", status);
    });

//  deleteCurrentAnimationDataKey.js

//  var deleteCurrentAnimationDataKeyScript = scriptsFolder + "deleteCurrentAnimationDataKey.js";
    $.getScript(deleteCurrentAnimationDataKeyScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("deleteCurrentAnimationDataKey:", status);
    });

//  sortAnimationDataKeysByTime.js

//  var sortAnimationDataKeysByTimeScript = scriptsFolder + "sortAnimationDataKeysByTime.js";
    $.getScript(sortAnimationDataKeysByTimeScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("sortAnimationDataKeysByTime:", status);
    });



    //  scene.js  //



//  loadSkinnedAnimatedMesh.js

//  var loadSkinnedAnimatedMeshScript = scriptsFolder + "loadSkinnedAnimatedMesh.js";
    $.getScript(loadSkinnedAnimatedMeshScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("loadSkinnedAnimatedMesh:", status);
    });

//  initScene.js

//  var initSceneScript = scriptsFolder + "initScene.js";
    $.getScript(initSceneScript, function(data, status, xhr){ 
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("init:", status);

    //  Controls switch.
    
        $(sceneContainerSelector).on("mouseenter", function(e){
            if (!!controls) controls.enabled = true;
        });
    
        $(sceneContainerSelector).on("mouseleave", function(e){
            if (!!controls) controls.enabled = false;
        });

    });

//  initTimeLiner.js

//  var initTimeLinerScript = scriptsFolder + "initTimeLiner.js";
    $.getScript(initTimeLinerScript, function(data, status, xhr){ 
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("initTimeLiner:", status);

    //  Initialize.
        initTimeLiner();

        $(window).on( "resize", function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
    
        //  controls.handleResize(); //  NOT NEED FOR EDITOR CONTROLS.
    
        //  Resize timeliner.
            initTimeLiner();
        });


    });

//  toggleKeyExistClass.js

//  var toggleKeyExistClassScript = scriptsFolder + "toggleKeyExistClass.js";
//    $.getScript(toggleKeyExistClassScript, function(data, status, xhr){ 
//        if (status == "error") console.error( status, xhr.status, xhr.statusText );
//        if (status == "success") debugMode && console.log("toggleKeyExistClass:", status);
//    });

//  animate.js

//  var animateScript = scriptsFolder + "animate.js";
    $.getScript(animateScript, function(data, status, xhr){ 
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("animate:", status);

        animate();

        initDurationOutputValue();

    });



    //  Export helpers.js  //



//  saveJSONtoFile.js  !!! IMPORTANT !!!

//  var saveJSONtoFileScript = scriptsFolder + "saveJSONtoFile.js";
    $.getScript(saveJSONtoFileScript, function(data, status, xhr){
        if (status == "error") console.error( status, xhr.status, xhr.statusText );
        if (status == "success") debugMode && console.log("saveJSONtoFile:", status);
    });



    //  Event Listeners.js  //



	$(document).on( "mousedown", function ( event ) {
        mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
       	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        bcaFrameKeyIndexesArray( animtimerSlider.value );
    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        new CurrentBoneSelected();

        if (playManual.checked){
            timescaleSlider.value = currentSpeed;
            timescaleOutput.value = currentSpeed;
        }
    });
 
	$(document).on( "mouseup", function( event ) {
        mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
       	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        if (playManual.checked){
            timescaleSlider.value = 0;
            timescaleOutput.value = currentSpeed;
        }
    });
 
    $(document).on( 'mousemove', function( event ) {
        mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
       	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    });
