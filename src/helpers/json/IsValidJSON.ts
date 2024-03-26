export default function IsValidJSON(item:string | {}) {
    
  item =  typeof item !== "string"
          ? JSON.stringify(item)
          : item;

  try {
    item = JSON.parse(String(item));
  } 
  catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;

}