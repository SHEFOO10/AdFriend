console.log("Hello There, I'm AdFriend I got your Back");



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.tabInfo.url)
});

function checkAds () {
    const ads = document.querySelectorAll('[aria-label="المعلن"], [aria-label="Ads"]');

    if (!(ads[0]?.dataset.changed)) {
        console.log(ads);
        for (const ad of ads) {
            const firstChild = ad.firstChild.cloneNode(true);
            firstChild.innerHTML = '';
            ad.innerHTML = '';
            ad.style.width = "100%";
            firstChild.style.display = 'block';
            ad.appendChild(firstChild);
            const container = document.createElement('div');
            container.style = `
              width: 100%;
              height: 200px;
            `;
            container.innerHTML = `

    <!-- Red box (behind the black circle) -->
    <div style="
      width: 100%;
      height: 100%;
      background-color: #000000;
      border-radius: 20px; /* Creates rounded corners */
      z-index: 1; /* Ensures it's behind the black circle */
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;">
      AdFriend Removed ads !!
</div>
            `;
            firstChild.appendChild(container);

            // ad.innerHTML = '';
            ad.dataset.changed = true;
        }
    }

}

setInterval(checkAds, 3000)