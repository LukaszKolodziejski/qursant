export type ImageCategory =
  | 'boss'
  | 'instructors'
  | 'office'
  | 'cars'
  | 'course'
  | 'all';

export interface GalleryImage {
  src: string;
  alt: string;
  category: ImageCategory;
  width: number;
  height: number;
  orientation: 'horizontal' | 'vertical';
  description?: string;
}
