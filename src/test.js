document.addEventListener('DOMContentLoaded', () => {
  var green = document.getElementById('green')

  var tl = new TimelineMax({
    repeat: -1
  })

  tl
    .from(green, 2, {
      scale: 0.2,
      autoAlpha: 0
    })
    .to(green, 2, {
      x: '100%'
    })
    .to(green, 0.5, {
      x: '0%'
    })
    .to(green, 1, {
      autoAlpha: 0
    })

  console.log(GsapUi)
})
