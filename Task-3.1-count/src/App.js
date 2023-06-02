import "./App.css";
import { ClassCounter } from "./component/count/classCount/ClassCounter";
import { FunctionCounter } from "./component/count/functionalCount/FunctionCounter";
import { HollyDay } from "./component/count/hollyday";

function App() {
  return (
    <div className="App">
      <HollyDay/>
      <ClassCounter />
      <FunctionCounter />
    </div>
  );
}
export default App;
