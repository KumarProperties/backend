import { ActivityModel } from "../../schema/activity/activity_schema";
import { ApartmentModel } from "../../schema/apartments/apartments";
import { BlogsModel } from "../../schema/blogs/blogs_schema";
import { JobApplicationModel } from "../../schema/job_applications/JobApplications";
import { getAllUploadedFilesInAws, deleteFileFromS3, getFilenameWithExtension } from "../../utils/aws_util";

export async function indalviateAllUntractedFilesFromDB(del:boolean): Promise<any> {
    let allApartments = await ApartmentModel.find({})
    let allActivities = await ActivityModel.find({})
    let allBlogs = await BlogsModel.find({})
    let allJobApplication = await JobApplicationModel.find({})
    // removeAllUntrackedFiles([allApartments, allActivities, allBlogs, allJobApplication])

    return removeAllUntrackedFiles([allActivities, allBlogs, allJobApplication, allApartments], true)
}

async function removeAllUntrackedFiles(obj: any[], del: boolean) {

    let allValidUrls: string[] = []

    for (let i = 0; i < obj.length; i++) {
        let validUrls = extractUrls(obj[i])
        allValidUrls = [...allValidUrls, ...validUrls]
    }

    let awsUrls = await getAllUploadedFilesInAws()
    let variation = 0
    let matchCount = 0
    let filesToDelete: string[] = []

    for (let i = 0; i < awsUrls.length; i++) {

        const awsUrl = awsUrls[i];

        let foundMatch = false;

        for (let j = 0; j < allValidUrls.length; j++) {

            const dbUrl = allValidUrls[j];
            const awsFileName = getFilenameWithExtension(awsUrl.trim())
            const dbFileName = getFilenameWithExtension(dbUrl.trim())
            if (awsFileName === dbFileName) {
                foundMatch = true;
                matchCount++;
                break;
            }
        }

        if (!foundMatch) {
            filesToDelete.push(awsUrl)
            variation++;
        }

    }

    if (filesToDelete.length && del)
        await deleteFileFromS3(filesToDelete)


    return {
        allValidUrls: new Set(allValidUrls).size,
        awsUrls: awsUrls?.length,
        toDelete: awsUrls.length - allValidUrls.length,
        counts: {
            deleted: variation,
            matchCount,
            total: variation + matchCount,
        }
    }
}

function extractUrls(obj: any): string[] {
    let dest = process.env.FILE_DEST;
    let dataString = JSON.stringify(obj);
    console.log("process.env.FILE_DEST", dest)
    const regexPattern = new RegExp(`(https://${dest}.*?)(?="|')`, 'g');
    return dataString.match(regexPattern) || [];
}

// function extractUrls(obj: any): string[] {

//     let dest = process.env.FILE_DEST

//     let dataString = JSON.stringify(obj);

//     return dataString.match(/(https:\/\/kpassets.kumarworld.com\/assets\/common.*?)(?="|')/g) || []
//     // return dataString.match(/(https:\/\/assets-common.kumarworld.v-verse.space.*?)(?="|')/g) || []
// }