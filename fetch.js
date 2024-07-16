/* (function () { */
  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  frame.src = "/neocities-fetch/frame.html"
  addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(frame)
    console.log("PARENT: sending message")
    frame.contentWindow.postMessage("MESSAGE FROM PARENT")
    window.addEventListener("message", (e) => {
      if (window.srcElement !== frame) return console.log("PARENT: ignroing")
      console.log("PARENT: got message from child", e)
    })
  })
/* })() */
