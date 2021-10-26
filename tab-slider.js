class TabSlider {
  constructor(
    slideTimer = 5000,
    {
      sliderTabs,
      sliderMainImg,
      sliderMBImgClass,
      activeCardClass = "active-card",
      aniDuration = 0.7,
    }
  ) {
    this.$sliderDeskImg = sliderMainImg;
    this.$sliderTabs = sliderTabs;
    this.currTab = 0;
    this.slideTimer = slideTimer;
    this.activeCardClass = activeCardClass;
    this.sliderMBImgClass = sliderMBImgClass;
    this.isOnMobile = $(window).width() < 767;
    this.isRunning = false;
    this.aniDuration = aniDuration;
    this.closeTab = this.closeTab.bind(this);

    this.init();
  }

  init() {
    this.$sliderDeskImg.removeAttr("sizes srcset");
    this.activateEvents();
    this.onImagesLoaded(() => {
      this.addTabHeights();
    });
  }

  addTabHeights() {
    this.$sliderTabs.find('[slide="content-block"]').each(function () {
      $(this).attr("tab-height", $(this).height());
      $(this).css("height", "0px");
    });
  }

  onImagesLoaded(event) {
    var images = document.getElementsByClassName(this.sliderMBImgClass);
    var loaded = images.length;
    for (var i = 0; i < images.length; i++) {
      if (images[i].complete) {
        loaded--;
      } else {
        images[i].addEventListener("load", function () {
          loaded--;
          if (loaded == 0) {
            event();
          }
        });
      }
      if (loaded == 0) {
        event();
      }
    }
  }

  activateEvents() {
    this.$sliderTabs.click((e) => {
      const $currTab = $(e.currentTarget);
      if (!$currTab.hasClass(this.activeCardClass)) {
        this.openTab($currTab, true);
      }

      this.mouseEnterCode(e);
    });

    this.$sliderTabs.mouseenter((e) => this.mouseEnterCode(e));

    this.$sliderTabs.mouseleave((e) => {
      const currEleHovered = e.currentTarget;
      if ($(currEleHovered).hasClass(this.activeCardClass)) {
        this.openTab(currEleHovered, null, true);
        this.timerId && clearInterval(this.timerId);
        this.startAutoAni();
      }
    });
  }

  mouseEnterCode(e) {
    const currEleHovered = e.currentTarget;
    if ($(currEleHovered).hasClass(this.activeCardClass)) {
      this.stopAutoAni();
      this.progAni && this.progAni.pause();
    }
  }

  openTab(ele, isClicked, isMouseLeave) {
    const $currTab = $(ele);
    const $btmTab = $currTab.find('[slide="content-block"]');
    const imgHref = $currTab.find(`.${this.sliderMBImgClass}`).attr("src");

    $currTab.addClass(this.activeCardClass);

    gsap.to($btmTab[0], {
      height: `${$btmTab.attr("tab-height")}px`,
      duration: this.aniDuration,
      ease: "Power1.easeInOut",
    });

    if (!isMouseLeave) {
      gsap.fromTo(
        this.$sliderDeskImg[0],
        { opacity: 0.5, y: -50 },
        { duration: 1, y: 0, opacity: 1 }
      );
    }

    this.$sliderDeskImg.attr("src", imgHref);

    const otherTabs = this.$sliderTabs.not($currTab);
    [...otherTabs].forEach(this.closeTab);

    this.currTab = this.$sliderTabs.index($currTab) + 1;
    if (isClicked) {
      this.timerId && clearInterval(this.timerId);
      this.startAutoAni();
    }
  }

  closeTab(ele) {
    const $currTab = $(ele);
    const $btmTab = $currTab.find('[slide="content-block"]');
    $currTab.removeClass(this.activeCardClass);

    gsap.to($btmTab[0], {
      height: "0px",
      duration: this.aniDuration,
      ease: "Power1.easeInOut",
    });
  }

  startAutoAni(runInstant) {
    const timer = runInstant ? 0 : this.slideTimer;
    this.isRunning = true;
    this.timerId = setInterval(() => {
      const $toSlideTab = this.$sliderTabs.eq(this.currTab);
      if ($toSlideTab.length) {
        this.openTab($toSlideTab);
      } else {
        this.timerId && clearInterval(this.timerId);
        this.openTab(this.$sliderTabs.eq(0));
        this.currTab = 1;
        this.startAutoAni();
      }
    }, timer);
  }

  stopAutoAni() {
    this.isRunning = false;
    this.timerId && clearInterval(this.timerId);
  }
}

export { TabSlider };
