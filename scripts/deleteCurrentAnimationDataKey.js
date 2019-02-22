
//  deleteCurrentAnimationDataKey.js

    function deleteCurrentAnimationDataKey(){

        if ( !animationDataKeyExist ){
            console.error("Current animation data key does not exists.", "Delete of animation pose key canceled."); return;
        }

        if (animation.data.hierarchy[0].keys.length < 3) { 
            console.error("Delete of animation pose key not allowed due keyframe minimum length limit policy."); return; 
        }

    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if ( animationDataKeyExist ){
            for (var i in animation.data.hierarchy){
                var removedItems = 1;
                animation.data.hierarchy[i].keys.splice( currentAnimationKeyIndex, removedItems );
            }
            console.log("Current animation data key deleted.");
        //
            ensureLooping();
            ensureKeysIndexing();
            
        //  Update current animation index key.
            bcaFrameKeyIndexesArray( animtimerSlider.value );
            
        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );
            
        }
        
    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        new CurrentBoneSelected();  
        
        displayKeymarks(); // IMPORTANT //
        
    }
