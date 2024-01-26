document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('updateFavoriteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var favoriteno = document.getElementById('favoriteno').value;
        var id = document.getElementById('id').value;
        var favoriteLatitude = document.getElementById('favoriteLatitude').value;
        var favoriteLongitude = document.getElementById('favoriteLongitude').value;
        var location_code = document.querySelector('input[name="location_code"]:checked').value;

        var url = `/favoriteUpdate?favoriteno=${encodeURIComponent(favoriteno)}&id=${encodeURIComponent(id)}&favoriteLatitude=${encodeURIComponent(favoriteLatitude)}&favoriteLongitude=${encodeURIComponent(favoriteLongitude)}&location_code=${encodeURIComponent(location_code)}`;

        axios.put(url)
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

