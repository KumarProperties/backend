import { toPublicUrl } from '../utils/aws.util';

export let getPublicUrl = (filePath: string) => toPublicUrl(filePath);
