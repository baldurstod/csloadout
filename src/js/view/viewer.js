import { AmbientLight, Camera, ContextObserver, GRAPHICS_EVENT_TICK, Graphics, GraphicsEvents, OrbitControl, Scene, SceneExplorer, Source2ModelManager, WebGLStats } from 'harmony-3d';
import { createElement } from 'harmony-ui';

import { Controller } from '../controller';

import '../../css/viewer.css';
import { loadoutCamera, loadoutScene } from '../loadout/scene';

export class Viewer {
	#htmlElement;
	#htmlCanvas;

	#renderer;
	#orbitControl;
	constructor() {
		this.#initHTML();
		this.#orbitControl = new OrbitControl(loadoutCamera, this.#htmlCanvas);
		loadoutCamera.position = [100, 0, 40];
		this.#orbitControl.setTargetPosition([0, 0, 40]);
		this.#initRenderer();
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'viewer',
			childs: [
				this.#htmlCanvas = createElement('canvas'),
			],
		})
		return this.#htmlElement;
	}

	#initRenderer() {
		loadoutScene.addChild(new AmbientLight());

		this.#renderer = Graphics.initCanvas({
			canvas: this.#htmlCanvas,
			alpha: true,
			autoResize: true,
			preserveDrawingBuffer: true,
			premultipliedAlpha: false
		});

		this.#renderer.clearColor([0.5, 0.5, 0.5, 1]);

		GraphicsEvents.addEventListener(GRAPHICS_EVENT_TICK, (event) => {
			WebGLStats.tick();
			if (this.composer?.enabled) {
				this.composer.render(event.detail.delta);
			} else {
				Graphics.render(loadoutScene, loadoutScene.activeCamera, event.detail.delta);
			}
		});

		ContextObserver.observe(GraphicsEvents, loadoutCamera);
		this.#renderer.play();
	}

	async initModel() {

		const fileName = 'characters/models/ctm_diver/ctm_diver_varianta';

		const model = await Source2ModelManager.createInstance('cs2', fileName, true);
		loadoutScene.addChild(model);
	}

	get htmlElement() {
		return this.#htmlElement;
	}
}
