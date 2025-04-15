document.addEventListener("click", function (event) {
  const flightButton = event.target.closest(".flight-btn.reserve-btn");
  if (flightButton) {
    const container = document.querySelector(".landing-content");
    if (container) {
      setTimeout(() => {
        let ticketArticle = container.querySelectorAll(".ticket-article");
        ticketArticle.forEach((e) => {
          let t = e.querySelector(".flight-type-article").innerText.trim(),
            r = e.querySelector(".dep-text").innerText.trim(),
            i = e.querySelector(".dep-id").innerText.trim(),
            a = e.querySelector(".des-text").innerText.trim(),
            l = e.querySelector(".des-id").innerText.trim();
          e.querySelector(".set-ticket").addEventListener("click", () => {
            if (window.location.href.endsWith("/flight")) {
              (document.querySelector(
                "#r-flight #flightSearch #departure1"
              ).value = r),
                (document.querySelector(
                  "#r-flight #flightSearch .departure-route .locationId"
                ).value = i),
                (document.querySelector(
                  "#r-flight #flightSearch .destination-route #destination1"
                ).value = a),
                (document.querySelector(
                  "#r-flight #flightSearch .destination-route .locationId"
                ).value = l),
                t.includes("اکونومی") &&
                  ((document.querySelector(
                    "#r-flight .FlightClass-text"
                  ).innerText = "اکونومی"),
                  (document.querySelector("#r-flight #FlightClass1").value =
                    "Economy")),
                t.includes("بیزینس") &&
                  ((document.querySelector(
                    "#r-flight .FlightClass-text"
                  ).innerText = "بیزینس"),
                  (document.querySelector("#r-flight #FlightClass1").value =
                    "BusinessClass")),
                t.includes("فرست") &&
                  ((document.querySelector(
                    "#r-flight .FlightClass-text"
                  ).innerText = "فرست"),
                  (document.querySelector("#r-flight #FlightClass1").value =
                    "FirstClass")),
                document.querySelector("#r-flight").classList.remove("hidden");
              let e = document.querySelector(".bg-search");
              e && window.scrollTo({ top: e.offsetTop, behavior: "smooth" });
            } else
              localStorage.setItem(
                "flightData",
                JSON.stringify({
                  depId3: i,
                  desId3: l,
                  departureCity2: r,
                  destinationCity2: a,
                  flightType2: t,
                })
              ),
                (window.location.href = "/");
          });
        });
      }, 2000);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".search-box-container")) {
    try {
      var xhrobj = new XMLHttpRequest();
      xhrobj.open("GET", "search-engine.bc");
      xhrobj.send();

      xhrobj.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var container = document.getElementById("search-box");
          container.innerHTML = xhrobj.responseText;

          let r = document.querySelector(".flighttype-field");
          r.classList.add("flighttype-dropDown");
          var scripts = container.getElementsByTagName("script");
          for (var i = 0; i < scripts.length; i++) {
            var scriptTag = document.createElement("script");
            if (scripts[i].src) {
              scriptTag.src = scripts[i].src;
              scriptTag.async = false;
            } else {
              scriptTag.text = scripts[i].textContent;
            }
            document.head
              .appendChild(scriptTag)
              .parentNode.removeChild(scriptTag);
          }
          if (document.getElementById("search-box")) {
            const landingContent = document.querySelector(".landing-content");
            function showLoading() {
              landingContent.innerHTML = `<div class="flex justify-center mt-20 mb-24"><span class="loader-fetch"></span></div>`;
            }

            if (landingContent) {
              async function firstContent() {
                try {
                  showLoading();
                  const firstResponse = await fetch("/default-hotel.bc");
                  if (!firstResponse.ok) {
                    throw new Error(
                      `HTTP error! Status: ${firstResponse.status}`
                    );
                  }
                  const firstData = await firstResponse.text();
                  landingContent.innerHTML = firstData;
                } catch (error) {
                  console.error("Fetch اول با مشکل مواجه شد:", error);
                  landingContent.innerHTML =
                    "<p>مشکلی در دریافت اطلاعات رخ داد: " +
                    error.message +
                    "</p>";
                }
              }
              firstContent();
            }
          }
        }

        let s = JSON.parse(localStorage.getItem("flightData"));
        if (s) {
          localStorage.removeItem("searchHistory_flight");
          let {
            depId3: c,
            desId3: d,
            departureCity2: u,
            destinationCity2: p,
            flightType2: f,
          } = s;
          (document.querySelector("#flightSearch #departure1").value = u),
            (document.querySelector(
              "#flightSearch .departure-route .locationId"
            ).value = c),
            (document.querySelector(
              "#flightSearch .destination-route #destination1"
            ).value = p),
            (document.querySelector(
              "#flightSearch .destination-route .locationId"
            ).value = d),
            f.includes("اکونومی") &&
              ((document.querySelector(".FlightClass-text").innerText =
                "اکونومی"),
              (document.querySelector("#FlightClass1").value = "Economy")),
            f.includes("بیزینس") &&
              ((document.querySelector(".FlightClass-text").innerText =
                "بیزینس"),
              (document.querySelector("#FlightClass1").value =
                "BusinessClass")),
            f.includes("فرست") &&
              ((document.querySelector(".FlightClass-text").innerText = "فرست"),
              (document.querySelector("#FlightClass1").value = "FirstClass")),
            document.querySelector("#r-flight").classList.remove("hidden");
          let h = document.querySelector(".bg-blur-t");
          h && window.scrollTo({ top: h.offsetTop, behavior: "smooth" });
        }
      };
    } catch (error) {
      // console.error('مشکلی رخ داده است لطفا صبور باشید.', error);
    }
  }
});

