document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('favoriteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var memberId = document.getElementById('memberId').value;
        var favoriteLatitude = document.getElementById('favoriteLatitude').value;
        var favoriteLongitude = document.getElementById('favoriteLongitude').value;
        var location_code = document.querySelector('input[name="location_code"]:checked').value;

        var formData = {
            memberId: memberId,
            favoriteLatitude: favoriteLatitude,
            favoriteLongitude: favoriteLongitude,
            location_code: location_code
        };

        axios.post('/favoriteRegister', formData)
        .then(function (response) {
            console.log(response);
            alert('Favorite 등록 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('Favorite 등록 실패');
        });
    });
});
