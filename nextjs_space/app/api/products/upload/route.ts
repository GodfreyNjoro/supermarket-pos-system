import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { generatePresignedUploadUrl, getFileUrl } from '@/lib/s3';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cloud_storage_path = searchParams.get('cloud_storage_path');
    const isPublic = searchParams.get('isPublic') === 'true';

    if (!cloud_storage_path) {
      return NextResponse.json({ error: 'Missing cloud_storage_path' }, { status: 400 });
    }

    const url = await getFileUrl(cloud_storage_path, isPublic);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error getting file URL:', error);
    return NextResponse.json({ error: 'Failed to get file URL' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { fileName, contentType, isPublic } = body;

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'Missing fileName or contentType' },
        { status: 400 }
      );
    }

    const { uploadUrl, cloud_storage_path } = await generatePresignedUploadUrl(
      fileName,
      contentType,
      isPublic ?? true
    );

    return NextResponse.json({ uploadUrl, cloud_storage_path });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
