import { createElement } from 'harmony-ui';
import { CS2_ECON_URL } from '../constants';

import '../../css/itemlistitem.css';

export class ItemListItem extends HTMLElement {

	#htmlName;
	#htmlImage;

	#item;
	#visible = false;
	#initialized = false;

	connectedCallback() {
		let callback = (entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.visible = true;
					observer.unobserve(entry.target);
				}
			});
		};
		new IntersectionObserver(callback, { threshold:0.5 }).observe(this);
	}

	set item(item) {
		this.#item = item;
		if (item) {
			this.#refresh();
		}
	}

	get item() {
		return this.#item;
	}

	set visible(visible) {
		this.#visible = visible;
		if (visible) {
			this.#refresh();
		}
	}

	#refresh() {
		if (this.#item && this.#visible && !this.#initialized) {
			this.#createHTML();

			let item = this.#item;
			if (item.title) {
				this.#htmlName.innerHTML = '<a target=\'_blank\' href=\'' + WORKSHOP_URL + item.id + '\' >' + item.title + '</a>';
				this.#htmlName.classList.add('workshop-item');
			} else {
				this.#htmlName.innerHTML = item.name;
			}

			if (this.#item.grade) {
				this.classList.add('item-grade-' + this.#item.grade);
			}

			/*if (this.#item?.image_inventory?.substring(0, 4)=='http') {
				this.#htmlImage.style.backgroundImage = 'url(\'' + this.#item?.image_inventory + '\')';
			} else {
				this.#htmlImage.style.backgroundImage = 'url(\'' + inventoryPath + this.#item?.image_inventory?.toLowerCase() + '.png\')';
			}*/

			this.#htmlImage.src = new URL(this.#item.imageInventory + '.png', CS2_ECON_URL);


			this.#initialized = true;
		}
	}

	#createHTML() {
		this.setAttribute('title', this.#item.name);
		this.#htmlName = createElement('div', {class:'item-list-item-name'});
		this.#htmlImage = createElement('img', {class:'item-list-item-img'});
		this.append(this.#htmlImage, this.#htmlName);
	}

	set selected(selected) {
		if (selected) {
			this.classList.add(SELECTED_CLASS);
		} else {
			this.classList.remove(SELECTED_CLASS);
		}
	}
}
customElements.define('item-list-item', ItemListItem);
