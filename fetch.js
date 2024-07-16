const nfetch = (function () {
  let ready = false
  window.addEventListener("message", (e) => {
    console.log("PARENT: message", e)
    if (event.source !== frame.contentWindow) return
    if (event.data.ready) {
      ready = true
      for (const req of preDomReqs) {
        frame.contentWindow.postMessage(req)
      }
    } else {
      pendingRequests[e.data.requestId](e.data.data)
      delete pendingRequests[e.data.requestId]
    }
  })

  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  frame.src = "https://wayword-dev.github.io/neocities-fetch/frame.html"

  if (document.readyState === "interactive" || document.readyState === "complete") {
    document.body.appendChild(frame)
  } else {
    addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(frame)
    })
  }

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
    if (ready) {
      frame.contentWindow.postMessage(reqData)
    } else {
      preDomReqs.push(reqData)
    }
    return promise
  }
})()
