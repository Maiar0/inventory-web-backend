const { supabase } = require('./client.js');

class ReturnItemModel {
  constructor() {
    this.table = 'return_items';
  }

  /**
   * Insert a new return line item.
   *
   * @async
   * @function create
   * @param {{
   *   return_item_id?: number,  // optional if auto‐generated
   *   return_id: number,        // ID of the parent return
   *   product_id: number,       // ID of the returned product
   *   quantity: number,         // quantity returned
   *   unit_price: number,       // price per unit at time of return
   *   line_total: number        // total for this line (quantity * unit_price)
   * }} item
   * @returns {Promise<object>}   The inserted return_item row
   * @throws {Error}              If the insert fails
   */
  async create(item) {
    const { data, error, status } = await supabase
      .from(this.table)
      .insert([ item ])
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Fetch a return line item by its primary key.
   *
   * @async
   * @function findById
   * @param {number} return_item_id
   * @returns {Promise<object|null>}
   * @throws {Error}              On unexpected errors
   */
  async findById(return_item_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('return_item_id', return_item_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all return line items, optionally paginated.
   *
   * @async
   * @function list
   * @param {{ page?: number, perPage?: number }} opts
   * @returns {Promise<object[]>}
   * @throws {Error}
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
   * Update a return line item by its primary key.
   *
   * @async
   * @function update
   * @param {number} return_item_id
   * @param {Partial<{
   *   quantity: number,
   *   unit_price: number,
   *   line_total: number
   * }>} changes
   * @returns {Promise<object>}   The updated return_item row
   * @throws {Error}
   */
  async update(return_item_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('return_item_id', return_item_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete a return line item by its primary key.
   *
   * @async
   * @function deleteById
   * @param {number} return_item_id
   * @returns {Promise<object>}   The deleted return_item row
   * @throws {Error}
   */
  async deleteById(return_item_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('return_item_id', return_item_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = ReturnItemModel;
