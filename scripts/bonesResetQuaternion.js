//  bonesResetQuaternion.js

    function bonesResetQuaternion(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
        //  Reset bones position values from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.fromArray( theAvatar.userData.restPose[i].rot );
            }
        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );
        //
            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key rotations reseted.");
        }
        else if (!animationDataKeyExist){
            console.log("Current animation data key does not exists.", "You can not reset bones rotation.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        new CurrentBoneSelected();
    }
