import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    cloudinary_configured: {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your-cloud-name',
      api_key: !!process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'your-api-key',
      api_secret: !!process.env.CLOUDINARY_API_SECRET && process.env.CLOUDINARY_API_SECRET !== 'your-api-secret',
    },
    values: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.substring(0, 5) + '...',
      api_key: process.env.CLOUDINARY_API_KEY?.substring(0, 5) + '...',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET',
    }
  });
}
