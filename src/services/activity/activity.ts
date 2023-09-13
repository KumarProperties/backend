import {
	Activity,
	ActivityQuery,
	ActivityType,
} from '../../models/activity/activity';
import { ActivityModel } from '../../schema/activity/activity_schema';

export async function insertActivity(activity: Activity) {
	activity.files = activity.files.filter((it) => it.trim());
	await new ActivityModel(activity).save();
}

export async function updateActivity(activity: Activity, id:string) {
	activity.files = activity.files.filter((it) => it.trim());
	await ActivityModel.findByIdAndUpdate(id, activity)
}

export async function getActivities(filter: ActivityQuery) {
	return await ActivityModel.find({
		type: filter.type,
	})
		.skip(filter.page_no * filter.limit)
		.limit(filter.limit);
}
export async function getActivitiesById(id: string) {
	return await ActivityModel.findById(id);
}

export async function deleteActivity(id: string) {
	return await ActivityModel.findByIdAndDelete(id);
}

export async function getAllActivities() {
	return ActivityModel.find({});
}
