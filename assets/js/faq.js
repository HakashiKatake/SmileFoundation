$(document).ready(function() {
    // For all accordions on the page
    $('.faq-accordion').each(function() {
        var $accordion = $(this);
        $accordion.find('.faq-question').click(function() {
            var $item = $(this).closest('.faq-item');
            var isActive = $item.hasClass('active');
            // Close all in this accordion
            $accordion.find('.faq-item').removeClass('active');
            $accordion.find('.faq-question').removeClass('active');
            $accordion.find('.faq-answer').slideUp(200);
            $accordion.find('.faq-arrow').html('&#8250;');
            // Open if not already active
            if (!isActive) {
                $item.addClass('active');
                $(this).addClass('active');
                $item.find('.faq-answer').slideDown(200);
                $(this).find('.faq-arrow').html('&#8964;');
            }
        });
    });
});
