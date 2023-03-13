// Этот необязательный код используется для регистрации работника службы. register() по умолчанию не вызывается.

// Это позволяет приложению загружаться быстрее при последующих посещениях в рабочей среде и дает ему возможность работать в автономном режиме. Однако это также означает, что разработчики (и пользователи) будут видеть развернутые обновления только при последующих посещениях страницы, после того как все существующие вкладки, открытые на странице, будут закрыты, поскольку ранее кэшированные ресурсы обновляются в фоновом режиме.

// Чтобы узнать больше о преимуществах этой модели и инструкциях по включению, прочитайте http://bit.ly/CRA-PWA.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] это адрес Localhost IPv6.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 считается Localhost для IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // Конструктор URL доступен во всех браузерах, поддерживающих SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Наш сервис-воркер не будет работать, если PUBLIC_URL находится в другом источнике, отличном от того, на котором обслуживается наша страница. Это может произойти, если CDN используется для обслуживания активов; см. https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Это работает на локальном хосте. Давайте проверим, существует ли сервис-воркер или нет.
        checkValidServiceWorker(swUrl, config);

        // Добавьте дополнительное ведение журнала на локальный хост, указав разработчикам на документацию сервисного работника/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "Это веб-приложение обслуживается в кеш " +
              "работник.Чтобы узнать больше, посетить http://bit.ly/CRA-PWA"
          );
        });
      } else {
        // Не является локальным хостом. Просто зарегистрируйте сервисного работника
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // На этом этапе обновленный предварительно кэшированный контент был получен, но предыдущий сервис-воркер будет по-прежнему обслуживать более старый контент, пока все вкладки клиента не будут закрыты.
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See http://bit.ly/CRA-PWA."
              );

              // Выполнить обратный вызов
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // На данный момент все предварительно кэшировано. Это идеальное время, чтобы отобразить «Контент кэширован для автономного использования». сообщение.
              console.log("Content is cached for offline use.");

              // Выполнить обратный вызов
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
