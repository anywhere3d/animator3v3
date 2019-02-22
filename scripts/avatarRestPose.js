
//  avatarRestPose.js

    function avatarRestPose(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
    
        if (animationDataKeyExist) {
        //  Copy pose from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].pos = deepCopy( theAvatar.userData.restPose[i].pos );
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.fromArray( theAvatar.userData.restPose[i].rot );
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].scl = deepCopy( theAvatar.userData.restPose[i].scl );
            }
            
        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );

            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key reseted to rest pose.");
            
        } else {
        
            console.log("Current animation data key does not exists.", "You can not reset to rest pose.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        new CurrentBoneSelected();
    }
