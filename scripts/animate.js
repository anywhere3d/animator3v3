// animate.js


    function animate(){
        requestAnimationFrame( animate );
        update();
        render();
    }

    function render(){

        renderer.render( scene, camera );
    }

    function update() {

        var delta = clock.getDelta();
        var time = clock.getElapsedTime();

    //  keyboard.update( delta );

    //  Current Slider.

        if (currentSliderStatus){
        //  debugMode && console.log (currentSliderStatus);

        //  Animator Timer slider.
            if (currentSlider == animtimerSlider) {
                currentOutput.value = currentSlider.value;
                var t = Number(animtimerSlider.value);
                
                if (animation) {

                    timescaleSlider.value = 0;
                    timescaleOutput.value = currentSpeed;
                    playButton.innerHTML = "Play";
                    animation.play(t);

                } else {
                //  Find the nearest lower frame-time in animationData.
                    var keysArray = animationData.hierarchy[0].keys;
                    if (keysArray.length > 0){
                        for (var i in keysArray){
                            if ( keysArray[i].time <= t) var keyIdx = Number(i);
                        }
                    //  console.log(keyIdx, "i:", i);
                    //  Adjust bones dimensions to nearest time-frame.
                        for (var j in animationData.hierarchy){
                            var avatarBone = avatar.skeleton.bones[j];
                            var animateKey = animationData.hierarchy[j].keys[keyIdx];
                            avatarBone.position.fromArray(animateKey.pos);
                            avatarBone.quaternion.fromArray(animateKey.rot);
                            avatarBone.scale.fromArray(animateKey.scl);
                        }
                    }
                }

                reversePositionValue();
                reverseRotationValue();
                reverseNewScaleValue();

            }

        //  Animation Adjust sliders.
            if (currentSlider == posSliderX || currentSlider == posSliderY || currentSlider == posSliderZ ||
                currentSlider == rotSliderX || currentSlider == rotSliderY || currentSlider == rotSliderZ ||
                currentSlider == sclSliderX || currentSlider == sclSliderY || currentSlider == sclSliderZ ){
                
                    submitPositionValue();
                    submitRotationValue();
                    submitNewScaleValue();

            }

        //  Animation Adjust Uniform Scale slider.
            if (currentSlider == sclUniformSlider) {
                submitUniformScaleValue();
            }
            
        //  Animation duration slider.
            if (currentSlider == durSlider) {
                submitNewDurationValue();
                initTimeLiner(); 
            }
            
        } else {

            reversePositionValue();
            reverseRotationValue();
            reverseNewScaleValue();

        }
    
    //  Current animation.

        if (animation) {

        //  Pause.
            if ( round(timescaleSlider.value, 1) == 0 ) {
                $(playButton).text("Play");
                groundHelper.visible = true;
                axisCustomHelper.visible = true;
            }

        //  Play.
            if ( round(timescaleSlider.value, 1) > 0 ) {
                $(playButton).text("Pause");
                if (hiddenHelpers.checked) {
                    groundHelper.visible = false;
                    axisCustomHelper.visible = false;
                }
            }

        //  Play only at mouse down.
            if ( !loopCheckbox.checked ){
                if (animation.currentTime > animation.data.length){
                    timescaleSlider.value = 0;
                    timescaleOutput.value = currentSpeed;
                    animtimerSlider.value = 0;
                    animtimerOutput.value = 0;
                    animation.currentTime = 0;
                    $(playButton).text("Play");
                    animation.play(0);
                }
            }

            if (animation.isPlaying){
                animation.loop        = loopCheckbox.checked;
                animation.fps         = round(fpsSlider.value, 0);
                animation.timeScale   = round(timescaleSlider.value, 1);
                animtimerSlider.value = animation.currentTime;
                animtimerOutput.value = animtimerSlider.value;
            }

        }

    //  Current time scale.
        if ( round(timescaleSlider.value, 1) > 0) 
            currentSpeed = round(timescaleSlider.value, 1);

    //  Update before, current and after keys.
        bcaFrameKeyIndexesArray( animtimerSlider.value ); // IMPORTANT //
    
    //  Update Timer color
        toggleKeyExistClass();

        if (!!armatureHelper) armatureHelper.update();
        if (!!bvhSkeletonHelper) bvhSkeletonHelper.update();

    //  Animations updates.
        THREE.AnimationHandler.update( delta ); 

    }

//  toggleKeyExistClass.js

    function toggleKeyExistClass(){
    //  Remove class.
        if ( !animationDataKeyExist && $(outputTimerSelector).hasClass("key-exist") ) {
            debugMode && console.log("remove class key-exist:", $(outputTimerSelector).hasClass("key-exist") );
            $(outputTimerSelector).toggleClass("key-exist");
        }
    //  Add class.
        if ( animationDataKeyExist && !$(outputTimerSelector).hasClass("key-exist") ) {
            $(outputTimerSelector).toggleClass("key-exist");
            debugMode && console.log( "add class key-exist:", 
                $(outputTimerSelector).hasClass("key-exist"), 
                animation.currentTime.toFixed(2).replace(/\./, ":"), "sec." 
            );
        }
    }
