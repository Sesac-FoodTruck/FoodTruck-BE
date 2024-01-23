document.getElementById('registerStoreConfirmForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var storeno = document.getElementById('storeno').value;
    var confirmed = document.getElementById('confirmed').value;

    axios.post('/storeConfirm/' + storeno, { confirmed: confirmed })
    .then(function(response) {
        console.log(response);
        alert('Store confirmation registered successfully');
    })
    .catch(function(error) {
        console.error('Store confirmation registration failed', error);
        alert('Store confirmation registration failed');
    });
});
