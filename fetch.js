(function () {
  const frame = document.createElement("iframe")
  frame.style.position = "absolute"
  frame.style.width = "0"
  frame.style.height = "0"
  frame.style.border = "0"
  document.body.appendChild(frame)
  console.log("hi")
})()
