import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryUploadResult = UploadApiResponse;
export type CloudinaryUploadError = UploadApiErrorResponse;

export interface CloudinaryAsset {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  resourceType: 'image' | 'video' | 'raw' | 'auto';
  createdAt: string;
}

export interface CloudinaryClient {
  uploadImage: (filePath: string, options?: Record<string, unknown>) => Promise<CloudinaryAsset>;
}
