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
    let i = 0;
    setInterval(() => {
      frame.contentWindow.postMessage(`MESSAGE FROM PARENT ${i}`)
      i += 1
    }, 3000)
    window.addEventListener("message", (e) => {
      // console.log("PARENT:", e)
      if (event.source !== frame.contentWindow) return // console.log("PARENT: ignroing", event.source, frame.contentWindow)
      console.log("PARENT: got message from child", e)
    })
  })
/* })() */
