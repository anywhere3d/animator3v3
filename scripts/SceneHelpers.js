// SceneHelpers.js

    function toggleHelperVisible(theHelper){
        theHelper.visible = !theHelper.visible;
    }

    function directionalLight(hexcolor, x, y, z, intensity){
        var light = new THREE.DirectionalLight( hexcolor );
        light.position.set( x, y, z );
        light.intensity = intensity;
        return light;
    }
    
    function convertingFromBufferGeometry( object ){
        debugMode && console.log("converting from buffer geometry:", object);
        if( object.children ) {
            for( child in object.children ) {
                var t = Date.now();
                object.children[child].geometry = new THREE.Geometry().fromBufferGeometry( object.children[child].geometry );
    		    debugMode && console.log(child, object.children[child].name, "time:", Date.now() - t, "msec.");
            }
        }
    }

/*
    function creatingSelectedEdgesHelpers( object ){
        debugMode && console.log("creating selected edges helpers:", object);
        if( object.children ) {
            for( child in object.children ) {
                object.children[child].add( new THREE.EdgesHelper( object.children[child], 0x00ff00, 1 ) );
    		    debugMode && console.log(child, object.children[child].name);
            }
        }
    }
*/
    
    function FpsCamera(fov, near, far){
        var camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
        camera.position.set( 0, 11, -113 );
        camera.rotation.set( 0, 0, 0 );
        camera.name = "FPS_CAMERA" ;
        return camera;
    }
    
    function FpsCameraControls( camera ){
        var controls = new THREE.FirstPersonControls( camera );
        controls.movementSpeed = 30;
        controls.lookSpeed = 0.05;
        controls.noFly = true;
        controls.autoForward = false;
        controls.lookVertical = false;
        controls.enabled = true;
        return controls;
    }
    
    function DirectionalLight(hexcolor, x, y, z, intensity){
        var light = new THREE.DirectionalLight( hexcolor );
        light.position.set( x, y, z );
        light.intensity = intensity;
        scene.add( light );
        return light;
    }
    
    function DirectionalLightsGroup(hexcolor, x, y, z, intensity){
        var group = new THREE.Group();
        scene.add(group);
        light0 = new directionalLight(hexcolor, x, y, z, intensity);
        light1 = new directionalLight(hexcolor, x, y, -z, intensity);
        light2 = new directionalLight(hexcolor, -x, y, -z, intensity);
        light3 = new directionalLight(hexcolor, -x, y, z, intensity);
        light4 = new directionalLight(hexcolor, 0, -y, 0, intensity);
        group.add( light0, light1, light2, light3, light4 );
        return [light0, light1, light2, light3, light4];
    }
    
    function GroundHelper(xz, step){
        if (!xz) xz = 1000;
        if (!step) step = 10;
        var grid = new THREE.GridHelper( xz, step, 0x444444, 0x444444 );
        grid.name = "GRID"
        grid.position.y = 0;
        scene.add( grid );
        return grid;
    }
    
    function SkeletonHelper(target){
        var helper = new THREE.SkeletonHelper(target);
        helper.material.linewidth = 5;
        helper.name = "ARMATURE_HELPER";
        helper.visible = true;
        return helper;
    }
    
    function Skybox( cubemap ) {
        scene.background = new THREE.CubeTexture( cubemap );
        scene.background.needsUpdate = true;
    }
    
    function Skydome( path ){
        var loader = new THREE.TextureLoader();
        var skydomeGmt = new THREE.SphereGeometry( 2000, 64, 32 );
        var skydomeTxr = loader.load( path );
        var skydomeMtl = new THREE.MeshBasicMaterial({
            map: skydomeTxr,
            side: THREE.DoubleSide
        });
        var skydome = new THREE.Mesh( skydomeGmt, skydomeMtl );
        skydome.scale.y = 0.5;
        skydome.name = "SKYDOME";
        scene.add(skydome);
        return skydome;
    }
    
    function CustomAxisHelper( distance ){
        var group = new THREE.Group();
        scene.add(group);
    
    //  Lines.
        var geometryAxisXpos = new THREE.Geometry();
        var geometryAxisXneg = new THREE.Geometry();
        var geometryAxisYpos = new THREE.Geometry();
        var geometryAxisYneg = new THREE.Geometry();
        var geometryAxisZpos = new THREE.Geometry();
        var geometryAxisZneg = new THREE.Geometry();
    
        var materialAxisXpos = new THREE.LineBasicMaterial( {color: 0xff0000} );
        var materialAxisXneg = new THREE.LineBasicMaterial( {color: 0xff0000} );
        var materialAxisYpos = new THREE.LineBasicMaterial( {color: 0x00ff00} );
        var materialAxisYneg = new THREE.LineBasicMaterial( {color: 0x00ff00} );
        var materialAxisZpos = new THREE.LineBasicMaterial( {color: 0x0000ff} );
        var materialAxisZneg = new THREE.LineBasicMaterial( {color: 0x0000ff} );
    
        geometryAxisXpos.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( distance, 0, 0 ) );
        geometryAxisXneg.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(-distance, 0, 0 ) );
        geometryAxisYpos.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, distance, 0 ) );
        geometryAxisYneg.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0,-distance, 0 ) );
        geometryAxisZpos.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, distance ) );
        geometryAxisZneg.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0,-distance ) );
    
        var lineAxisXpos = new THREE.Line( geometryAxisXpos, materialAxisXpos );
        var lineAxisXneg = new THREE.Line( geometryAxisXneg, materialAxisXneg );
        var lineAxisYpos = new THREE.Line( geometryAxisYpos, materialAxisYpos );
        var lineAxisYneg = new THREE.Line( geometryAxisYneg, materialAxisYneg );
        var lineAxisZpos = new THREE.Line( geometryAxisZpos, materialAxisZpos );
        var lineAxisZneg = new THREE.Line( geometryAxisZneg, materialAxisZneg );
    
        group.add( lineAxisXpos );
        group.add( lineAxisXneg );
    //  group.add( lineAxisYpos );
    //  group.add( lineAxisYneg );
        group.add( lineAxisZpos );
        group.add( lineAxisZneg );
        group.name = "AXES"
        return group;
    }
    
    
    function OriginAxisHelper( distance ){
        var group = new THREE.Group();
        var promise = new Promise( function(resolve, reject){
            var loader = new THREE.FontLoader();
            loader.load( fontPath, function ( response ) {
                var font = response;
                scene.add(group);
    
            //  Font Material
                var materialFace = new THREE.MeshBasicMaterial( { color: 0xffffff } );
                var materialSide = new THREE.MeshBasicMaterial( { color: 0x888888 } );
                var materialArray = [ materialFace, materialSide ];
                var material = new THREE.MeshFaceMaterial(materialArray);
    
            //  Text Styles.
                h0 = { size: 40, height: 2,   curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
                h1 = { size: 20, height: 1,   curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
                h2 = { size: 10, height: 1,   curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
                h3 = { size: 5,  height: 0.5, curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
    
            //  Origins Group.
                group.add( new Text3D( "+x", h1, [2, 2, 5], [ distance, 20, 0], [0, -Math.PI * 0.5, 0]) );
                group.add( new Text3D( "-x", h1, [2, 2, 5], [-distance, 20, 0], [0,  Math.PI * 0.5, 0]) ); 
                group.add( new Text3D( "+z", h1, [2, 2, 5], [0, 20,  distance], [0, -Math.PI,       0]) ); 
                group.add( new Text3D( "-z", h1, [2, 2, 5], [0, 20, -distance], [0,              0, 0]) ); 
                group.add( new Text3D( "+y", h1, [2, 2, 5], [0,   distance, 0], [ Math.PI * 0.5, 0, 0]) ); 
                group.add( new Text3D( "-y", h1, [2, 2, 5], [0,  -distance, 0], [-Math.PI * 0.5, 0, 0]) ); 
                group.name = "ORIGINS";
            
                resolve(group);  //  return group;
                
                function Text3D(text, style, scale, position, rotation){
                    var geometry = new THREE.TextGeometry( text, style );
                    var mesh = new THREE.Mesh(geometry, material );
                    geometry.computeBoundingBox();
                    var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
                    mesh.scale.fromArray( scale ); 
                    mesh.geometry.center();
                    mesh.position.fromArray( position );
                    mesh.rotation.fromArray( rotation );
                    return mesh;
                }
    
            });
    
        });
    
        promise;
        return group;
    }





//  ------------ DEPRECATED ------------  //

function createFpsCamera(fov, near, far){
    console.warn("!!!DEPRECATED!!!", 
        "'createFpsCamera()' is deprecated.", 
        "Use 'new FpsCamera()' instead."
    );
    return FpsCamera( camera );
}

//  ------------ DEPRECATED ------------  //

function newFpsCameraControls( camera ){
    console.warn("!!!DEPRECATED!!!", 
        "'newFpsCameraControls()' is deprecated.", 
        "Use 'new FpsCameraControls()' instead."
    );
    return FpsCameraControls( camera );
}

//  ------------ DEPRECATED ------------  //

function newDirectionalLight(hexcolor, x, y, z, intensity){
    console.warn("!!!DEPRECATED!!!", 
        "'newDirectionalLight()' is deprecated.", 
        "Use 'new DirectionalLight()' instead."
    );
    return DirectionalLight(hexcolor, x, y, z, intensity);
}

//  ------------ DEPRECATED ------------  //

function newDirectionalLightsGroup(hexcolor, x, y, z, intensity){
    console.warn("!!!DEPRECATED!!!", 
        "'newDirectionalLightsGroup()' is deprecated.", 
        "Use 'new DirectionalLightsGroup()' instead."
    );
    return DirectionalLightsGroup(hexcolor, x, y, z, intensity);
}
//  ------------ DEPRECATED ------------  //

function newGroundHelper(xz, step){
    console.warn("!!!DEPRECATED!!!", 
        "'newGroundHelper()' is deprecated.", 
        "Use 'new GroundHelper()' instead."
    );
    return GroundHelper(xz, step);
}

//  ------------ DEPRECATED ------------  //

function newSkeletonHelper(target){
    console.warn("!!!DEPRECATED!!!", 
        "'newSkeletonHelper()' is deprecated.", 
        "Use 'new SkeletonHelper()' instead."
    );
    return new SkeletonHelper( target );
}

//  ------------ DEPRECATED ------------  //

function newSkybox( cubemap ) {
    console.warn("!!!DEPRECATED!!!", 
        "'newSkybox()' is deprecated.", 
        "Use 'new Skybox()' instead."
    );
    return Skybox( cubemap );
}

//  ------------ DEPRECATED ------------  //

function createSkydome( path ){
    console.warn("!!!DEPRECATED!!!", 
        "'createSkydome()' is deprecated.", 
        "Use 'new Skydome()' instead."
    );
    return Skydome( cubemap );
}

//  ------------ DEPRECATED ------------  //

function newCustomAxisHelper( distance ){
    console.warn("!!!DEPRECATED!!!", 
        "'newCustomAxisHelper()' is deprecated.", 
        "Use 'new CustomAxisHelper()' instead."
    );
    return CustomAxisHelper( distance );
}

//  ------------ DEPRECATED ------------  //

function newOriginAxisHelper( distance ){
    console.warn("!!!DEPRECATED!!!", 
        "'newOriginAxisHelper()' is deprecated.", 
        "Use 'new OriginAxisHelper()' instead."
    );
    return OriginAxisHelper( distance );
}
//  ------------------------------------  //
