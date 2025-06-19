const { supabase } = require('./client.js')

class ProductModel {
  constructor() {
    this.table = 'products';
  }

  /**
   * Insert a new product.
   * @param {{ 
   *   product_id: string,
   *   sku: string,
   *   name: string,
   *   description?: string,
   *   unit_cost: number,
   *   unit_price: number,
   *   image_url?: string
   * }} product
   * @returns {Promise<object>} inserted row
   */
  async create(product) {
    const { data, error, status } = await supabase
      .from(this.table)
      .insert([ product ])
      .single();// data is a single object of single item inserted;

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Fetch a product by its primary key.
   * @param {string} product_id
   * @returns {Promise<object|null>}
   */
  async findById(product_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('product_id', product_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all products, optionally with pagination.
   * @param {{ page?: number, perPage?: number }} opts
   * @returns {Promise<object[]>}
   */
  async list({ page = 1, perPage = 100 } = {}) {
    const from = (page - 1) * perPage;
    const to   = from + perPage - 1;

    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .range(from, to);

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Update a product by its primary key.
   * @param {string} product_id
   * @param {Partial<{
   *   sku: string,
   *   name: string,
   *   description: string,
   *   unit_cost: number,
   *   unit_price: number,
   *   image_url: string
   * }>} changes
   * @returns {Promise<object>} updated row
   */
  async update(product_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('product_id', product_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete a product by its primary key.
   * @param {string} product_id
   * @returns {Promise<object>} deleted row
   */
  async deleteById(product_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('product_id', product_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}
module.exports = ProductModel;