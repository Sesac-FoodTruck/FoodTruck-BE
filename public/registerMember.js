// registerMember.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('id', document.getElementById('id').value);
        formData.append('nickname', document.getElementById('nickname').value);
        formData.append('profileimg', document.getElementById('chooseFile').files[0]);
        formData.append('social_id', document.getElementById('social_id').value);
        formData.append('social_code', document.getElementById('social_code').value);
        formData.append('social_token', document.getElementById('social_token').value);

        axios.post('/memberRegister', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            console.log(response);
            alert('사용자 등록 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('사용자 등록 실패');
        });
    });
});

