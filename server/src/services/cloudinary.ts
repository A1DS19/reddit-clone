import cloudinary from 'cloudinary';
import { ReadStream } from 'fs';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload_post_file = async (
  createReadStream: () => ReadStream,
  filename: string,
  userID: string,
  postId: string
): Promise<boolean | string> => {
  try {
    const end = new Promise(
      (
        resolve: (data: string) => void,
        reject: (err: cloudinary.UploadApiErrorResponse) => void
      ) => {
        const upload_stream = cloudinary.v2.uploader.upload_stream(
          {
            folder: `reddit-clone-user-${userID}/posts/post${postId}`,
          },
          (err, data) => {
            if (err) {
              console.error(err);
              reject(err);
            }

            if (data) {
              resolve(data.url);
            }
          }
        );

        createReadStream().pipe(upload_stream);
      }
    );

    const imgUrl: string = await end;
    return imgUrl;
  } catch (error) {
    console.error(error);
    return false;
  }
};
