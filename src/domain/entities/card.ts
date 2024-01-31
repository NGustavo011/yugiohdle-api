export type CardType = {
	id: string;
	name: string;
	type: string;
	frameType: string;
	description: string;
	atk: number | null;
	def: number | null;
	level: number | null;
	race: string;
	attribute: string | null;
	archetype: string | null;
	imageUrl: string;
	imageUrlSmall: string;
	imageUrlCropped: string;
	availableClassicDailyCard: boolean;
};

type CardInput = {
	name: string;
	type: string;
	frameType: string;
	description: string;
	atk: number | null;
	def: number | null;
	level: number | null;
	race: string;
	attribute: string | null;
	archetype: string | null;
	imageUrl: string;
	imageUrlSmall: string;
	imageUrlCropped: string;
};

type SavedCardInput = CardInput & {
	id: string;
	availableClassicDailyCard: boolean | null;
};

export class Card {
	private readonly name: string;
	private readonly type: string;
	private readonly frameType: string;
	private readonly description: string;
	private readonly atk: number | null;
	private readonly def: number | null;
	private readonly level: number | null;
	private readonly race: string;
	private readonly attribute: string | null;
	private readonly archetype: string | null;
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
}

export class SavedCard extends Card {
	private readonly id: string;
	private readonly availableClassicDailyCard: boolean | null;

	constructor(input: SavedCardInput) {
		const { id, availableClassicDailyCard, ...rest } = input;
		super(rest);
		this.id = id;
		this.availableClassicDailyCard = availableClassicDailyCard;
	}

	getDto() {
		return {
			...super.getDto(),
			id: this.id,
			availableClassicDailyCard: this.availableClassicDailyCard,
		};
	}
}
