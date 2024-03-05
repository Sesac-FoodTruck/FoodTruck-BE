document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var id = document.getElementById('id').value;
        var formData = new FormData();

        var profileImgFile = document.getElementById('chooseFile').files[0];
        if (profileImgFile) {
            formData.append('profileimg', profileImgFile);
        }

        var nickname = document.getElementById('nickname').value;
        if (nickname) {
            formData.append('nickname', nickname);
        }

        var socialId = document.getElementById('social_id').value;
        if (socialId) {
            formData.append('social_id', socialId);
        }

        var socialCode = document.getElementById('social_code').value;
        if (socialCode) {
            formData.append('social_code', parseInt(socialCode));
        }

        var socialToken = document.getElementById('social_token').value;
        if (socialToken) {
            formData.append('social_token', socialToken);
        }

        axios.put('memberUpdate?id=' + id, formData)
        .then(function (response) {
            console.log(response);
            alert('사용자정보 업데이트 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('사용자정보 업데이트 실패');
        });
    });
});
