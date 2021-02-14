'use strict';

/**
 * Client/server plugin
 */

const markdownItContainer = require('markdown-it-container');
const parseAttrs = require('../utils/parseAttrs');
// const t = require('engine/i18n/t');
// const config = require('config');

// t.i18n.add('markit.outlined', require('../locales/outlined/' + config.lang + '.yml'));

module.exports = function(md) {

  ['warn', 'smart', 'ponder'].forEach(name => {
    md.use(markdownItContainer, name, {
      marker: '`',
      render(tokens, idx, options, env, slf) {
        // console.log("!!!", ['warn', 'smart', 'ponder']);
        if (tokens[idx].nesting === 1) {
          let attrs = parseAttrs(tokens[idx].info, true);
          // console.log(attrs)
          let header = attrs.header;
          if (header) {
            //header = header.replace(/`(.*?)`/g, '<code>$1</code>');
            header = md.renderInline(header);
          } else {
            header = "" //name //t(`markit.outlined.${name}`);
          }

          let classMapper = {
            warn: "warning--text",
            smart: "info--text",
            ponder: "secondary--text",
          }
          
          return `<div class="v-card v-card--outlined theme--light pa-5 ma-5">
            <div class="font-weight-bold ${classMapper[name]}">${header}</div>
            <div>`;

        } else {
          // closing tag
          return '</div></div>\n';
        }
      }
    });
  });



};
