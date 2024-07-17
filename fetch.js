const nfetch = (function () {
  let ready = false
  window.addEventListener("message", (e) => {
    if (event.source !== frame.contentWindow) return
    if (event.data.ready) {
      ready = true
      while (preDomReqs.length > 0) {
        frame.contentWindow.postMessage(preDomReqs.pop(), "*")
      }
    } else {
      const data = e.data.data
      const resp = new Response(data.body, {status: data.status, statusText: data.statusText, headers: data.headers})
      pendingRequests[e.data.requestId](resp)
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

  return function(...args) {
    const requestId = requestIdCtr
    requestIdCtr += 1
    const promise = new Promise((res) => {
      pendingRequests[requestId] = res
    })
    const reqData = {
      requestId,
      args
    }
    if (ready) {
      frame.contentWindow.postMessage(reqData, "*")
    } else {
      preDomReqs.push(reqData)
    }
    return promise
  }
})()
