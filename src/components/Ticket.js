/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/ticket.css";
import "../styles/common.css";

import "swiper/css";
import "swiper/css/navigation";

function Ticket() {
  const swiperRef = useRef();
  let [ticketHtml, setTicketHtml] = useState([]);
  // 외부 데이터 연동 (axios 활용)
  const axiosJsonData = () => {
    axios
      .get("ticket.json")
      .then(function (res) {
        console.log(res.data);

        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const item = result["ticket_" + (i + 1)];
          arr[i] = item;
        }
        console.log(arr);
        setTicketHtml(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    axiosJsonData();
  }, []);
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
                <button className="ticket-cate-bt ticket-cate-bt-active">
                  뮤지컬
                </button>
              </li>
              <li>
                <button className="ticket-cate-bt">콘서트</button>
              </li>
              <li>
                <button className="ticket-cate-bt">스포츠</button>
              </li>
              <li>
                <button className="ticket-cate-bt">전시/행사</button>
              </li>
              <li>
                <button className="ticket-cate-bt">클래식/무용</button>
              </li>
              <li>
                <button className="ticket-cate-bt">아동/가족</button>
              </li>
              <li>
                <button className="ticket-cate-bt">연극</button>
              </li>
              <li>
                <button className="ticket-cate-bt">레저/캠핑</button>
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
                    {ticketHtml.length - 1 === index ? (
                      <a href={item.url}>바로가기</a>
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

            <div className="swiper ticket-slide">
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

        <div className="ticket-footer">
          <a href="#">티켓 홈 바로가기</a>
        </div>
      </div>
    </section>
  );
}

export default Ticket;
