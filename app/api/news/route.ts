import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// GET - Получить все опубликованные новости
export async function GET(request: NextRequest) {
  try {
    // Временно возвращаем пустой массив вместо запроса к базе данных
    const news: any[] = [];

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
    // Временно возвращаем заглушку
    return NextResponse.json(
      { message: 'News creation temporarily disabled' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
