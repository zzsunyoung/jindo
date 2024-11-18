// import {tns} from "./tiny-slider";

(function (win, doc) {
  // Side Menu
  let $sideMenu = doc.querySelector(".side-menu");
  if ($sideMenu) {
    doc.querySelector(".btn-hamburger").addEventListener("click", function () {
      doc.querySelector(".side-menu").classList.add("active");
    });
    doc.querySelector(".side-menu .btn-close").addEventListener("click", function () {
      doc.querySelector(".side-menu").classList.remove("active");
    });
  }

  // 카테고리
  // 1차 카테고리
  let $category = doc.querySelector(".category-holder");
  if ($category) {
    doc.querySelector(".category .depth-1 .btn-select").addEventListener("click", function (event) {
      $category.querySelector(".depth-1 .btn-select").classList.toggle("active");
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
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
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
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDifference = currentScroll - lastScrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // 1. 스크롤 아래로 할 때 네비게이션 바 숨기기
      if (scrollDifference > 0 && currentScroll > 0) {
        let remainingScroll = maxScroll - currentScroll;
        if (currentScroll < maxScroll - navHeight) {
          // 스크롤한 만큼 네비게이션 바를 숨김
          let newTransformValue = Math.min(navHeight, $footerNav.style.transform.replace(/[^\d.]/g, "") * 1 + scrollDifference);
          $footerNav.style.transform = `translateY(${Math.min(newTransformValue, navHeight)}px)`;
        } else if (remainingScroll < navHeight) {
          // 페이지 하단에서 네비게이션 바가 점점 나타남
          let newTransformValue = Math.min(remainingScroll, navHeight);
          $footerNav.style.transform = `translateY(${remainingScroll - scrollDifference}px)`;
        }
      }

      // 2. 스크롤 위로 할 때 네비게이션 바 보이기
      if (scrollDifference < 0) {
        let newTransformValue = Math.max(0, $footerNav.style.transform.replace(/[^\d.]/g, "") * 1 + scrollDifference);
        $footerNav.style.transform = `translateY(${Math.max(newTransformValue, 0)}px)`;
      }

      // 마지막 스크롤 위치 업데이트
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  }

  // 스마트 신분증
  let $certificate = doc.getElementById("popup-certificate");
  if ($certificate) {
    doc.querySelector(".nav-item.certificate").addEventListener("click", function (event) {
      $certificate.style.display = "flex";

      setTimeout(() => {
        $certificate.classList.toggle("active");
      }, 10);
    });
    doc.querySelector("#popup-certificate .close-btn").addEventListener("click", function (event) {
      $certificate.classList.remove("active");
      setTimeout(() => {
        $certificate.style.display = "none";
      }, 400);
    });
  }

  // 마을방송
  let $broadcast = doc.getElementById("popup-broadcast");
  if ($broadcast) {
    doc.querySelector(".nav-item.broadcast").addEventListener("click", function (event) {
      $broadcast.style.display = "flex";
      setTimeout(() => {
        $broadcast.classList.toggle("active");
      }, 10);
    });
    doc.querySelector("#popup-broadcast .close-btn").addEventListener("click", function (event) {
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

  //일반유저 홈 tab 추가
  if (doc.querySelector(".tabwrap")) {
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-cont");
    function activateTab(index) {
      tabs.forEach((tab, i) => {
        if (i === index) {
          tab.classList.add("active");
          tabContents[i].classList.add("active");
        } else {
          tab.classList.remove("active");
          tabContents[i].classList.remove("active");
        }
      });
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", function (event) {
        event.preventDefault();
        activateTab(index);
      });
    });
    activateTab(0);
  }

  //일반유저 홈 배너 slide 추가
  if (doc.querySelector(".banner-swiper")) {
    const swiperSlides = document.querySelectorAll(".banner-swiper .swiper-slide");
    if (swiperSlides.length > 1) {
      var swiper = new Swiper(".banner-swiper", {
        slidesPerView: "auto",
        spaceBetween: 8,
        slidesOffsetBefore: 20,
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
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
    });
  }
  //스마트 회원증 추가
  if (doc.querySelector(".smart-swiper")) {
    menu_arr = ["진도 철마 도서관<br> (도서대출용)", "진도군 실내 수영장<br>(입장 전용)", "스마트 회원증<br>(공공앱 전용)"];
    var swiper = new Swiper(".smart-swiper", {
      spaceBetween: 5,
      centeredSlides: true,
      slidesPerView: "auto",
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

  //일반유저 홈 20241111 수정
  if (doc.querySelector(".home-swiper")) {
    menu_arr = ["홈", "사업정보", "공연행사", "취업정보", "교육신청"];
    var swiper = new Swiper(".home-swiper", {
      loop: true,
      spaceBetween: 20,
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
        transitionEnd: function () {
          $(window).scrollTop(0);
        },
      },
    });
  }
  //추가 2024-11-18
  const swiperSlides = document.querySelectorAll(".snbSwiper .swiper-slide");
  const swiperSlideLinks = document.querySelectorAll(".snbSwiper .swiper-slide a");

  swiperSlideLinks.forEach((item) => {
    item.addEventListener("click", function (e) {
      swiperSlides.forEach((slide) => slide.classList.remove("on"));
      e.target.parentElement.classList.add("on");
      muCenter(e.target.parentElement);
    });
  });

  function muCenter(target) {
    // 슬라이드 컨테이너와 뷰박스 선택
    var snbwrap = document.querySelector(".snbSwiper .swiper-wrapper");
    var box = document.querySelector(".snbSwiper");
    var boxHarf = box.offsetWidth / 2;

    // 모든 슬라이드 및 너비 계산
    var slides = Array.from(snbwrap.querySelectorAll(".swiper-slide"));
    var listWidth = Math.ceil(slides.reduce((total, slide) => total + slide.offsetWidth, 0));

    // 대상 위치 계산
    var targetRect = target.getBoundingClientRect();
    var boxRect = box.getBoundingClientRect();
    var targetPos = targetRect.left - boxRect.left;
    var selectTargetPos = targetPos + target.offsetWidth / 2;
    var pos;

    // 마지막 슬라이드 확인
    var isLastSlide = target === slides[slides.length - 1];

    // 조건에 따라 이동 위치 설정
    if (listWidth <= box.offsetWidth) {
      // 슬라이드가 컨테이너보다 작을 경우 이동 없음
      pos = 0;
    } else if (isLastSlide) {
      // 마지막 슬라이드 위치로 이동
      pos = listWidth - box.offsetWidth;
    } else if (selectTargetPos <= boxHarf) {
      // 왼쪽 경계
      pos = 0;
    } else if (listWidth - selectTargetPos) {
      // 오른쪽 경계
      pos = listWidth - box.offsetWidth;
    } else {
      // 중앙 정렬
      pos = selectTargetPos - boxHarf;
    }

    // 이동 및 애니메이션 적용
    snbwrap.style.transform = `translate3d(${-pos}px, 0, 0)`;
    snbwrap.style.transitionDuration = "500ms";
  }

  //조직도
  if (doc.querySelector(".accor-box")) {
    document.querySelectorAll(".accor-box > .accor-tit").forEach((tit) => {
      tit.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const accorBox = this.closest(".accor-box");
        document.querySelectorAll(".accor-box.on").forEach((openBox) => {
          if (openBox !== accorBox) {
            openBox.classList.remove("on");
          }
        });
        accorBox.classList.toggle("on");
      });
    });

    document.querySelectorAll(".accor-wrap-in > .accor-tit").forEach((tit) => {
      tit.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const accorWrapIn = this.closest(".accor-wrap-in");
        accorWrapIn.querySelectorAll(".on").forEach((openItem) => {
          openItem.classList.remove("on");
        });
        accorWrapIn.classList.toggle("on");
      });
    });

    document.querySelectorAll(".accor-cont-in .accor-tit").forEach((tit) => {
      tit.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const parentLi = this.closest("li");
        parentLi.parentElement.querySelectorAll("li.on").forEach((openLi) => {
          if (openLi !== parentLi) {
            openLi.classList.remove("on");
          }
        });
        parentLi.classList.toggle("on");
      });
    });

    document.querySelectorAll(".sort a").forEach((a) => {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll(".sort a").forEach((a) => a.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  // 참여검증
  if (doc.querySelector(".sort")) {
    document.querySelectorAll(".sort a").forEach((a) => {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll(".sort a").forEach((a) => a.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  //민원/출장 하단 클릭시 리스트
  if (doc.querySelector(".bottom-pop")) {
    const touchTop = document.querySelector(".touch-top");
    const btList = document.querySelector(".bt-list");
    const bottomPop = document.querySelector(".bottom-pop");
    function toggleBottomPop() {
      bottomPop.classList.toggle("on");
    }
    touchTop.addEventListener("click", toggleBottomPop);
    touchTop.addEventListener("touchstart", toggleBottomPop);
    btList.addEventListener("click", toggleBottomPop);
  }

  //민원/출장 포인트 펼쳐보기
  if (doc.querySelector(".point-box")) {
    document.querySelector(".tit").addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".point-box").classList.toggle("on");
    });
    document.querySelectorAll(".bt-del").forEach(function (delButton) {
      delButton.addEventListener("click", function (event) {
        event.preventDefault();
        this.closest(".box.point").remove();
      });
    });
  }

  //민원/출장 토스트팝업 스위치버튼
  if (doc.querySelector(".toast")) {
    const toast = document.getElementById("toast");
    function showToastMessage(message) {
      toast.textContent = message;
      7;
      toast.classList.add("show");
      setTimeout(function () {
        toast.classList.remove("show");
      }, 3000);
    }

    document.querySelectorAll(".switch-bt .btn").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const message = this.getAttribute("data-message");
        const parentSwitchBt = this.closest(".switch-bt");
        parentSwitchBt.querySelectorAll(".btn").forEach((btn) => {
          btn.classList.remove("on");
        });
        this.classList.add("on");
        showToastMessage(message);
      });
    });
  }

  //민원/출장 이벤트 팝업
  if (doc.querySelector(".bottom-event")) {
    document.querySelectorAll(".touch-top").forEach((button) => {
      button.addEventListener("click", () => {
        const popup = document.querySelector(".bottom-evnt-pop");
        const overlay = document.querySelector(".overlay");

        popup.classList.toggle("active");
        overlay.classList.toggle("active");
      });
    });

    // 오버레이를 클릭하여 팝업 닫기
    document.querySelector(".overlay").addEventListener("click", () => {
      document.querySelector(".bottom-evnt-pop").classList.remove("active");
      document.querySelector(".overlay").classList.remove("active");
    });

    //버튼 클릭시 이벤트 팝업 닫음
    document.getElementById("popclose").addEventListener("click", () => {
      document.querySelector(".bottom-evnt-pop").classList.remove("active");
      document.querySelector(".overlay").classList.remove("active");
    });
  }

  //새로운 이벤트 생성 토스트 팝업
  if (doc.querySelector(".toast-popup")) {
    window.addEventListener("load", () => {
      const toastPopup = document.querySelector(".toast-popup");
      toastPopup.classList.add("show");
      setTimeout(() => {
        toastPopup.classList.remove("show");
      }, 3000);
    });
  }

  //포인트 삭제 토스트 팝업
  if (doc.querySelector(".toast-popup2")) {
    const deleteButtons = document.querySelectorAll(".bt-del");
    const toastPopup = document.querySelector(".toast-popup2");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        toastPopup.classList.add("show");
        setTimeout(() => {
          toastPopup.classList.remove("show");
        }, 3000);
      });
    });
  }

  //구매권/쿠폰 tab 내용
  if (doc.querySelector(".depth-3")) {
    const tabs = document.querySelectorAll(".depth-3 a");
    const contents = document.querySelectorAll(".cont-wrap");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();

        // 모든 탭과 콘텐츠 초기화
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => (c.style.display = "none"));

        // 현재 탭과 해당 콘텐츠 활성화
        tab.classList.add("active");
        contents[index].style.display = "block";
      });
    });
  }

  //메인의 날씨 플로팅배너 안내문구 20241111 추가
  if (doc.querySelector(".floating")) {
    const tipElement = document.querySelector(".floating .tip");
    if (!localStorage.getItem("tipShown")) {
      localStorage.setItem("tipShown", "true");
    } else {
      if (tipElement) tipElement.style.display = "none";
    }
  }
})(window, document, tns);
