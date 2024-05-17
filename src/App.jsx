import { useEffect } from 'react';
import "./App.css"
import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

import { GUI } from 'dat.gui';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import {gsap} from 'gsap';

function App() {

  var contentOnDisplay;

  const navigateCam = (num) => {
    var xPos;
    var yPos;
    var zPos;
    var content;
    if (num == 1) {
      xPos = .68;
      yPos = -.52;
      zPos = 8.98;
      content = document.getElementById("content1");
    } else if (num == 2) {
      xPos = 7.73;
      yPos = -7.27;
      zPos = -0.05;
      content = document.getElementById("content2");
    } else if (num == 3) {
      xPos = -12.1;
      yPos = -1.6;
      zPos = -9.7;
      content = document.getElementById("content3");
    } else if (num == 4) {
      xPos = -3.39;
      yPos = 2.7;
      zPos = -2.02;
      content = document.getElementById("content4");
    }
    if (contentOnDisplay) contentOnDisplay.style.display = "none";
    content.style.display = "block";
    contentOnDisplay = content

    gsap.to(test.camera.position, {
      x: xPos,
      y: yPos,
      z: zPos,
      duration: 1.5,
      ease: "back.out(1)",
      onComplete: function() {
        // console.log(test.camera.position)
        const lookAtPos = (new THREE.Vector3( 0, 0, -1)).applyQuaternion( test.camera.quaternion ).add( test.camera.position );
        // console.log(lookAtPos)
      }
    })
  }
  const redirect = () => {
    window.open("https://tonamn.github.io/shuffle.01/", '_blank').focus();
  }

  // const loadVideo = (id) => {
  //   const geometry = new THREE.BoxGeometry(5,5,1)
  //   const video = document.getElementById(id);
  //   const texture = new THREE.VideoTexture(video)
  //   texture.colorSpace = THREE.SRGBColorSpace;
  //   const material = new THREE.MeshBasicMaterial( { map: texture } );
  //   const mesh = new THREE.Mesh( geometry, material );
  //   test.scene.add( mesh );
  //   document.body.addEventListener("click", (e) => videoOnClick(e,video,mesh))
  //   return mesh
  // }
  
  // const raycaster = new THREE.Raycaster();
  // const pointer = new THREE.Vector2();

  // const videoOnClick = (event, video, mesh) => {
  //   pointer.x = ( event.clientX / test.renderer.domElement.clientWidth ) * 2 - 1;
  //   pointer.y = - ( event.clientY / test.renderer.domElement.clientHeight ) * 2 + 1;
  //   raycaster.setFromCamera( pointer, test.camera );
  //   // See if the ray from the camera into the world hits one of our meshes
  //   const intersects = raycaster.intersectObject( mesh );

  //   // Toggle rotation bool for meshes that we clicked
  //   if ( intersects.length > 0 ) {
  //     if (video.paused) {
  //       video.play()
  //     } else {
  //       video.pause()
  //     }
  //   }
  // }

  const test = new SceneInit('myThreeJsCanvas');
  useEffect(() => {
    // const container = document.getElementById("container")

    test.initialize();
    const al = test.al;
    const dl = test.dl;
    const dlHelper = test.dlHelper;
    const camera = test.camera;
    test.animate();

    // const groundGeometry = new THREE.BoxGeometry(20, 1, 20);
    // const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    // const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    // groundMesh.receiveShadow = true;
    // groundMesh.position.y = -5;
    // test.scene.add(groundMesh);
    
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.castShadow = true;

    test.scene.add(boxMesh);

    const gui = new GUI();
    
    const cameraFolder = gui.addFolder("Camera");
    cameraFolder.add(camera.position, "x", -100,100, 1);
    cameraFolder.add(camera.position, "y", -100,100, 1);
    cameraFolder.add(camera.position, "z", -100,100, 1);

    const lightingFolder = gui.addFolder('Lighting');

    const alParams = {
      color: al.color.getHex(),
    }
    const alFolder = lightingFolder.addFolder('Ambient Light');
    alFolder.add(al, "visible");
    alFolder.add(al, 'intensity',0,1,0.25);
    alFolder
      .addColor(alParams, 'color')
      .onChange((value) => al.color.set(value));
    alFolder.open()
    
    const dlSettings = {
      visible: true,
      color: dl.color.getHex(),
    };
    const dlFolder = lightingFolder.addFolder('Directional light');
    dlFolder.add(dlSettings, 'visible').onChange((value) => {
      dl.visible = value;
      dlHelper.visible = value;
    });
    dlFolder.add(dl, 'intensity', 0, 1, 0.25);
    dlFolder.add(dl.position, 'y', 1, 4, 0.5);
    dlFolder.add(dl, 'castShadow');
    dlFolder
      .addColor(dlSettings, 'color')
      .onChange((value) => dl.color.set(value));
    dlFolder.open();


    const progressBar = document.getElementById("progress-bar");
    const progressBarContainer = document.querySelector(".progress-bar-container");
    progressBarContainer.style.display = "none";

 

    
    
    // const box = loadVideo("video1")
    // box.position.x = 3


    // loadVideo("video2")
    
    // const manager = new THREE.LoadingManager();
    // manager.onStart = function(url, item, total) {
    //   console.log(`Start loading ${url}`)
    // }

    // manager.onLoad = function(url, item, total) {
    //   console.log("Finished loading")
    //   progressBarContainer.style.display = "none";
    // }

    // manager.onProgress = function(url , loaded, total) {
    //   progressBar.value = (loaded/ total) * 100;
    // }

    // // ------------------LOAD 3D MODEL---------------------------------
    // const loader = new OBJLoader(manager);
    // loader.setPath("http://localhost:5173/public/models/")
    // // load a resource
    // loader.load(
    //   // resource URL
    //   'landing3D.obj',
    //   // called when resource is loaded
    //   function ( object ) {

    //     object.traverse( function ( child ) {

    //       if ( child.isMesh ) {
    //         // console.log(child)
    //         // child.material.color.set(0xFFB6C1);
    //       } 
    
    //     } );
    
    //     object.position.y = 1
    //     // object.scale.setScalar( 0.01 );
    //     test.scene.add( object );
        
    //     // test.animate();
    //   },
    //   // called when loading is in progresses
    //   function ( xhr ) {
    //     // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    //   },
    //   // called when loading has errors
    //   function ( error ) {
    //     console.log(error);
    //     console.log( 'An error happened' );
    //   }
    // );
  }, []);

  

  return (
    <div id="container">
      <canvas id="myThreeJsCanvas" />
      <div className='buttons'>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(1)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(2)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(3)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(4)}></div>
        <div className='button' style={{backgroundColor: "green"}} onClick={redirect}></div>
      </div>
      <div id="content1" style={{display:"none"}}>
        <div className='sidebar sidebar1-l'>
          <div style={{fontSize: "20px"}}> TONNAM VASIKANOND </div>
        </div>
        <div className="sidebar sidebar1-r">
          <div style={{fontSize: "15px"}}>photographer, art director, communicator</div>
        </div>
      </div>
      <div id="content2" style={{display:"none"}}>
        <div className='sidebar sidebar2-l'>
          <div> Hello there! </div>
        </div>
        <div className="sidebar-r">
        </div>
      </div>
      <div id="content3" style={{display:"none"}}>
        <div className='sidebar sidebar3-l'>
        </div>
        <div className="sidebar sidebar3-r">
        </div>
      </div>
      <div id="content4" style={{display:"none"}}>
        <div className='sidebar sidebar-l'>
        </div>
        <div className="sidebar sidebar-r">
        </div>
      </div>
      
      {/* <video id="video1" loop crossOrigin="anonymous" playsInline style={{display:"none"}}>
        <source src="./public/box.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
      </video>
      <video id="video2" loop crossOrigin="anonymous" playsInline style={{display:"none"}}>
        <source src="./public/dontComeClose.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
      </video>
      <video id="video3" loop crossOrigin="anonymous" playsInline style={{display:"none"}}>
        <source src="./public/liminal.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
      </video> */}
    </div>
  );
}

export default App;