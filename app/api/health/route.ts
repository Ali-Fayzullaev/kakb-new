import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Временно отключаем проверку базы данных
    
    return NextResponse.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'disabled'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'disabled',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
