import cloudinary from 'cloudinary';
import {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET
} from '$env/static/private';

cloudinary.v2.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

export interface CloudinaryUploadResponse {
	success: boolean;
	result: {
		url: string;
		format: string;
		bytes: number;
		etag: string;
		secure_url: string;
		resource_type: string;
		created_at: string;
		tags: unknown[];
		width: number;
		height: number;
		public_id: string;
		version: number;
		type: string;
		signature: string;
	};
}

export async function uploadImage(
	image: File | undefined,
	path: string
): Promise<CloudinaryUploadResponse> {
	if (!image) {
		// handle case where image is undefined
		return Promise.reject(new Error('Image not provided'));
	}
	const arrayBuffer = await image.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader
			.upload_stream({ resource_type: 'image', folder: `blog/${path}` }, onDone)
			.end(buffer);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function onDone(error: any, result: any) {
			if (error) {
				return reject({ success: false, error });
			}
			return resolve({ success: true, result });
		}
	});
}

export async function destroy(path: string) {
	cloudinary.v2.uploader.destroy(path, function (error, result) {
		console.log(result, error);
	});
}
