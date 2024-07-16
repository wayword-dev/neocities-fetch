const nfetch = (function () {
  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  frame.src = "/neocities-fetch/frame.html"
  addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(frame)
    window.addEventListener("message", (e) => {
      if (event.source !== frame.contentWindow) return
      console.log("nfetch data recieved, promise resolving")
      pendingRequests[e.data.requestId](e.data.data)
      delete pendingRequests[e.data.requestId]
    })
    for (const req of preDomReqs) {
      console.log("nfetch dequeued")
      frame.contentWindow.postMessage(req)
    }
  })

  let requestIdCtr = 0
  let pendingRequests = {}
  let preDomReqs = []

  return function(url) {
    console.log("nfetch called")
    const requestId = requestIdCtr
    requestIdCtr += 1
    const promise = new Promise((res) => {
      pendingRequests[requestId] = res
    })
    const reqData = {
      requestId,
      url
    }
    if (frame.contentWindow) {
      console.log("nfetch sent to content window")
      frame.contentWindow.postMessage(reqData)
    } else {
      console.log("nfetch queued")
      preDomReqs.push(reqData)
    }
    return promise
  }
})()
