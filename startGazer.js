var stickerOneActivated = false;

function activateMainListener() {
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        var timer = null;
        var xprediction = data.x;
        var yprediction = data.y;
        // console.log(elapsedTime);
        var catSticker = document.createElement("img");
        catSticker.src = "sticker/catSticker.jpg";
        catSticker.width = "100";
        catSticker.height = "100";
        catSticker.id = "cat";
        document.body.appendChild(catSticker);
        var target = document.getElementById("catStickerHolder");

        if (target.contains(document.elementFromPoint(xprediction, yprediction))) {
            console.log("User is looking at target");
            if (!timer) {
                timer = setTimeout(function () {
                    console.log("User has been looking at target for 2 seconds");
                    document.getElementById("catStickerHolder").style.display = "none";
                    if (!stickerOneActivated) {
                        document.getElementById("cat").style.display = "block";
                        stickerOneActivated = true;
                        const image = document.querySelector('#cat');
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
                    }
                    clearTimeout(timer);
                    timer = null;
                }, 3000);
            }
        } else {
            clearTimeout(timer);
            timer = null;
        }
    }).begin();
}

