import { SavedCard } from "../../src/domain/entities/card";

export const mockSavedCard = (): SavedCard => {
	return new SavedCard({
		id: "any_id",
		name: "any_name",
		race: "any_race",
		type: "any_type",
		archetype: "any_archetype",
		attribute: "any_attribute",
		description: "any_description",
		frameType: "any_frame_type",
		imageUrl: "any_image_url",
		imageUrlSmall: "any_image_url_small",
		imageUrlCropped: "any_image_url_cropped",
		atk: 10,
		def: 10,
		level: 10,
		available: true,
	});
};

export const mockSavedCardWithPropsNull = (): SavedCard => {
	return new SavedCard({
		id: "any_id",
		name: "any_name",
		race: "any_race",
		type: "any_type",
		archetype: null,
		attribute: null,
		description: "any_description",
		frameType: "any_frame_type",
		imageUrl: "any_image_url",
		imageUrlSmall: "any_image_url_small",
		imageUrlCropped: "any_image_url_cropped",
		atk: null,
		def: null,
		level: null,
		available: true,
	});
};
