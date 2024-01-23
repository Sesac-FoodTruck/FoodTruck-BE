document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var memberId = document.getElementById('memberId').value;

    axios.delete('/member/' + memberId)
    .then(function (response) {
        console.log(response);
        alert('사용자삭제 성공');
    })
    .catch(function (error) {
        console.log(error);
        alert('사용자 삭제 에러');
    });
});
