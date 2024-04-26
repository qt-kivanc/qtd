export default function CheckFileURL(url:string) {
  
  if (!url) return false;

  const isValidURL = url.split("?")[0].match(/(^data:image\/(jpeg|jpg|gif|png|svg|pdf|otf)(;base64,)(?:=*))|(\.(jpeg|jpg|gif|png|svg|pdf|otf)$)/);

  if (!isValidURL) return false;

  return new Promise<boolean>((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (img.height === 0 || img.width === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });

}
