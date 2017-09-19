self.addEventListener('message', function(event){
  chrome.notifications.create('newGifs', {
    title : event.data
  });
});
