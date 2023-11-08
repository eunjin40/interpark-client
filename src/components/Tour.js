import axios from "axios";
import "../styles/tour.css";
function Tour() {
  const swiperRef = useRef();

  // 외부 데이터 연동 (axio 활용)
  const axiosGetData = () => {
    axios
      .get("tour.json")
      .then(function (res) {
        console.log(res.data);
      })
      .catch();
  };
  return (
    <section className="tour">
      <div className="tour-inner">
        <div className="tour-header">
          <h2 className="tour-title">투어 특가</h2>
          <span className="tour-txt">해외여행은 인터파크다</span>
        </div>

        <div className="tour-main">
          <div className="tour-category">
            <ul className="tour-list">
              <li>
                <button className="tour-cate-bt tour-cate-bt-active">
                  망설이면 품절
                </button>
              </li>
              <li>
                <button className="tour-cate-bt">패키지</button>
              </li>
              <li>
                <button className="tour-cate-bt">국내숙소</button>
              </li>
              <li>
                <button className="tour-cate-bt">해외숙소</button>
              </li>
            </ul>
          </div>
          <div className="tour-slide-wrap">
            <div className="swiper tour-slide">
              <div className="swiper-wrapper"></div>
            </div>
            <button className="slide-prev-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
            <button className="slide-next-bt">
              <img src="images/slider_arrow.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="tour-footer">
          <a href="#">투어 홈 바로가기</a>
        </div>
      </div>
    </section>
  );
}
export default Tour;
