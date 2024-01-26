// this script : index.js
// 매장 정보중에 일부를 추가하거나 수정하면 매장 전체 정보를 Refresh해줘야 된다

// 매장정보 불러오는 함수
readData();
async function readData() {

}

window.onload = async function () {

    // POST : 댓글 - 완료 
    const reviewForm = document.getElementById("reviewForm");
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("review_id").value;
        const storeno = document.getElementById("review_storeno").value;
        const storecontent = document.getElementById("storecontent").value;

        axios.post(url + '/truck/review'
            , {
                id: id,
                storeno: storeno,
                storecontent: storecontent
            })
            .then(function (response) {
                console.log(response.data);
                const { isSuccess, code, message } = response.data;

                if (!isSuccess || code !== 200) {
                    alert(message);
                }
                readData();
            })
            .catch(function (error) {
                console.log(error);
                alert("Error");
            });
    });
    // POST : 별점 - 완료
    const ratingForm = document.getElementById("rateForm");
    ratingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("rate_id").value;
        const storeno = document.getElementById("rate_storeno").value;
        const storerate = document.getElementById("storerate").value;

        axios.post(url + '/truck/rate', {
            id: id,
            storeno: storeno,
            storerate: storerate
        })
            .then(function (response) {
                console.log(response.data);
                const { isSuccess, code, message } = response.data;

                if (!isSuccess || code !== 200) {
                    alert(message);
                }
                readData();
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
                readData();
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
                readData();
            })
            .catch(function (error) {
                console.log(error);
                alert("Error");
            });
    });
    // POST : 즐겨찾기
    const favoriteForm = document.getElementById("favoriteForm");
    favoriteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("favorite_id").value;
        const storeno = document.getElementById("favorite_storeno").value;

        axios.post(url + '/mypage/favorite', {
            id: id,
            storeno: storeno,
        })
            .then(function (response) {
                console.log(response.data);
                const { isSuccess, code, message } = response.data;

                if (!isSuccess || code !== 200) {
                    alert(message);
                }
                readData();
            })
            .catch(function (error) {
                console.log(error);
                alert("Error");
            });
    });
    // POST : 가계부 등록 : 외부로

    let storeno = "";
    if (!storeno) return;

    // GET : Store

    // GET : 댓글 
    try {
        const res = await axios.get(url + `/truck/review/${storeno}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const reviewData = res.data;
        console.log(reviewData);
    } catch (err) {
        console.log(err);
    }
    // GET : 별점
    try {
        const res = await axios.get(url + `/truck/rate/${storeno}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const rateData = res.data;
        console.log(rateData);
    } catch (err) {
        console.log(err);
    }
    // GET : 매장 상세정보
    try {
        const res = await axios.get(url + `/truck/detail/${storeno}`);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }
        const rateData = res.data;
        console.log(rateData);
    } catch (err) {
        console.log(err);
    }
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
// const purchaseForm = document.getElementById("purchaseForm");
function submitForm(menuName) {
    document.getElementById("purchase_iteminformation").value = menuName;

    const id = document.getElementById("purchase_id").value;
    const iteminformation = document.getElementById("purchase_iteminformation").value;

    axios.post(url + '/account/menu', {
        id: id,
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