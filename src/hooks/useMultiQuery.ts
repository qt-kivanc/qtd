import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const useMultiQuery = () => {

  const [searchParams, SetSearchParams] = useSearchParams();
  const navigate                        = useNavigate();

  const set = (queries = [{type: '', value: ''}]) => {

    queries.forEach(q => {

      if ( q.value === "" || q.value === undefined || q.value === null ) {
        searchParams.delete(q.type);
      }
      else if (Array.isArray(q.value)) {
        if ( q.value.length === 0 ) {
          searchParams.delete(q.type);
        }
        else {
          searchParams.set(q.type, decodeURIComponent(q.value.join()).toString())
        }
      }
      else {
        searchParams.set(q.type, q.value);
      }

    });
    
    SetSearchParams(searchParams);
    navigate({
      search: createSearchParams(searchParams).toString(),
    }, {replace: true});

  }

  return {set}

}

export default useMultiQuery;