document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('favoriteForm').addEventListener('submit', function (e) {
        e.preventDefault();

<<<<<<< HEAD
        var id = document.getElementById('id').value;
=======
        var memberId = document.getElementById('memberId').value;
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
        var favoriteLatitude = document.getElementById('favoriteLatitude').value;
        var favoriteLongitude = document.getElementById('favoriteLongitude').value;
        var location_code = document.querySelector('input[name="location_code"]:checked').value;

<<<<<<< HEAD
        var url = `/favoriteRegister?id=${encodeURIComponent(id)}&favoriteLatitude=${encodeURIComponent(favoriteLatitude)}&favoriteLongitude=${encodeURIComponent(favoriteLongitude)}&location_code=${encodeURIComponent(location_code)}`;

        axios.get(url)
=======
        var formData = {
            memberId: memberId,
            favoriteLatitude: favoriteLatitude,
            favoriteLongitude: favoriteLongitude,
            location_code: location_code
        };

        axios.post('/favoriteRegister', formData)
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
        .then(function (response) {
            console.log(response);
            alert('Favorite 등록 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('Favorite 등록 실패');
        });
    });
<<<<<<< HEAD
});
=======
});
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
