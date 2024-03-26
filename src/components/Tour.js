/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import "../styles/tour.css";
import "../styles/common.css";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BtCate } from "./ui/buttons";

function Tour() {
  const swiperRef = useRef();
  const [tourHtml, setTourHtml] = useState([]);
  const [active, setActiveCategory] = useState("tour1");
  const [jsonCategory, setJsonCategory] = useState("tour1");

  const numberWithCommas = (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 외부 데이터 연동 (axios 활용)
  const axiosJsonData = function (category) {
    axios
      .get(`json/${category}.json`)
      .then(function (res) {
        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["tour_" + (i + 1)];
          arr[i] = obj;
        }
        setTourHtml(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 외부 데이터 연동하기 (fetch 이용)
  // const getJsonData = () => {
  //   fetch("tour.json")
  //     .then((response) => {
  //       console.log("response : ", response);
  //       // 자료가 불러들여졌을 때
  //       return response.json();
  //     })
  //     .then((result) => {
  //       console.log("result : ", result);
  //       // 자료를 원하는데로 처리하겠다.
  //       // result를 화면에 출력하겠다.
  //       // 자료가 바뀌면 화면을 변경하는 기능을 생성하겠다.
  //       let arr = [];
  //       for (let i = 0; i < result.total; i++) {
  //         const obj = result["tour_" + (i + 1)];
  //         arr[i] = obj;
  //       }
  //       console.log(arr);
  //       setTourHtml(arr);
  //     })
  //     .catch((error) => {
  //       // 에러가 발생했다.
  //       console.log("error : ", error);
  //     });
  // };

  // html 준비되면, json을 불러들이겠다.
  
  useEffect(() => {
    axiosJsonData(jsonCategory);
    // getJsonData();
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [jsonCategory]);

  const CategoryClick = (category) => {
    setActiveCategory(category);
    setJsonCategory(category);
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
                <BtCate
                  focus={active === "tour1"}
                  onClick={() => CategoryClick("tour1")}
                >
                  망설이면 품절
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "tour2"}
                  onClick={() => CategoryClick("tour2")}
                >
                  패키지
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "tour3"}
                  onClick={() => CategoryClick("tour3")}
                >
                  국내숙소
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "tour4"}
                  onClick={() => CategoryClick("tour4")}
                >
                  해외숙소
                </BtCate>
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
                                <b>{numberWithCommas(item.price)}</b>
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
