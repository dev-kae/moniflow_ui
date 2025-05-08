import "./App.css";
import CollapsibleMenu from "./compoments/CollapsibleMenu";
import TopMenu from "./compoments/TopMenu";

function App() {
  return (
    <div className="flex">
      <div className="bg-neutral-900 border-b border-b-neutral-600 w-full flex items-center justify-between">
        <CollapsibleMenu />
        <TopMenu/>
      </div>
    </div>
  );
}

export default App;
