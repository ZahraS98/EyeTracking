var stickers = ["sticker/catSticker1.jpg", "sticker/dogSticker1.jpg", "sticker/birdSticker1.jpg", "sticker/birdSticker2.jpg", "sticker/catSticker2.jpg", "sticker/catSticker3.jpg", "sticker/dogSticker2.jpg", "sticker/birdSticker3.jpg", "sticker/dogSticker3.jpg"]
var stickerHolders = ["stickerHolder0", "stickerHolder1", "stickerHolder2", "stickerHolder3", "stickerHolder4", "stickerHolder5", "stickerHolder6", "stickerHolder7", "stickerHolder8"]
var stickerActivated = [];

function activateMainListener() {
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        var timer = null;
        var xprediction = data.x;
        var yprediction = data.y;
        // console.log(elapsedTime);

        document.getElementById("webgazerGazeDot").style.display = "none";

        for (let i = 0; i < stickers.length; i++) {
            var sticker = document.createElement("img");
            sticker.src = stickers[i];
            sticker.width = "100";
            sticker.height = "100";
            sticker.id = "sticker" + i;
            document.body.appendChild(sticker);
            var target = document.getElementById(stickerHolders[i]);
            stickerActivated[i] = false;

        if (target.contains(document.elementFromPoint(xprediction, yprediction))) {
            console.log("User is looking at target");
            if (!timer) {
                timer = setTimeout(function () {
                    timer = null;
                    console.log("User has been looking at target for 5 seconds");
                    if (!stickerActivated[i]) {
                        document.getElementById(stickerHolders[i]).style.display = "none";
                        document.getElementById("sticker" + i).style.display = "block";
                        stickerActivated[i] = true;
    
                        const image = document.querySelector('#sticker' + i);
                        let isDragging = false;
                        let currentX;
                        let currentY;
                        let initialX;
                        let initialY;
                        let xOffset = 0;
                        let yOffset = 0;

                        image.addEventListener("mousedown", dragStart);
                        image.addEventListener("mouseup", dragEnd);
                        image.addEventListener("mouseout", dragEnd);
                        image.addEventListener("mousemove", drag);

                        function dragStart(e) {
                            initialX = e.clientX - xOffset;
                            initialY = e.clientY - yOffset;
                            isDragging = true;
                        }

                        function dragEnd(e) {
                            initialX = currentX;
                            initialY = currentY;
                            isDragging = false;
                        }

                        function drag(e) {
                            if (isDragging) {
                                e.preventDefault();
                                currentX = e.clientX - initialX;
                                currentY = e.clientY - initialY;
                                xOffset = currentX;
                                yOffset = currentY;
                                setTranslate(currentX, currentY, image);
                            }
                        }

                        function setTranslate(xPos, yPos, el) {
                            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
                        }
                    }else {
                        stickerActivated = false;
                    }
                    //var stickerActivated = false;
                    clearTimeout(timer);
                    timer = null;
                }, 2000);
            }
        }
    }
    }).begin();
}