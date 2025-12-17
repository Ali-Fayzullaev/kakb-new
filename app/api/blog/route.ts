import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Получить все опубликованные статьи блога
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    const category = searchParams.get('category');

    const where: any = published === 'false' ? {} : { published: true };
    if (category) {
      where.category = category;
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Создать статью (только для админа)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, titleKz, content, contentKz, excerpt, excerptKz, image, author, category, published } = body;

    const blog = await prisma.blog.create({
      data: {
        title,
        titleKz,
        content,
        contentKz,
        excerpt,
        excerptKz,
        image,
        author,
        category,
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
