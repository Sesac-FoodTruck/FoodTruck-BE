document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var id = document.getElementById('id').value;
        var formData = {
            nickname: document.getElementById('nickname').value,
            profileimg: document.getElementById('profileimg').value,
            social_id: document.getElementById('social_id').value,
            social_code: parseInt(document.getElementById('social_code').value),
            social_token: document.getElementById('social_token').value
        };

        axios.put('member?id=' + id, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

