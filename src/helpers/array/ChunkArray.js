  /**
   * Returns an array with arrays of the given size.
   *
   * @param array {Array} array to split
   * @param chunk_size {Integer} Size of every group
   */
  export default function ChunkArray(array, chunk_size) {
    var index = 0;
    var result = [];
    var chunk = [];
    
    for (index = 0; index < array.length; index += chunk_size) {
      chunk = array.slice(index, index+chunk_size);
      // Do something if you want with the group
      result.push(chunk);
    }

    return result;
  }