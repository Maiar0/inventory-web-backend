const { supabase } = require('./client.js');

class StockMovementModel {
  constructor() {
    this.table = 'stock_movements';
  }

  /**
   * Fetch a stock movement by its primary key.
   *
   * @async
   * @function findById
   * @param {number} movement_id      // ID of the stock movement
   * @returns {Promise<object|null>}  // The matching row, or null if not found
   * @throws {Error}                  // On unexpected errors
   */
  async findById(movement_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('movement_id', movement_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all stock movements, optionally paginated.
   *
   * @async
   * @function list
   * @param {{ page?: number, perPage?: number }} opts
   * @returns {Promise<object[]>}      // Array of stock movement rows
   * @throws {Error}
   */
  async list({ page = 1, perPage = 100 } = {}) {
    const from = (page - 1) * perPage;
    const to   = from + perPage - 1;

    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .order('movement_date', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all movements for a given product, optionally paginated.
   *
   * @async
   * @function listByProduct
   * @param {number} product_id       // ID of the product
   * @param {{ page?: number, perPage?: number }} opts
   * @returns {Promise<object[]>}      // Array of matching stock movements
   * @throws {Error}
   */
  async listByProduct(product_id, { page = 1, perPage = 100 } = {}) {
    const from = (page - 1) * perPage;
    const to   = from + perPage - 1;

    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('product_id', product_id)
      .order('movement_date', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = StockMovementModel;
