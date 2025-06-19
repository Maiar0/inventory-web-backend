const { supabase } = require('./client.js');

class StockAdjustmentModel {
  constructor() {
    this.table = 'stock_adjustments';
  }

  /**
   * Insert a new stock adjustment record.
   *
   * @async
   * @function create
   * @param {{
   *   adjustment_id?: number,      // optional if auto-generated
   *   product_id: number,          // ID of the product being adjusted
   *   change_qty: number,          // change in quantity (positive or negative)
   *   reason: string,              // reason for adjustment
   *   created_by: string,          // UUID of the user who made the adjustment
   *   adjustment_date?: string|Date,// timestamp of adjustment, defaults to now()
   *   comments?: string            // optional notes
   * }} adjustment
   * @returns {Promise<object>}      The inserted stock_adjustment row
   * @throws {Error}                 If the insert fails
   */
  async create(adjustment) {
    const { data, error, status } = await supabase
      .from(this.table)
      .insert([ adjustment ])
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Fetch a stock adjustment by its primary key.
   *
   * @async
   * @function findById
   * @param {number} adjustment_id
   * @returns {Promise<object|null>}
   * @throws {Error}                 On unexpected errors
   */
  async findById(adjustment_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('adjustment_id', adjustment_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all stock adjustments, optionally paginated.
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
   * Update a stock adjustment record by its primary key.
   *
   * @async
   * @function update
   * @param {number} adjustment_id
   * @param {Partial<{
   *   change_qty: number,
   *   reason: string,
   *   adjustment_date: string|Date,
   *   comments: string
   * }>} changes
   * @returns {Promise<object>}      The updated stock_adjustment row
   * @throws {Error}
   */
  async update(adjustment_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('adjustment_id', adjustment_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete a stock adjustment record by its primary key.
   *
   * @async
   * @function deleteById
   * @param {number} adjustment_id
   * @returns {Promise<object>}      The deleted stock_adjustment row
   * @throws {Error}
   */
  async deleteById(adjustment_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('adjustment_id', adjustment_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = StockAdjustmentModel;
