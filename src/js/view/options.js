import { createElement } from 'harmony-ui';

import 'harmony-ui/dist/define/harmony-tab.js';
import 'harmony-ui/dist/define/harmony-tab-group.js';
import '../../css/options.css';
import { SceneExplorer, ShaderEditor } from 'harmony-3d';

export class Options {
	#htmlElement;
	#shaderEditor = new ShaderEditor();

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'options',
			child: createElement('harmony-tab-group', {
				childs: [
					createElement('harmony-tab', {
						'data-i18n':'#general_options',
					}),
					createElement('harmony-tab', {
						'data-i18n':'#scene_explorer',
						child: SceneExplorer.htmlElement,
					}),
					createElement('harmony-tab', {
						'data-i18n':'#shader_editor',
						events: {
							activated: () => {
								this.#shaderEditor.initEditor({aceUrl:'./js/ace-builds/src-min/ace.js', displayCustomShaderButtons: true});
								event.target.append(this.#shaderEditor);
							},
						},
					}),
				]

			}),
		})
		return this.#htmlElement;
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
