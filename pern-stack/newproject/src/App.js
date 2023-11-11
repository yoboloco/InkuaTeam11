import Text from "./components/text";
import './app.css'
import Navbar from "./components/navbar";
import Image from "./components/image";


function App() {
  return (
    <div className="App" style={{backgroundColor:"blue"}}>
      <Navbar/>
      <Text/>
      <h1>newproject</h1>
      <Image/>
      <div className="sample-css">HelloAPPcss</div>
    </div>
  );
}

export default App;
