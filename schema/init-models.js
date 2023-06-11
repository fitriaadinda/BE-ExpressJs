import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _categories from  "./categories.js";
import _countries from  "./countries.js";
import _customers from  "./customers.js";
import _departments from  "./departments.js";
import _employees from  "./employees.js";
import _job_history from  "./job_history.js";
import _jobs from  "./jobs.js";
import _locations from  "./locations.js";
import _order_detail from  "./order_detail.js";
import _orders from  "./orders.js";
import _products from  "./products.js";
import _regions from  "./regions.js";
import _shippers from  "./shippers.js";
import _suppliers from  "./suppliers.js";


export default function initModels(sequelize) {
  const categories = _categories.init(sequelize, DataTypes);
  const countries = _countries.init(sequelize, DataTypes);
  const customers = _customers.init(sequelize, DataTypes);
  const departments = _departments.init(sequelize, DataTypes);
  const employees = _employees.init(sequelize, DataTypes);
  const job_history = _job_history.init(sequelize, DataTypes);
  const jobs = _jobs.init(sequelize, DataTypes);
  const locations = _locations.init(sequelize, DataTypes);
  const order_detail = _order_detail.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const regions = _regions.init(sequelize, DataTypes);
  const shippers = _shippers.init(sequelize, DataTypes);
  const suppliers = _suppliers.init(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'ordet_prod_id_products', through: order_detail, foreignKey: "ordet_order_id", otherKey: "ordet_prod_id" });
  products.belongsToMany(orders, { as: 'ordet_order_id_orders', through: order_detail, foreignKey: "ordet_prod_id", otherKey: "ordet_order_id" });
  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department_department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  job_history.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(job_history, { as: "job_histories", foreignKey: "department_id"});
  departments.belongsTo(employees, { as: "manager", foreignKey: "manager_id"});
  employees.hasMany(departments, { as: "departments", foreignKey: "manager_id"});
  employees.belongsTo(employees, { as: "manager", foreignKey: "manager_id"});
  employees.hasMany(employees, { as: "employees", foreignKey: "manager_id"});
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id"});
  job_history.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(job_history, { as: "job_histories", foreignKey: "job_id"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  countries.belongsTo(regions, { as: "region", foreignKey: "region_id"});
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id"});
  products.belongsTo(categories, { as: "prod_cate", foreignKey: "prod_cate_id"});
  categories.hasMany(products, { as: "products", foreignKey: "prod_cate_id"});
  orders.belongsTo(customers, { as: "order_cust", foreignKey: "order_cust_id"});
  customers.hasMany(orders, { as: "orders", foreignKey: "order_cust_id"});
  order_detail.belongsTo(orders, { as: "ordet_order", foreignKey: "ordet_order_id"});
  orders.hasMany(order_detail, { as: "order_details", foreignKey: "ordet_order_id"});
  order_detail.belongsTo(products, { as: "ordet_prod", foreignKey: "ordet_prod_id"});
  products.hasMany(order_detail, { as: "order_details", foreignKey: "ordet_prod_id"});
  orders.belongsTo(shippers, { as: "order_ship", foreignKey: "order_ship_id"});
  shippers.hasMany(orders, { as: "orders", foreignKey: "order_ship_id"});
  products.belongsTo(suppliers, { as: "prod_supr", foreignKey: "prod_supr_id"});
  suppliers.hasMany(products, { as: "products", foreignKey: "prod_supr_id"});

  return {
    categories,
    countries,
    customers,
    departments,
    employees,
    job_history,
    jobs,
    locations,
    order_detail,
    orders,
    products,
    regions,
    shippers,
    suppliers,
  };
}
