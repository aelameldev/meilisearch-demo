import './App.css'
import {MapSection} from "./components/map-section.tsx";
import {PropertiesSection} from "./components/properties-section.tsx";
import {Filters} from "./components/filters.tsx";

function App() {

  return (
    <>
      <main className={"h-full"}>
        <div className={"p-4"}>
          <Filters />
        </div>
        <div className={"flex h-[90vh]"}>
          <div className={"h-full flex-1 border"}>
            <MapSection />
          </div>
          <div className={"flex-1 h-full overflow-y-auto"}>
            <PropertiesSection />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
