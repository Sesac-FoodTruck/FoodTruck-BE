// Similar to registerFavorite.js but with the following changes:

document.getElementById('updateFavoriteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var registrationno = document.getElementById('registrationno').value;
    // Rest of the formData remains the same

    axios.put('/favoriteUpdate/' + registrationno, formData)
    .then(function (response) {
        console.log(response);
        alert('Favorite 업데이트 성공');
    })
    .catch(function (error) {
        console.log(error);
        alert('Favorite 업데이트 실패');
    });
});
