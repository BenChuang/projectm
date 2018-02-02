function createTypingText(elem, textFixed, textDynamic) {
    if (elem) {
        textFixed = "" + textFixed;
        textDynamic = "" + textDynamic;
        var span1 = document.createElement("SPAN");
        var h2 = document.createElement("H2");
        var div = document.createElement("SPAN");
        h2.className = "typing-h2";
        span1.appendChild(h2);
        var span2 = document.createElement("SPAN");
        span2.innerHTML = "|";
        span2.className = "typing-h2 cursor-fadeinout";
        h2.appendChild(div);
        h2.appendChild(span2);
        elem.appendChild(span1);
        var textDynamicLength = textDynamic.length;
        var frameNum = (textDynamicLength * 2) + 100;
        var textIndex = 0;
        var frameIndex = 0;
        var plusPart = [];
        var inter = (frameNum - textDynamicLength) / 4;
        plusPart.push(parseInt(Math.random() * (textDynamicLength / 2) + 1));
        plusPart.push(parseInt(Math.random() * (textDynamicLength / 2) + 1));
        plusPart.push((textDynamicLength / 2) - plusPart[0]);
        plusPart.push((textDynamicLength / 2) - plusPart[1]);
        var interval = setInterval(function () {
            try {
                if(textIndex === textDynamicLength){
                    clearInterval(interval);
                }
                div.textContent = textFixed + textDynamic.substring(0, textIndex);
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