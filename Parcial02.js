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
    light.position.set( 10, 12, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 


    Cubo = [];   	// Definir un array unidimensional
    dim = 8; 		//Dado que son cubos, todas sus medidas en el eje son iguales, así que use la variable dim para almacenar este valor.

    Cubo.push(cubo(dim, dim, dim, 0xFFDD00, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0xFF5733, 'Phong', false));
    Cubo.push(cubo(dim, dim, dim, 0xC39BD3, 'Standard', false));

    for(i=0; i<3; i++){  //Se trasladan los tres cubos con uno de sus vértices al origen de coordenadas.

      Cubo[i].translateX(dim/2); 
      Cubo[i].translateZ(dim/2); 
      Cubo[i].translateY(dim/2); 
    }
    
    for(i=1; i<3; i++){ //Transformaciones de escalado y traslación sobre el eje y.

        escala= 1/(2*i); //Escalado a la mitad del cubo anterior.
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); //Da la posición para que los cubos queden uno sobre otro.
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

	
    // position and point the camera to the center of the scene
    camera.position.set(3*dim, 4*dim, 3*dim);
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