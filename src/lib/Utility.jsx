/**
 * Utility functions
 */

export const nextSection = (e, next_section_id) => {
    e.preventDefault();
    $('html, body').animate({scrollTop: $($(next_section_id)).offset().top}, 500, 'linear');
}
