//  exportAnimationExistedKeyPoseAsJSON.js

    function exportAnimationExistedKeyPoseAsJSON(keyIdx){
        console.log("Exporting animation existed key Pose as JSON.");
        // ensureLooping();
        ensureKeysIndexing();
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
            var poseExport = [];
            for (var i in animation.data.hierarchy){
            //  poseExport.push(animation.data.hierarchy[i].keys[currentAnimationKeyIndex])
                var poseKey = {"pos":[], "rot":[], "scl":[]};
            //  Get bones values at current time from animation.data.hierarchy.
                poseKey.pos = animation.data.hierarchy[i].keys[keyIdx].pos;
                poseKey.rot = animation.data.hierarchy[i].keys[keyIdx].rot.toArray();
                poseKey.scl = animation.data.hierarchy[i].keys[keyIdx].scl;
                poseExport.push(poseKey);
            }
            poseExport = JSON.stringify(poseExport);
            console.log(poseExport);
            return poseExport;

        } else if (!animationDataKeyExist) {
            console.log("Current animation data key does not exists.", "You can not export animation pose keys.");
            return undefined;
        }
    }
