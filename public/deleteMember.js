// document.getElementById('deleteForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     var memberId = document.getElementById('id').value;

//     axios.delete('/member?id' + id)
//     .then(function (response) {
//         console.log(response);
//         alert('사용자삭제 성공');
//     })
//     .catch(function (error) {
//         console.log(error);
//         alert('사용자 삭제 에러');
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('deleteForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var id = document.getElementById('id').value;

        axios.delete('http://localhost:5000/member?id=' + id)
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
