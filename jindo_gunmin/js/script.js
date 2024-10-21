document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".nav-btn");
    const serviceSections = document.querySelectorAll(".service-grid");

    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            navButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");
            serviceSections.forEach(section => {
                if (section.getAttribute("data-category") === category) {
                    section.style.display = "grid";
                } else {
                    section.style.display = "none";
                }
            });            
        });
    });   

    // 페이지 로드 시 기본으로 '전체' 카테고리 표시
    document.querySelector('.service-grid[data-category="all"]').style.display = "grid";
});
