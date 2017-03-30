//滚动条在Y轴上的滚动距离
function getScrollTop() {　　
  var scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0;　　
  if (document.body) {　　　　
    bodyScrollTop = document.body.scrollTop;　　
  }　　
  if (document.documentElement) {　　　　
    documentScrollTop = document.documentElement.scrollTop;　　
  }　　
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
  return scrollTop;
}
//文档的总高度
function getScrollHeight() {　　
  var scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0;　　
  if (document.body) {　　　　
    bodyScrollHeight = document.body.scrollHeight;　　
  }　　
  if (document.documentElement) {　　　　
    documentScrollHeight = document.documentElement.scrollHeight;　　
  }　　
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
  return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight() {　　
  var windowHeight = 0;　　
  if (document.compatMode == "CSS1Compat") {　　　　
    windowHeight = document.documentElement.clientHeight;　　
  } else {　　　　
    windowHeight = document.body.clientHeight;　　
  }　　
  return windowHeight;
}

window.onload = function () {
  window.onscroll = function () {
    if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
      let img = document.getElementById('loading');
      img.style.display = 'inline-block';
      let xmlhttp = new XMLHttpRequest();
      let uri = `/append`;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let para = document.createElement("p");
          para.innerHTML = xmlhttp.responseText;
          document.getElementById('news').appendChild(para);
          img.style.display = 'none';
        }
      }
      xmlhttp.open("GET", uri, true);
      xmlhttp.send();
    }
  };

  let div = document.getElementsByClassName('loading')[0];
  div.onclick = function () {
    let img = document.getElementById('loading');
    let xmlhttp = new XMLHttpRequest();
    let uri = `/append`;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        let para = document.createElement("p");
        para.innerHTML = xmlhttp.responseText;
        document.getElementById('news').appendChild(para);
      }
    }
    xmlhttp.open("GET", uri, true);
    xmlhttp.send();
  }
}
