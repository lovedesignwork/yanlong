import Image from "next/image";

/**
 * next/image wrapper for editorial content photography. Uses `fill`, so the
 * PARENT element must be positioned (relative/absolute) with a defined size or
 * aspect ratio. Keeps the shared `.editorial-img` filter + object-fit:cover.
 */
type Props = {
  src: string;
  alt: string;
  /** Responsive sizes hint — required for correct srcset selection. */
  sizes: string;
  /** Set true only for the LCP image (e.g. hero). */
  priority?: boolean;
  /** CSS object-position override (e.g. "center right"). */
  objectPosition?: string;
};

export function EditorialImage({
  src,
  alt,
  sizes,
  priority,
  objectPosition,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="editorial-img"
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
