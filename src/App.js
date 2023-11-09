import Header from "./components/Header";
import Recommend from "./components/Recommend";
import Ticket from "./components/Ticket";
import Tour from "./components/Tour";
import Visual from "./components/Visual";

function App() {
  return (
    <div className="wrap">
      {/* 상단 영역 */}
      <Header />

      {/* 메인 영역 */}
      <div className="main">
        <Visual />
        <Recommend />
        <Tour />
        <Ticket />
      </div>

      {/* 하단 영역 */}
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
