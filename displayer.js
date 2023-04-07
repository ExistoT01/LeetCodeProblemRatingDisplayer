// ==UserScript==
// @name         LeetCode problems rating displayer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display LeetCode problems rating
// @author       ExistoT01
// @match        https://leetcode.cn/problems/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.cn
// @grant        none
// ==/UserScript==

window.addEventListener(
  "load",
  setTimeout(() => {
    // Your code here...
    console.log("LeetCode Problem Rating Displayer is running...");

    const dataUrl =
      "https://zerotrac.github.io/leetcode_problem_rating/data.json";

    // Get the problem ID from the URL

    fetch(dataUrl)
      .then((res) => res.json())
      .then((problemRatings) => {
        const problemID = document.querySelector(
          "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto > div > div > div.w-full.px-5.pt-4 > div > div:nth-child(1) > div.flex-1 > div > div > span"
        ).childNodes[0].textContent;

        const problem = problemRatings.find((obj) => obj.ID == problemID);

        let problemRating;
        if (problem === undefined) {
            console.log("problem not find");
            problemRating = undefined;
        } else {
            problemRating = problem.Rating;
        }

        const ratingElement = document.createElement("p");

        ratingElement.textContent = `Problem Rating: ${problemRating}`;
        document
          .querySelector(
            "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto > div > div > div.w-full.px-5.pt-4 > div > div:nth-child(1) > div.flex-1 > div > div"
          )
          .appendChild(ratingElement);
      })
      .catch((error) => console.error(error));
  }, 2000)
);
