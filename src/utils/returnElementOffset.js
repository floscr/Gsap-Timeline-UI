export default function returnElementOffset (element) {
  let xPosition = 0
  let yPosition = 0
  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft)
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
    element = element.offsetParent
  }
  return {
    x: xPosition,
    y: yPosition
  }
}
