import Text from "./components/text";
import './app.css'
import Navbar from "./components/navbar";
import Image from "./components/image";
import ProjectBox from './components/projects'


function App() {
  return (
    <div className="App" style={{backgroundColor:"#adefb6"}}>
      <Navbar/>
      <Text/>
      <ProjectBox/>
      <Image/>
      
    </div>
  );
}

export default App;
