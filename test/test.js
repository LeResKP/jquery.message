(function($){

    QUnit.module('jQuery.message');

    QUnit.testStart(function(){
        $(document).removeData('message');
        $('body').find('.message').remove();
    });

    test("message.init", function() {
        expect(5);
        $(document).message();
        var box = $('.message');
        var overlay = $('#message-overlay');
        var btn_close = box.find('.btn-close');
        equal(box.length, 1, 'Message created');
        equal(overlay.length, 1, 'Overlay created');
        equal(btn_close.length, 1, 'Overlay created');
        equal(box.css('display'), 'none', 'Message is hidden');
        equal(overlay.css('display'), 'none', 'Overlay is hidden');
    });

    test("message._get_options", function() {
        expect(36);
        var msg = $(document).message().data('message');
        var opts = msg._get_options();
        var keys = ['info', 'success', 'error'];
        var props = ['extra_class', 'autohide', 'overlay', 'modal']
        for (i in keys){
            var key = keys[i];
            for (j in props){
                var prop = props[j];
                ok(key in opts[prop]), 'key ' + key + ' in extra_class';
            }
        }

        var opts = msg._get_options('info');
        equal(opts['extra_class'], 'message-info', 'opts extra_class');
        equal(opts['autohide'], '1000', 'opts autohide');
        equal(opts['overlay'], false, 'opts overlay');
        equal(opts['modal'], false, 'opts modal');
        ok(opts['selector'], 'opts selector');
        equal(opts['selector']['message'], '.message', 'opts selector message');
        ok(opts['template'], 'opts template');
        ok(opts['css'], 'opts css');

        var opts = msg._get_options('info', {
            'extra_class': 'extra-class',
            'selector': {'message': '.message-selector'}
        });
        equal(opts['extra_class'], 'extra-class', 'opts extra_class');
        equal(opts['autohide'], '1000', 'opts autohide');
        equal(opts['overlay'], false, 'opts overlay');
        equal(opts['modal'], false, 'opts modal');
        ok(opts['selector'], 'opts selector');
        equal(opts['selector']['message'], '.message-selector', 'opts selector message');
        ok(opts['template'], 'opts template');
        ok(opts['css'], 'opts css');

        $(document).removeData('message');
        var msg = $(document).message({
            'extra_class': {'info': 'extra-cls'},
            'selector': {'message': '.message-updated'}
        }).data('message');

        var opts = msg._get_options('info', {
            'extra_class': 'extra-message-class',
        });
        equal(opts['extra_class'], 'extra-message-class', 'opts extra_class');
        equal(opts['autohide'], '1000', 'opts autohide');
        equal(opts['overlay'], false, 'opts overlay');
        equal(opts['modal'], false, 'opts modal');
        ok(opts['selector'], 'opts selector');
        equal(opts['selector']['message'], '.message-updated', 'opts selector message');
        ok(opts['template'], 'opts template');
        ok(opts['css'], 'opts css');
    });

    test("message._get_class", function() {
        expect(1);
        var msg = $(document).message().data('message');
        var result = msg._get_class('test-class');
        var expected = 'message test-class';
        equal(result, expected, 'Test _get_class');
    });

    test("message._add_arguments", function() {
        expect(4);
        var msg = $(document).message().data('message');
        var lis = ['second', 'third'];
        var result = msg._add_arguments('first', lis);
        equal(result.length, 3, 'Test length _add_arguments');
        equal(result[0], 'first', 'Test _add_arguments [0]');
        equal(result[1], 'second', 'Test _add_arguments [1]');
        equal(result[2], 'third', 'Test _add_arguments [2]');
    });

    test("message._show", function() {
        expect(18);
        $(document).message('_show', 'info', 'Hello world');
        var msg = $(document).data('message');
        var box = $('.message');
        var overlay = $('#message-overlay');
        var btn_close = box.find('.btn-close');
        equal(box.length, 1, 'Message create');
        equal(overlay.length, 1, 'Overlay created');
        equal(btn_close.length, 1, 'Overlay created');
        equal(box.css('display'), '', 'Message is displayed');
        equal(overlay.css('display'), 'none', 'Overlay is hidden');
        equal(btn_close.css('display'), '', 'btn_close is displayed');
        equal(box.attr('class'), 'message message-info');
        equal(box.find('.text').html(), 'Hello world');
        ok(msg.autohide_timeout, 'autohide_timeout exists')

        $(document).removeData('message');
        $('body').find('.message').remove();

        $(document).message('_show', 'info', 'Hello world', {
            'overlay': true,
            'modal': true,
            'autohide': false,
        });
        var msg = $(document).data('message');
        var box = $('.message');
        var overlay = $('#message-overlay');
        var btn_close = box.find('.btn-close');
        equal(box.length, 1, 'Message create');
        equal(overlay.length, 1, 'Overlay created');
        equal(btn_close.length, 1, 'Overlay created');
        equal(box.css('display'), '', 'Message is displayed');
        equal(overlay.css('display'), '', 'Overlay is displayed');
        equal(btn_close.css('display'), 'none', 'btn_close is hidden');
        equal(box.attr('class'), 'message message-info');
        equal(box.find('.text').html(), 'Hello world');
        equal(typeof msg.autohide_timeout, 'undefined', "autohide_timeout doesn't exist");
    });

    test("message.info", function() {
        expect(2);
        $(document).message('info', 'Hello world');
        var box = $('.message');
        equal(box.attr('class'), 'message message-info');
        equal(box.find('.text').html(), 'Hello world');
    });

    test("message.success", function() {
        expect(2);
        $(document).message('success', 'Hello world');
        var box = $('.message');
        equal(box.attr('class'), 'message message-success');
        equal(box.find('.text').html(), 'Hello world');
    });

    test("message.error", function() {
        expect(2);
        $(document).message('error', 'Hello world');
        var box = $('.message');
        equal(box.attr('class'), 'message message-error');
        equal(box.find('.text').html(), 'Hello world');
    });

    test("message.click.close", function() {
        expect(2);
        $(document).message('error', 'Hello world');
        var box = $('.message');
        equal(box.css('display'), '', 'Message is displayed');
        $.fn.fadeOut = $.fn.hide
        box.find('.btn-close').click();
        equal(box.css('display'), 'none', 'Message is hidden');
    });

    test("message.close", function() {
        expect(2);
        $(document).message('error', 'Hello world');
        var box = $('.message');
        equal(box.css('display'), '', 'Message is displayed');
        $.fn.fadeOut = $.fn.hide
        $(document).message('close');
        equal(box.css('display'), 'none', 'Message is hidden');
    });

})(window.jQuery);
