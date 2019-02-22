//  initScene.js


//  Initialize play options.
//    loopCheckbox.checked = true;
//    playManual.checked = false;
//    hiddenHelpers.checked = false;

//    var sceneContainerSelector = "#render-container";
//    var animatorContainer = $(sceneContainerSelector)[0];

//    var frameCount = 0;
//    var mouse = new THREE.Vector2();
//    var avatar;
//    var armature, armatureHelper;
//    var animation;
//    var poseHelper;
//    var normals;
//    var morphs = [];
//    var skins = [];

//    var fontPath = "/animator/v/0.3.1/three/fonts/helvetiker_regular.typeface.json";
//    var meshPath = "/animator/v/0.3.1/models/HF_MannySkeletonLayer-AvatarsBodyKitv04-v0.1.js";

    var container = $(sceneContainerSelector)[0];
    var scene, camera, renderer, controls;
    var sceneLights, axisCustomHelper, axisOriginHelper;
    var projector, keyboard, clock;


    (function init(){

    //  Scene.
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.0001 );

    //  Camera.
        near = 1; 
        far = 100000;
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, near, far );
        camera.position.set( -1.5, 18, 55 );
        camera.rotation.set( -0.043, -0.035, -0.002 );
        camera.name = "CAMERA" ;

    //  Scene lights.
        light0 = new DirectionalLight(0xffffff, 1000, 1000, 1000, 0.5);
        light1 = new DirectionalLight(0xffffff, 1000, 1000, -1000, 0.5);
        light2 = new DirectionalLight(0xffffff, -1000, 1000, -1000, 0.5);
        light3 = new DirectionalLight(0xffffff, -1000, 1000, 1000, 0.5);
        light4 = new DirectionalLight(0xffffff, 0, -1000, 0, 0.5);
        scene.add(light0, light1, light2, light3, light4);

    //  Controls.
        controls = new THREE.EditorControls(camera);
        controls.center.y = 15;
        camera.lookAt( controls.center );

    //  Projector.
    	projector = new THREE.Projector();

    //  Ground Helper.
        groundHelper = new GroundHelper(100, 2);
        scene.add(groundHelper);

	//  Skydome.
	
    //  var loader = new THREE.TextureLoader();
    //	skydome = new THREE.Mesh(
    //		new THREE.SphereGeometry( far * 0.1, 15, 15 ),
    //		new THREE.MeshBasicMaterial({
    //			map: loader.load( "/skydomes/skydome.jpg" ),
    //			color: 0xffffff,
    //			side: THREE.DoubleSide
    //		})
    //	);
    //  skydome = new Skydome("/skydomes/skydome.jpg");
    //	skydome.rotation.y = Math.PI;
    //	skydome.scale.set(-1, 2, 1);
    //	scene.add( skydome );

    //  Axis Helper.
        axisCustomHelper = new CustomAxisHelper(120);
        axisOriginHelper = new OriginAxisHelper(1000);

    //  Floor.
    //  var material = new THREE.MeshLambertMaterial( { color:0x8888ff, side:THREE.DoubleSide } );
    //  floorPlain = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 1, 1 ), material );
    //  floorPlain.position.set( 0, 0, 0 );
    //  floorPlain.rotation.set( -Math.PI * 0.5, 0, 0 );
    //  scene.add( floorPlain );

    //  Keyboard controls.
    //  keyboard = new KeyboardState();

    //  Clock.
        clock = new THREE.Clock();

    //  Renderer.
        renderer = new THREE.WebGLRenderer({ 
            antialias:true, 
            preserveDrawingBuffer:true // (for taking canvas png snapshots)
        });
        renderer.autoClear = true;
        renderer.shadowMap.enabled = true;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight ); 
		animatorContainer.appendChild( renderer.domElement );
        
    //  Manny The Skeleton Rigged Mesh.
        loadSkinnedAnimatedMesh( meshPath, 1 );

    })();

/*
    function SkeletonHelper(theMesh){
    //  Create the skeleton helper debug visualization
    	var helper = new THREE.SkeletonHelper(theMesh);
    	helper.material.linewidth = 5;
    	helper.name = "ARMATURE_HELPER";
    	helper.visible = true;
    	return helper;
    }
*/
