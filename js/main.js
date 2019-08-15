jQuery(document).ready(function($) {

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header fixed on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Real view height for mobile devices
    if (window.matchMedia("(max-width: 767px)").matches) {
        $('#intro').css({ height: $(window).height() });
    }

    // Initiate the wowjs animation library
    new WOW().init();

    // Initialize Venobox
    $('.venobox').venobox({
        bgcolor: '',
        overlayColor: 'rgba(6, 12, 34, 0.85)',
        closeBackground: '',
        closeColor: '#fff'
    });

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Smooth scroll for the menu and links with .scrollto classes
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space - 20;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Gallery carousel (uses the Owl Carousel library)
    $(".gallery-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: { items: 1 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 5 }
        }
    });


    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').trigger('focus')
    })

    var speakers = JSON.parse('{ "speakers" : [' +
        '{ "name":"Eleazar Morales Díaz" , "email":"moralesdiazeleazar@gmail.com", "twitter":"https://twitter.com/axaryk", "img":"img/speakers/eleazar.png", ' +
        '"bio":"Graduado en Ingeniería Informática en Tecnologías de la Información. Se caracteriza por ser una persona motivada en aprender nuevas tecnologías, herramientas y How-To que simplifiquen y automaticen nuestra vida. Ama el deporte, los proyectos DIY, la vida sana y atormentar al personal con sus cánticos aleatorios."   },' +
        '{ "name":"Gema Socorro Rodriguez" , "email":"info@gemasr.com", "twitter":"https://twitter.com/gemamsr", "img":"img/speakers/gema.png", ' +
        '"bio":"Empecé a programar apps para Android hace más de 10 años. Por el camino también hice algunas apps para iOS, algún backend con Python y cuando conocí  Flutter me enamoré! Pero no puedo disimular que mi lenguaje de programación favorito es Kotlin. Me encanta la comunidad que contribuye con Android, personas que sin conocerme han tenido un impacto real en mi carrera y mis conocimientos del framework por el que estoy muy agradecida. Es por ello que me encanta compartir (lo poco!) que sé después de estos años como forma de contribuir a esta comunidad."   },' +
        '{ "name":"Daniel Martín Lambea" , "email":"dmlambea@gmail.com", "twitter":"https://twitter.com/dmlambea", "img":"img/speakers/daniel.png",  ' +
        '"bio":"Ingeniero en Informática y Técnico de Grado Superior de Sistemas de Información en el Servicio Técnico de Informática y Comunicaciones del Cabildo Insular de Tenerife. Por el día se dedica en gran parte al desarrollo de aplicaciones y microservicios, casi todos ellos en Go. También mantiene el clúster de Kubernetes y el sistema de Integración Continua del Cabildo con un fork personalizado de Drone. Desarrollador del módulo del teclado Cougar 500K-700K Gaming Keyboard para el kernel de Linux y colaborador ocasional en proyectos OSS/FLOSS, siempre que la agenda lo permite. Las noches y los fines de semana es un friki irredento que siempre tiene un rato para disfrutar con amigos y familia de los guachinches, la música y los juegos de mesa." }, ' +
        '{ "name":"Manuel Alejandro Bacallado López" , "email":"manuelbacallado89@gmail.com", "twitter":"https://twitter.com/manuelbacallado", "img":"img/speakers/bacallado.png", ' +
        '"bio":"Ingeniero de software. Desarrollador de aplicaciones móviles y diseñador de videojuegos. Amante de las metodologías ágiles y los patrones de diseño. En su tiempo libre se complica la vida con nuevas ideas, proyectos y tecnologías."  }, ' +
        '{ "name":"Sara Lissette Luis Ibáñez" , "email":"lissette.ibnz@gmail.com", "twitter":"https://twitter.com/LissetteIbnz", "img":"img/speakers/lissette.png", ' +
        '"bio":"Desarrolladora Fullstack a la que le apasiona TypeScript, VueJs y React."}, ' +
        '{ "name":"Roberto Diaz" , "email":"roberto@theagilemonkeys.com", "twitter":"https://twitter.com/rdiaz82 ", "img":"img/speakers/roberto.png", ' +
        '"bio":"Soy Software Developer en The Agile Monkeys y un apasionado de la tecnología. Hace ya más de 10 años que trabajo como desarrollador full-stack y no dejo de aprender cosas nuevas y de asombrarme con todo lo que se puede llegar a hacer con la tecnología.     Durante todos estos años he trabajado en algunos proyectos relacionados con el procesado de imagen en tiempo real y realidad aumentada aunque he dedicado la mayor parte de mi tiempo a trabajar en tecnologías móviles y algo de trabajo de server. Desde hace aproximadamente un año y medio empecé a meterme en el mundo de las tecnologías serverless y desde entonces he intentado aprender todo lo posible porque creo que el futuro de la tecnología viene de la mano de todas las tecnologías serverless. "  }' +
        ']}');


    $(document).on("click", ".openSpeakerModal", function() {
        var authorId = $(this).data('id');
        var author = speakers.speakers[authorId];
        $(".modal-body .container .section-header h2").text(author.name);
        $(".modal-body .container .details p").text(author.bio);
        console.log("-->" + author.img);
        $("#modal-pic").attr('src', author.img);

    });

});
