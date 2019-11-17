window.onload = function () {
    //設定を読み込む
    chrome.storage.local.get(['easy_nicoru', 'icon_change', 'icon_mode'], function (value) {
        var isEasyNicoru = value.easy_nicoru
        var isIconChange = value.icon_change
        var iconPos = value.icon_mode
        //コメント欄の中身が頻繁に入れ替わるのでそれに対抗すべくめっちゃ早く実行する。
        //速さ→1秒==1000ミリ秒 繰り返す速さは10ミリ秒。
        setInterval(function () {
            if (isEasyNicoru) {
                //ニコるくんの幅を広げる
                var nicoruArea = document.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')
                for (let index = 0; index < nicoruArea.length; index++) {
                    var comment = nicoruArea[index]
                    if (comment.getAttribute('data-name') == 'nicoru') {
                        comment.style.width = '100%'
                    }
                }

                // ニコるくんの当たり判定を広げる。ニコるくんかニコるくんの数字の要素しか反応しない模様？
                var nicoruCellCount = document.getElementsByClassName('NicoruCell-count')
                for (let index = 0; index < nicoruCellCount.length; index++) {
                    const count = nicoruCellCount[index];
                    // 詳しくないけどspanにはwidth使えない？inline-blockで回避できる模様
                    count.style.width = '100%'  //限界まで
                    count.style.display = 'inline-block'
                }

                // 最大までクリックを広げる 上のforを使うために。
                var clickArea = document.getElementsByClassName('ClickInterceptor PremiumRequirer is-inline')
                for (let index = 0; index < clickArea.length; index++) {
                    const click = clickArea[index];
                    click.style.width = '100%'
                }

                // ニコるくんをコメントの右へ移動させる
                // ニコるくんを重ねて表示できるようにする。
                // 重ねることで無理やりクリックできるようにする。サイズ調整は上のforでやってます。なおダブルクリックでのジャンプ機能が使えなくなる。
                var commentRow = document.getElementsByClassName('DataGrid-TableRow CommentPanelDataGrid-TableRow')
                // コメント欄の一行を見る
                for (let index = 0; index < commentRow.length; index++) {
                    var row = commentRow[index];

                    // コメント、ニコるくんの要素を取得
                    var comment = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[0]
                    var nicoru = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[1]
                    nicoru.setAttribute('data-name', 'nicoru')
                    // 0番目（一番左端）の要素がニコるくんでは無い時に入れ替えを実行
                    if (comment.getAttribute('data-name') != 'nicoru') {
                        comment.parentElement.insertBefore(nicoru, comment)
                    }

                    row.style.position = 'relative'
                    // // 移動させたのでもう一回
                    comment = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[1]
                    nicoru = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[0]
                    nicoru.style.position = 'absolute'

                    //なんか知らんけど押してすぐマウス移動させるとコメントを自動スクロールが使えなくなる。
                    //のでいろいろ調べた結果再生時間とかコメ番号を一瞬マウスオーバーすればいいということに気づいた。
                    //というわけなのでコメント番号は表示されなくなる＋ニコるくんクリックはできなくなります。
                    var commentNum = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[4]
                    commentNum.style.position = 'absolute'
                    commentNum.innerHTML = ''
                    commentNum.style.width = '50px'

                    // ニコるくんと重なるので適当にpadding入れてニコるくんかぶって見えないように
                    comment.style.padding = '0px 0px 0px 7%'

                    //再生時間広すぎ
                    var no = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[2]
                    no.style.width = '20%'
                }

                //コメ欄の上のコメント｜ニコる｜再生時間｜・・・を書き換える。
                //ニコるとコメ番号を消す。
                var headerCell = document.getElementsByClassName('CommentPanelDataGrid-HeaderCell')
                for (let index = 0; index < headerCell.length; index++) {
                    const header = headerCell[index];
                    //ニコるとコメ番号の判断は「data-name」属性の中身で判断できる
                    if (header.getAttribute('data-name') == 'nicoru' || header.getAttribute('data-name') == 'no') {
                        header.remove()
                    }
                    //コメントの部分を広げる
                    if (header.getAttribute('data-name') == 'content') {
                        header.style.width = '100%'
                    }
                    if (header.getAttribute('data-name') == 'vpos') {
                        header.style.width = '20%'
                    }
                }
            }

            //ニコるくんを書き換える
            if (isIconChange) {
                switch (iconPos) {
                    case 1:
                        //旧ニコるくんオプション
                        //にこった！
                        var html = '<img src="chrome-extension://gbfjeghnefanpmmkdngbjkpjigmhmcml/img/old_nicoru_nicotta.png" style="width:20px">'
                        var nicoruIcon = document.getElementsByClassName('NicoruIcon NicoruCell-icon is-nicotta')
                        for (let index = 0; index < nicoruIcon.length; index++) {
                            const icon = nicoruIcon[index];
                            if (icon.innerHTML != html) {
                                icon.innerHTML = html
                            }
                        }
                        //にこってない
                        var nicoruIcon = document.getElementsByClassName('NicoruIcon NicoruCell-icon is-gray')
                        for (let index = 0; index < nicoruIcon.length; index++) {
                            const icon = nicoruIcon[index];
                            if (icon.innerHTML != html) {
                                icon.innerHTML = html
                            }
                        } break
                    case 2:
                        //いんゆめくん
                        var html = '<img src="chrome-extension://gbfjeghnefanpmmkdngbjkpjigmhmcml/img/inyume.png" style="width:15px">'
                        var nicoruIcon = document.getElementsByClassName('NicoruIcon NicoruCell-icon is-nicotta')
                        for (let index = 0; index < nicoruIcon.length; index++) {
                            const icon = nicoruIcon[index];
                            if (icon.innerHTML != html) {
                                icon.innerHTML = html
                            }
                        }
                        //にこってない
                        var nicoruIcon = document.getElementsByClassName('NicoruIcon NicoruCell-icon is-gray')
                        for (let index = 0; index < nicoruIcon.length; index++) {
                            const icon = nicoruIcon[index];
                            if (icon.innerHTML != html) {
                                icon.innerHTML = html
                            }
                        } break
                }
            }

        }, 10)
    })
}
function getBoolean(value) {
    if (value == 'checked') {
        return true
    } else {
        return false
    }
}