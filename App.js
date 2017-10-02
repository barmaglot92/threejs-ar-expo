import Expo from 'expo'
import React from 'react'

import * as THREE from 'three' // 0.87.1
import ExpoTHREE from 'expo-three' // 2.0.2

const STLLoader = require('three-stl-loader')(THREE)
const loader = new STLLoader()

console.disableYellowBox = true

export default class App extends React.Component {
  render() {
    return (
      <Expo.GLView
        ref={ref => (this._glView = ref)}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    )
  }

  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight

    // const arSession = await this._glView.startARSessionAsync()

    const scene = new THREE.Scene()
    // const camera = ExpoTHREE.createARCamera(
    //   arSession,
    //   width,
    //   height,
    //   0.01,
    //   1000
    // )
    const camera = new THREE.PerspectiveCamera(
      75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    const renderer = ExpoTHREE.createRenderer({ gl })
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)

    // scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)

    // Edit the box dimensions here and see changes immediately!
    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    
    // loader.load(require('./assets/1trump.stl'), function (geometry) {
      
    //   // const material = new THREE.MeshNormalMaterial()
    //   // const mesh = new THREE.Mesh(geometry, material)
    //   // mesh.position.z = -0.4
    //   // scene.add(mesh)
    // })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.z = -0.4
    scene.add(cube)

    const animate = () => {
      requestAnimationFrame(animate)

      // cube.rotation.x += 0.07
      // cube.rotation.y += 0.04

      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    animate()
  }
}
