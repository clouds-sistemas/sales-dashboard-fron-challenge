import {getMonth, isAfter, isBefore} from 'date-fns';

let sales = []
export default class SalesDAO {

  static async addSale({ date, product_code, product_description, quantity, price, total }) {
    let sale = {
      date,
      product_code,
      product_description,
      quantity,
      price,
      total
    }

    sales.push(sale);

    try {
      return sale;
    } catch (error) {
      console.error(error);
      return { error }
    }
  }

  static async getNumberOfSales() {
    return sales.length;
  }

  static async deleteAllSales() {
    try {
      sales = [];
      return true;
    } catch (err) {
      return false;
    }
  }

  static async getSalesByMonth({ startDate, endDate }) {
    let results = sales.filter(sale =>
      isAfter(sale.date, startDate) && isBefore(sale.date,endDate)
    ).reduce((acc, sale) => {
      let month = getMonth(sale.date);
      const { quantity, total } = sale;

      let monthIndex = acc.findIndex(elem => elem.month == month)

      if (acc[monthIndex]) {
        acc[monthIndex].quantity += quantity;
        acc[monthIndex].amount += total;
      } else {
        acc.push({
          month,
          quantity,
          amount: total
        });
      }
      return acc;
    }, []);

    return results;
  }

  static async getBestSellingProduct({ startDate, endDate }, productsPerPage) {
    let results = sales.filter(sale =>
      isAfter(sale.date, startDate) && isBefore(sale.date,endDate)
    ).reduce((acc, sale) => {
      const { product_code, product_description, quantity } = sale;

      let productIndex = acc.findIndex(elem => elem.product_code == product_code);

      if (acc[productIndex]) {
        acc[productIndex].quantity += quantity;
      } else {
        acc.push({
          product_code,
          product_description,
          quantity
        });
      }
      return acc;
    }, []);

    results.sort((a, b) => {
      if (a.quantity < b.quantity) {
        return 1;
      }
      if (a.quantity > b.quantity) {
        return -1;
      }

      return 0
    });

    return results.splice(0,productsPerPage);
  }
}
