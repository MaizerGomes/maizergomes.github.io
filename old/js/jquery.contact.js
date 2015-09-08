(function ($) {
    "use strict";
    jQuery(document).ready(function () {
        function putMessage(message) {
            document.getElementById('message').innerHTML = message;
            $('#message').slideDown('slow');
            $('#cform img.contact-loader').fadeOut('slow', function () {
                $(this).remove();
            });
            $('#submit').removeAttr('disabled');
        }

        function IsEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function checkData() {
            var name  = $('#name').val();
            var email = $('#email').val();
            var body  = $('#comments').val();

            if (name == "" || email == "" || body == "") {
                putMessage("Todos campos devem ser preenchidos!");
                return;
            } else if ($('#_gotcha').val() != "") {
                putMessage("Lamentamos mas ocorreu um erro!");
                return;
            } else if (body.length < 10) {
                putMessage("A mensagem tem que possuir no mínimo 10 caracteres!");
                return;
            } else if (!IsEmail(email)) {
                putMessage("Por favor, providencie um email válido!");
                return;
            }
            return true;
        }

        $('#cform').submit(function (e) {
            e.preventDefault();
            var action = $(this).attr('action') + "/maizer.gomes@gmail.com";

            $("#message").slideUp(750, function () {
                $('#message').hide();

                $('#submit')
                    .before('<img src="images/ajax-loader.gif" class="contact-loader" />')
                    .attr('disabled', 'disabled');

                if (!checkData()) {
                    return;
                }

                $.post(action, {
                        name    : $('#name').val(),
                        email   : $('#email').val(),
                        body    : $('#comments').val(),
                        _subject: $('#_subject').val(),
                        _gotcha : $('#_gotcha').val(),
                    },
                    function (data) {
                        if (data && data.success) {
                            putMessage("Muito obrigado pela sua mensagem!");
                            $('#cform').slideUp('slow');
                        } else {
                            putMessage("Lamentamos mas occoreu um erro!");
                        }
                    }, "json"
                );

            });

            return false;

        });

    });

}(jQuery));