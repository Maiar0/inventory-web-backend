const { supabase } = require('./client.js');

class ReturnModel {
  constructor() {
    this.table = 'returns';
  }

  /**
   * Insert a new return record.
   *
   * @async
   * @function create
   * @param {{
   *   return_id?: number,       // optional if auto-generated
   *   order_id: number,         // ID of the original order
   *   return_date: string|Date, // date of the return
   *   return_total: number,     // total amount returned
   *   created_by: string,       // UUID of the user who processed the return
   *   created_at?: string|Date  // timestamp, defaults to now()
   * }} ret
   * @returns {Promise<object>}   The inserted return row
   * @throws {Error}              If the insert fails
   */
  async create(ret) {
    const { data, error, status } = await supabase
      .from(this.table)
      .insert([ ret ])
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Fetch a return by its primary key.
   *
   * @async
   * @function findById
   * @param {number} return_id
   * @returns {Promise<object|null>}
   * @throws {Error}              On unexpected errors
   */
  async findById(return_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .select('*')
      .eq('return_id', return_id)
      .single();

    if (error && status !== 406) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * List all returns, optionally paginated.
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
   * Update a return record by its primary key.
   *
   * @async
   * @function update
   * @param {number} return_id
   * @param {Partial<{
   *   order_id: number,
   *   return_date: string|Date,
   *   return_total: number
   * }>} changes
   * @returns {Promise<object>}   The updated return row
   * @throws {Error}
   */
  async update(return_id, changes) {
    const { data, error, status } = await supabase
      .from(this.table)
      .update(changes)
      .eq('return_id', return_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }

  /**
   * Delete a return record by its primary key.
   *
   * @async
   * @function deleteById
   * @param {number} return_id
   * @returns {Promise<object>}   The deleted return row
   * @throws {Error}
   */
  async deleteById(return_id) {
    const { data, error, status } = await supabase
      .from(this.table)
      .delete()
      .eq('return_id', return_id)
      .single();

    if (error) {
      throw new Error(`Error ${status}: ${error.message}`);
    }
    return data;
  }
}

module.exports = ReturnModel;
