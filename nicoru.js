window.onload = function () {
    //コメント欄の中身が頻繁に入れ替わるのでそれに対抗すべくめっちゃ早く実行する。
    //速さ→1秒==1000ミリ秒 繰り返す速さは100ミリ秒。
    setInterval(function () {

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
            comment.style.padding = '0px 0px 0px 10%'

            nicoru.onclick = function () {

                //  var commentRow = document.getElementsByClassName('DataGrid-TableRow CommentPanelDataGrid-TableRow')
                //  // コメント欄の一行を見る
                //  for (let index = 0; index < commentRow.length; index++) {
                //      var row = commentRow[index];
                //      //なんか知らんけど押してすぐマウス移動させるとコメントを自動スクロールが使えなくなる。
                //      //のでいろいろ調べた結果再生時間とかコメ番号を一瞬マウスオーバーすればいいということに気づいた。
                //      //というわけなのでコメント番号は表示されなくなる＋ニコるくんクリックはできなくなります。
                //      var commentNum = row.getElementsByClassName('DataGrid-TableCell CommentPanelDataGrid-TableCell')[4]
                //      commentNum.style.position = 'absolute'
                //      commentNum.style.width = '100%'
                //  }

            }

        }

    }, 100)
}
