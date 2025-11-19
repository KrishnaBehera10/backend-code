import FaceDetector from "./components/Face_Detection";
import SongList from "./components/SongList";

function App() {
  return (
    <div className="w-1/2 h-screen m-auto border border-gray-300 p-5">
      <FaceDetector />
      <SongList />
    </div>
  );
}

export default App;
