document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const actionSlider = new Swiper('.action-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        centeredSlides: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window width is >= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });
});