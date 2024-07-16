(function () {
  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  console.log("hi")
  addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(frame)
  })
})()
