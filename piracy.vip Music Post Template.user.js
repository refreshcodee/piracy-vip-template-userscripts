// ==UserScript==
// @name         piracy.vip Music Post Template
// @namespace    https://piracy.vip/
// @version      0.1
// @description  coded by refresh
// @author       refresh
// @grant        none
// @include      /https:\/\/piracy\.vip\/index\.php\?\/forum\/(77|78)\/&do=add/
// ==/UserScript==

(function() {
    'use strict';

    var discogID;
    //var trackList;
    var downloadLink;
    var apiData = {};
    var postTemplate;

    window.clickGenerate = async function () {
        discogID = document.getElementById("discogIdInput").value;
        //trackList = document.getElementById("trackListInput").value;
        downloadLink = document.getElementById("downloadLinkInput").value;
        const url = `https://api.discogs.com/releases/${discogID}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Discogs token=kRsrNttBfNLhszwRKckhJnTCzuHkGHiyoUKpRZEa',
                "User-Agent": "piracy.vip/3.0"
            }
        };

        const req = await fetch(url, options);
        const resp = await req.json();
        apiData = resp;
        console.log(apiData);
        postTemplate = `
                <p style="text-align:center;">
                   <strong><span style="font-size:28px;">${apiData.artists_sort} - ${apiData.title} <span style="color:#f1c40f;">(${apiData.year})</span></span></strong>
                </p>
                <p style="text-align:center;">
                  <span style="font-size:16px;">${apiData.released_formatted}&nbsp;| ${apiData.genres.join(", ")} |&nbsp;${apiData.labels[0].name}</span>
                </p>
                <p style="text-align:center;">
                   <img alt="spacer.png" class="ipsImage" data-loaded="true" data-ratio="100.00" data-src=${apiData.images[0].uri} height="316" src="https://piracy.vip/applications/core/interface/js/spacer.png" style="height:auto;" width="316">
                </p>
                <p style="text-align:center;">
                  <span style="font-size:28px;"><strong><span style="color:#f1c40f;">Tracklist</span></strong></span>
                </p>
                <p style="text-align:center;">
                  ${apiData.tracklist.map((item, index) => { return `${index+1}. ${item.title}` }).join("<br>")}
                </p>
                <p style="text-align:center;">
                   [hide]&nbsp;<a href=${downloadLink} rel="external nofollow">${downloadLink}</a> [/hide]
                </p>
    `
    }

    window.clickCopy = function () {
        navigator.clipboard.writeText(postTemplate);
    }

    let layout = document.createElement('div');
    layout.innerHTML = `
         <input type="text" placeholder="Enter Discog ID" id="discogIdInput" name="discogIdInput"><br><br>
         <input type="text" placeholder="Enter Download Link" id="downloadLinkInput" name="downloadLinkInput"><br><br>
         <div style="display: flex; gap: 1rem;">
            <button class="ipsButton ipsButton_primary ipsButton_verySmall" onclick="clickGenerate()" type="button">Generate</button>
            <button class="ipsButton ipsButton_primary ipsButton_verySmall" onclick="clickCopy()" type="button">Copy</button>
         </div>
    `

    document.body.appendChild(layout);
    let div = document.querySelector("#topic_content_editor");
    div.prepend(layout);
})();
