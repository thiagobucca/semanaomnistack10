const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

// index , show , store , update , destroy

module.exports = {
  async destroy(request, response) {

    console.log(request.params);
    const github_username = request.params.github_username;
    const dev = await Dev.remove({ github_username });

    return response.json(dev);
  },
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio = login } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  }
};
