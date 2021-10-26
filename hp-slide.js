import { TabSlider } from "./tab-slider.js";
import { isInViewport } from "./helpers.js";

function runMultipleCards(echObj) {
  const tabSlider = new TabSlider(5000, echObj);
  checkAndStartSlider(echObj.sectionEle, tabSlider);
  runOnMobile(echObj.sectionEle, tabSlider);
}

function checkAndStartSlider($secEle, tabSlider) {
  if (isInViewport($secEle) && !tabSlider.isRunning) {
    tabSlider.stopAutoAni();
    tabSlider.startAutoAni();
  } else if (!isInViewport($secEle) && tabSlider.isRunning) {
    tabSlider.stopAutoAni();
  }
}

function runOnMobile(sectionEle, tabSlider) {
  let resizeTimer;
  if ($(window).width() < 767) {
    tabSlider.openTab(tabSlider.$sliderTabs.eq(0));
  } else {
    tabSlider.openTab(tabSlider.$sliderTabs.eq(0));
    checkAndStartSlider(sectionEle, tabSlider);
    $(window).on("scroll", function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        checkAndStartSlider(sectionEle, tabSlider);
      }, 250);
    });
  }
}

const $tabSecOne = $(".two-column-wrapper.identify-potential").eq(0);

const tabCardsData = [
  {
    sliderTabs: $tabSecOne.find('[slide="header"]').parent(),
    sliderMainImg: $tabSecOne.find('[slide="main-img"]'),
    sliderMBImgClass: "tab-main-img-mobile",
    activeCardClass: "active-card",
    sectionEle: $tabSecOne,
    aniDuration: 0.5,
  },
];

tabCardsData.forEach((echObj) => {
  runMultipleCards(echObj);
});
