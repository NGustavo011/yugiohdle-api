type CardInput = {
	name: string;
	type: string;
	frameType: string;
	description: string;
	atk: number;
	def: number;
	level: number;
	race: string;
	attribute: string;
	archetype: string;
	imageUrl: string;
	imageUrlSmall: string;
	imageUrlCropped: string;
};

type SavedCardInput = CardInput & { id: string };

export class Card {
	private readonly name: string;
	private readonly type: string;
	private readonly frameType: string;
	private readonly description: string;
	private readonly atk: number;
	private readonly def: number;
	private readonly level: number;
	private readonly race: string;
	private readonly attribute: string;
	private readonly archetype: string;
	private readonly imageUrl: string;
	private readonly imageUrlSmall: string;
	private readonly imageUrlCropped: string;

	constructor(input: CardInput) {
		this.name = input.name;
		this.type = input.type;
		this.frameType = input.frameType;
		this.description = input.description;
		this.atk = input.atk;
		this.def = input.def;
		this.level = input.level;
		this.race = input.race;
		this.attribute = input.attribute;
		this.archetype = input.archetype;
		this.imageUrl = input.imageUrl;
		this.imageUrlSmall = input.imageUrlSmall;
		this.imageUrlCropped = input.imageUrlCropped;
	}

	getDto() {
		return {
			name: this.name,
			type: this.type,
			frameType: this.frameType,
			description: this.description,
			atk: this.atk,
			def: this.def,
			level: this.level,
			race: this.race,
			attribute: this.attribute,
			archetype: this.archetype,
			imageUrl: this.imageUrl,
			imageUrlSmall: this.imageUrlSmall,
			imageUrlCropped: this.imageUrlCropped,
		};
	}

	getSavedCard(id: string): SavedCard {
		return new SavedCard({
			id,
			name: this.name,
			type: this.type,
			frameType: this.frameType,
			description: this.description,
			atk: this.atk,
			def: this.def,
			level: this.level,
			race: this.race,
			attribute: this.attribute,
			archetype: this.archetype,
			imageUrl: this.imageUrl,
			imageUrlSmall: this.imageUrlSmall,
			imageUrlCropped: this.imageUrlCropped,
		});
	}
}

export class SavedCard extends Card {
	private readonly id: string;

	constructor(input: SavedCardInput) {
		const { id, ...rest } = input;
		super(rest);
		this.id = id;
	}

	getDto() {
		return {
			...super.getDto(),
			id: this.id,
		};
	}
}
