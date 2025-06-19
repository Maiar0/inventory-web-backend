const { supabase } = require('./client.js');

class OrderItemModel {
  constructor() {
    this.table = 'order_items';
  }

  /**
   * Insert a new order line item.
   *
   * @async
   * @function create
   * @param {{
   *   order_item_id?: number,  // optional if auto‐generated
   *   order_id: number,        // ID of the parent order
   *   product_id: number,      // ID of the product being ordered
   *   quantity: number,        // quantity ordered
   *   unit_price: number,      // price per unit at time of order
   *   line_total: number       // total for this line (quantity * unit_price)
   * }} item
   * @returns {Promise<object>}   The inserted order_item row
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
   * Fetch an order line item by its primary key.
   *
   * @async
   * @function findById
   * @param {number} order_item_id
   * @returns {Promise<object|null>}
   * @throws {Error}              On unexpected errors
   */
  async findById(order_item_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('order_item_id', order_item_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all order line items, optionally paginated.
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
   * Update an order line item by its primary key.
   *
   * @async
   * @function update
   * @param {number} order_item_id
   * @param {Partial<{
   *   quantity: number,
   *   unit_price: number,
   *   line_total: number
   * }>} changes
   * @returns {Promise<object>}   The updated order_item row
   * @throws {Error}
   */
  async update(order_item_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('order_item_id', order_item_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete an order line item by its primary key.
   *
   * @async
   * @function deleteById
   * @param {number} order_item_id
   * @returns {Promise<object>}   The deleted order_item row
   * @throws {Error}
   */
  async deleteById(order_item_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('order_item_id', order_item_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = OrderItemModel;
