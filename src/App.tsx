import "./App.css";
import { OptionButton } from "./components";

function App() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <h1>To meet</h1>
        <div className="space-x-4">
          <OptionButton option="あう" onClick={() => console.log("yes")} />
          <OptionButton option="あお" onClick={() => console.log("no")} />
        </div>
      </div>
    </>
  );
}

export default App;
