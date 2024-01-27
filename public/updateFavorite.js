document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('updateFavoriteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var favoriteno = document.getElementById('favoriteno').value;
        var id = document.getElementById('id').value;
        var favoriteLatitude = document.getElementById('favoriteLatitude').value;
        var favoriteLongitude = document.getElementById('favoriteLongitude').value;
        var locationRadio = document.querySelector('input[name="location_code"]:checked');
        var location_code = locationRadio ? locationRadio.value : 'default';

        var data = {
            favoriteno: favoriteno,
            id: id,
            favoriteLatitude: favoriteLatitude,
            favoriteLongitude: favoriteLongitude,
            location_code: location_code
        };

        axios.put('/favoriteUpdate', data)
        .then(function (response) {
            console.log(response);
            alert('즐겨찾기 위치 업데이트 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('즐겨찾기 위치 업데이트 실패');
        });
    });
});


