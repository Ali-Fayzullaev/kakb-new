"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверка размера (макс 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Размер файла не должен превышать 10MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Загрузка файла:', file.name, file.type, file.size);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Ответ сервера:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Ошибка загрузки' }));
        console.error('Ошибка сервера:', errorData);
        throw new Error(errorData.error || 'Ошибка загрузки');
      }

      const data = await response.json();
      console.log('Успешно загружено:', data.url);
      onChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      alert(`Ошибка при загрузке изображения: ${errorMessage}\n\nПроверьте настройки Cloudinary в .env файле`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative max-w-xs">
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-contain"
              unoptimized // Не сжимать изображение Next.js
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute right-1 top-1"
            onClick={handleRemove}
            disabled={disabled || uploading}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
          <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            Перетащите изображение или нажмите для выбора
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF до 10MB (без сжатия)
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
        id="image-upload"
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploading}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Загрузка...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            {value ? 'Изменить изображение' : 'Загрузить изображение'}
          </>
        )}
      </Button>
    </div>
  );
}