const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
    // headerMenu.style.display = "none";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
    // headerMenu.style.display = "block";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = submenu.scrollHeight * 10 + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentArticle = document;

  fetchContentArticle.addEventListener("click", function (event) {
    const button = event.target.closest(".faq-box");
    if (!button) return;

    const faqBtn = button.querySelector(".faq-btn");
    const faqAnswer = button.querySelector(".faq-answer");

    document.querySelectorAll(".faq-box").forEach((otherBox) => {
      if (otherBox !== button) {
        const otherAnswer = otherBox.querySelector(".faq-answer");
        otherAnswer.classList.add("max-h-0", "opacity-0");
        otherAnswer.classList.remove("max-h-screen", "opacity-100");
      }
    });

    if (faqAnswer.classList.contains("max-h-0")) {
      faqAnswer.classList.remove("max-h-0", "opacity-0");
      faqAnswer.classList.add("max-h-screen", "opacity-100");
    } else {
      faqAnswer.classList.add("max-h-0", "opacity-0");
      faqAnswer.classList.remove("max-h-screen", "opacity-100");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const flightButton = event.target.closest(".flight-btn.reserve-btn");
    if (flightButton) {
      const container = document.querySelector(".landing-content");
      let cardContainer = null;

      if (container) {
        setTimeout(() => {
          cardContainer = container.querySelector(".card-container");

          if (cardContainer) {
            const items = cardContainer.querySelectorAll(".card-item");

            items.forEach((item, index) => {
              if (index > 5) {
                item.style.display = "none";
              }
            });
          }
        }, 2000);
      }
    }

    const toggleButton = event.target.closest(".toggleButton");
    if (toggleButton) {
      const container = toggleButton.closest(".flex").previousElementSibling;
      if (!container || !container.classList.contains("card-container")) return;

      const items = container.querySelectorAll(".card-item");

      isExpanded = toggleButton.dataset.expanded === "true";

      items.forEach((item, index) => {
        if (index > 5) {
          item.style.display = !isExpanded ? "none" : "block";
        }
      });

      toggleButton.textContent = !isExpanded ? "مشاهده بیشتر" : "مشاهده کمتر";
      toggleButton.dataset.expanded = isExpanded ? "false" : "true";
    }
  });
});

const initSwiper = () => {
  const swiperDesktop = document.querySelector(".swiper-article");
  const swiperMobile = document.querySelector(".swiper-article-mobile");

  if (swiperDesktop && swiperDesktop.swiper) {
    swiperDesktop.swiper.destroy(true, true);
  }
  if (swiperMobile && swiperMobile.swiper) {
    swiperMobile.swiper.destroy(true, true);
  }

  const desktopSlides =
    swiperDesktop?.querySelectorAll(".swiper-slide").length || 0;
  const mobileSlides =
    swiperMobile?.querySelectorAll(".swiper-slide").length || 0;

  if (window.innerWidth >= 1024 && desktopSlides > 0) {
    new Swiper(".swiper-article", {
      slidesPerView: 4,
      speed: 400,
      spaceBetween: 8,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      },
    });
  } else if (window.innerWidth < 1024 && mobileSlides > 0) {
    new Swiper(".swiper-article-mobile", {
      slidesPerView: 1,
      speed: 400,
      centeredSlides: false,
      spaceBetween: 8,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      },
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initSwiper, 2000);
});

document.addEventListener("click", function (event) {
  if (
    event.target.closest(".reserve-btn") ||
    event.target.closest(".swiper-article")
  ) {
    setTimeout(initSwiper, 2000);
  }
});

window.addEventListener("resize", () => {
  initSwiper();
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initSwiper();
  }, 2000);
});

document.addEventListener("click", function (event) {
  if (
    event.target.closest(".reserve-btn") ||
    event.target.closest(".swiper-article")
  ) {
    setTimeout(() => {
      initSwiper();
    }, 2000);
  }
});

//form contact
function uploadDocumentContact(args) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadContact", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaContact(e) {
  $bc.setSource("captcha.refreshContact", true);
}

async function OnProcessedEditObjectContact(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#contact-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#contact-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaContact();
    setTimeout(() => {
      document.querySelector(
        "#contact-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#contact-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormContact() {
  var inputElementVisa7 = document.querySelector(
    " .about-form-message textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "متن");

  var inputElementVisa7 = document.querySelector(
    " .about-form-email input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");
}

//form suggest
function uploadDocumentSuggest(args) {
  document.querySelector("#suggest-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#suggest-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#suggest-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadSuggest", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaSuggest(e) {
  $bc.setSource("captcha.refreshSuggest", true);
}

async function OnProcessedEditObjectSuggest(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#suggest-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#suggest-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";

    location.reload();
    z;
  } else {
    refreshCaptchaSuggest();
    setTimeout(() => {
      document.querySelector(
        "#suggest-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#suggest-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormSuggest() {
  var inputElementVisa7 = document.querySelector(
    " .left-form-message textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "متن");

  var inputElementVisa7 = document.querySelector(
    " .left-form-name input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام و نام خانوادگی");

  var inputElementVisa7 = document.querySelector(
    " .left-form-number input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره موبایل");

  var inputElementVisa7 = document.querySelector(
    " .left-form-payment input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره صورت حساب");

  var inputElementVisa7 = document.querySelector(
    " .left-form-email input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");
}
