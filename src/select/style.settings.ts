export const getImageSizeBySize = (size:string) => {

  if ( size === "xs" )   return {width: "16px", height: "16px"};
  if ( size === "sm" )   return {width: "16px", height: "16px"};
  if ( size === "md" )   return {width: "18px", height: "18px"};
  if ( size === "df" )   return {width: "20px", height: "20px"};
  if ( size === "lg" )   return {width: "20px", height: "20px"};
  if ( size === "xlg" )  return {width: "22px", height: "22px"};
  
  return {width: "20px", height: "20px"}
  
}

export const getOptionSizeBySize = (size:string) => {
  
  if ( size === "xs" )   return {padding: "0 15px 0 15px", height: "28px"};
  if ( size === "sm" )   return {padding: "0 15px 0 15px", height: "34px"};
  if ( size === "md" )   return {padding: "0 15px 0 15px", height: "38px"};
  if ( size === "df" )   return {padding: "0 15px 0 15px", height: "40px"};
  if ( size === "lg" )   return {padding: "0 15px 0 15px", height: "44px"};
  if ( size === "xlg" )  return {padding: "0 15px 0 15px", height: "46px"};
  
  return {padding: "0 15px 0 15px", height: "40px"}
  
}

export const getSelectSizeBySize = (size:string) => {
  
  if ( size === "xs" )   return {padding: "0 15px 0 15px", height: "28px"};
  if ( size === "sm" )   return {padding: "0 15px 0 15px", height: "34px"};
  if ( size === "md" )   return {padding: "0 15px 0 15px", height: "38px"};
  if ( size === "df" )   return {padding: "0 15px 0 15px", height: "40px"};
  if ( size === "lg" )   return {padding: "0 15px 0 15px", height: "44px"};
  if ( size === "xlg" )  return {padding: "0 15px 0 15px", height: "46px"};
  
  return {padding: "0 15px 0 15px", height: "40px"}
  
}

export const getFontSizeBySize = (size:string) => {
  
  if ( size === "xs" )   return {fontSize: "12px", lineHeight: "12px", fontWeight: "400"};
  if ( size === "sm" )   return {fontSize: "12px", lineHeight: "12px", fontWeight: "500"};
  if ( size === "md" )   return {fontSize: "13px", lineHeight: "13px", fontWeight: "500"};
  if ( size === "df" )   return {fontSize: "14px", lineHeight: "14px", fontWeight: "500"};
  if ( size === "lg" )   return {fontSize: "14px", lineHeight: "14px", fontWeight: "500"};
  if ( size === "xlg" )  return {fontSize: "15px", lineHeight: "15px", fontWeight: "500"};
  
  return {fontSize: "14px", lineHeight: "14px", fontWeight: "500"}
  
}