/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/ticket.css";
import "../styles/common.css";

import "swiper/css";
import "swiper/css/navigation";
import { BtCate } from "./ui/buttons";

function Ticket() {
  const swiperRef = useRef();
  const [ticketHtml, setTicketHtml] = useState([]);
  const [active, setActiveCategory] = useState("ticket1");
  const [jsonCategory, setJsonCategory] = useState("ticket1");

  // 외부 데이터 연동 (axios 활용)
  const axiosJsonData = function (category) {
    axios
      .get(`json/${category}.json`)
      .then(function (res) {
        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["ticket_" + (i + 1)];
          arr[i] = obj;
        }
        setTicketHtml(arr);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  // 외부 데이터 연동하기 (fetch 이용)
  // const getJsonData = () => {
  //   fetch("ticket.json")
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
  //         const obj = result["ticket_" + (i + 1)];
  //         arr[i] = obj;
  //       }
  //       console.log(arr);
  //       setTicketHtml(arr);
  //     })
  //     .catch((error) => {
  //       // 에러가 발생했다.
  //       console.log("error : ", error);
  //     });
  // };

  useEffect(() => {
    axiosJsonData(jsonCategory);
    // getJsonData()
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [jsonCategory]);

  const CategoryClick = (category) => {
    setActiveCategory(category);
    setJsonCategory(category); // JSON 카테고리를 업데이트
  };

  return (
    <section className="ticket">
      <div className="ticket-inner">
        <div className="ticket-header">
          <h2 className="ticket-title">티켓 랭킹</h2>
          <span className="ticket-txt">오늘 뭐볼까? 지금 HOT한 공연</span>
        </div>

        <div className="ticket-main">
          <div className="ticket-category">
            <ul className="ticket-list">
              <li>
              <BtCate
                  focus={active === "ticket1"}
                  onClick={() => CategoryClick("ticket1")}
                >
                  뮤지컬
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket2"}
                  onClick={() => CategoryClick("ticket2")}
                >
                  콘서트
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket3"}
                  onClick={() => CategoryClick("ticket3")}
                >
                  스포츠
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket4"}
                  onClick={() => CategoryClick("ticket4")}
                >
                  전시/행사
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket5"}
                  onClick={() => CategoryClick("ticket5")}
                >
                  클래식/무용
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket6"}
                  onClick={() => CategoryClick("ticket6")}
                >
                  아동/가족
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket7"}
                  onClick={() => CategoryClick("ticket7")}
                >
                  연극
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "ticket8"}
                  onClick={() => CategoryClick("ticket8")}
                >
                  래저/캠핑
                </BtCate>
              </li>
            </ul>
          </div>

          <div className="ticket-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={28}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".ticket-slide-wrap .slide-next-bt",
                prevEl: ".ticket-slide-wrap .slide-prev-bt",
              }}
              className="ticket-slide"
            >
              {ticketHtml.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {index === ticketHtml.length - 1 ? (
                      <div className="ticket-slide-item-btnmore">
                        <a href={item.url} className="ticket-more-link">
                          <i></i>
                          <p>전체보기</p>
                        </a>
                      </div>
                    ) : (
                      <div className="ticket-slide-item">
                        <a href={item.url} className="ticket-link">
                          <div className="ticket-img">
                            <img src={item.image} alt={item.name} />
                            <span>{item.rank}</span>
                          </div>
                          <div className="ticket-info">
                            <ul className="ticket-good-list">
                              <li>
                                <span className="ticket-good-name">
                                  {item.name}
                                </span>
                              </li>
                              <li>
                                <span className="ticket-good-place">
                                  {item.place}
                                </span>
                              </li>
                              <li>
                                <span className="ticket-good-date">
                                  {item.date}
                                </span>
                              </li>
                            </ul>

                            <div className={item.class ? item.class : ""}>
                              <i>{item.badge ? item.badge : ""}</i>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
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

        <div className="ticket-footer">
          <a href="#">티켓 홈 바로가기</a>
        </div>
      </div>
    </section>
  );
}

export default Ticket;
