var imgcat = require('./imgcat');
var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
  console.log('Usage: kgcat [search terms]');
  phantom.exit(-1);
}
var searchTerm = system.args.slice(1).join(' ');

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36';
page.viewportSize = { width: 1024, height: 768 };

page.open('https://www.google.com/search?q=' + searchTerm, function(status) {
  if (status !== 'success') {
    console.log('Failed to retrieve search results')
    phantom.exit(-2);
  }

  var selectorsToRender = ['.vk_c', '.kp-blk'];
  var rendered = false;
  selectorsToRender.forEach(function(selector) {
    var clipRect = page.evaluate(function(selector) {
      var e = document.querySelector(selector);
      var rect = e && e.getBoundingClientRect();
      return rect && {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    }, selector);

    if (clipRect) {
      rendered = true;
      page.clipRect = clipRect;
      console.log(imgcat(page.renderBase64()));
    }
  });

  if (!rendered) {
    console.log('No knowledge graph blocks found on page.');
    phantom.exit(-3);
  } else {
    phantom.exit();
  }
});
