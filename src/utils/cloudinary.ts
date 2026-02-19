import type { UploadApiResponse } from 'cloudinary';
import type { CloudinaryAsset } from '../types/cloudinary.types';

export function mapUploadResultToAsset(result: UploadApiResponse): CloudinaryAsset {
  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    resourceType: result.resource_type,
    createdAt: result.created_at,
  };
}

export function buildProfileImagePublicId(userId: string): string {
  return `users/${userId}/profile`;
}

export function buildGigImagePublicId(gigId: string, index: number): string {
  return `gigs/${gigId}/${index}`;
}
