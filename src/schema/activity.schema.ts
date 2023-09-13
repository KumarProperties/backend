import mongoose, { Schema } from 'mongoose';

import { Activity, ActivityType, Date } from '../models/activity.model';

let StartEndDateSchema = new Schema<Date>({
	start_date: {
		type: String,
	},
	end_date: {
		type: String,
	},
	dates: {
		type: [String],
	},
});

let ActivitySchema = new Schema<Activity>({
	title: {
		type: String,
		required: false,
	},
	sub_title: {
		type: String,
		required: false,
	},
	date: {
		type: StartEndDateSchema,
		required: false,
	},
	files: {
		type: [String],
		required: false,
	},
	thumb: {
		type: String,
		required: false,
	},
	location: {
		type: String,
		required: false,
	},
	type: {
		enum: Object.values(ActivityType),
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: false,
	},
	redirection_link: {
		type: String,
		required: false,
	},
	share_link: {
		type: String,
		required: false,
	},
	related_to_project: {
		type: String,
		required: false,
	},
});

export let ActivityModel = mongoose.model<Activity>(
	'activities',
	ActivitySchema
);
