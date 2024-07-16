/* (function () { */
  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  frame.src = "/neocities-fetch/frame.html"
  console.log("hi")
  addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(frame)
    frame.contentWindow.postMessage("MESSAGE FROM PARENT")
    frame.contentWindow.addEventListener("message", (e) => {
      console.log("PARENT: got message from child", e)
    })
  })
/* })() */
