import { getPublicIdFromUrl } from '@/app/utils/cloudInary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const img = formData.get('file');
    if (!img) {
      return NextResponse.json({ success: false, message: 'no image found' });
    }

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const uploadedImageData = await uploadResponse.json();
    return NextResponse.json({
      uploadedImageData,
      message: 'Success',
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error', status: 500 });
  }
}

// export async function DELETE(request: Request) {
//   const { imageUrl } = await request.json();

//   const publicId = getPublicIdFromUrl(imageUrl);
//   if (!publicId) {
//     return NextResponse.json({ success: false, message: 'Invalid image URL' });
//   }

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           public_id: publicId,
//           invalidate: true, // 캐시 무효화
//           api_key: process.env.CLOUDINARY_API_KEY,
//           api_secret: process.env.CLOUDINARY_API_SECRET,
//         }),
//       },
//     );

//     const result = await response.json();
//     if (result.result === 'ok') {
//       return NextResponse.json({ success: true, message: 'Image deleted successfully' });
//     } else {
//       return NextResponse.json({ success: false, message: 'Failed to delete image', result });
//     }
//   } catch (error) {
//     return NextResponse.json({ success: false, message: 'Error deleting image', error });
//   }
// }
