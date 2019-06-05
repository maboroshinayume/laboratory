
function autoRullImg() {
    var timer = null;
    var showContainer = document.getElementsByClassName("showContainer")[0];
    var container = document.getElementsByClassName("container")[0];
    var imgNum = container.children.length;
    var oneImgWidth = container.children[0].offsetWidth;
    var leftTriangle = document.getElementsByClassName("left-triangle")[0];
    var rightTriangle = document.getElementsByClassName("right-triangle")[0];
    var dots = document.getElementsByClassName("dots")[0].children;     //获取提示圆点
    var index = 0;

    function showDots(target) {
        var dots = document.getElementsByClassName("dots")[0].children;
        for (var i = 0; i < dots.length; i++) {
            if (i !== target) {
                dots[i].classList.remove("active");       //增加表示高亮的类名
            } else {
                dots[i].classList.add("active");      //去掉高亮
            }
        }
    }

    function movement(offset) {
        var oldLeft = parseInt(container.style.left);
        var newLeft = oldLeft + offset;
        container.style.left = newLeft + "px";
      }


    showContainer.onmouseover = function() {
        clearInterval(timer);
    };
    showContainer.onmouseout = function() {
        rullAuto();
    };

    function clickTriangle() {
        leftTriangle.onclick = function() {
            if (parseInt(container.style.left) >= 0) {
                container.style.left = -(imgNum - 1) * oneImgWidth + "px";
            } else {
                movement(oneImgWidth);
            }
            index = index - 1;
            if( index < 0){ index = imgNum - 1;}
            showDots(index);
        };
        rightTriangle.onclick = function() {
            if (parseInt(container.style.left) <= -(imgNum - 1) * oneImgWidth) {
                container.style.left = "0px";
            } else {
                movement(-oneImgWidth);
            }
            index = index + 1;
            if( index > imgNum - 1){ index = 0;}
            showDots(index);
        };
    }
    clickTriangle()

    function clickDots(){
        for(var i = 0; i < dots.length; i++){
            (function(n){
                dots[n].onclick = function(){
                    container.style.left = -n*oneImgWidth + "px";
                    index = n;
                    showDots(index);
                }
            })(i);
        }
        return index;
    }
    clickDots()

    function rullAuto() {
        timer =  setInterval(function(){
            movement(-oneImgWidth);
            index = index + 1;
            if( index > imgNum - 1){ index = 0;}
            showDots(index);
            if (parseInt(container.style.left) <= -imgNum * oneImgWidth) {
                container.style.left = "0px";
            }
        }, 2000);
    }
    rullAuto();
}
window.onload = autoRullImg;
