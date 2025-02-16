/*
 * Copyright (c) 2010-2023 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */

import {CachedElement, strings} from '../index';

/**
 * Replaces character HTML entities (e.g. &amp;nbsp;, &amp;gt;, etc.).
 */
export default class PlainTextEncoder {
  constructor() {
    this.cache = new CachedElement('textarea');
  }

  encode(text, options) {
    options = options || {};
    if (!text) {
      return text;
    }
    text = strings.asString(text);

    // Regexp is used to replace the tags.
    // It is not possible to use jquery's text() function or to create a html element and use textContent, because the new lines get omitted.
    // Node.innerText would preserve the new lines but it is not supported by firefox

    // Preserve new lines
    text = text.replace(/<br>|<br\/>|<\/p>|<p\/>|<\/div>|<\/li>|<\/tr>/gi, '\n');

    // Separate td with ' '
    text = text.replace(/<\/td>/gi, ' ');

    if (options.removeFontIcons) {
      text = text.replace(/<span\s+class="[^"]*font-icon[^"]*">[^<]*<\/span>/gmi, '');
    }

    // Remove script and style contents
    text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    // Replace remaining tags
    text = text.replace(/<[^>]+>/gi, '');

    // Convert decimal nrc to unicode
    text = text.replace('&zwj;', String.fromCharCode(0x200D)); // zero width joiner for combined chars
    text = text.replace(/&#(\\d+);/gi, (match, group1) => String.fromCharCode(group1));

    // Remove spaces at the beginning and end of each line
    text = text.replace(/^[ ]+/gm, '');
    text = text.replace(/[ ]+$/gm, '');

    if (options.compact) {
      // Compact consecutive empty lines. One is enough
      text = text.replace(/\n{3,}/gm, '\n\n');
    }
    if (options.trim) {
      text = text.trim();
    }

    let textarea = this.cache.get();
    textarea.innerHTML = text;
    return textarea.value;
  }
}
