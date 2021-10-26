// function convertToSlug(Text) {
//   return Text.toLowerCase()
//     .replace(/[^\w ]+/g, "")
//     .replace(/ +/g, "-");
// }

// function getAndSetTableContents(eleBlock, tableEle) {
//   const tableChild = $(tableEle).children().eq(0);
//   $(tableEle).empty();
//   $(eleBlock)
//     .find("h2")
//     .each(function () {
//       const headingTitle = $(this).text();
//       const slugifyedText = convertToSlug(headingTitle);
//       $(this).attr("id", slugifyedText);
//       $(tableEle).append(
//         tableChild.clone(true).text(headingTitle).attr("data-id", slugifyedText)
//       );
//     });

//   $(".table-of-content")
//     .children()
//     .on("click", function () {
//       let id = $(this).data("id");
//       scrollFromTop(id);
//     });
// }

// function scrollFromTop(id) {
//   let el = document.getElementById(id);
//   let elDistanceToTop = window.pageYOffset + el.getBoundingClientRect().top;
//   window.scrollTo({
//     top: elDistanceToTop - 80,
//     behavior: "smooth",
//   });
// }

// getAndSetTableContents($(".content-wrapper"), $(".table-of-content"));

function isInViewportCenter(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
  //  rect.top >= window.screen.height / 2;
}

var resizeTimer;

$(window).on("scroll", function () {
  // console.log(this);
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Run code here, resizing has "stopped"
    [...$(".content-wrapper h2")].forEach((ele) => {
      if (isInViewportCenter(ele)) {
        if (
          ele.getBoundingClientRect().top >= 0 &&
          ele.getBoundingClientRect().top <= 300
        ) {
          console.log("ele is in ", ele);
          console.log(
            ele.getBoundingClientRect(),
            ele.getBoundingClientRect().top,
            window.screen.height / 2
          );
        }
      }
    });
  }, 250);
});
