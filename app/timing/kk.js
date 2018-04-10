// var mammoth = require("mammoth")
//
// mammoth.convertToHtml({path: "./1522033269122.docx"})
//     .then((result) => {
//         const html = result.value // The generated HTML
//         const messages = result.messages // Any messages, such as warnings during conversion
//         console.log('messages', messages)
//     })
//     .done()

var htmlToText = require('html-to-text');

var html = '<p>★☆★☆★☆轻小说文库(Www.WenKu8.Com)☆★☆★☆★</p><p>&nbsp;</p><p>&lt;弱角<span style="color: red;">友崎同学</span><span style="color: red; background-color: yellow;">(弱</span><span style="background-color: yellow;">势角色</span>友崎君)&gt;2</p><p>&nbsp;</p><p>&nbsp;</p><p>第一卷 0 全破后重看一次开场画面莫名地令人消沉</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;台版 转自 轻之国度</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;图源：Jakiro</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;扫图：风</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;录入：养老驴</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;修图：kid</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;虽说有所谓『人生是神作游戏』的知名文章（转帖），但从我的角度来看，那都是骗人的。</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说是只要全心努力便能勉强破关，平衡度调整地十分巧妙的游戏，但这只是没有真正面对过无论如何都无计可施的事态的人在胡说罢了。就算要说每个角色都是带著深刻的人性与历史背景登场，那也只是不知道世上有一大堆内在肤浅的路人角的人所说的空泛理想罢了。麻烦你别说我也是路人之类的话。</p><p>&nbsp;</p><p><span style="color: red;">&nbsp;&nbsp;&nbsp;</span>就算无限×无限像素的画素每秒有无限帧在动，也不代表就一定是好事。毕竟也有画素少才能感受到的独特韵味，最重要的是这世界就是解析度太高了，所以像我这样的丑男才会显示成丑男的模样。如果是点阵图的话大家看起来一定都一样。我可没哭啊。</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;归根究柢说起来，如果能既复杂又美丽，那么愈复杂愈美丽就愈好的想法本身一开始就是错的。一款优秀的游戏，无论何时都是既单纯又美丽的东西才对。</p><p>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;将棋是这样，超级玛利欧也是这样，最新的FPS的规则与概念也很单纯。在单纯的规则与概念之中，蕴含著深奥与韵味。</p>';

var text = htmlToText.fromString(html, {
    format: {
        heading: (elem, fn, options) => {
            var h = fn(elem.children, options);
            return '' + h.replace(/(^\s*)|(\s*$)/g, '') + '\r\n\r\n';
        },
        paragraph: (elem, fn, options) => {
            var h = fn(elem.children, options);
            if (h.substring(0, 1) === ' ' || h.substring(0, 1) === '    ' || h.substring(0, 1) === ' ') {
                console.log('='+h.substring(0, 1)+'=')
                let index = 0
                for (let i = 0; i < h.length; i++) {
                    if (h.substring(i, i + 1) !== ' ' && h.substring(i, i + 1) !== '    ' && h.substring(i, i + 1) !== ' ') {
                        index = i
                        i = h.length
                    }
                }
                h = '       ' + h.substring(index, h.length)
            }
            return '' + h + '\r\n';
        }
    },
    wordwrap: 80,
    preserveNewlines: true, // 保留换行符
    uppercaseHeadings: false, // 标题大写
    singleNewLineParagraphs: true // 段落为单个换行符
});

console.log(text);