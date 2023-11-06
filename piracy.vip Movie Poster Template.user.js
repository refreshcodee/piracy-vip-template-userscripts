// ==UserScript==
// @name         piracy.vip Movie Poster Template
// @namespace    https://piracy.vip/
// @version      0.1
// @description  coded by refresh
// @author       refresh
// @grant        none
// @include      /https:\/\/piracy\.vip\/forum\/(7|8|10|11|13|14|15|17|18|19|20|40|41|82)\/\?do=add/
// ==/UserScript==

(function() {
    'use strict';

    var tmdbID;
    var mediaInfo;
    var downloadLink;
    var apiData = {};
    var postTemplate;

    window.clickGenerate = async function () {
        tmdbID = document.getElementById("tmdbIdInput").value;
        mediaInfo = document.getElementById("mediaInfoInput").value;
        downloadLink = document.getElementById("downloadLinkInput").value;
        const url = `https://api.themoviedb.org/3/movie/${tmdbID}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzFjNDY1MWI0NzBmNzM4ODczZjgwMzEwMzI1ZDg0OCIsInN1YiI6IjVlNmM1Yjg4YTliOWE0MDAxODlmMTI0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NVCVdh-PubyRh2syIdxdJ7439KItBGHyHjbJch7zTmQ'
            }
        };

        const req = await fetch(url, options);
        const resp = await req.json();
        apiData = resp;
        postTemplate = `
                <p style="text-align:center;">
                   <img alt="spacer.png" class="ipsImage" data-loaded="true" data-ratio="75.08" data-src="https://image.tmdb.org/t/p/w500${apiData.poster_path}" height="500" src="https://piracy.vip/applications/core/interface/js/spacer.png" style="height:auto;" width="500">
                </p>
                <p style="text-align:center;">
                   <span style="font-size:24px;"><strong>${apiData.original_title} <span style="color:#f1c40f;">(${apiData.release_date.split("-")[0]})</span></strong></span>
                </p>
                <p style="text-align:center;">
                   <span style="font-size:16px;">${apiData.release_date} | ${apiData.runtime}m | <span style="color:#f1c40f;">★</span> ${apiData.vote_average}</span>
                </p>
                <p>
                   <span style="font-size:24px;"><span style="color:#f1c40f;"><strong>Overview</strong></span></span>
                </p>
                <p>${apiData.overview}</p>
                <p>
                   <span style="font-size:24px;"><span style="color:#f1c40f;"><strong>Mediainfo</strong></span></span>
                </p>
                <div class="ipsSpoiler" data-ipsspoiler="">
                   <div class="ipsSpoiler_header">
                      <span>Spoiler</span>
                   </div>
                   <div class="ipsSpoiler_contents" data-gramm="false">
                      <pre class="ipsCode prettyprint lang-html prettyprinted"><span class="pln">${mediaInfo}</span></pre>
                      <p>
                         &nbsp;
                      </p>
                   </div>
                </div>
                <p>
                   <span style="font-size:24px;"><span style="color:#f1c40f;"><strong>Download</strong></span></span>
                </p>
                <div class="ipsSpoiler" data-ipsspoiler="">
                   <div class="ipsSpoiler_header">
                      <span>Spoiler</span>
                   </div>
                   <div class="ipsSpoiler_contents" data-gramm="false">
                      <p>
                         [hide]${downloadLink}[/hide]
                      </p>
                   </div>
                </div>
                <p>
                   &nbsp;
                </p>
    `
    }

    window.clickCopy = function () {
        navigator.clipboard.writeText(postTemplate);
    }

    let layout = document.createElement('div');
    layout.innerHTML = `
         <input type="text" placeholder="Enter TMDB ID" id="tmdbIdInput" name="tmdbIdInput"><br><br>
         <input type="text" placeholder="Enter Download Link" id="downloadLinkInput" name="downloadLinkInput"><br><br>
         <textarea placeholder="Enter MediaInfo" id="mediaInfoInput" name="mediaInfoInput" rows="5" cols="50"></textarea>
         <br><br>
         <div style="display: flex; gap: 1rem;">
            <button class="ipsButton ipsButton_primary ipsButton_verySmall" onclick="clickGenerate()" type="button">Generate</button>
            <button class="ipsButton ipsButton_primary ipsButton_verySmall" onclick="clickCopy()" type="button">Copy</button>
         </div>
    `

    document.body.appendChild(layout);
    let div = document.querySelector("#topic_content_editor");
    div.prepend(layout);
})();
