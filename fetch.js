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
      pendingRequests[e.data.requestId](e.data.data)
      delete pendingRequests[e.data.requestId]
    })
    for (const req of preDomReqs) {
      frame.contentWindow.postMessage(req)
    }
  })

  let requestIdCtr = 0
  let pendingRequests = {}
  let preDomReqs = []

  return function(url) {
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
      frame.contentWindow.postMessage(reqData)
    } else {
      preDomReqs.push(reqData)
    }
    return promise
  }
})()
