document.getElementById('save').onclick = function () {
    var easyNicoruOn = document.getElementById('easy_nicoru_on').checked
    var iconChange = document.getElementById('icon_change').checked

    var radio = document.getElementsByName('icon')
    var pos = 0
    for (let index = 1; index < radio.length; index++) {
        const icon = radio[index];
        if (icon.checked) {
            pos = index
        }
    }

    //保存する
    chrome.storage.local.set({ 'easy_nicoru': easyNicoruOn }, function () {
    });
    chrome.storage.local.set({ 'icon_change': iconChange }, function () {
    });
    chrome.storage.local.set({ 'icon_mode': pos }, function () {
    });
}


//ページ開いた時に呼ぶ
window.onload = function () {
    chrome.storage.local.get(['easy_nicoru', 'icon_change', 'icon_mode'], function (value) {
        document.getElementById('easy_nicoru_on').checked = value.easy_nicoru
        document.getElementById('icon_change').checked = value.icon_change
        document.getElementsByName('icon')[value.icon_mode].checked = 'checked'
    })
}