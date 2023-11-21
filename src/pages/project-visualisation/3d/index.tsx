import { useEffect } from 'react';
import * as BABYLON from 'babylonjs';

function BabylonScene() {
  useEffect(() => {
    const canvas: HTMLElement | null = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      8,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    const spherePositions = [];
    const numConcentricCircles = 10; // Number of concentric circles of spheres TRY 14
    const numSpheresPerCircle = 50; // Number of spheres in each circle  TRY 80
    const radiusIncrement = 50; // Increment between circles TRY 100

    for (let circle = 0; circle < numConcentricCircles; circle++) {
      const circleRadius = circle * radiusIncrement;
      for (let i = 0; i < numSpheresPerCircle; i++) {
        const angle = (i / numSpheresPerCircle) * Math.PI * 2;
        const x = circleRadius * Math.cos(angle);
        const z = circleRadius * Math.sin(angle);
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere' + i, { diameter: 2, segments: 32 }, scene);
        sphere.position = new BABYLON.Vector3(x, 0, z);

        const material = new BABYLON.StandardMaterial('material' + i, scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        sphere.material = material;
        spherePositions.push(new BABYLON.Vector3(x, 0, z));
      }
    }

    for (let i = 0; i < spherePositions.length; i++) {
      const sphere = BABYLON.MeshBuilder.CreateSphere('sphere' + i, { diameter: 2, segments: 32 }, scene);
      sphere.position = spherePositions[i];

      const material = new BABYLON.StandardMaterial('material' + i, scene);
      material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      sphere.material = material;
    }

    for (let i = 0; i < spherePositions.length - 1; i++) {
      const points = [spherePositions[i], spherePositions[i + 1]];

      const line = BABYLON.Mesh.CreateTube(
        'line' + i,
        points, // Array of points to create the tube between
        0.05, // Diameter of the tube (adjust this value for thickness)
        10, // Tesselation (adjust as needed)
        (i: number, distance: number) => 0.05,
        BABYLON.Mesh.CAP_ALL,
        scene
      );

      const material = new BABYLON.StandardMaterial('lineMaterial' + i, scene);
      material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      line.material = material;

      // Calculate the center of the line
      const center = BABYLON.Vector3.Center(points[0], points[1]);

      // Create a text label over the line
      const textPlane = BABYLON.Mesh.CreatePlane('textPlane' + i, 2, scene);
      textPlane.position = center;

      const textTexture = new BABYLON.DynamicTexture('textTexture', 256, scene);
      const textureContext = textTexture.getContext();
      textureContext.fillStyle = 'white';
      textureContext.font = '36px Tahoma';
      textureContext.fillText('Working For', 40, 128); // Adjust the text position

      textTexture.hasAlpha = true;
      textTexture.update();

      const textMaterial = new BABYLON.StandardMaterial('textMaterial' + i, scene);
      textMaterial.diffuseTexture = textTexture;
      textMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      textMaterial.backFaceCulling = false;

      textPlane.material = textMaterial;
    }

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

  return (
    <canvas id="renderCanvas" style={{ width: '100%', height: window.innerHeight - 160 }}>
      Your browser does not support the HTML5 canvas element.
    </canvas>
  );
}

export const Graph3D = () => <BabylonScene />;
