import React, { Component } from "react";
import classes from "./ProjectView.module.css";
import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";
import Search from "../../components/Search/Search";
class ProjectView extends Component {
  componentDidMount() {
    this.init();
    /**
     * Set up loading manager
     */
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
      console.log(
        "Started loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    //start animation here.
    this.loadingManager.onLoad = () => {
      console.log("Load complete");
      this.animate();

      this.threeRender();
    };
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(
        "Loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };
    this.loadingManager.onError = url => {
      console.log("Err loading: " + url);
    };

    this.addShapes();
  }
  //set up camera, controls, scene, lights
  init = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    //init camera
    this.camera.position.z = 10;
    this.camera.position.y = 0;
    this.camera.position.x = 0;

    //init renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.mountLocation,
      antialias: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff);

    //init controls
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.addEventListener("change", this.threeRender);

    //init lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 50).normalize();

    //init scene object
    this.scene = new THREE.Scene();
    this.scene.add(ambientLight);
    this.scene.add(directionalLight);

    //Set up resize listener
    window.addEventListener("resize", this.onWindowUpdate, false);
  };
  //self explanatory
  addShapes = () => {
    let geo2 = new THREE.DodecahedronGeometry(1, 1),
      mat2 = new THREE.MeshToonMaterial({ color: 0x00ffff });
    let mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(0, 0, 0).normalize();
    this.scene.add(mesh2);
    let loader = new THREE.ObjectLoader(this.loadingManager);
    // console.log(loader);
    loader.load("assets/models/stub.json", object => {
      object.position.set(0, 0, 0).normalize();
      // var mesh = new THREE.Mesh(geometry, materials);
      this.scene.add(object);
    });
    loader.load("assets/models/left_branch.json", object => {
      object.position.set(0, 0, 0).normalize();
      // var mesh = new THREE.Mesh(geometry, materials);
      this.scene.add(object);
    });
    loader.load("assets/models/right_branch.json", object => {
      object.position.set(0, 0, 0).normalize();
      // var mesh = new THREE.Mesh(geometry, materials);
      this.scene.add(object);
    });

    // this.scene.add(mesh2);
    // this.scene.add(cube);
    console.log("shape added");
  };
  //animate loop
  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
  };
  //"re render"
  threeRender = () => {
    this.renderer.render(this.scene, this.camera);
  };
  //handles resize events
  onWindowUpdate = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.controls.handleResize();
  };

  render() {
    return (
      <div className={classes.ProjectView}>
        <Search submit={this.props.submit} />
        {this.props.repo.title ? (
          <p>Cool, you chose {this.props.repo.title}</p>
        ) : (
          <h2>
            Enter the name of a repository like so: [owner username]/[repo name]
          </h2>
        )}

        <canvas ref={ref => (this.mountLocation = ref)}></canvas>
      </div>
    );
  }
}
export default ProjectView;
