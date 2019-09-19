import React, { Component } from "react";
import classes from "./ProjectView.module.css";
import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";
class ProjectView extends Component {
  componentDidMount() {
    this.init();
    this.initAnimate();
    this.addShapes();
    this.threeRender();
  }

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
    this.camera.position.z = 50;
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
    this.controls = new TrackballControls(this.camera);
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

  addShapes = () => {
    let geo2 = new THREE.DodecahedronGeometry(10, 1),
      mat2 = new THREE.MeshToonMaterial({ color: 0x00ffff });
    let mesh2 = new THREE.Mesh(geo2, mat2);

    // let geo = new THREE.BoxGeometry(10, 225, 15);
    // var material = new THREE.MeshBasicMaterial({
    //   color: 0x00ff00
    // });
    // let cube = new THREE.Mesh(geo, material);
    this.scene.add(mesh2);
    // this.scene.add(cube);
    console.log("shape added");
  };

  initAnimate = () => {
    requestAnimationFrame(this.initAnimate);
    this.controls.update();
  };
  threeRender = () => {
    this.renderer.render(this.scene, this.camera);
  };
  onWindowUpdate = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.controls.handleResize();
  };

  onRemoveFormFocus = () => {};

  render() {
    return (
      <div className={classes.ProjectView} onClick={this.onRemoveFormFocus}>
        <canvas ref={ref => (this.mountLocation = ref)}></canvas>
      </div>
    );
  }
}
export default ProjectView;
