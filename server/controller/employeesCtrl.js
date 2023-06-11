import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const employee = await req.context.models.employees.findAll();
    return res.send(employee);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const employee = await req.context.models.employees.findOne({
      where: { employee_id : req.params.ids },
    });
    return res.send(employee);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const employee = await req.context.models.employees.create({
      employee_id: req.body.id,
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      phone_number : req.body.phone_number,
      hire_date : req.body.hire_date,
      salary: req.body.salary,
      commission_pct : req.body.commission_pct,
      job_id : req.body.job_id,
      manager_id : req.body.manager_id,
      department_id : req.body.department_id,
      xemp_id : req.body.xemp_id,
    });
    return res.send(employee);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const employee = await req.context.models.employees.update(
      {
        first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      phone_number : req.body.phone_number,
      hire_date : req.body.hire_date,
      salary: req.body.salary,
      commission_pct : req.body.commission_pct,
      job_id : req.body.job_id,
      manager_id : req.body.manager_id,
      department_id : req.body.department_id,
      xemp_id : req.body.xemp_id,
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(employee);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const employee = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+employee+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from employees where employee_id = :id',
        {replacements : {id : req.params.id},type : sequelize.QueryTypes.SELECT}
        ).then(result => {
            return res.send(result)
        })
    } catch (error) {
        return res.send(error)
    }
}
export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  querySQL
};