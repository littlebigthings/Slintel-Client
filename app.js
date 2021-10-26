class UpdateImagePosition {
  constructor() {
    this.imgPositionedToMobile = false;
    this.allWrappers = $('[update-img="wrapper"]');
    this.init();
  }

  init() {
    this.activateEvents();
  }

  activateEvents() {
    this.activateResizeEvt();
    this.checkAndUpdateImgPostion();
  }

  activateResizeEvt() {
    let resizeTimer;

    $(window).on("resize", (e) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.checkAndUpdateImgPostion();
      }, 250);
    });
  }

  checkAndUpdateImgPostion() {
    this.isOnMobile = $(window).width() < 750;

    if (this.isOnMobile && !this.imgPositionedToMobile) {
      this.imgPositionedToMobile = true;
      this.allWrappers.each(function () {
        const $img = $(this).find("[update-img='from']");
        const $title = $(this).find("[update-img='to']");

        $img.parent().attr("update-img", "replace-from");

        $($img).insertAfter($title);
      });
    } else if (!this.isOnMobile && this.imgPositionedToMobile) {
      this.imgPositionedToMobile = false;
      this.allWrappers.each(function () {
        const $img = $(this).find("[update-img='from']");
        const $imgBox = $(this).find("[update-img='replace-from']");

        $($imgBox).append($img);
      });
    }
  }
}

new UpdateImagePosition();
