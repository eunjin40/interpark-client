/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "../styles/books.css";
import "../styles/common.css";

import "swiper/css";
import "swiper/css/navigation";
import { BtCate } from "./ui/buttons";

function Books() {
  const swiperRef = useRef();
  const [booksHtml, setBooksHtml] = useState([]);
  const [active, setActiveCategory] = useState("books1");
  const [jsonCategory, setJsonCategory] = useState("books1");

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
          const obj = result["books_" + (i + 1)];
          arr[i] = obj;
        }
        setBooksHtml(arr);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  // 외부 데이터 연동하기 (fetch 이용)
  // const getJsonData = () => {
  //   fetch("books.json")
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
  //         const obj = result["books_" + (i + 1)];
  //         arr[i] = obj;
  //       }
  //       console.log(arr);
  //       setBooksHtml(arr);
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
    setJsonCategory(category);
  };

  return (
    <section className="books">
      <div className="books-inner">
        <div className="books-header">
          <h2 className="books-title">오늘의 도서</h2>
          <span className="books-txt">
            지금 읽기 딱 좋은 책, 놓치지 마세요!
          </span>
        </div>

        <div className="books-main">
          <div className="books-category">
            <ul className="books-list">
              <li>
                <BtCate
                  focus={active === "books1"}
                  onClick={() => CategoryClick("books1")}
                >
                  MD`s Pick
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "books2"}
                  onClick={() => CategoryClick("books2")}
                >
                  베스트셀러
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "books3"}
                  onClick={() => CategoryClick("books3")}
                >
                  신간추천
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "books4"}
                  onClick={() => CategoryClick("books4")}
                >
                  특가할인
                </BtCate>
              </li>
            </ul>
          </div>

          <div className="books-slide-wrap">
            <Swiper
              slidesPerView={5}
              spaceBetween={28}
              slidesPerGroup={5}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".books-slide-wrap .slide-next-bt",
                prevEl: ".books-slide-wrap .slide-prev-bt",
              }}
              className="books-slide"
            >
              {booksHtml.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="books-slide-item">
                      <a href={item.url} className="books-link">
                        <div className="books-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="books-info">
                          <ul className="books-good-list">
                            <li>
                              <span className="books-good-info-name">
                                {item.name}
                              </span>
                            </li>
                            <li>
                              {item.price && (
                                <span className="books-good-info-price">
                                  {item.percent && (
                                    <b
                                      style={{
                                        color: "#ef3e43",
                                        marginRight: "5px",
                                      }}
                                    >
                                      {item.percent}%
                                    </b>
                                  )}
                                  <b>{numberWithCommas(item.price)}</b>원
                                </span>
                              )}
                              {item.subTxt && (<p className="books-good-info-subTxt">{item.subTxt}</p>)}
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

        <div className="books-footer">
          <a href="#">도서 홈 바로가기</a>
        </div>
      </div>
    </section>
  );
}

export default Books;
