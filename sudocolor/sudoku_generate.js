import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import {generate} from './get_grid.js';

var camera, controls, scene, renderer, cubes, width, height;
var sceneHUD, hudBitmap, hudTexture, cameraHUD;
var colorPositionsMin, colorPositionsMax;
let grid = generate("easy");
console.log(grid);
init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.autoClear = false;

	// renderer.domElement.addEventListener( 'resize', onWindowResize );
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );
	renderer.domElement.addEventListener( 'click', onClick );
	// renderer.domElement.addEventListener( 'keyup', onKeyPress );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcccccc );
	width = window.innerWidth;
	height = window.innerHeight;
	camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );
	camera.position.set( 400, 200, 0 );
	// camera.position.set( 15, 15, 15 );
	camera.lookAt(scene.position);
	// controls
	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableRotate = true;
	controls.enablePan = false;
	//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
	// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	// controls.dampingFactor = 0.05;
	// controls.screenSpacePanning = false;
	// controls.minDistance = 100;
	// controls.maxDistance = 500;
	// controls.maxPolarAngle = Math.PI ;
	// world
	var off_x = -90;
	var off_z = -90;
	var off_y = 0;

	cubes = new THREE.Group();
	scene.add(cubes)


	let small_offset = 22;
	let extra_offset = 4;
	let cube_size = 20;
	

	// var pickingMaterial =
	// var defaultMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors, shininess: 0	} );



	// for(var depth=1; depth <= 9; depth++){
		for ( var i = 1; i <= 9; i ++ ) {
			for(var j = 1; j <= 9; j++){

				let curVal = grid[i-1][j-1];
				var geometry = new THREE.BoxBufferGeometry( cube_size,cube_size,cube_size );
				var material = new THREE.MeshBasicMaterial( { color: getColor(curVal) } );
				var cube = new THREE.Mesh( geometry, material );
				cube.row = i;
				cube.col = j;
				cube.val = curVal;

				cube.position.x = off_x;
				cube.position.y = off_y;
				cube.position.z = off_z;
				// cube.material.color.setHex( 0xffffff );

				off_x += small_offset;
				if(j % 3 == 0){
					off_x += extra_offset;
				}
				// if(i % 9 == 0){
				// 	off_x = -90;
				// 	off_z += 21;
				// }

				// cube.updateMatrix();
				// cube.matrixAutoUpdate = false;
				cubes.add(cube);
				// scene.add( cubes );

			}
			if(i % 3 == 0){
				off_z += extra_offset;
			}
			off_x = -90;
			off_z += small_offset;
		}
	// 	console.log(depth)
	// 	off_y += small_offset + extra_offset;
	// }
	// window.requestAnimationFrame(render);


	// HUD time
	// Ok, now we have the cube. Next we'll create the hud. For that we'll
  // need a separate scene which we'll render on top of our 3D scene. We'll
  // use a dynamic texture to render the HUD.
  
  // We will use 2D canvas element to render our HUD.  
	var hudCanvas = document.createElement('canvas');
  
	// Again, set dimensions to fit the screen.
	hudCanvas.width = width;
	hudCanvas.height = height;

	// Get 2D context and draw something supercool.
	hudBitmap = hudCanvas.getContext('2d');
	// hudBitmap.font = "Normal 40px Arial";
	// hudBitmap.textAlign = 'center';
	// hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
	initHudBitmap();
	 
	// Create the camera and set the viewport to match the screen dimensions.
	cameraHUD = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 );

	// Create also a custom scene for HUD.
	sceneHUD = new THREE.Scene();

	// Create texture from rendered graphics.
	hudTexture = new THREE.Texture(hudCanvas) 
	hudTexture.needsUpdate = true;

	// Create HUD material.
	var material = new THREE.MeshBasicMaterial( {map: hudTexture} );
	material.transparent = true;

	// Create plane to render the HUD. This plane fill the whole screen.
	var planeGeometry = new THREE.PlaneGeometry( width, height );
	var plane = new THREE.Mesh( planeGeometry, material );
	sceneHUD.add( plane );

}

function getColor(curVal){
	if (curVal == 1){
		return '#0039a6'
	}else if (curVal == 2){
		return '#ff6319'
	}else if (curVal == 3){
		return '#b933ad'
	}else if (curVal == 4){
		return '#996633'
	}else if (curVal == 5){
		return '#a7a9ac'
	}else if (curVal == 6){
		return '#fccc0a'
	}else if (curVal == 7){
		return '#ee352e'
	}else if (curVal == 8){
		return '#00933c'
	}else if (curVal == 9){
		return '#00cccc'
	}
	return '#ffffff'
}

