(function () {
  'use strict';

  var tmdb_proxy = {
    name: 'TMDB Custom Proxy',
    version: '1.0.0',
    description: 'Собственный прокси для TMDB',
    path_image: 'luminavista.ru/image/',
    path_api: 'luminavista.ru/api/'
  };

  function filter(u) {
    var s = u.slice(0, 8);
    var e = u.slice(8).replace(/\/+/g, '/');
    return s + e;
  }

  // Переопределяем методы TMDB
  Lampa.TMDB.image = function (url) {
    return filter(Lampa.Utils.protocol() + tmdb_proxy.path_image + url);
  };

  Lampa.TMDB.api = function (url) {
    return filter(Lampa.Utils.protocol() + tmdb_proxy.path_api + url);
  };

  // Отключаем встроенный прокси
  Lampa.Storage.set('proxy_tmdb', false);

  // Удаляем настройки прокси из интерфейса
  Lampa.Settings.listener.follow('open', function (e) {
    if (e.name == 'tmdb') {
      e.body.find('[data-parent="proxy"]').remove();
    }
  });

  console.log('TMDB-Custom-Proxy', 'started');
})();