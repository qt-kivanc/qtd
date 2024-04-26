import { FileTypes, FileExtensions } from "../../index";

export default function GetTypeByFileType(type:FileTypes) {
  if ( type === FileTypes.SVG ) return FileExtensions.SVG;
  if ( type === FileTypes.JPG ) return FileExtensions.JPG;
  if ( type === FileTypes.PNG ) return FileExtensions.PNG;
  if ( type === FileTypes.GIF ) return FileExtensions.GIF;
  if ( type === FileTypes.OTF ) return FileExtensions.OTF;
  if ( type === FileTypes.PDF ) return FileExtensions.PDF;
  return "";
}