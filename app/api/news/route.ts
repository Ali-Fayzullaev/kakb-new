import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Получить все опубликованные новости
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');

    const where = published === 'false' ? {} : { published: true };

    const news = await prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST - Создать новость (только для админа)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, titleKz, content, contentKz, excerpt, excerptKz, image, published } = body;

    const news = await prisma.news.create({
      data: {
        title,
        titleKz,
        content,
        contentKz,
        excerpt,
        excerptKz,
        image,
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
