import Text from "./components/text";
import './app.css'
import Navbar from "./components/navbar";
import Image from "./components/image";
import ProjectBox from './components/projects'


function App() {
  return (
    <div className="App" style={{backgroundColor:"blue"}}>
      <Navbar/>
      <Text/>
      <ProjectBox/>
      <Image/>
      <div className="sample-css">HelloAPPcss</div>
    </div>
  );
}

export default App;
