export enum ActivityType {
	EVENT = 'EVENT',
	EXHIBITIONS = 'EXHIBITION',
	CSR_ACTIVITY = 'CSR_ACTIVITY',
	TESTIMONIAL = 'TESTIMONIAL',
}

export interface Date {
	start_date: string;
	end_date: string;
	dates: string[];
}

export interface Activity {
	title: string;
	sub_title: string;
	date: Date;
	files: string[];
	thumb: string;
	location: string;
	type: ActivityType;
	desc: string | undefined;
	address: string;
	redirection_link: string;
	share_link: string;
	related_to_project: string;
}

export interface ActivityQuery {
	page_no: number;
	limit: number;
	type: ActivityType;
}
