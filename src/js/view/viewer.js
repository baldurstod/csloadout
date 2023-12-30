import { AmbientLight, Camera, ContextObserver, GRAPHICS_EVENT_TICK, Graphics, GraphicsEvents, OrbitControl, Scene, SceneExplorer, Source2ModelManager, WebGLStats } from 'harmony-3d';
import { createElement } from 'harmony-ui';

import { Controller } from '../controller';

import '../../css/viewer.css';

export class Viewer {
	#htmlElement;
	#htmlCanvas;

	#renderer;
	#scene = new Scene();
	#camera = new Camera();
	#orbitControl;
	constructor() {
		this.#initHTML();
		this.#orbitControl = new OrbitControl(this.#camera, this.#htmlCanvas);
		this.#camera.position = [100, 0, 40];
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
		SceneExplorer.scene = this.#scene;
		this.#scene.activeCamera = this.#camera;
		this.#scene.addChild(this.#camera);
		this.#scene.addChild(new AmbientLight());

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
				Graphics.render(this.#scene, this.#scene.activeCamera, event.detail.delta);
			}
		});

		ContextObserver.observe(GraphicsEvents, this.#camera);
		this.#renderer.play();
	}

	async initModel() {

		const fileName = 'characters/models/ctm_diver/ctm_diver_varianta';

		const model = await Source2ModelManager.createInstance('cs2', fileName, true);
		this.#scene.addChild(model);
	}

	get htmlElement() {
		return this.#htmlElement;
	}
}
