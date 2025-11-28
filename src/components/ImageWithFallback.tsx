import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  fallbackText?: string;
};

export function ImageWithFallback({ src, alt, className, fallbackText = "No image" }: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  if (showImage) {
    return (
      <img
        src={src as string}
        alt={alt || ""}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={cn("w-full h-full flex items-center justify-center text-gray-500 text-sm", className)}>
      {fallbackText}
    </div>
  );
}
