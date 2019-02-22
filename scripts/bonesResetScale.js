//  bonesResetScale.js

    function bonesResetScale(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
        //  Reset bones position values from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].scl = deepCopy( theAvatar.userData.restPose[i].scl );
            }

        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );

            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key scales reseted.");
            
        } else {
        
            console.log("Current animation data key does not exists.", "You can not reset bones scale.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        new CurrentBoneSelected();
    }
