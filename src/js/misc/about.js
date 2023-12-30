import { I18n } from "harmony-browser-utils/src/i18n";
import { NotificationManager } from 'harmony-browser-utils/src/notificationManager.js';

export function showAboutLayer() {
	let html = `${I18n.getString('#csloadout_service_provided')}<a href="http://steamcommunity.com/id/baldurstod/" target="_blank">Baldurs Tod</a><br>
	<a href="https://www.shapeways.com/shops/baldurstod/" target="_blank">${I18n.getString('#shapeways_shop')}</a><br>
	<a href="https://www.redbubble.com/people/Loadout/shop?asc=u" target="_blank">${I18n.getString('#redbubble_shop')}</a><br>
	${I18n.getString('#model_texture_files_property')}<a href="http://www.valvesoftware.com/" target="_blank">Valve Corporation</a><br>
	${I18n.getString('#valve_tf_trademarks')}`;

	NotificationManager.addNotification(html, 'info', 15);
}
