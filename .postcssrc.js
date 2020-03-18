// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins":{
    "postcss-import":{},
    "postcss-url":{},
    "postcss-aspect-ratio-mini":{},
    "postcss-write-svg":{
        utf8:false
    },
    "postcss-cssnext":{},
    "postcss-px-to-viewport":{
        // viewportWidth: 750,
        // viewportHeight: 1334,
        viewportWidth: 375,
        viewportHeight: 667,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines', 'van'], // (Array) The selectors to ignore and leave as px. 
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
        mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
    },
    "cssnano":{
        preset:"advanced",
        autoprefixer:false,
        "postcss-zindex":false
    }
  }
}
