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
