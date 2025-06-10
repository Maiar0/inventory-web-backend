class InventoryItem {
  #quantity = undefined; // private and not serialized

  constructor({
    id,
    organization_id,
    item_name,
    description,
    price,
    image_url = null,
    package_type_id = null,
    package_count = null,
    created_at = null
  }) {
    this.id = id;
    this.organization_id = organization_id;
    this.item_name = item_name;
    this.description = description;
    this.price = price;
    this.image_url = image_url;
    this.package_type_id = package_type_id;
    this.package_count = package_count;
    this.created_at = created_at;
  }

  //a controlled way to access quantity if needed later
  _setQuantityManually(qty) {
    this.#quantity = qty;
  }

  _getQuantityInternal() {
    return this.#quantity;
  }

  toRecord() {
    return {
      id: this.id,
      organization_id: this.organization_id,
      item_name: this.item_name,
      description: this.description,
      price: this.price,
      image_url: this.image_url,
      package_type_id: this.package_type_id,
      package_count: this.package_count,
      created_at: this.created_at
      // deliberately omit quantity
    };
  }

  static fromRecord(row) {
    const instance = new InventoryItem(row);
    if ('quantity' in row) instance.#quantity = row.quantity;
    return instance;
  }
}
