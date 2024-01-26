<<<<<<< HEAD
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
            alert('맴버등록 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('맴버등록 실패');
        });
    });
});

=======
document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var memberId = document.getElementById('memberId').value;
    var formData = {
        nickname: document.getElementById('nickname').value,
        profileimg: document.getElementById('profileimg').value,
        social_id: document.getElementById('social_id').value,
        social_code: parseInt(document.getElementById('social_code').value),
        social_token: document.getElementById('social_token').value
    };

    // 서버 주소 및 포트 확인
    axios.put('http://localhost:5000/member/' + memberId, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response);
        alert('Member updated successfully');
    })
    .catch(function (error) {
        console.log(error);
        alert('Error updating member');
    });
});
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
