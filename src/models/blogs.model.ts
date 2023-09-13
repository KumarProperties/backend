export interface BlogsContent {
	image: string | undefined;
	text: string | undefined;
}
export interface Blog {
	title: string;
	sub_title: string;
	desc: string;
	thumb: string;
	date: string;
	content: BlogsContent[];
	_id: string | undefined;
}

export interface BlogFetchRequest {
	page_no: number;
	limit: number;
}
