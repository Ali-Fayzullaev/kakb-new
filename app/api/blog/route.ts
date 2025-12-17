import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// GET - Получить все опубликованные статьи блога
export async function GET(request: NextRequest) {
  try {
    // Временно возвращаем пустой массив
    const blogs: any[] = [];

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
    // Временно возвращаем заглушку
    return NextResponse.json(
      { message: 'Blog creation temporarily disabled' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
