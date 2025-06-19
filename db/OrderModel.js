const { supabase } = require('./client.js');

class OrderModel {
  constructor() {
    this.table = 'orders';
  }

  /**
   * Insert a new order.
   * @param {{
   *   order_id?: number,        // optional if auto-generated
   *   customer_id: string,      // UUID of the customer
   *   order_date: string|Date,  // date of the order
   *   status: string,           // e.g. 'pending', 'shipped', 'complete'
   *   order_total: number,      // total amount for the order
   *   created_by: string,       // UUID of user who created the order
   *   created_at?: string|Date  // timestamp, defaults to now()
   * }} order
   * @returns {Promise<object>}   The inserted order row
   * @throws {Error}              If the insert fails
   */
  async create(order) {
    const { data, error, status } = await supabase
      .from(this.table)
      .insert([ order ])
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Fetch an order by its primary key.
   * @param {number} order_id
   * @returns {Promise<object|null>}
   * @throws {Error}              On unexpected errors
   */
  async findById(order_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('order_id', order_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all orders, optionally paginated.
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
   * Update an order by its primary key.
   * @param {number} order_id
   * @param {Partial<{
   *   customer_id: string,
   *   order_date: string|Date,
   *   status: string,
   *   order_total: number
   * }>} changes
   * @returns {Promise<object>}   The updated order row
   * @throws {Error}
   */
  async update(order_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('order_id', order_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete an order by its primary key.
   * @param {number} order_id
   * @returns {Promise<object>}   The deleted order row
   * @throws {Error}
   */
  async deleteById(order_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('order_id', order_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = OrderModel;