function onKeyPress(event){
	console.log(event.keyCode)
	if(event.keyCode == 48){//0
		clickedObject.val = 0;
	}else if(event.keyCode == 49){//1
		clickedObject.val = 1;
	}else if(event.keyCode == 50){//2
		clickedObject.val = 2;
	}else if(event.keyCode == 51){//3
		clickedObject.val = 3;
	}else if(event.keyCode == 52){//4
		clickedObject.val = 4;
	}else if(event.keyCode == 53){//5
		clickedObject.val = 5;
	}else if(event.keyCode == 54){//6
		clickedObject.val = 6;
	}else if(event.keyCode == 55){//7
		clickedObject.val = 7;
	}else if(event.keyCode == 56){//8
		clickedObject.val = 8;
	}else if(event.keyCode == 57){//9
		clickedObject.val = 9;
	}
	let materialArray = getMaterialArray(clickedObject.val, false);
	clickedObject.material = materialArray;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

var hoveredObject = null;
var clickedObject = null;
function onClick(event){
	console.log('click')
	if(event.layerY > height - 50){
		checkColorClick(event.layerX)
	}
	else if(hoveredObject){
		//reset old clicked
		if(clickedObject){
			clickedObject.material = new THREE.MeshBasicMaterial( { color: getColor(clickedObject.val) } );
		}
		//set new clicked object
		clickedObject = hoveredObject;
		clickedObject.material = new THREE.MeshBasicMaterial( { color: '#cccccc' } );
		hoveredObject = null;
		console.log(clickedObject.row + ", " + clickedObject.col);
	}
}

function checkColorClick(x_click){
	console.log(x_click)
	console.log(colorPositionsMax)
	console.log(colorPositionsMin)
	for(var i = 1; i < 10; i += 1){
		if(colorPositionsMin[i] < x_click && colorPositionsMax[i] > x_click){
			//change color of this square
			if(clickedObject){
				clickedObject.material = new THREE.MeshBasicMaterial( { color: getColor(i) } );
			}
		}
	}
}

function animate() {
	renderer.render( scene, camera );
    // Render HUD on top of the scene.
    renderer.render(sceneHUD, cameraHUD);
	requestAnimationFrame( animate );
}

function initHudBitmap(){
	colorPositionsMin = [0]//dont use 0 index for this project
	colorPositionsMax = [0]
	let padding = 10;
	let squareWidth = Math.min(50, (width - (padding * 10)) / 9);
	var x_pos = padding;
	if (squareWidth === 50){
		x_pos = (width / 2) - (squareWidth / 2) - (squareWidth * 4) - (padding * 4);
	}
	var y_pos = height - 60;
	for(var i = 1; i < 10; i += 1){
		hudBitmap.fillStyle = getColor(i);
    	hudBitmap.fillRect(x_pos,y_pos, squareWidth,squareWidth)
    	colorPositionsMin.push(x_pos)
    	colorPositionsMax.push(x_pos + squareWidth)
    	x_pos += padding + squareWidth;
	}
}

function onMouseMove( event ) {
	event.preventDefault();
	if ( hoveredObject) {
		if(hoveredObject != clickedObject){
			hoveredObject.material = new THREE.MeshBasicMaterial( { color: getColor(hoveredObject.val) } );
		}
		// console.log('test')
		// hoveredObject.material.color.set( '#fff' );
		hoveredObject = null;
	}
	var intersects = getIntersects( event.layerX, event.layerY );
	if ( intersects.length > 0 ) {
		var res = intersects.filter( function ( res ) {
			return res && res.object;
		} )[ 0 ];
		if ( res && res.object ) {
			hoveredObject = res.object;
		// let materialArray = getMaterialArray(hoveredObject.val, true);
			if(hoveredObject != clickedObject){
				hoveredObject.material =  new THREE.MeshBasicMaterial( { color: '#000000' } );
			}
		}
	}
}

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
function getIntersects( x, y ) {
	x = ( x / window.innerWidth ) * 2 - 1;
	y = - ( y / window.innerHeight ) * 2 + 1;
	mouseVector.set( x, y, 0.5 );
	raycaster.setFromCamera( mouseVector, camera );
	return raycaster.intersectObject( cubes, true );
}

