/* eslint-disable jsx-a11y/anchor-is-valid */
import { BtCate } from "./ui/buttons";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/recommend.css";
import "../styles/common.css";
import { useEffect, useRef, useState } from "react";
// axios 모듈(js.파일) 가져오기
import axios from "axios";
import { InnerArea, SectionTag } from "./layout/layout";

function Recommend() {
  // js 코드 자리
  const swiperRef = useRef();
  const [htmlTag, setHtmlTag] = useState([]);
  const [active, setActiveCategory] = useState("recommend1");
  const [jsonCategory, setJsonCategory] = useState("recommend1");

  const numberWithCommas = (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 외부 데이터 연동하기 (axois 이용)
  const axiosJsonData = function (category) {
    axios
      .get(`json/${category}.json`)
      .then(function (res) {
        const result = res.data;
        let arr = [];
        for (let i = 0; i < result.total; i++) {
          const obj = result["good_" + (i + 1)];
          arr[i] = obj;
        }
        setHtmlTag(arr);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  useEffect(() => {
    axiosJsonData(jsonCategory); // JSON 데이터를 가져오는 함수

    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // 첫 번째 슬라이드로 이동
    }
  }, [jsonCategory]);

  const CategoryClick = (category) => {
    setActiveCategory(category);
    setJsonCategory(category); // JSON 카테고리를 업데이트
  };

  return (
    <SectionTag pt={0} pb={90}>
      <InnerArea>
        <div className="recommend-header">
          <h2 className="recommend-title">쇼핑추천</h2>
          <span className="recommend-txt">
            할인이 쎄다! 지금, 특가 상품을 확인하세요.
          </span>
        </div>

        <div className="recommend-main">
          <div className="recommend-category">
            <ul className="recommend-list">
              <li>
                <BtCate
                  focus={active === "recommend1"}
                  onClick={() => CategoryClick("recommend1")}
                >
                  쎈딜
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "recommend2"}
                  onClick={() => CategoryClick("recommend2")}
                >
                  베스트
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "recommend3"}
                  onClick={() => CategoryClick("recommend3")}
                >
                  슈퍼쎈데이S
                </BtCate>
              </li>
              <li>
                <BtCate
                  focus={active === "recommend4"}
                  onClick={() => CategoryClick("recommend4")}
                >
                  LG전자
                </BtCate>
              </li>
              <li>
                <a href="#" className="recommend-cate-bt">
                  소담상회
                </a>
              </li>
            </ul>
          </div>

          <div className="recommend-slide-wrap">
            <Swiper
              slidesPerView={4}
              spaceBetween={27}
              slidesPerGroup={4}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              navigation={{
                nextEl: ".recommend-slide-wrap .slide-next-bt",
                prevEl: ".recommend-slide-wrap .slide-prev-bt",
              }}
              className="recommend-slide"
            >
              {htmlTag.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {item.image === "" ? (
                      <div className="recommend-slide-item-btnmore">
                        <a href={item.url} className="recommend-link">
                          <i></i>
                          <p>전체보기</p>
                        </a>
                    </div>
                    ) : (
                      <div className="recommend-slide-item">
                        <a href={item.url} className="recommend-link">
                          <div className="recommend-img">
                            <img src={item.image} alt={item.desc} />
                          </div>
                          <div className="recommend-info">
                            <ul className="recommend-good-list">
                              <li>
                                <span className="recommend-good-info-price">
                                  <b>
                                    {item.discount === 0
                                      ? ""
                                      : item.discount + "%"}
                                  </b>
                                  <em>{numberWithCommas(item.price)}</em>원
                                </span>
                              </li>
                              <li>
                                <p className="recommend-good-info-desc">
                                  {item.desc}
                                </p>
                              </li>
                            </ul>
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

        <div className="recommend-footer"></div>
      </InnerArea>
    </SectionTag>
  );
}
export default Recommend;
