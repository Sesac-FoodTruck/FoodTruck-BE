document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // 폼 기본 제출 막기

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const distance = 0.1; // 100m

    try {
        const response = await fetch(`http://localhost:5000/calculate/${latitude}/${longitude}/${distance}`);
        const stores = await response.json();

        displayStores(stores);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayStores(stores) {
    // 여기에 매장 목록을 페이지에 표시하는 로직 구현
    console.log(stores);
}

function checkNearbyStores() {
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const distance = 0.1; // 100m

    fetch(`http://localhost:5000/calculate/${latitude}/${longitude}/${distance}`)
        .then(response => response.json())
        .then(stores => {
            console.log(stores); // 콘솔에 매장 목록 로그
            // 필요하다면 여기에서 매장 목록을 페이지에 표시할 수 있음
        })
        .catch(error => console.error('Error:', error));
}

function readImageMetadata(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];

        EXIF.getData(file, function() {
            const lat = EXIF.getTag(this, "GPSLatitude");
            const lon = EXIF.getTag(this, "GPSLongitude");
            const latRef = EXIF.getTag(this, "GPSLatitudeRef");
            const lonRef = EXIF.getTag(this, "GPSLongitudeRef");

            if (lat && lon && latRef && lonRef) {
                const latitude = convertDMSToDD(lat[0].numerator, lat[1].numerator, lat[2].numerator, latRef);
                const longitude = convertDMSToDD(lon[0].numerator, lon[1].numerator, lon[2].numerator, lonRef);

                document.getElementById('image-metadata').innerHTML = '위도: ' + latitude + ', 경도: ' + longitude;
            } else {
                document.getElementById('image-metadata').innerHTML = '위도, 경도 정보를 찾을 수 없습니다.';
            }
        });
    }
}

function submitForm() {
    const formData = new FormData(document.getElementById('registerForm'));
    // AJAX 요청으로 폼 데이터 제출
}

function convertDMSToDD(degrees, minutes, seconds, direction) {
    let dd = degrees + minutes / 60 + seconds / (60 * 60);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
    } 
    return dd;
}