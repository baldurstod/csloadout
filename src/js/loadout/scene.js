import { Camera, Scene, SceneExplorer } from 'harmony-3d';

export const loadoutScene = new Scene();
export const loadoutCamera = new Camera();

new SceneExplorer().scene = loadoutScene;
loadoutScene.activeCamera = loadoutCamera;
loadoutScene.addChild(loadoutCamera);
