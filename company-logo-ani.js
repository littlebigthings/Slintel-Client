class AnimateBlock {
  constructor(block, duration) {
    this.block = block;
    this.aniDuration = duration;
    this.imgChildren = this.block.childNodes;
    this.childImgLength = this.imgChildren.length;
    this.topVal = this.imgChildren[0].height;
    this.movedVal = 0;
    this.currImg = 1;
    this.action = "moveup";
  }

  handleAni() {
    if (this.currImg < this.childImgLength && this.action === "moveup") {
      this.currImg++;
      this.movedVal += this.topVal;
      this.positionAni();
    } else if (
      this.currImg === this.childImgLength ||
      (this.currImg < this.childImgLength && this.currImg > 0)
    ) {
      this.action = "movedown";
      this.movedVal = this.movedVal - this.topVal;
      if (this.movedVal < 0) {
        this.action = "moveup";
        this.currImg = 1;
        this.movedVal = 0;
        this.handleAni();
      } else {
        this.currImg = this.currImg - 1;
        this.positionAni();
      }
    } else {
      this.action = "moveup";
      this.currImg = 1;
      this.movedVal = 0;
      this.handleAni();
    }
  }

  positionAni() {
    gsap.to(this.block, {
      y: -this.movedVal,
      duration: this.aniDuration,
      ease: "Power1.easeInOut",
    });
  }
}

class ANIMATE {
  constructor(companyLogos, duration = 2) {
    this.container = document.querySelector(".image-container");
    this.wrapper = document.querySelectorAll(".image-wrapper");
    this.topVal = this.wrapper[0].querySelector(".cust-image").height;
    this.randomVal = 0;
    this.duration = duration;
    this.indexOfwrapper = 0;
    this.checkRandom = [];
    this.companyLogos = companyLogos;
    this.init();
  }
  init() {
    this.insertImage();
    this.loopAndInit();
  }

  loopAndInit() {
    this.aniFuncs = [...this.wrapper].map(
      (ele) => new AnimateBlock(ele, this.duration)
    );
    this.startCounter();
  }

  insertImage() {
    this.wrapper.forEach((wrp) => {
      wrp.innerHTML = "";
    });
    this.companyLogos.forEach((element) => {
      let imageHtml = document.createElement("img");
      imageHtml.classList.add("cust-image");
      imageHtml.src = element.image;
      imageHtml.alt = element.name;
      this.addImageToWrapper(imageHtml, this.indexOfwrapper);
      this.indexOfwrapper++;
    });
  }
  addImageToWrapper(img, index) {
    if (index < this.wrapper.length) {
      this.wrapper[index].appendChild(img);
    } else {
      this.indexOfwrapper = 0;
      this.wrapper[this.indexOfwrapper].appendChild(img);
    }
  }

  startCounter() {
    setInterval(() => {
      // this.lastCalled = this.randomVal;
      // this.randomVal = this.setRandomVal(this.wrapper.length);
      // console.log("last", this.lastCalled, this.randomVal);
      // if (this.lastCalled && this.randomVal === this.lastCalled) {
      //   this.randomVal++;
      //   if (!this.aniFuncs[this.randomVal]) {
      //     this.randomVal--;
      //   }
      //   this.aniFuncs[this.randomVal].handleAni();
      // }
      // else
      this.checkIfNumRep();
      if (Array.isArray(this.aniFuncs) && this.aniFuncs[this.randomVal]) {
        this.aniFuncs[this.randomVal].handleAni();
      }
    }, 1000);
  }

  checkIfNumRep() {
    this.lastCalled = this.randomVal;
    this.randomVal = this.setRandomVal(this.wrapper.length);
    if (this.lastCalled && this.randomVal === this.lastCalled) {
      this.checkIfNumRep();
    }
    console.log(this.lastCalled, this.randomVal);
    // return this.randomVal;
  }

  setRandomVal(length) {
    let num = Math.floor(Math.random() * length);
    if (!this.checkRandom.includes(num) && this.checkRandom.length <= length) {
      this.checkRandom.push(num);
      return num;
    } else {
      this.checkRandom.length = 0;
      return this.setRandomVal(this.wrapper.length);
    }
  }
}

if (typeof LOGO !== "undefined") {
  new ANIMATE(LOGO, 1);
}
