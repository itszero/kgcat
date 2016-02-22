(function() {
  var STR_PRIVACY_REMINDER = "A privacy reminder from Google";
  var STR_PEOPLE_ALSO_ASK = "People also ask";
  var noop = function() {};
  function toArray(arrAlike) { return Array.prototype.slice.call(arrAlike); }

  function flatMap(arr, func) {
    var result = [];
    arr.forEach(function(item) {
      var mapResult = func(item);
      mapResult.forEach(function(mapItem) {
        result.push(mapItem);
      });
    });

    return result;
  }

  function clipRectFromElement(e) {
    var rect = e && e.getBoundingClientRect();
    return rect && {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  }

  function findElementsBySelector(selector) {
    var elements = toArray(document.querySelectorAll(selector));

    return elements.map(function (e) {
      /* Reject privacy reminder and People may also ask */
      if (
        e && (
          e.innerText.indexOf(STR_PRIVACY_REMINDER) > -1 ||
          e.innerText.indexOf(STR_PEOPLE_ALSO_ASK) > -1
        )
      ) {
        return null;
      }

      return clipRectFromElement(e);
    });
  }

  function __kgcat__findKGClipRects() {
    /**
     * .vk_c: main knowledge graph block
     * .kp-blk: smaller knowledge graph block or sidebar
     * .kno-himx: medical sideinfo
     */
    var selectorsToRender = ['.vk_c', '.kp-blk', '.kno-himx'];
    return flatMap(selectorsToRender, findElementsBySelector)
      .filter(function(rect) { return !!rect; });
  }
  window.__kgcat__findKGClipRects = __kgcat__findKGClipRects;
})();
