// create a scene, that will hold all our elements such as objects, cameras and lights. 
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // add the cube to the scene
    scene.add(cube);
    return(cube);
}
function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //Adding Light

   light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( -10, 15, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 


    Cubo = [];   	// Definir un array unidimensional
    dim = 4; 		//Dado que son cubos, todas sus medidas en el eje son iguales, así que use la variable dim para almacenar este valor.
    ang = 45;
	
    Cubo.push(cubo(dim, dim, dim, 0xFFDD00, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0xFF5733, 'Phong', false));
    Cubo.push(cubo(dim, dim, dim, 0xC39BD3, 'Standard', false));

    Cubo[0].translateZ(2, 0, 0)
    Cubo[1].translateZ(2, 0, 0)
    Cubo[2].translateZ(2, 0, 0)
 
    Cubo[0].translateX(2, 0, 0)
    Cubo[1].translateX(2, 0)
    Cubo[2].translateX(2, 0, 0)

    Cubo[0].translateY(2, 0, 0)
    Cubo[1].translateY(5, 0, 0)
    Cubo[2].translateY(6.5, 0, 0)

    Cubo[1].scale.set(0.5, 0.5, 0.5)
    Cubo[2].scale.set(0.25, 0.25, 0.25)

    Cubo[0].rotateY(ang)
    Cubo[1].rotateY(ang*2)
    Cubo[2].rotateY(ang*3)

    // position and point the camera to the center of the scene
    camera.position.set(dim*4, dim*4, dim*4);
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}

/*Referencias

https://developer.mozilla.org/es/docs/Web/CSS/transform
https://developer.mozilla.org/es/docs/Web/CSS/transform-function/translate()
*/