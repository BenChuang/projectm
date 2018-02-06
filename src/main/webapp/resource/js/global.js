/**
 * 打字效果的文字段落
 * @param elem <div>放置动态文字的块元素
 * @param textFixed string开头固定的文字
 * @param textDynamic string在textFixed后动态打字效果增加的文字
 */
function createTypingText(elem, textFixed, textDynamic) {
    if (elem) {
        textFixed = "" + textFixed;
        textDynamic = "" + textDynamic;
        //创建展示文字所需的dom元素,最后加入到elem中
        // <span>
        //      <h2 class="typing-h2">
        //          <span>
        //              textFixed + textDynamic
        //          </span>
        //          <span class="cursor-fadeinout">
        //              |
        //          </span>
        //      </h2>
        // </span>
        var span = document.createElement("SPAN");
        var h2 = document.createElement("H2");//文字大小h2
        var spanText = document.createElement("SPAN");
        h2.className = "typing-h2";
        span.appendChild(h2);
        var spanCursor = document.createElement("SPAN");
        spanCursor.innerHTML = "|";
        spanCursor.className = "cursor-fadeinout";
        h2.appendChild(spanText);
        h2.appendChild(spanCursor);
        elem.appendChild(span);
        var textDynamicLength = textDynamic.length;
        //总帧数
        var frameNum = (textDynamicLength * 2) + 100;
        var textIndex = 0;//字指针
        var frameIndex = 0;//帧指针
        //暂停增加文字的间隔帧数
        var inter = (frameNum - textDynamicLength) / 4;
        //将文字分成四部分增加，每部分帧数随机，一帧一个字
        var plusPart = [];
        plusPart.push(parseInt(Math.random() * (textDynamicLength / 2) + 1));
        plusPart.push(parseInt(Math.random() * (textDynamicLength / 2) + 1));
        plusPart.push((textDynamicLength / 2) - plusPart[0]);
        plusPart.push((textDynamicLength / 2) - plusPart[1]);
        var interval = setInterval(function () {
            try {
                //运行到最后一帧则关闭interval
                if(textIndex === textDynamicLength){
                    clearInterval(interval);
                }
                spanText.textContent = textFixed + textDynamic.substring(0, textIndex);
                if ((frameIndex >= inter && frameIndex < inter + plusPart[0])
                    || (frameIndex >= inter + plusPart[0] + inter && frameIndex < inter + plusPart[0] + inter + plusPart[1])
                    || (frameIndex >= inter + plusPart[0] + inter + plusPart[1] + inter && frameIndex < inter + plusPart[0] + inter + plusPart[1] + inter + plusPart[2])
                    || (frameIndex >=  inter + plusPart[0] + inter + plusPart[1] + inter + plusPart[2] + inter && frameIndex < inter + plusPart[0] + inter + plusPart[1] + inter + plusPart[2] + inter + plusPart[3])) {
                    textIndex++;
                }
                frameIndex = (frameIndex + 1) % frameNum;
            } catch (e) {
                clearInterval(interval);
            }
        }, 30)
    }
}