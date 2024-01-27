document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('favoriteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var id = document.getElementById('id').value;
        var favoriteLatitude = document.getElementById('favoriteLatitude').value;
        var favoriteLongitude = document.getElementById('favoriteLongitude').value;
        var locationRadio = document.querySelector('input[name="location_code"]:checked');
        var location_code = locationRadio ? locationRadio.value : 'default'; // Handle the case where no option is selected

        var url = `/favoriteRegister?id=${encodeURIComponent(id)}&favoriteLatitude=${encodeURIComponent(favoriteLatitude)}&favoriteLongitude=${encodeURIComponent(favoriteLongitude)}&location_code=${encodeURIComponent(location_code)}`;

        axios.get(url)
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


