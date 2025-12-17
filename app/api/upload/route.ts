import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: NextRequest) {
  try {
    // Проверка переменных окружения
    if (!process.env.CLOUDINARY_URL) {
      console.error('Cloudinary переменные окружения не настроены!');
      return NextResponse.json(
        { 
          error: 'Cloudinary не настроен. Добавьте CLOUDINARY_URL в .env файл' 
        },
        { status: 500 }
      );
    }

    // Настройка Cloudinary через URL (автоматически парсит все параметры)
    cloudinary.config(process.env.CLOUDINARY_URL);

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      );
    }

    console.log('Загрузка файла:', file.name, file.type, file.size);

    // Конвертируем файл в base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Загружаем в Cloudinary БЕЗ сжатия
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'kakb',
      resource_type: 'auto',
      // Без сжатия и трансформаций
    });

    console.log('Успешно загружено в Cloudinary:', result.secure_url);

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Ошибка загрузки изображения',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
