// import {tns} from "./tiny-slider";

(function (win, doc) {
  // Side Menu
  let $sideMenu = doc.querySelector(".side-menu");
  if ($sideMenu) {
    doc.querySelector(".btn-hamburger").addEventListener("click", function () {
      doc.querySelector(".side-menu").classList.add("active");
    });
    doc
      .querySelector(".side-menu .btn-close")
      .addEventListener("click", function () {
        doc.querySelector(".side-menu").classList.remove("active");
      });
  }

  // 카테고리
  // 1차 카테고리
  let $category = doc.querySelector(".category-holder");
  if ($category) {
    doc
      .querySelector(".category .depth-1 .btn-select")
      .addEventListener("click", function (event) {
        $category
          .querySelector(".depth-1 .btn-select")
          .classList.toggle("active");
      });

    // 추가 상단 카테고리 2024.09.26. 01:00
    let categoryHeight = $category.offsetHeight;
    let headerHeight = doc.querySelector("header").offsetHeight;
    let marginTop = headerHeight + categoryHeight + 20;
    $category.nextElementSibling.style.marginTop = marginTop + "px";

    let $depth1 = doc.querySelector(".category .depth-1");
    let $depth2 = doc.querySelector(".category .depth-2");
    let depth1Height = $depth1.offsetHeight;
    let depth2Height = $depth2.offsetHeight;
    let heightSum = depth1Height + depth2Height;

    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDifference = currentScroll - lastScrollTop;

      // 스크롤 위치에 비례하여 메뉴 숨기기
      if (currentScroll > 0 && currentScroll <= heightSum) {
        $category.style.transform = `translateY(-${currentScroll}px)`;
      }

      // 위로 스크롤하면 다시 나타남
      if (currentScroll < lastScrollTop && currentScroll <= heightSum) {
        $category.style.transform = `translateY(-${currentScroll}px)`;
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 스크롤 값을 업데이트
    });
  }

  // 추가 하단 네비게이션 2024.09.26. 01:00
  let $footerNav = doc.querySelector(".bottom-nav");
  if ($footerNav) {
    let lastScrollTop = 0; // 마지막 스크롤 위치 저장
    const navHeight = $footerNav.offsetHeight; // 네비게이션 바의 높이

    // 스크롤 이벤트 핸들러
    window.addEventListener("scroll", function () {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDifference = currentScroll - lastScrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // 1. 스크롤 아래로 할 때 네비게이션 바 숨기기
      if (scrollDifference > 0 && currentScroll > 0) {
        let remainingScroll = maxScroll - currentScroll;
        if (currentScroll < maxScroll - navHeight) {
          // 스크롤한 만큼 네비게이션 바를 숨김
          let newTransformValue = Math.min(
            navHeight,
            $footerNav.style.transform.replace(/[^\d.]/g, "") * 1 +
              scrollDifference
          );
          $footerNav.style.transform = `translateY(${Math.min(
            newTransformValue,
            navHeight
          )}px)`;
        } else if (remainingScroll < navHeight) {
          // 페이지 하단에서 네비게이션 바가 점점 나타남
          let newTransformValue = Math.min(remainingScroll, navHeight);
          $footerNav.style.transform = `translateY(${
            remainingScroll - scrollDifference
          }px)`;
        }
      }

      // 2. 스크롤 위로 할 때 네비게이션 바 보이기
      if (scrollDifference < 0) {
        let newTransformValue = Math.max(
          0,
          $footerNav.style.transform.replace(/[^\d.]/g, "") * 1 +
            scrollDifference
        );
        $footerNav.style.transform = `translateY(${Math.max(
          newTransformValue,
          0
        )}px)`;
      }

      // 마지막 스크롤 위치 업데이트
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  }

  // 스마트 신분증
  let $certificate = doc.getElementById("popup-certificate");
  if ($certificate) {
    doc
      .querySelector(".nav-item.certificate")
      .addEventListener("click", function (event) {
        $certificate.style.display = "flex";

        setTimeout(() => {
          $certificate.classList.toggle("active");
        }, 10);
      });
    doc
      .querySelector("#popup-certificate .close-btn")
      .addEventListener("click", function (event) {
        $certificate.classList.remove("active");
        setTimeout(() => {
          $certificate.style.display = "none";
        }, 400);
      });
  }

  // 마을방송
  let $broadcast = doc.getElementById("popup-broadcast");
  if ($broadcast) {
    doc
      .querySelector(".nav-item.broadcast")
      .addEventListener("click", function (event) {
        $broadcast.style.display = "flex";
        setTimeout(() => {
          $broadcast.classList.toggle("active");
        }, 10);
      });
    doc
      .querySelector("#popup-broadcast .close-btn")
      .addEventListener("click", function (event) {
        $broadcast.classList.remove("active");
        setTimeout(() => {
          $broadcast.style.display = "none";
        }, 400);
      });
  }

  // Popup 열기
  doc.querySelectorAll(".open-popup").forEach(function (item) {
    item.addEventListener("click", function () {
      let target = item.getAttribute("data-target");
      let targetElement = doc.querySelector(target);
      targetElement.classList.add("active");
    });
  });
  doc.querySelectorAll(".close-popup").forEach(function (item) {
    item.addEventListener("click", function () {
      // 상위 요소 찾기
      // 상위 요소의 클래스 이름이 popup-style 에 active 가 있으면 제거
      let parent = item.parentElement;
      while (parent) {
        if (parent.classList.contains("popup-style")) {
          parent.classList.remove("active");
          break;
        }
        parent = parent.parentElement;
      }
    });
  });

  // 추가 2024.09.19. 20:48
  // 변경 2024.09.26. 00:00
  if (doc.querySelector("#popup-certificate .slider")) {
    var slider = tns({
      container: "#popup-certificate .slider",
      edgePadding: 30,
      // "fixedWidth": 400,
      items: 1,
      swipeAngle: false,
      speed: 400,
      loop: false,
      gutter: 16,
      controls: false,
      center: true,
    });
    var tabs = document.querySelectorAll("#popup-certificate .tab-header a");
    if (tabs) {
      tabs.forEach(function (item, index) {
        item.addEventListener("click", function (event) {
          event.preventDefault();
          slider.goTo(index);
        });
      });
      var illuminateSelectedIndex = function (info, eventName) {
        tabs.forEach(function (item) {
          item.classList.remove("active");
        });

        tabs[info.displayIndex - 1].classList.add("active");
      };
      slider.events.on("indexChanged", illuminateSelectedIndex);
    }
  }

    //일반유저 홈
    if (doc.querySelector(".tabwrap")) {
        const tabs = document.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-cont');
        function activateTab(index) {
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                    tabContents[i].classList.add('active');
                } else {
                    tab.classList.remove('active');
                    tabContents[i].classList.remove('active');
                }
            });
        }
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function (event) {
                event.preventDefault();
                activateTab(index);
            });
        });
        activateTab(0);
    }
   
    //일반유저 홈 tab 추가
    if (doc.querySelector(".tabwrap")) {
        const tabs = document.querySelectorAll('.tab-link');
        const tabContents = document.querySelectorAll('.tab-cont');
        function activateTab(index) {
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                    tabContents[i].classList.add('active');
                } else {
                    tab.classList.remove('active');
                    tabContents[i].classList.remove('active');
                }
            });
        }
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function (event) {
                event.preventDefault();
                activateTab(index);
            });
        });
        activateTab(0);
    }

    //일반유저 홈 배너 slide 추가
    if (doc.querySelector(".banner-swiper")) {
        const swiperSlides = document.querySelectorAll('.banner-swiper .swiper-slide');
        if (swiperSlides.length > 1) {
            var swiper = new Swiper(".banner-swiper", {
                slidesPerView: "auto",
                spaceBetween: 8,
                slidesOffsetBefore:20
            });
        } else {
            document.querySelector(".banner-swiper").classList.add("nonslide"); 
        }
    }
    //일반유저 홈 맞츰정보 slide 추가
    if (doc.querySelector(".info-swiper")) {
        var swiper = new Swiper(".info-swiper", {
            slidesPerView: "auto",
            spaceBetween: 20,
            slidesOffsetBefore:20,
            slidesOffsetAfter:20
        });
    }
    //스마트 회원증 추가
    if (doc.querySelector(".smart-swiper")) {
        menu_arr = ['진도 철마 도서관<br> (도서대출용)','진도군 실내 수영장<br>(입장 전용)','스마트 회원증<br>(공공앱 전용)']
        var swiper = new Swiper(".smart-swiper", {
            spaceBetween:5,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoHeight: true,
            pagination: {
                el: ".smart-swiper .swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                return '<span class="' + className + '">' + menu_arr[index] + "</span>";                
                },
            },
        });
    }

    //일반유저 홈
    if (doc.querySelector(".home-swiper")) {
        menu_arr = ['홈','사업정보','공연행사','취업정보','교육신청']
        var swiper = new Swiper(".home-swiper", {
            spaceBetween:20,
            //centeredSlides: true,
            slidesPerView: 1,
            autoHeight: true,
            pagination: {
                el: ".home-swiper .swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                return '<span class="' + className + '"><span class="text">' + menu_arr[index] + "</span></span>";                
                },
            },
            on: {
                slideChange: function () {
                    $(window).scrollTop(0);
                },
            }
        });
     }
   
})(window, document, tns);
