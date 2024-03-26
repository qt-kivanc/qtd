export default function DetermineNewWidth(
  originalHeight  : number,
  originalWidth   : number,
  newHeight       : number
) {
  return (originalWidth / originalHeight) * newHeight;
}