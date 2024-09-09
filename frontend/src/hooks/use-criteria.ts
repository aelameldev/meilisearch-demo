import {useSearchParams} from "react-router-dom";

export const useCriteria = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const criteria = {
    "geoBounds[]": searchParams.getAll("geoBounds"),
    type: searchParams.get("type"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    minArea: searchParams.get("minArea"),
    maxArea: searchParams.get("maxArea"),
  };

  const remove = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    return params;
  }

  const setParams = (params: URLSearchParams) => {
    setSearchParams(params);
  }
  return {
    criteria,
    remove,
    setParams
  }
}