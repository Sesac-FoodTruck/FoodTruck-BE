document.getElementById('updateStoreForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var storeno = document.getElementById('storeno').value;
    var formData = new FormData();
    formData.append('storename', document.getElementById('storename').value);
    formData.append('storetime', document.getElementById('storetime').value);
    formData.append('categoryid', document.getElementById('categoryid').value);
    formData.append('storeweek', document.getElementById('storeweek').value);
    formData.append('photos', document.getElementById('photos').files[0]);
    formData.append('contact', document.getElementById('contact').value);
    formData.append('account', document.getElementById('account').value);
    formData.append('payment', document.getElementById('payment').value);
    formData.append('latitude', document.getElementById('latitude').value);
    formData.append('longitude', document.getElementById('longitude').value);
    formData.append('confirmed', document.getElementById('confirmed').value);
    formData.append('id', document.getElementById('id').value);
    formData.append('reportcount', document.getElementById('reportcount').value);

    axios.put('/storeUpdate?storeno=' + storeno, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function(response) {
        console.log(response);
        alert('Store updated successfully');
    })
    .catch(function(error) {
        console.error('Store update failed', error);
        alert('Store update failed');
    });
});