import { Blog, BlogFetchRequest } from '../../models/blogs/Blogs';
import { BlogsModel } from '../../schema/blogs/blogs_schema';
import { assertsMongoDocId } from '../../validators/mongoose_validator';

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

export async function deletBlogs({
	id = undefined,
}: {
	id: string | undefined;
}) {
	assertsMongoDocId(id);
	return await BlogsModel.findByIdAndDelete(id);
}
