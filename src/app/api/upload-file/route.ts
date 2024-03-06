import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(request: NextRequest) {
  const { file } = await request.json()

  if (file) {
    const fileUrl = (
      await cloudinary.uploader.upload(file, { folder: 'afiscab' })
    ).secure_url
    return NextResponse.json(fileUrl, { status: 201 })
  }
}
