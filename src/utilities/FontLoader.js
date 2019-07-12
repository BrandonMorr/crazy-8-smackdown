import WebFont from 'webfontloader';

/**
 * @class - Font loader class to handle loading Web Fonts.
 */
export default class FontLoader {

  /**
   * Load the 'Open Sans' Google webfont family.
   *
   * Worth noting this doesn't do anything at the moment...
   */
  static loadWebFontOpenSans() {
    WebFont.load = {
      google: {
        families: [ 'Open Sans', 'Open Sans:bold' ]
      },
      active: function() {
        console.log("hi");
      }
    };
  }
}
