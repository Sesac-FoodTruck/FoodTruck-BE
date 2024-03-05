document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('favoriteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var id = document.getElementById('id').value;
        var favoriteLatitude = document.getElementById('favoriteLatitude').value;
        var favoriteLongitude = document.getElementById('favoriteLongitude').value;
        var locationRadio = document.querySelector('input[name="location_code"]:checked');
        var location_code = locationRadio ? locationRadio.value : 'default';

        axios.post('/favoriteRegister', {
            id: id,
            favoriteLatitude: favoriteLatitude,
            favoriteLongitude: favoriteLongitude,
            location_code: location_code
        })
        .then(function (response) {
            console.log(response);
            alert('Favorite 등록 성공');
        })
        .catch(function (error) {
            console.error("Error occurred:", error.response ? error.response.data : error);
            alert('Favorite 등록 실패: ' + (error.response && error.response.data ? error.response.data.error : 'Unknown error'));
        });
    });
});
