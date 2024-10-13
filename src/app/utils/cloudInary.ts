export const getPublicIdFromUrl = (url: string) => {
  const regex = /\/v\d+\/(.*?)(\.\w+)?$/; // 버전과 public ID를 추출하는 정규 표현식
  const match = url.match(regex);
  return match ? match[1] : null; // public ID 리턴
};

export const deleteImageFromCloudinary = async (imageUrl: string) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  if (!publicId) {
    throw new Error('Invalid image URL');
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        invalidate: true,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      }),
    },
  );

  const result = await response.json();
  if (result.result !== 'ok') {
    throw new Error('Failed to delete image from Cloudinary');
  }
};
