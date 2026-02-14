// GTMイベント発火
document.addEventListener('DOMContentLoaded', function() {
  // data-cta属性を持つ要素にイベントリスナーを追加
  const ctaElements = document.querySelectorAll('[data-cta]');
  
  ctaElements.forEach(function(element) {
    element.addEventListener('click', function(e) {
      const ctaType = this.getAttribute('data-cta');
      const gtmLabel = this.getAttribute('data-gtm-label') || ctaType;
      
      // GTMイベント発火
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          'event': 'cta_click',
          'cta_type': ctaType,
          'cta_label': gtmLabel
        });
      }
    });
  });
});
