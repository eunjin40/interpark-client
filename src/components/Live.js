// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/live.css";
import "../styles/common.css";

import "swiper/css";
import "swiper/css/navigation";

/* eslint-disable jsx-a11y/anchor-is-valid */
function Live() {
  const swiperRef = useRef();
  let [liveHtml, setLiveHtml] = useState([]);
  // 외부 데이터 연동 (axios 활용)
  // const axiosJsonData = () => {
  //   axios
  //     .get("https://port-0-interpark-server-1igmo82clopizh37.sel5.cloudtype.app/live")
  //     .then(function (res) {
  //       console.log(res.data);

  //       const result = res.data;
  //       let arr = [];
  //       for (let i = 0; i < result.total; i++) {
  //         const item = result["live_" + (i + 1)];
  //         arr[i] = item;
  //       }
  //       console.log(arr);
  //       setLiveHtml(arr);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

    // 외부 데이터 연동하기 (fetch 이용)
    const getJsonData = () => {
      fetch("json/live.json")
        .then((response) => {
          console.log("response : ", response);
          // 자료가 불러들여졌을 때
          return response.json();
        })
        .then((result) => {
          console.log("result : ", result);
          // 자료를 원하는데로 처리하겠다.
          // result를 화면에 출력하겠다.
          // 자료가 바뀌면 화면을 변경하는 기능을 생성하겠다.
          let arr = [];
          for (let i = 0; i < result.total; i++) {
            const obj = result["live_" + (i + 1)];
            arr[i] = obj;
          }
          console.log(arr);
          setLiveHtml(arr);
        })
        .catch((error) => {
          // 에러가 발생했다.
          console.log("error : ", error);
        });
    };

  useEffect(() => {
    // axiosJsonData();
    getJsonData()
  }, []);
  return (
    <section className="live">
      <div className="live-inner">
        <div className="live-header">
          <h2>
            <img src="images/title_interpark_live.svg" alt="" />
          </h2>
        </div>

        <div className="live-main">
          <div className="live-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={28}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".live-slide-wrap .slide-next-bt",
                prevEl: ".live-slide-wrap .slide-prev-bt",
              }}
              className="live-slide"
            >
              {liveHtml.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="live-slide-item">
                      <div className="live-tv">
                        <a href={item.live_info.url}>
                          <div className="live-tv-img">
                            <img src={item.live_info.image} alt="" />
                          </div>
                          <div className="live-info">
                            <i>{item.live_info.state}</i>
                            <div className="live-tv-name">
                              {item.live_info.title}
                            </div>
                          </div>
                          <div className="live-day">
                            <span>{item.live_day.date}</span>
                            <b>{item.live_day.time}</b>
                          </div>
                        </a>
                        {item.live_good.good_image === "" ? (
                          ""
                        ) : (
                          <div className="live-good">
                            <a
                              href={item.live_good.good_url}
                              className="live-good-inner"
                            >
                              <div className="live-good-img">
                                <img src={item.live_good.good_image} alt="" />
                              </div>
                              <ul className="live-good-info">
                                <li>
                                  <p className="live-good-name">
                                    {item.live_good.good_title}
                                  </p>
                                </li>
                                <li>
                                  <span className="live-good-price">
                                    <b>
                                      {item.live_good.good_discount === 0
                                        ? ""
                                        : item.live_good.good_discount + "%"}
                                    </b>
                                    <em>
                                      {item.live_good.good_price === 0
                                        ? ""
                                        : item.live_good.good_price}
                                    </em>
                                    {item.live_good.good_price === 0
                                      ? ""
                                      : "원"}
                                  </span>
                                </li>
                              </ul>
                            </a>
                          </div>
                        )}
                        else
                        {}
                      </div>
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

        <div className="live-footer">
          <a href="#">인터파크 라이브 바로가기</a>
        </div>
      </div>
    </section>
  );
}

export default Live;
