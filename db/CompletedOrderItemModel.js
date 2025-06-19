const { supabase } = require('./client.js');

class CompletedOrderItemModel {
  constructor() {
    this.table = 'completed_order_items';
  }

  /**
   * Insert a new completed order line item.
   *
   * @async
   * @function create
   * @param {{
   *   completed_item_id?: number, // optional if auto‐generated
   *   order_id: number,           // ID of the completed order
   *   product_id: number,         // ID of the product
   *   quantity: number,           // quantity completed
   *   unit_price: number,         // unit price at completion
   *   line_total: number          // total for this line (quantity * unit_price)
   * }} item
   * @returns {Promise<object>}      The inserted completed_order_items row
   * @throws {Error}                 If the insert fails
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
   * Fetch a completed order item by its primary key.
   *
   * @async
   * @function findById
   * @param {number} completed_item_id
   * @returns {Promise<object|null>}
   * @throws {Error}                 On unexpected errors
   */
  async findById(completed_item_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('completed_item_id', completed_item_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all completed order items, optionally paginated.
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
   * Update a completed order item record.
   *
   * @async
   * @function update
   * @param {number} completed_item_id
   * @param {Partial<{
   *   quantity: number,
   *   unit_price: number,
   *   line_total: number
   * }>} changes
   * @returns {Promise<object>}      The updated completed_order_items row
   * @throws {Error}
   */
  async update(completed_item_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('completed_item_id', completed_item_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete a completed order item record.
   *
   * @async
   * @function deleteById
   * @param {number} completed_item_id
   * @returns {Promise<object>}      The deleted completed_order_items row
   * @throws {Error}
   */
  async deleteById(completed_item_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('completed_item_id', completed_item_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = CompletedOrderItemModel;