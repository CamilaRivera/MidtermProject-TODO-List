$(() => {
  const browser = $(document);
  browser.scroll(() => {
    console.log(browser.scrollTop());
    if (browser.scrollTop() >= 90) {
      $('.task-0').animate({opacity: 0.3}, 15);
    } else {
      $('.task-0').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 1)) {
      $('.task-1').animate({opacity: 0.3}, 30);
    } else {
      $('.task-1').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 2)) {
      $('.task-2').animate({opacity: 0.3}, 30);
    } else {
      $('.task-2').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 3)) {
      $('.task-3').animate({opacity: 0.3}, 30);
    } else {
      $('.task-3').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 4)) {
      $('.task-4').animate({opacity: 0.3}, 30);
    } else {
      $('.task-4').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 5)) {
      $('.task-5').animate({opacity: 0.3}, 30);
    } else {
      $('.task-5').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 6)) {
      $('.task-6').animate({opacity: 0.3}, 30);
    } else {
      $('.task-6').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 7)) {
      $('.task-6').animate({opacity: 0.3}, 30);
    } else {
      $('.task-6').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 8)) {
      $('.task-6').animate({opacity: 0.3}, 30);
    } else {
      $('.task-6').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 9)) {
      $('.task-6').animate({opacity: 0.3}, 30);
    } else {
      $('.task-6').animate({opacity:1}, 0.000000000000001);
    }
    if (browser.scrollTop() >= (90 + 220 * 10)) {
      $('.task-6').animate({opacity: 0.3}, 30);
    } else {
      $('.task-6').animate({opacity:1}, 0.000000000000001);
    }
  });
});

// 90 = (90 + 220 * 0)
// (90 + 90) / 220 = 0
// 530 = (90 + 220 * 2)
// (530 + 90) / 220 * 2
//odd number child


// 310 = (90 + 220 * 1)
// (310 + 90) / 220 = 1
// 750 = (90 + 220 * 3)
// (750 + 90) / 220 = 3
// n-1 need
//even number child