import { Blog, BlogFetchRequest } from '../models/blogs.model';
import { BlogsModel } from '../schema/blogs.schema';
import { assertsMongoDocId } from '../validators/mongoose.validator';

export async function insertBlog(blog: Blog) {
	if (blog._id) {
		return await BlogsModel.updateOne({ _id: blog._id }, blog);
	}
	await new BlogsModel(blog).save();
}

export async function getBlogsById({
	id = undefined,
}: {
	id: string | undefined;
}) {
	assertsMongoDocId(id);
	let filter: any = {};
	if (id) {
		filter._id = id;
	}
	return await BlogsModel.find(filter);
}

export async function getBlogs({ page_no, limit }: BlogFetchRequest) {
	return await BlogsModel.find({})
		.skip(page_no * limit)
		.limit(limit);
}

export async function deleteBlogs({
	id = undefined,
}: {
	id: string | undefined;
}) {
	assertsMongoDocId(id);
	return await BlogsModel.findByIdAndDelete(id);
}
