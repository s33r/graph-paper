requirejs.config({
    baseUrl: 'script'
});

requirejs(['main'], function (main) {
    main.run('mainCanvas');
});

