import { STOCK_LOOKUP } from '../constants/stockPhotos';

export function resolvePhotoSource(photo) {
  if (!photo) return null;
  if (photo.kind === 'stock') {
    const rec = STOCK_LOOKUP[photo.id];
    return rec ? rec.src : null;
  }
  if (photo.kind === 'uri') {
    return photo.uri ? { uri: photo.uri } : null;
  }
  return null;
}
