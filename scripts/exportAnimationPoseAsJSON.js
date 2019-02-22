//  exportAnimationPoseAsJSON.js

    function exportAnimationPoseAsJSON(){
        console.log("Exporting animation key Pose as JSON.");
        var poseExport = [];
        for (var i in animation.hierarchy) {
        //  Create a new animation data key with current time bones values.
        //  var poseKey = {"index":0, "pos":[], "rot":[], "scl":[], "time":0};
            var poseKey = {"pos":[], "rot":[], "scl":[]};
        //  Get bones values at current time from animation.hierarchy.
            poseKey.pos = animation.hierarchy[i].position.toArray();
            poseKey.rot = (animation.hierarchy[i].quaternion).toArray();
            poseKey.scl = animation.hierarchy[i].scale.toArray();
            poseExport.push(poseKey);
        }
        poseExport = JSON.stringify(poseExport);
        debugMode && console.log(poseExport);
        alert("Animation pose exported succesfully.");
        return poseExport;
    }

