const axios = require("axios");

const retrieveUsers = async (req, res, next) => {
  try {
    const { page, rowsPerPage } = req.query;
    const userApiURL = `https://randomuser.me/api/?page=${page}&results=${rowsPerPage}&seed=doom&inc=name,location,email,dob,phone,picture`;
    axios.get(userApiURL).then((results) => {
      res.send(results.data);
      // console.log(results.data);
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { retrieveUsers };
