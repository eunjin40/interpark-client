import Books from "./components/Books";
import Events from "./components/Events";
import Header from "./components/Header";
import Live from "./components/Live";
import Recommend from "./components/Recommend";
import Ticket from "./components/Ticket";
import Tour from "./components/Tour";
import Visual from "./components/Visual";
import Footer from "./components/Footer"

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
        <Live />
        <Books />
        <Events />
      </div>

      {/* 하단 영역 */}
      <Footer />
    </div>
  );
}

export default App;
