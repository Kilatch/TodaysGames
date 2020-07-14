import axios from "axios";
const url = `https://api.rawg.io/api/games?`;

const fetchData = async (page, date) => {
  date = "2020-07-10"
  let date2 = "2020-07-10"
  try {
    const {
      data
    } = await axios.get(url + `page=${page}&page_size=4&dates=${date},${date2}`);
    return data;
  } catch (error) {}
};

export default fetchData