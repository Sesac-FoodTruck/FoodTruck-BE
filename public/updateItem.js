// 서버 라우트에 맞춰 URL 수정
document.getElementById('updateStoreForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var itemid = document.getElementById('storeno').value; // 'itemid'로 변경 가능
    var formData = new FormData();
    formData.append('itemname', document.getElementById('itemname').value);
    formData.append('itemimgurl', document.getElementById('itemimgurl').files[0]);
    formData.append('iteminformation', document.getElementById('iteminformation').value);
    formData.append('itemprice', document.getElementById('itemprice').value);
    formData.append('storeno', document.getElementById('storeno').value);
    
    axios.put('/itemUpdate?itemid=' + itemid, formData, { // URL 수정
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

