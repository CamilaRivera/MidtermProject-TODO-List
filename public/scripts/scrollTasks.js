$(() => {
  const browser = $(document);
  browser.scroll(() => {
    if (browser.scrollTop() <= 50) {
      $('.list-title').fadeTo(25, 0.9);
    } else {
      $('.list-title').fadeTo(1, 0.00000000001);
    }
    
  });
});
