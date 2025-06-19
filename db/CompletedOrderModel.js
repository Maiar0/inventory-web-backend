const { supabase } = require('./client.js');

class CompletedOrderModel {
  constructor() {
    this.table = 'completed_orders';
  }

  /**
   * Insert a new completed order record.
   *
   * @async
   * @function create
   * @param {{
   *   order_id: number,            // ID of the original order
   *   completed_date: string|Date, // timestamp when order was completed
   *   finalized_by: string,        // UUID of the user who finalized
   *   comments?: string            // optional notes or comments
   * }} completedOrder
   * @returns {Promise<object>}      The inserted completed_orders row
   * @throws {Error}                 If the insert fails
   */
  async create(completedOrder) {
    const { data, error, status } = await supabase
      .from(this.table)
      .insert([ completedOrder ])
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Fetch a completed order by its primary key.
   *
   * @async
   * @function findById
   * @param {number} order_id
   * @returns {Promise<object|null>}
   * @throws {Error}                 On unexpected errors
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
   * List all completed orders, optionally paginated.
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
   * Update a completed order record.
   *
   * @async
   * @function update
   * @param {number} order_id
   * @param {Partial<{
   *   completed_date: string|Date,
   *   finalized_by: string,
   *   comments: string
   * }>} changes
   * @returns {Promise<object>}      The updated completed_orders row
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
   * Delete a completed order record.
   *
   * @async
   * @function deleteById
   * @param {number} order_id
   * @returns {Promise<object>}      The deleted completed_orders row
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

module.exports = CompletedOrderModel;
