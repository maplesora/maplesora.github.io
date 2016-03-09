/* 添加blog内容 */
var line = '<hr style="height:1px;border:none;border-top:1px solid #bbbbbb;width:80%" />';
var spinner = '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';

$.get('/blog/article/main.txt', function(da) {
    $('#loading').remove();
    decode(da);
});

function decode(data) {
    //var dat = new Array();
    var a = data.split('@');
    for (var i in a) {
        var b = a[i].split('~');
        var j = {};
        j.time = b[0];
        j.title = b[1];
        j.text = b[2];
        if (i == 0) {
            add(j, true, true);
            continue;
        }
        else {
            add(j, true, false);
        }
    }
    img();
}

function add(content, ifline, first) {
    var id = randomString(32);

    if (!!line && !!first) {
        var con = '<span class="article" style="width:80%"><label class="posttime">&hearts;' + content.time + '</label><h2 style="text-align:center">' + content.title + '</h2><div class="text" id="' + id + '"></div><br>' + line + '</span>';
        $('#cont').append(con);
        $('#' + id).append(spinner);
        var html = $.ajax({
            url: content.text,
            async: false
        }).responseText;
        $('#' + id).children('.spinner').remove();
        $('#' + id).append(html);
        return;
    }
    else if (!!line && !first) {
        var con = '<span class="article" style="width:80%"><label class="posttime">' + content.time + '</label><h2 style="text-align:center">' + content.title + '</h2><div class="text" id="' + id + '"></div><br>' + line + '</span>';
        $('#cont').append(con);
        $('#' + id).append(spinner);
        var html = $.ajax({
            url: content.text,
            async: false
        }).responseText;
        $('#' + id).children('.spinner').remove();
        $('#' + id).append(html);
        return;
    }
}

//随机文本
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function img() {
    $('img').css('max-width',$('.text').width());
}