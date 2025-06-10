const supabase = require('./client');

// Get all package types
async function getAllPackageTypes() {
  const { data, error } = await supabase
    .from('package_types')
    .select('id, type')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
}

// Insert a new package type (safe from duplicates)
async function insertPackageType(type) {
  const { error } = await supabase
    .from('package_types')
    .insert([{ type }])
    .onConflict('type')  // Supabase handles UPSERTs by column
    .ignore();

  if (error) throw error;
}

module.exports = {
  getAllPackageTypes,
  insertPackageType
};
