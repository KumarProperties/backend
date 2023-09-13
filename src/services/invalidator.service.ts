import { ActivityModel } from '../schema/activity.schema';
import { ApartmentModel } from '../schema/apartment.schema';
import { BlogsModel } from '../schema/blogs.schema';
import { JobApplicationModel } from '../schema/job_application.schema';
import {
	getAllUploadedFilesInAws,
	deleteFileFromS3,
	getFilenameWithExtension,
} from '../utils/aws.util';

export async function invalidateAllUntrackedFilesFromDB(
	del: boolean
): Promise<any> {
	let allApartments = await ApartmentModel.find({});
	let allActivities = await ActivityModel.find({});
	let allBlogs = await BlogsModel.find({});
	let allJobApplication = await JobApplicationModel.find({});

	return removeAllUntrackedFiles(
		[allActivities, allBlogs, allJobApplication, allApartments],
		true
	);
}

async function removeAllUntrackedFiles(obj: any[], del: boolean) {
	let allValidUrls: string[] = [];

	for (const element of obj) {
		let validUrls = extractUrls(element);
		allValidUrls = [...allValidUrls, ...validUrls];
	}

	let awsUrls = await getAllUploadedFilesInAws();
	let variation = 0;
	let matchCount = 0;
	let filesToDelete: string[] = [];

	for (const awsUrl of awsUrls) {
		let foundMatch = false;

		for (const dbUrl of allValidUrls) {
			const awsFileName = getFilenameWithExtension(awsUrl.trim());
			const dbFileName = getFilenameWithExtension(dbUrl.trim());
			if (awsFileName === dbFileName) {
				foundMatch = true;
				matchCount++;
				break;
			}
		}

		if (!foundMatch) {
			filesToDelete.push(awsUrl);
			variation++;
		}
	}

	if (filesToDelete.length && del) await deleteFileFromS3(filesToDelete);

	return {
		allValidUrls: new Set(allValidUrls).size,
		awsUrls: awsUrls?.length,
		toDelete: awsUrls.length - allValidUrls.length,
		counts: {
			deleted: variation,
			matchCount,
			total: variation + matchCount,
		},
	};
}

function extractUrls(obj: any): string[] {
	let dest = process.env.FILE_DEST;
	let dataString = JSON.stringify(obj);

	// console.log('process.env.FILE_DEST', dest);

	const regexPattern = new RegExp(`(https://${dest}.*?)(?="|')`, 'g');

	return dataString.match(regexPattern) ?? [];
}
