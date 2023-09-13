import AmazonS3URI from 'amazon-s3-uri';

import {
	S3Client,
	ListObjectsV2Command,
	DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

export let awsRootFolder = process.env.ASSETS_LOC;

export const myS3Client = new S3Client({
	region: process.env.REGION,
	credentials: {
		secretAccessKey: process.env.SECRET_KEY!,
		accessKeyId: process.env.ACCESS_KEY!,
	},
});
export function toPublicUrl(key: string) {
	const newKey = AmazonS3URI(key).key!.replace(process.env.ASSETS_LOC!, '');
	return process.env.ASSETS_URL + newKey;
}

export async function getAllUploadedFilesInAws() {
	const prefix = 'assets/common/uploads/files/';
	const maxKeys = 1000; // The maximum number of objects to retrieve per request

	let files: string[] = [];
	let continuationToken: string | undefined = undefined;

	do {
		const command = new ListObjectsV2Command({
			Bucket: process.env.BUCKET!,
			Prefix: prefix,
			MaxKeys: maxKeys,
			ContinuationToken: continuationToken,
		}) as any;

		const response = (await myS3Client.send(command)) as any;

		if (response.Contents) {
			files.push(...response.Contents.map((object: any) => object.Key!));
		}

		continuationToken = response.NextContinuationToken;
	} while (continuationToken);

	// console.log('Total files retrieved:', files.length);
	return files;
}

export async function deleteFileFromS3(files: string[]) {
	let key = filterNullValues(files.map(getFilenameWithExtension));
	let objects = key.map((it) => ({ Key: 'assets/common/uploads/files/' + it }));

	let command = new DeleteObjectsCommand({
		Bucket: process.env.BUCKET,
		Delete: { Objects: objects.slice(0, 999) },
	});

	await myS3Client.send(command);
}

function filterNullValues(arr: (string | null)[]): string[] {
	return arr.filter((item) => item !== null) as string[];
}

export function getFilenameWithExtension(pathOrURL: string): string | null {
	const pathComponents = pathOrURL.split('/');
	const filenameWithExtension = pathComponents[pathComponents.length - 1];
	if (filenameWithExtension) {
		return filenameWithExtension;
	} else {
		return null;
	}
}
