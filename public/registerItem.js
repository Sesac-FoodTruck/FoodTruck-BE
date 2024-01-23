// Similar to registerStore.js but with different form data
document.getElementById('registerItemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append('itemname', document.getElementById('itemname').value);
    formData.append('itemimgurl', document.getElementById('itemimgurl').files[0]);
    formData.append('iteminformation', document.getElementById('iteminformation').value);
    formData.append('itemprice', document.getElementById('itemprice').value);
    formData.append('storeno', document.getElementById('storeno').value);

    axios.post('/itemRegister', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function(response) {
        console.log(response);
        alert('Menu item registered successfully');
    })
    .catch(function(error) {
        console.error('Menu item registration failed', error);
        alert('Menu item registration failed');
    });
});
