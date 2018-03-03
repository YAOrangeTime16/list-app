self.addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(myPromise);
  }
});

const myPromise = new Promise( (resolve, reject) => {
  setTimeout(function(){
    resolve("Success!");
  }, 250);
})

/*
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('sync', function(event) {
  self.registration.showNotification("Sync event fired!");
});
*/