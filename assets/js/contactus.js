$(document).ready(function() {
    $('.accordion-header').click(function() {
        var $item = $(this).closest('.accordion-item');
        var $content = $item.find('.accordion-content');
        var $icon = $(this).find('.accordion-icon');
        var expanded = $(this).attr('aria-expanded') === 'true';
        if (expanded) {
            $content.slideUp(200);
            $(this).attr('aria-expanded', 'false');
            $icon.text('+');
        } else {
            $content.slideDown(200);
            $(this).attr('aria-expanded', 'true');
            $icon.text('-');
        }
    });

    // Regional Offices Tab Switcher
    $('.visit-tab').click(function() {
        var tab = $(this).data('tab');
        $('.visit-tab').removeClass('active');
        $(this).addClass('active');
        $('.visit-tab-content').hide();
        $('#visit-tab-' + tab).css('display', 'flex');
    });
});
