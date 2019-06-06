$(document).ready(function () {
    $('article div.in-list-view').each((index, value) => {
        if ($(value, 'div.post-afterbar-a').find('ul.download').length === 0) {
            $(value, 'div.post-afterbar-a').append(template);
        }
    });

    $(document).on('click', '.download', function (e) {
        e.preventDefault();

        const post = $(this).closest('article').find('a.badge-track')[1];
        let url;
        if ($(post).find('img').length > 0) {
            url = $(post).find('img').get(0).src;
            forceDownload(url, url.substring(url.lastIndexOf('/') + 1))
        } else if ($(post).find('video').length > 0) {
            url = $(post).find('video').find('source[type="video/mp4"]').get(0).src;
            forceDownload(url, url.substring(url.lastIndexOf('/') + 1))
        }
    });
});

const template = `
<ul class="btn-vote right download">
    <li>
        <a href="javascript:void(0);" rel="nofollow"  class="down">Download</a>
    </li>
</ul>`;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let obs = new MutationObserver(function (mutations, observer) {
    $('article div.in-list-view').each((index, value) => {
        if ($(value, 'div.post-afterbar-a').find('ul.download').length === 0) {
            $(value, 'div.post-afterbar-a').append(template);
        }
    });
});
obs.observe(document.getElementById('list-view-2'), {
    childList: true
});

function forceDownload(url, fileName) {
    chrome.runtime.sendMessage({url: url, filename: fileName});
}
