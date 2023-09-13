import { Schema } from 'mongoose';

export interface FlatView {
	walk_through: string;
	flat_view_360: string;
	live_view: string;
}

export const FlatViewSchema = new Schema<FlatView & Document>({
	walk_through: {
		type: String,
		required: false,
	},
	flat_view_360: {
		type: String,
		required: false,
	},
	live_view: {
		type: String,
		required: false,
	},
});
