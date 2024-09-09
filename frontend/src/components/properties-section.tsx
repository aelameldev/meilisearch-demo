import {useSearchParams} from "react-router-dom";
import {useProperties} from "@/api";
import {DoorOpen, House, ShowerHead} from "lucide-react";
import {useCriteria} from "@/hooks";
import ReactPaginate from "react-paginate";

export const PropertiesSection = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const {criteria} = useCriteria();

  const {data: properties } = useProperties({
    criteria: {
      ...criteria,
      page: searchParams.get("page") ?? 0,
      size: 20
    }
  });

  const handlePageChange = ({selected}: {selected: number}) => {
    if (selected < 0 || selected >= (properties?.totalPages ?? 0)) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", selected.toString());
    setSearchParams(params)
  }

  return (
      <div className={"px-2"}>
        <h2 className={"text-zinc-700 text-sm font-medium mb-2"}>
          {properties?.executionTime ? `Found ${properties.totalElements} properties in ${properties.executionTime}ms` : "Loading..."}
        </h2>
        <div className={"grid grid-cols-2 gap-1"}>
          {
            properties?.data.map((property) => (
                <div key={property.id} className={"border rounded-md p-2"}>
                  <div className={"py-1 flex items-center gap-1 text-zinc-700"}>
                    <House className={"h-4 w-4"} />
                    <p className={"text-sm text-gray-500"}>{property.type}</p>
                  </div>
                  <h1 className={"text-lg font-medium truncate"}>{property.title}</h1>
                  <p className={"font-semibold text-lg text-blue-600"}>{property.price} {property.currency}</p>
                  <div className={"flex items-center justify-between"}>

                    <div className={"flex items-center gap-1"}>
                      <DoorOpen className={"h-4 w-4"} />
                      <p className={"text-sm text-gray-500"}>{property.rooms} rooms</p>
                    </div>
                    <div className={"flex items-center gap-1"}>
                      <ShowerHead className={"h-4 w-4"} />
                      <p className={"text-sm text-gray-500"}>{property.bathrooms} bathrooms</p>
                    </div>
                  </div>
                </div>
            ))
          }
        </div>

        <div className={"mt-2"}>
          <ReactPaginate
              className={"navigation flex items-center gap-2 justify-center"}
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={properties?.totalPages ?? 0}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
          />
        </div>
      </div>
  )
}