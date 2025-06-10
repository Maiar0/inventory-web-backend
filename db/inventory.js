const supabase = require('./client');

// Get all items for an organization
async function getInventoryByOrg(organization_id) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('organization_id', organization_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Insert a new inventory item
async function insertInventoryItem(item) {
  const { error } = await supabase
    .from('inventory_items')
    .insert([item]);

  if (error) throw error;
}

// Get single item by ID and org
async function getItemById(id, organization_id) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('id', id)
    .eq('organization_id', organization_id)
    .single();

  if (error) throw error;
  return data;
}

module.exports = {
  getInventoryByOrg,
  insertInventoryItem,
  getItemById
};
