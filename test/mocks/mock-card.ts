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
		atk: 0,
		def: 0,
		level: 0,
		available: true,
	});
};
