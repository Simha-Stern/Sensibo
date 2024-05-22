import './App.css'
import DeviceControl from './components/DeviceControl'
import DeviceList from './components/DeviceList'

function App() {

  return (
    <div className="App">
      <DeviceList />
      {/* For simplicity, let's hardcode a device ID for control */}
      {/* <DeviceControl deviceId="" /> */}
    </div>
  )
}

export default App
