import { useSearchParams } from "react-router-dom";
import { SingleQueryProps } from "../index";

const useSingleQuery = ():SingleQueryProps => {

  const [searchParams, SetSearchParams] = useSearchParams();

  const remove = (type = "") => {
    searchParams.delete(type);
    SetSearchParams(searchParams);
  }

  const set = (type = "", value: string | null | string[]) => {

    if ( value === "" || value === null ) {
      searchParams.delete(type);
    }
    else if (Array.isArray(value)) {
      if ( value.length === 0 ) {
        searchParams.delete(type);
      }
      else {
        searchParams.set(type, decodeURIComponent(value.join()).toString())
      }
    }
    else {
      searchParams.set(type, value);
    }
    
    SetSearchParams(searchParams);

  }

  const get = (type = "search", _default = "", _minLength = 0) => {

    let value = searchParams.get(type);

    if ( value === null || value === undefined || value === "" ) {
      return _default;
    }
    else if ( _minLength > 0 && value.length < _minLength ) {
      return _default;
    }
    else if (value.indexOf(",") > -1 || value.indexOf("%2C") > -1) {
      return value.split(",");
    }
    else {
      return searchParams.get(type);
    }

  }

  const isEmpty = () => {
    return Array.from(searchParams.values()).length === 0;
  }

  return {set, get, remove, isEmpty}

}

export default useSingleQuery;