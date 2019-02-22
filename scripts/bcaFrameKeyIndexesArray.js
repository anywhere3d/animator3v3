//  bcaFrameKeyIndexesArray.js

//  Before, Current, After (bca) Frame Key Indexes Array.
    function bcaFrameKeyIndexesArray(t){
    //  Check if frame (t) already exist in animationData.
        var keyExists = false;
        var keyBefore, keyIndex, keyAfter;
        var keysArray = (animation) ? animation.data.hierarchy[0].keys : [];
    //  var t = Number(animtimerSlider.value);
        if (keysArray.length > 0){
            for (var j in keysArray){
                if (keysArray[j].time < Number(t)){
                
                    keyBefore = Number(j);
                    
                } else if (keysArray[j].time == Number(t)){
                
                    keyIndex = Number(j);
                    keyExists = true;
                    
                } else if (keysArray[j].time > Number(t)){
                
                    keyAfter = Number(j);
                    break;
                    
                } else {
                
                    debugMode && console.error( 
                        "Unhandled Case ERROR:", 
                        "bcaFrameKeyIndexesArray():",
                        "This error should not be appeared:",
                        "if (keysArray.length > 0)..."
                    );

                }
            }
        }
        
    //  Update.
        animationDataKeyExist = keyExists;
        bcaAnimationDataIndexKeys = [keyBefore, keyIndex, keyAfter];
        currentAnimationKeyIndex = keyIndex;

    //  debugMode && console.log("bca keys:", bcaAnimationDataIndexKeys);
        return bcaAnimationDataIndexKeys;
    }
