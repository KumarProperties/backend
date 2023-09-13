import { toPublicUrl } from '../../utils/aws_util';

export let getPublicUrl = (filePath: string) => toPublicUrl(filePath);
