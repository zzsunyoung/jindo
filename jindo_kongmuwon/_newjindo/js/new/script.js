(function (win, doc){
    // Side Menu
    let $sideMenu = doc.querySelector('.side-menu');
    if($sideMenu) {
        doc.querySelector('.btn-hamburger').addEventListener('click', function () {
            doc.querySelector('.side-menu').classList.add('active');
        });
        doc.querySelector('.side-menu .btn-close').addEventListener('click', function () {
            doc.querySelector('.side-menu').classList.remove('active');
        });
    }

    // 카테고리
    // 1차 카테고리
    let $category = doc.querySelector('.category-holder');
    if($category) {
        doc.querySelector('.category .depth-1 .btn-select').addEventListener('click', function(event){
            $category.querySelector('.depth-1 .btn-select').classList.toggle('active');
        });
    }

    // 스마트 신분증
    let $certificate = doc.getElementById('popup-certificate');
    if($certificate) {
        doc.querySelector('.nav-item.certificate').addEventListener('click', function(event){
            $certificate.classList.toggle('active');
        });
        doc.querySelector('#popup-certificate .close-btn').addEventListener('click', function(event){
            console.log('close')
            $certificate.classList.remove('active');
        });
    }

    // 마을방송
    let $broadcast = doc.getElementById('popup-broadcast');
    if($broadcast) {
        doc.querySelector('.nav-item.broadcast').addEventListener('click', function(event){
            $broadcast.classList.toggle('active');
        });
        doc.querySelector('#popup-broadcast .close-btn').addEventListener('click', function(event){
            console.log('close')
            $broadcast.classList.remove('active');
        });
    }

    // Popup 열기
    doc.querySelectorAll('.open-popup').forEach(function(item){
        item.addEventListener('click', function(){
            let target = item.getAttribute('data-target');
            doc.querySelector(target).classList.add('active');
        });
    });
    doc.querySelectorAll('.close-popup').forEach(function(item){
        item.addEventListener('click', function(){
            // 상위 요소 찾기
            // 상위 요소의 클래스 이름이 popup-style 에 active 가 있으면 제거
            let parent = item.parentElement;
            while(parent) {
                if(parent.classList.contains('popup-style')) {
                    parent.classList.remove('active');
                    break;
                }
                parent = parent.parentElement;
            }
        });
    });

    /*
    doc.querySelectorAll('.category .btn-select').forEach(function(item){
        item.addEventListener('click', function(){
            doc.querySelectorAll('.category .category-item').forEach(function(item){
                item.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
     */
})(window, document);