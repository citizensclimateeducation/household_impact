/**
 * Utility functions
 */

import numeral from 'numeral/min/numeral.min.js';

export const nextSection = (e, next_section_id) => {
    e.preventDefault();
    $('html, body').animate({scrollTop: $($(next_section_id)).offset().top}, 500, 'linear');
}

export const toCurrency = (val) => {
  return numeral(val).format('$0,0.00')
}
