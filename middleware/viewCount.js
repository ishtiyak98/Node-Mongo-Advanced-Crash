let count = 0;

const viewCont = (req, res, next) => {
    count++;
    console.log(count);
    next();
};

module.exports = viewCont;