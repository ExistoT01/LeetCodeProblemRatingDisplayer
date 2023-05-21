// ==UserScript==
// @name         LeetCode problems rating displayer
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Display LeetCode problems rating
// @author       ExistoT01
// @match        https://leetcode.cn/problems/*
// @match        https://leetcode.cn/problems/*/description/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.cn
// @grant        none
// ==/UserScript==

const dataUrl = "https://zerotrac.github.io/leetcode_problem_rating/data.json";

const titleSelector =
  "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto.rounded-b > div > div > div.w-full.px-5.pt-5 > div > div:nth-child(1) > div.flex-1 > div > span";

const containerSelector =
  "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto.rounded-b > div > div > div.w-full.px-5.pt-5 > div";

const toolbarSelector =
  "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto.rounded-b > div > div > div.w-full.px-5.pt-5 > div > div.mt-3.flex.space-x-4";

const shwoRating = () => {
  // Get the problem ID from the URL
  fetch(dataUrl)
    .then((res) => res.json())
    .then((problemRatings) => {
      const problemID =
        document.querySelector(titleSelector).childNodes[0].textContent;

      const problem = problemRatings.find((obj) => obj.ID == problemID);

      let problemRating;
      if (problem === undefined) {
        console.log("problem not find");
        problemRating = "Not Found";
      } else {
        problemRating = parseFloat(problem.Rating).toFixed(2);
      }

      const toolbar = document.querySelector(toolbarSelector);
      toolbar.childNodes[0].textContent += `: ${problemRating}`;
    })
    .catch((error) => console.error(error));
};

window.onload = function () {
  setTimeout(() => {
    console.log("LeetCode Problem Rating Displayer is running...");
    shwoRating();
  }, 1500);
};
