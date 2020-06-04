const template = `
<ul class="btn-vote right download">
    <li>
        <a href="javascript:void(0);" rel="nofollow"  class="down">Download</a>
    </li>
</ul>`;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let obs = new MutationObserver(function () {
    document.querySelectorAll('article div.in-list-view').forEach((value) => {
        if (!value.querySelector('ul.download')) {
            value.insertAdjacentHTML('beforeend', template)
        }
    });
});

obs.observe(document.getElementById('list-view-2'), {
    childList: true
});

ready(function () {
    document.querySelectorAll('article div.in-list-view').forEach((value) => {
        if (!value.querySelector('ul.download')) {
            value.insertAdjacentHTML('beforeend', template)
        }
    });
});

document.addEventListener("click", function (event) {
    if (!event.target || !event.target.classList.contains('down')) return;

    event.preventDefault();

    const post = event.target.closest('article').querySelectorAll('a.badge-track')[1];
    let url;
    if (post.querySelector('img')) {
        url = post.querySelector('img').src
    } else if (post.querySelector('video')) {
        url = post.querySelector('video').querySelector('source[type="video/mp4"]').src;
    }
    forceDownload(url, url.substring(url.lastIndexOf('/') + 1))
});

function forceDownload(url, fileName) {
    chrome.runtime.sendMessage({ url: url, filename: fileName });
}

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}