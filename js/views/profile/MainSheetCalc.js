import { get } from '../../stores/ListStore';
import MainSheetCalcItem from './MainSheetCalcItem';
import React, { Component, PropTypes } from 'react';

export default class MainSheetCalc extends Component {

	static propTypes = {
		attributes: PropTypes.array.isRequired,
		baseValues: PropTypes.object.isRequired
	};

	render() {

		const { attributes, baseValues } = this.props;

		return attributes.length > 0 ? (
			<div className="calculated">
				<div className="calc-header">
					<div>Wert</div>
					<div>Bonus/<br/>Malus</div>
					<div>Zukauf</div>
					<div>Max</div>
				</div>
				<MainSheetCalcItem
					label={attributes[0].name}
					calc={attributes[0].calc}
					value={attributes[0].value}
					add={attributes[0].mod}
					purchased={attributes[0].currentAdd}
					subLabel="Grundwert"
					subArray={[baseValues.le]} />
				<MainSheetCalcItem
					label="Astralenergie"
					calc="(20 durch Zauberer + Leiteigenschaft)"
					value={attributes[1].value}
					add={do {
						if (get('ADV_23') && get('ADV_23').active)
							get('ADV_23').tier;
						else if (get('DISADV_26') && get('DISADV_26').active)
							-get('DISADV_26').tier;
						else
							0;
					}}
					purchased={baseValues.aeAdd}
					subLabel="perm. eingesetzt/davon zurückgekauft"
					subArray={[0,0]}
					empty={attributes[1].value === '-'} />
				<MainSheetCalcItem
					label="Karmaenergie"
					calc="(20 durch Geweihter + Leiteigenschaft)"
					value={attributes[2].value}
					add={do {
						if (get('ADV_24') && get('ADV_24').active)
							get('ADV_24').tier;
						else if (get('DISADV_27') && get('DISADV_27').active)
							-get('DISADV_27').tier;
						else
							0;
					}}
					purchased={baseValues.keAdd}
					subLabel="perm. eingesetzt/davon zurückgekauft"
					subArray={[0,0]}
					empty={attributes[2] === '-'} />
				<MainSheetCalcItem
					label="Seelenkraft"
					calc="(GW der Spezies + (MU + KL + IN)/6)"
					value={baseValues.sk + Math.round((attributes[0].value + attributes[1].value + attributes[2].value) / 6)}
					add={do {
						if (get('ADV_26') && get('ADV_26').active)
							1;
						else if (get('DISADV_29') && get('DISADV_29').active)
							-1;
						else
							0;
					}}
					purchased={null}
					subLabel="Grundwert"
					subArray={[baseValues.sk]} />
				<MainSheetCalcItem
					label="Zähigkeit"
					calc="(GW der Spezies + (KO + KO + KK)/6)"
					value={baseValues.zk + Math.round((attributes[6].value * 2 + attributes[7].value) / 6)}
					add={do {
						if (get('ADV_27') && get('ADV_27').active)
							1;
						else if (get('DISADV_30') && get('DISADV_30').active)
							-1;
						else
							0;
					}}
					purchased={null}
					subLabel="Grundwert"
					subArray={[baseValues.zk]} />
				<MainSheetCalcItem
					label="Ausweichen"
					calc="(GE/2)"
					value={Math.round(attributes[5].value / 2)}
					add={0}
					purchased={null} />
				<MainSheetCalcItem
					label="Initiative"
					calc="(MU + GE)/2"
					value={Math.round((attributes[0].value + attributes[5].value) / 2)}
					add={0}
					purchased={null} />
				<MainSheetCalcItem
					label="Geschwindigkeit"
					calc="(GW der Spezies, mögl. Einbeinig)"
					value={baseValues.gs}
					add={0}
					purchased={null}
					subLabel="Grundwert"
					subArray={[baseValues.gs]} />
				<div className="fate">
					<h3>Schicksalspunkte</h3>
				</div>
			</div>
		) : null;
	}
}
