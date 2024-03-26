// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/events.css";
import "../styles/common.css";

import "swiper/css";
import "swiper/css/navigation";

function Events() {
  const swiperRef = useRef();
  let [eventsHtml, setEventsHtml] = useState([]);
  // 외부 데이터 연동 (axios 활용)
  // const axiosJsonData = () => {
  //   axios
  //     .get("https://port-0-interpark-server-1igmo82clopizh37.sel5.cloudtype.app/events")
  //     .then(function (res) {
  //       console.log(res.data);

  //       const result = res.data;
  //       let arr = [];
  //       for (let i = 0; i < result.total; i++) {
  //         const item = result["events_" + (i + 1)];
  //         arr[i] = item;
  //       }
  //       console.log(arr);
  //       setEventsHtml(arr);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

    // 외부 데이터 연동하기 (fetch 이용)
    const getJsonData = () => {
      fetch("json/events.json")
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
            const obj = result["events_" + (i + 1)];
            arr[i] = obj;
          }
          console.log(arr);
          setEventsHtml(arr);
        })
        .catch((error) => {
          // 에러가 발생했다.
          console.log("error : ", error);
        });
    };

  useEffect(() => {
    // axiosJsonData();
    getJsonData();
  }, []);
  return (
    <section className="events">
      <div className="events-inner">
        <div className="events-header">
          <h2 className="events-title">이벤트</h2>
          <span className="events-txt">
            인터파크에서 할인혜택을 꼭 챙기세요.
          </span>
        </div>

        <div className="events-main">
          <div className="events-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={28}
              slidesPerGroup={4}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation]}
              Loop
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              navigation={{
                nextEl: ".events-slide-wrap .slide-next-bt",
                prevEl: ".events-slide-wrap .slide-prev-bt",
              }}
              className="events-slide"
            >
              {eventsHtml.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="events-slide-item">
                      <a href={item.url}>
                        <img src={item.file} alt={item.url} />
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
      </div>
    </section>
  );
}

export default Events;
