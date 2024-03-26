/**
 * 
 * @param text 
 * @param entryType 
 * @returns 
 */
export default function FileChecker(text = "config", entryType="resource") {

  let alreadyLoaded = performance.getEntries()
    .filter(e => e.entryType === entryType)
    .filter(
      e => e.name.indexOf(text) > -1
    )[0] !== undefined;

  if (!alreadyLoaded) {
    console.log("script was not loaded");
  }
  else {
    console.log("script already loaded");
  }

  return alreadyLoaded;
  
}