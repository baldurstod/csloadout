import { Source2ModelManager } from "harmony-3d";
import { loadoutScene } from "./scene";

export class CharacterItem {
	#modelName;
	#source2Model;
	#visible;
	#character;
	#characterModel

	setCharacter(character) {
		this.#character = character;
	}

	setCharacterModel(characterModel) {
		this.#characterModel = characterModel;
		this.#parent();
	}

	async setModelName(modelName) {
		this.#modelName = modelName;
		if (this.#source2Model) {
			this.#source2Model.dispose();
			this.#source2Model = null;
		}

		this.#source2Model = await Source2ModelManager.createInstance('cs2', modelName, true);
		this.#parent();
	}

	#parent() {
		if (this.#source2Model) {
			if (this.#characterModel) {
				this.#characterModel.addChild(this.#source2Model);
			} else {
				loadoutScene.addChild(this.#source2Model);
			}
		}
	}

	set visible(visible) {
		this.#visible = visible;
		if (this.#source2Model) {
			this.#source2Model.visible = visible;
		}
	}

	get visible() {
		return this.#visible;
	}

}
