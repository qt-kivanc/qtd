export default function DetermineNewHeight(originalHeight, originalWidth, newWidth) {
  return (originalHeight / originalWidth) * newWidth;
}