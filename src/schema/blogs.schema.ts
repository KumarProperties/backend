import mongoose, { Schema } from 'mongoose';

import { Blog, BlogsContent } from '../models/blogs.model';

let BlogsContentSchema = new Schema<BlogsContent>({
	image: { type: String, required: false },
	text: { type: String, required: false },
});
let BlogsSchema = new Schema<Blog>({
	title: { type: String, required: false },
	sub_title: { type: String, required: false },
	thumb: { type: String, required: false },
	date: { type: String, required: false },
	desc: { type: String, required: false },
	content: { type: [BlogsContentSchema], required: false },
});

export let BlogsModel = mongoose.model<Blog>('blogs', BlogsSchema);
