window.onload = () => {
    document.getElementById('ajax-success').addEventListener('click', () => {

        let blockSuccess = document.getElementById('ajax-data');
        fetch('success.json')
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                console.log(data);
                blockSuccess.innerHTML = `result: "${data.answer}"`;
            });
    });

    document.getElementById('ajax-error').addEventListener('click', () => {

        let blockError = document.getElementById('ajax-data');
        fetch('error.json')
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                console.log(data);
                blockError.innerHTML = `result: "${data.answer}"`;
            });
    });
};