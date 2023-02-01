export default function DetermineNewWidth(originalHeight, originalWidth, newHeight) {
  return (originalWidth / originalHeight) * newHeight;
}