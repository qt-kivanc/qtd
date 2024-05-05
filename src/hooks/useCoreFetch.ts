import { useRef } from 'react';
import axios, { AxiosProgressEvent, Cancel } from 'axios';

/**
 * 
 * useCoreFetch
 * --
 * 
 * All API routes within the application pass through this class. It filters all 
 * responses returned from the API and processes them to their expected state.
 * Then, it returns the success or failure status.
 * 
 * Additionally, it retrieves and adds additional information such as language,
 * token, currency, etc., from the user's cookie to API calls.
 * 
 * @param changeLogout      The function used to log out the user when called from places where 
 *                          context data such as React.Portal cannot be accessed needs to be passed.
 * @param isUserLoggedOut   User's logout information.
 * 
 * @returns 
 * 
 */
const useCoreFetch = () => {

  const axiosSource: any    = useRef(null);

  /**
   * Used to check if error returned in response is a cancel token error.
   * 
   * When a component unmounts, we need to cancel any potentially
   * ongoing Axios calls that result in a state update on success / fail.
   * This function sets up the appropriate useEffect to handle the cancelling.
   * 
   */
  const cancel = () => {
    if (axiosSource.current) {
      axiosSource.current.cancel("manually canceled!");
    }
  }

  /**
   * Used to generate the cancel token sent in the Axios request.
   */
  const createNewToken = () => {

    axiosSource.current = axios.CancelToken.source();
    return axiosSource.current.token;

  };

  type FetchProps = {
    action          : string,
    requestMethod?  : string,
    addOrigin?      : boolean,
    params?         : {},
    queries?        : {},
    headers?        : {},
    cancelable?     : boolean, 
    onFetched?      : (result:any) => void, 
    onError?        : (err:string, code:number) => void 
    onCanceled?     : (message:Cancel) => void,
    onProgress?     : (event:AxiosProgressEvent) => void
  }
  
  const fetch = async ({
    action          = "",
    requestMethod   = "",
    addOrigin       = true,
    params          = {}, 
    queries         = {},
    headers         = {},
    cancelable      = true, 
    onFetched,
    onError,
    onCanceled,
    onProgress,
  }:FetchProps) => {

    let _queries = "";
    let _headers = {};

    Object.keys(queries).forEach((property) => {
      _queries += "&" + property + "=" + queries[property];
    });

    _headers["Content-Type"] =  requestMethod === "put"
                                  ? "multipart/form-data"
                                  : "application/json"

    if ( addOrigin ) {
      _headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
    }

    _headers = {
      ..._headers,
      ...headers
    }

    let fetchType:any = axios.post;
    
    if      ( requestMethod.toLocaleLowerCase() === "post" )  fetchType = axios.post;
    else if ( requestMethod.toLocaleLowerCase() === "get" )   fetchType = axios.get;
    else if ( requestMethod.toLocaleLowerCase() === "put" )   fetchType = axios.put;
    else if ( requestMethod.toLocaleLowerCase() === "patch" ) fetchType = axios.patch;

    await fetchType(
        action + _queries, 
        params, 
        {
          headers           : headers,
          cancelToken       : cancelable ? createNewToken() : false,
          onUploadProgress  : (progressEvent:AxiosProgressEvent) => {
            onProgress && onProgress(progressEvent);
          },
        },
      )
      .then((response:any) => {
  
        onFetched && onFetched(response);

      })
      .catch((error:any) => {

        console.log("error", error);
        console.log("error.message", error.message);

        if (axios.isCancel(error.message)) {
          onCanceled && onCanceled(error.message);
        }
        else {
          onError && onError(error.message, 0);
        }

      });

  }

  return { fetch, cancel };

};

export default useCoreFetch;