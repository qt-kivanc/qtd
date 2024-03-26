  /**
   * Returns an array with arrays of the given size.
   *
   * @param array {Array} array to split
   * @param chunk_size {Integer} Size of every group
   */
  export default function ChunkArray(array: [], chunk_size: number) {

    let index   = 0;
    let result  = [];
    
    for (index = 0; index < array.length; index += chunk_size) {
      
      const chunk:[] | never[] = array.slice(index, index+chunk_size);
      // Do something if you want with the group

      if ( typeof chunk !== "object" ) {
        result.push(chunk);
      }

    }

    return result;
  }