import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import {z} from "zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Eraser, SearchIcon} from "lucide-react";
import {useSearchParams} from "react-router-dom";


const PROPERTY_TYPES = ['House', 'Apartment', 'Condo', 'Residential', 'Cottage', 'Villa']

const filterSchema = z.object({
  type: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
})

type FilterForm = z.infer<typeof filterSchema>


export const Filters = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FilterForm>({
    mode:"onChange",
    defaultValues: {
      type: searchParams.get("type") ?? "",
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      minArea: searchParams.get("minArea") ? Number(searchParams.get("maxPrice")) : undefined,
      maxArea: searchParams.get("maxArea") ? Number(searchParams.get("maxArea")) : undefined,
    }
  });

  const handleSubmit = (data: FilterForm) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(data).forEach(key => {
      if (data[key as keyof FilterForm] && key in data) {
        params.set(key, data[key as keyof FilterForm]?.toString() ?? "");
      } else {
        params.delete(key)
      }
    });
    setSearchParams(params)
  }

  const handleReset = () => {
    form.reset({
      type: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: ""
    }, {
      keepDefaultValues: false,
      keepValues: false
    })
  }
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={"flex items-end gap-2"}>
          <FormField
            control={form.control}
            name={"type"}
            render={({field}) => (
              <FormItem className={"space-y-0"}>
                <FormLabel>Property type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={value=> {
                    field.onChange(value)
                  }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null} >Select an option</SelectItem>
                      {
                        PROPERTY_TYPES.map(type => (
                            <SelectItem key={type} value={type} >{type}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
         />

          <FormField
              control={form.control}
              name={"minPrice"}
              render={({field}) => (
                  <FormItem className={"space-y-0"}>
                    <FormLabel>Min price</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={e=> field.onChange(Number(e.target.value))} type={"number"} step={"0.1"} placeholder={"1 000 000"} />
                    </FormControl>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name={"maxPrice"}
              render={({field}) => (
                  <FormItem className={"space-y-0"}>
                    <FormLabel>Max price</FormLabel>
                    <FormControl>
                      <Input {...field} onChange={e=> field.onChange(Number(e.target.value))} type={"number"} step={"0.1"} placeholder={"10 000 000"} />
                    </FormControl>
                  </FormItem>
              )}
          />


          <FormField
              control={form.control}
              name={"minArea"}
              render={({field}) => (
                  <FormItem className={"space-y-0"}>
                    <FormLabel>Min area</FormLabel>
                    <FormControl>
                      <Input {...field} type={"number"} placeholder={"80"} />
                    </FormControl>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name={"maxArea"}
              render={({field}) => (
                  <FormItem className={"space-y-0"}>
                    <FormLabel>Max area</FormLabel>
                    <FormControl>
                      <Input {...field} type={"number"} placeholder={"250"} />
                    </FormControl>
                  </FormItem>
              )}
          />

          <Button size={"sm"} type={"button"} variant={"outline"} className={"flex gap-1"} onClick={handleReset}>
            <Eraser className={"h-4 w-4"}  />
            Reset
          </Button>
          <Button size={"sm"} className={"flex gap-1"}>
            <SearchIcon className={"h-4 w-4"} />
            Search
          </Button>
        </form>
      </Form>
  )
}