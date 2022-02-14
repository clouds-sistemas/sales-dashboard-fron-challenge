import fs from 'fs';
import csv from 'csv-parser';

import SalesDAO from './sales.dao.js';



export default class SalesController {
  static async apiNumberOfSales(request, response) {
    const numberOfSales = await SalesDAO.getNumberOfSales();

    return response.json({ "number_of_sales": numberOfSales });
  }

  static async apiUploadSales(request, response) {
    try {
      const { file} = request;
      SalesDAO.deleteAllSales();
      
      fs.createReadStream(file.path)
        .pipe(csv({ separator: ';', quote: '"' }))
        .on('data', async (data) => {
          let date = data.DATA;
         
          await SalesDAO.addSale({
            date: new Date(`${date.substr(6,4)}-${date.substr(3,2)}-${date.substr(0,2)}T${data.HORA}:00`),
            product_code: data.CODIGO,
            product_description: data.DESCRICAO,
            quantity: parseFloat(data.QUANTIDADE.replace(',', '.')),
            price: parseFloat(data.PRECO_UNITARIO.replace(',', '.')),
            total: parseFloat(data.TOTAL.replace(',', '.'))
          });
        }).on('end', async () => {
          const inserted = await SalesDAO.getNumberOfSales();
          return response.json({
            "inserted": inserted,
            "message": `Registros inseridos`
          });
        });
    } catch (error) {
      console.error({ error });
      return response.status(400).json({ message: error });
    }
  }

  static async apiDeleteSales(request, response) {
    const { id } = request.params;

    const deleted = (id === 'all') ? await SalesDAO.deleteAllSales() : false;

    if (deleted) {
      return response.json({ "message": "Registros de vendas removidos com sucesso" })
    } else {
      return response.status(400).json({ "message": "Não foi possível apagar registros de vendas" })
    }
  }

  static async apiSalesByMonth(request, response) {
    const filters = {
      startDate: new Date(request.query['start_date']),
      endDate: new Date(request.query['end_date'])
    }
    const sales = await SalesDAO.getSalesByMonth(filters);
    return response.json({ sales })
  }

  static async apiBestSellingProduct(request, response) {
    const entriesPerPage = request.query['entries_per_page'] || 20;

    const filters = {
      startDate: new Date(request.query['start_date']),
      endDate: new Date(request.query['end_date']),
    }
    

    const products = await SalesDAO.getBestSellingProduct(filters, entriesPerPage);
    const responseData = {
      products,
      "entries_per_page": entriesPerPage,
      "total_results": products.length
    }

    return response.json(responseData);
  }
}