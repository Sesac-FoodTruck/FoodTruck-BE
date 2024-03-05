document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('deleteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var id = document.getElementById('id').value;

        axios.delete('/memberDelete?id=' + id)
        .then(function (response) {
            console.log(response);
            alert('사용자정보 삭제 성공');
        })
        .catch(function (error) {
            console.log(error);
            alert('사용자정보 삭제 실패');
        });
    });
});
