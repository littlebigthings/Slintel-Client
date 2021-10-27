// import { data } from "./mock.js";

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

class SearchAPI {
  constructor(inputEle) {
    this.$inputEle = inputEle;
    this.$dd = document.querySelector(".search-dd");
    this.$techBlock = this.$dd.querySelector("[search-api='tech-block']");
    this.$companyBlock = this.$dd.querySelector("[search-api='company-block']");
    this.$companySearchBlock = this.$companyBlock.querySelector(
      ".search-results-inner"
    );
    this.$techSearchBlock = this.$techBlock.querySelector(
      ".search-results-inner"
    );
    this.resultCard = this.$dd.querySelector(".result-card").cloneNode(true);
    this.$seeMore = document.querySelector("[search-api='see-more']");
    this.resultData = null;
    this.init();
  }

  init() {
    this.activateEvents();
  }

  activateEvents() {
    this.$inputEle.addEventListener("input", async () => {
      if (this.$inputEle.value.length >= 2) {
        this.$dd.style.display = "block";
        await this.fetchData(this.$inputEle.value);
        // this.addResultsDOM();
      } else {
        this.$dd.style.display = "hide";
      }
    });

    document.querySelector("body").addEventListener("click", (e) => {
      const targetEle = e.target;
      if (targetEle === this.$inputEle || this.$dd.contains(targetEle)) return;
      if (this.$dd.style.display === "block") {
        this.$dd.style.display = "none";
      }
    });

    this.$seeMore.addEventListener("click", () => {
      this.$seeMore.href = `${this.$seeMore.href}?searchTerm=${this.$inputEle.value}`;
    });
  }

  async fetchData(inputText) {
    try {
      const resData = await fetch(
        `https://www.slintel.com/api/global/autosuggestions?searchTerm=${inputText}`
      );
      const data = await resData.json();
      if (data) {
        this.resultData = data.data;
        this.addResultsDOM();
      }
      return data;
    } catch (error) {
      console.log({ error });
    }
  }

  addResultsDOM() {
    this.$companySearchBlock.innerHTML = "";
    this.$techSearchBlock.innerHTML = "";
    this.updateResults(
      this.resultData["companyAutosuggestion"],
      this.$companySearchBlock,
      "company_industry"
    );
    this.updateResults(
      this.resultData["technologyAutosuggestion"],
      this.$techSearchBlock,
      "category"
    );
  }

  updateResults(dataArr, parentEle, category) {
    if (!dataArr || !parentEle) return;
    const routeUrl = `https://www.slintel.com`;

    dataArr.forEach((obj) => {
      const type = obj["_type"];

      let url = routeUrl;

      if (type === "technology-suggester") {
        url = `${url}/tech/${obj["_source"]["sub_cat_meta_seo_url"]}/${obj["_source"]["tech_meta_seo_url"]}`;
      } else if (type === "company") {
        url = `${url}/company/${obj["_id"]}/${convertToSlug(
          obj["_source"]["company_name"]
        )}`;
      }

      const { company_profile_image_url, company_name } = obj["_source"];
      const cloneResult = this.resultCard.cloneNode(true);

      cloneResult.href = url;

      cloneResult.querySelector(".rc-block-1 img").src =
        company_profile_image_url;
      const block2 = cloneResult.querySelector(".rc-block-2");

      block2.querySelector(".rc-title").innerText = company_name;
      block2.querySelector(".rc-para").innerText = obj["_source"][category];

      parentEle.append(cloneResult);
    });
  }
}

const $input = document.querySelector('[search-api="input"]');

if ($input) {
  new SearchAPI($input);
}
