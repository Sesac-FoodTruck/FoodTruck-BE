document.getElementById('updateStoreConfirmForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var storeno = document.getElementById('storeno').value;
    var confirmed = document.getElementById('confirmed').value;

    axios.put('/storeConfirmUpdate', { storeno: storeno, confirmed: confirmed })
    .then(function(response) {
        console.log(response);
        alert('Store confirmation updated successfully');
    })
    .catch(function(error) {
        console.error('Store confirmation update failed', error);
        alert('Store confirmation update failed');
    });
});
