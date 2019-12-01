import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { getMaterialArray } from './texture_maps.js';
import {generate} from './get_grid.js';

// document.addEventListener( 'resize', onWindowResize, false );
// document.addEventListener( 'mousemove', onMouseMove, false );
// document.addEventListener( 'click', onClick, false );
// document.addEventListener( 'keyup', onKeyPress, false );
// document.addEventListener('keyup', function (event) {
//     if (event.defaultPrevented) {
//         return;
//     }

//     var key = event.key || event.keyCode;

//     console.log(key)
// });
var camera, controls, scene, renderer, cubes;
let grid = generate("easy");
console.log(grid);
init();
animate();

// window.addEventListener( 'keydown', onKeyPress, false );
//render(); // remove when using next line for animation loop (requestAnimationFrame)
function init() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	renderer.domElement.addEventListener( 'resize', onWindowResize );
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );
	renderer.domElement.addEventListener( 'click', onClick );
	renderer.domElement.addEventListener( 'keyup', onKeyPress );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcccccc );
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 400, 200, 0 );
	// camera.position.set( 15, 15, 15 );
	camera.lookAt(scene.position);
	// controls
	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableRotate = true;
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
	console.log("AAAAA")
	// for(var depth=1; depth <= 9; depth++){
		for ( var i = 1; i <= 9; i ++ ) {
			for(var j = 1; j <= 9; j++){

				let curVal = grid[i-1][j-1];
				let materialArray = getMaterialArray(curVal, false);
				var geometry = new THREE.CubeGeometry( cube_size,cube_size,cube_size );
				var cube = new THREE.Mesh( geometry, materialArray );
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
function onClick(){
	console.log('click')
	if(hoveredObject){
		clickedObject = hoveredObject;
		console.log(hoveredObject.row + ", " + hoveredObject.col);
	}
}

function animate() {
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

function onMouseMove( event ) {
	console.log('mouse move')
	event.preventDefault();
	if ( hoveredObject ) {
		let materialArray = getMaterialArray(hoveredObject.val, false);
		hoveredObject.material = materialArray;
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
		let materialArray = getMaterialArray(hoveredObject.val, true);
		hoveredObject.material = materialArray;
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

