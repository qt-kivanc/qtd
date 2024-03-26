export default function DetermineNewHeight(
  originalHeight  : number, 
  originalWidth   : number, 
  newWidth        : number
) {
  return (originalHeight / originalWidth) * newWidth;
}