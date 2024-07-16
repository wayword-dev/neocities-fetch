const nfetch = (function () {
  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  frame.src = "/neocities-fetch/frame.html"
  addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(frame)
    // console.log("PARENT: sending message")
    // let i = 1;
    // frame.contentWindow.postMessage(`MESSAGE FROM PARENT t=0`)
    // setInterval(() => {
    //   frame.contentWindow.postMessage(`MESSAGE FROM PARENT ${i}`)
    //   i += 1
    // }, 3000)
    window.addEventListener("message", (e) => {
      // console.log("PARENT:", e)
      if (event.source !== frame.contentWindow) return // console.log("PARENT: ignroing", event.source, frame.contentWindow)
      const data = JSON.parse(e.data)
      console.log("PARENT: got message from child", data)
      pendingRequests[data.requestId](data.data)
      delete pendingRequests[data.requestId]
    })
  })

  let requestIdCtr = 0
  let pendingRequests = {}

  return function(url) {
    const requestId = requestIdCtr
    requestIdCtr += 1
    const promise = new Promise((res) => {
      pendingRequests[requestId] = res
    })
    frame.contentWindow.postMessage(JSON.stringify({
      requestId,
      url
    }))
    return promise
  }
})()
