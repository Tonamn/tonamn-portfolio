import { useEffect } from 'react';
import "./App.css"
import * as THREE from 'three';
import SceneInit from './lib/SceneInit';

import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {gsap} from 'gsap';

function App() {

  var contentOnDisplay;
  const useDat = false;
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
      xPos = 3;
      yPos = 1;
      zPos = 0;
      content = document.getElementById("content2");
    } else if (num == 3) {
      xPos = 0;
      yPos = 2.7;
      zPos = 3;
      content = document.getElementById("content3");
    } else if (num == 4) {
      xPos = -3;
      yPos = 0;
      zPos = -3;
      content = document.getElementById("content4");
    } else if (num == 5) {
      xPos = -1;
      yPos = -2;
      zPos = 7;
      content = document.getElementById("content5");
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
        // const lookAtPos = (new THREE.Vector3( 0, 0, -1)).applyQuaternion( test.camera.quaternion ).add( test.camera.position );
        // test.camera.lookAt(0,0,0)
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
    
    const gui = new GUI();
    // const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    // const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // boxMesh.castShadow = true;
    // test.scene.add(boxMesh);
    
    // // const box = loadVideo("video1")
    // // box.position.x = 3



    const pLight = new THREE.PointLight(0xffffff);
    pLight.position.set(1,0,0);
    test.scene.add(pLight)

    // // loadVideo("video2")
    
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

    function _loadModelAndWait() {
      return new Promise((resolve, reject) => {

        const gltfLoader = new GLTFLoader();
        gltfLoader.load("./sitDownPraym.gltf", (gltf) => {
          resolve(gltf);
        })
        }, undefined, (error) => {
          console.error(error);
          reject(error);
        });
      // });
    }
    function loadModel() {
      _loadModelAndWait()
      .then((gltf)=> {
          if(gltf) {
            const progressBarContainer = document.querySelector(".progress-bar-container");
            progressBarContainer.style.display = "none";
            if (useDat) {
              const modelFolder = gui.addFolder("Model");
              modelFolder.add(gltf.scene.position, "x", -100,100, 1);
              modelFolder.add(gltf.scene.position, "y", -100,100, 1);
              modelFolder.add(gltf.scene.position, "z", -100,100, 1);
              modelFolder.open()
            }
            gltf.scene.position.y = -2
            gltf.scene.scale.setScalar(1);
            console.log(gltf.scene)
            test.scene.add(gltf.scene)
          }
      })
      .catch((error) => {
        console.error(error);
      })
    }
    
    loadModel()

    if (useDat) {
      
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
    }
    
  }, []);

  

  return (
    <div id="container">
      <canvas id="myThreeJsCanvas" />
      <div className='buttons'>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(1)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(2)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(3)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(4)}></div>
        <div className='button' style={{backgroundColor: "red"}} onClick={() => navigateCam(5)}></div>
        <div className='button' style={{backgroundColor: "green"}} onClick={redirect}></div>
      </div>
      <div id="content1" style={{display:"none"}}>
        <div className='sidebar sidebar1-l'>
          <div style={{fontSize: "30px"}}> TONNAM VASIKANOND </div>
        </div>
        <div className="sidebar sidebar1-r">
          <div style={{fontSize: "20px"}}>photographer, art director, communicator</div>
        </div>
      </div>
      <div id="content2" style={{display:"none"}}>
        <div className='sidebar sidebar2-l'>
          <div style={{fontSize: "40px"}}> Hello there! Welcome. </div>
          <div style={{fontSize: "40px"}}> I am someone who can help communicates your visions. </div>
        </div>
        <div className="sidebar sidebar2-r">
          <div style={{fontSize: "40px", textAlign:"right"}}>Currently based in London and with backgrounds from Bangkok</div>
        </div>
      </div>
      <div id="content3" style={{display:"none"}}>
        <div className='sidebar sidebar3-l'>
          <div style={{fontSize: "40px"}}>
            My interests lies in our connections with nature, MODERN STIMULANTS that shape our habit and attention
          </div>
          <div style={{fontSize: "40px"}}>
            The different mediums which exists in our creative world excites me and I do my best to make use of them to achieve the artistic visions.
          </div>
        </div>
        {/* <div className="sidebar sidebar3-r">
        </div> */}
      </div>
      <div id="content4" style={{display:"none"}}>
        <div className='sidebar sidebar4-l'>
          <div style={{fontSize: "30px"}}> I specialize in COLOR & all-things-visuals </div>
          <div style={{fontSize: "30px"}}> photography, videography, color grading </div>
        </div>
        <div className="sidebar sidebar4-r">
          <div style={{fontSize: "30px"}}>  /* I dabble in </div>
          <div> 
            <div style={{fontSize: "30px", textAlign: "right"}}> 3D works </div>
            <div style={{fontSize: "30px", textAlign: "right"}}> Graphic </div>
            <div style={{fontSize: "30px", textAlign: "right"}}> Creative Coding </div>
            <div style={{fontSize: "30px", textAlign: "right"}}> */ </div>
          </div>
        </div>
      </div>
      <div id="content5" style={{display:"none"}}>
        <div className='sidebar sidebar5-l'>
          <div style={{fontSize: "30px"}}> I would love to chat! </div>
          <div>
            <div style={{fontSize: "30px"}}> tonnam.vasikanond@gmail.com </div>
            <div style={{fontSize: "30px"}}> Instagram @tn_tonnam_</div>
          </div>
        </div>
        <div className="sidebar sidebar5-r">
          <div style={{fontSize: "50px"}}>  {"PLEASE KEEP IN TOUCH <3"} </div>
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