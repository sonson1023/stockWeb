// import yahooFinance from 'yahoo-finance';

// export const getHistoryData = async (symbol) => {

//     const results = await yahooFinance2.search(`${symbol}`);
//     return results;
// }
import axios from "axios";

export const getHistoryData = async (symbol) => {
  console.log(symbol);
  const result = await axios.get(
    `http://localhost:40000/stock?symbol=${symbol}`
  );
  // console.log(result.data);
  return result.data;
};
