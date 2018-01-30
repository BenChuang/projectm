function createTypingText(elem, textFixed, textDynamic) {
    if(elem) {
        textFixed = "" + textFixed;
        textDynamic = "" + textDynamic;
        var span1 = document.createElement("SPAN");
        var g = document.createElement("G");
        g.className = "typing-h1";
        span1.appendChild(g);
        var span2 = document.createElement("SPAN");
        span2.innerHTML = "|";
        span2.className = "typing-h1 cursor-fadeinout";
        elem.appendChild(span1);
        elem.appendChild(span2);
        var textDynamicLength = textDynamic.length;
        var frameNum = (textDynamicLength * 2) + 120;
        var secondTextFrom = textDynamicLength + ((frameNum - textDynamicLength * 2) / 2);
        var secondTextTo = secondTextFrom + textDynamicLength;
        var textIndex = 0;
        var frameIndex = 0;
        var interval = setInterval(function () {
            try {
                g.textContent = textFixed + textDynamic.substring(0, textIndex);
                if (frameIndex < textDynamicLength) {
                    textIndex++;
                } else if (secondTextFrom <= frameIndex && frameIndex < secondTextTo) {
                    textIndex--;
                }
                frameIndex = (frameIndex + 1) % frameNum;
            } catch (e) {
                clearInterval(interval);
            }
        }, 30)
    }
}