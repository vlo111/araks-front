import { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

function BabylonScene() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const sphereMeshesRef = useRef([]);
  const tubeMeshesRef = useRef([]);

  useEffect(() => {
    const canvas: HTMLElement | null = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0); // Set background color to black
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      8,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    const generateRandomLayout = () => {
      const spherePositions = [];
      for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 50;
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere' + i, { diameter: 2, segments: 32 }, scene);
        sphere.position = new BABYLON.Vector3(x, y, z);

        const material = new BABYLON.StandardMaterial('material' + i, scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        sphere.material = material;
        spherePositions.push(new BABYLON.Vector3(x, y, z));
      }

      sphereMeshesRef.current = scene.meshes.filter((mesh) => mesh.name.startsWith('sphere'));

      // Create connecting lines (tubes)
      for (let i = 0; i < spherePositions.length - 1; i++) {
        const points = [spherePositions[i], spherePositions[i + 1]];

        const tube = BABYLON.Mesh.CreateTube(
          'line' + i,
          points,
          0.05,
          10,
          (i: number, distance: number) => 0.05,
          BABYLON.Mesh.CAP_ALL,
          scene
        );

        const material = new BABYLON.StandardMaterial('lineMaterial' + i, scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        tube.material = material;
        tubeMeshesRef.current.push(tube);
      }
    };

    generateRandomLayout();

    sceneRef.current = scene;
    engineRef.current = engine;

    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  const transitionToConcentricLayout = () => {
    // Clear existing nodes and edges
    sphereMeshesRef.current.forEach((sphere) => sphere.dispose());
    tubeMeshesRef.current.forEach((tube) => tube.dispose());

    // Clear references
    sphereMeshesRef.current = [];
    tubeMeshesRef.current = [];

    // Generate concentric layout
    const numConcentricCircles = 10;
    const numSpheresPerCircle = 50;
    const radiusIncrement = 5;

    for (let circle = 0; circle < numConcentricCircles; circle++) {
      const circleRadius = circle * radiusIncrement;
      for (let i = 0; i < numSpheresPerCircle; i++) {
        const angle = (i / numSpheresPerCircle) * Math.PI * 2;
        const x = circleRadius * Math.cos(angle);
        const y = 0;
        const z = circleRadius * Math.sin(angle);
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere' + i, { diameter: 2, segments: 32 }, sceneRef.current);
        sphere.position = new BABYLON.Vector3(x, y, z);

        const material = new BABYLON.StandardMaterial('material' + i, sceneRef.current);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        sphere.material = material;
        sphereMeshesRef.current.push(sphere);
      }
    }

    // Create connecting lines (tubes) for concentric layout
    for (let i = 0; i < sphereMeshesRef.current.length - 1; i++) {
      const points = [sphereMeshesRef.current[i].position, sphereMeshesRef.current[i + 1].position];

      const tube = BABYLON.Mesh.CreateTube(
        'line' + i,
        points,
        0.05,
        10,
        (i: number, distance: number) => 0.05,
        BABYLON.Mesh.CAP_ALL,
        sceneRef.current
      );

      const material = new BABYLON.StandardMaterial('lineMaterial' + i, sceneRef.current);
      material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      tube.material = material;
      tubeMeshesRef.current.push(tube);
    }
  };

  return (
    <div>
      <canvas id="renderCanvas" ref={canvasRef} style={{ width: '100%', height: window.innerHeight - 160 }}>
        Your browser does not support the HTML5 canvas element.
      </canvas>
      <button onClick={transitionToConcentricLayout}>Transition to Concentric Layout</button>
    </div>
  );
}

export const Graph3D = () => <BabylonScene />;
