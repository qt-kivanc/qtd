export default function Wait(milliseconds:number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}