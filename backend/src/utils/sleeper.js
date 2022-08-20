
const sleep = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), seconds * 1000);
    });
};

module.exports = {
    sleep
}