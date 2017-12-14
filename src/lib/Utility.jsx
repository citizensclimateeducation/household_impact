/**
 * Utility functions
 */

import React from 'react';
import numeral from 'numeral/min/numeral.min.js';

export const nextSection = (e, next_section_id) => {
  e.preventDefault();
  $(next_section_id).removeClass('initially_hidden');
  $('html, body').animate({scrollTop: $($(next_section_id)).offset().top}, 500, 'linear');
}

export const toCurrency = (val, format = '$0,0.00') => {
  return numeral(val).format(format)
}

const range = (start, end) => { return [...Array(1+end-start).keys()].map(v => start+v) }

export const numberOptionList = (begin, end) => {
  return range(begin, end).map((val) =>
    <option key={val}>{val}</option>
  )
}
