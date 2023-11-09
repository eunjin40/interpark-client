/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import "../styles/tour.css";
import "../styles/common.css";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Tour() {
  const swiperRef = useRef();
  let [tourHtml, setTourHtml] = useState([]);

  // 외부 데이터 연동 (axios 활용)
  const axiosJsonData = () => {
    axios
      .get("tour.json")
      .then(function (res) {
        console.log(res.data);

        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const item = result["tour_" + (i + 1)];
          arr[i] = item;
        }
        console.log(arr);
        setTourHtml(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // html 준비되면, json을 불러들이겠다.
  useEffect(() => {
    axiosJsonData();
  }, []);

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
            <Swiper
              slidesPerView={3}
              spaceBetween={26}
              slidesPerGroup={3}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".tour-slide-wrap .slide-next-bt",
                prevEl: ".tour-slide-wrap .slide-prev-bt",
              }}
              className="tour-slide"
            >
              {tourHtml.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="tour-slide-item">
                      <a href={item.url} className="tour-link">
                        <div className="tour-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="tour-info">
                          <div className="tour-info-badge">{item.badge}</div>
                          <ul className="tour-good-list">
                            <li>
                              <span className="tour-good-info-benefit">
                                {item.benefit}
                              </span>
                            </li>
                            <li>
                              <span className="tour-good-info-name">
                                {item.name}
                              </span>
                            </li>
                            <li>
                              <span className="tour-good-info-price">
                                <b>{item.price}</b>
                                원~
                              </span>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

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
