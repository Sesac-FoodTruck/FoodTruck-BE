// this script : index.js
// 매장 정보중에 일부를 추가하거나 수정하면 매장 전체 정보를 Refresh해줘야 된다

// 매장정보 불러오는 함수
readData();
async function readData() {
}

window.onload = async function () {
    // 오늘 날짜
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("purchase_date").value = today;

    // POST : 리뷰 - 완료 
    const reviewForm = document.getElementById("reviewForm");
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("review_id").value;
        const storeno = document.getElementById("review_storeno").value;
        const storecontent = document.getElementById("storecontent").value;
        const storerate = document.getElementById("storerate").value;

        axios.post(url + '/truck/review', {
            id: id,
            storeno: storeno,
            storecontent: storecontent,
            storerate: storerate
        })
            .then(function (response) {
                console.log(response.data);
                const { isSuccess, code, message } = response.data;

                if (!isSuccess || code !== 200) {
                    alert(message);
                }
                // readData();
            })
            .catch(function (error) {
                console.log(error);
                alert("Error");
            });
    });
    // POST : 신고 
    const reportForm = document.getElementById("reportForm");
    reportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("report_id").value;
        const storeno = document.getElementById("report_storeno").value;
        // console.log(`입력 : ${id}, ${storeno}`);

        axios.post(url + '/truck/complain', {
            id: id,
            storeno: storeno,
        })
            .then(function (response) {
                console.log(response.data);
                const { isSuccess, code, message } = response.data;

                if (!isSuccess || code !== 200) {
                    alert(message);
                }
                // readData();
            })
            .catch(function (error) {
                console.log(error);
                alert("Error");
            });
    });
    // POST : 좋아요
    const goodForm = document.getElementById("goodForm");
    goodForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("good_id").value;
        const storeno = document.getElementById("good_storeno").value;

        axios.post(url + '/truck/good', {
            id: id,
            storeno: storeno,
        })
            .then(function (response) {
                console.log(response.data);
                const { isSuccess, code, message } = response.data;

                if (!isSuccess || code !== 200) {
                    alert(message);
                }
                // readData();
            })
            .catch(function (error) {
                console.log(error);
                alert("Error");
            });
    });
    // POST : 가계부 등록 : 하단

    let truckId = "";
    if (!truckId) return;

    // GET: 댓글
    try {
        const res = await axios.get(url + `/truck/review/${truckId}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const reviewData = res.data;
        console.log(reviewData);
    } catch (err) {
        console.log(err);
    }

    // GET : 매장 상세정보
    try {
        const res = await axios.get(url + `/truck/detail/${truckId}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const rateData = res.data;
        console.log(rateData);
    } catch (err) {
        console.log(err);
    }

    let id = "";
    if (!id) return;

    // GET : 가계부
    try {
        const res = await axios.get(url + `/account/${id}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const accountData = res.data;
        console.log(accountData);
    } catch (err) {
        console.log(err);
    }
}

// POST : 가계부 등록
async function submitForm(menuName) {
    document.getElementById("purchase_iteminformation").value = menuName;

    const id = document.getElementById("purchase_id").value;
    const date = document.getElementById("purchase_date").value;
    const iteminformation = document.getElementById("purchase_iteminformation").value;

    await axios.post(url + '/account/menu', {
        id: id,
        date: date,
        iteminformation: iteminformation,
    })
        .then(function (response) {
            console.log(response.data);
            const { isSuccess, code, message } = response.data;

            if (!isSuccess || code !== 200) {
                alert(message);
            }
            // readData();
        })
        .catch(function (error) {
            console.log(error);
            alert("Error");
        });
}

// PATCH : 가계부 수정  
function changeQuantity(menuName, factor) {
    document.getElementById("purchase_iteminformation").value = menuName;

    const id = document.getElementById("purchase_id").value;
    const date = document.getElementById("purchase_date").value;
    const iteminformation = document.getElementById("purchase_iteminformation").value;

    // axios.put(url + '/account?date=${data}&menu=${menuName}&method=${method}')
    axios.patch(url + '/account/menu/modify', {
        id: id,
        date: date,
        iteminformation: iteminformation,
        factor: factor,
    })
        .then(function (response) {
            console.log(response.data);
            const { isSuccess, code, message } = response.data;

            if (!isSuccess || code !== 200) {
                alert(message);
            }
            // readData();
        })
        .catch(function (error) {
            console.log(error);
            alert("Error");
        });
}

// DELETE : 가계부 삭제 
async function deleteItem(menuName) {
    document.getElementById("purchase_iteminformation").value = menuName;

    const id = document.getElementById("purchase_id").value;
    const date = document.getElementById("purchase_date").value;
    const iteminformation = document.getElementById("purchase_iteminformation").value;

    try {
        const res = await axios.delete(url + `/account/delete?id=${id}&date=${date}&menu=${iteminformation}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const accountData = res.data;
        console.log(accountData);
    } catch (err) {
        console.log(err);
    }
}