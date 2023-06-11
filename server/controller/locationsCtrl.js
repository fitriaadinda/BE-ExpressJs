import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const location = await req.context.models.locations.findAll();
    return res.send(location);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const location = await req.context.models.locations.findOne({
      where: { location_id : req.params.ids },
    });
    return res.send(location);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const location = await req.context.models.locations.create({
      location_id: req.body.id,
      street_address : req.body.street_address,
      postal_code : req.body.postal_code,
      city : req.body.city,
      state_province : req.body.state_province,
      country_id : req.body.country_id,
    });
    return res.send(location);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const location = await req.context.models.locations.update(
      {
        job_title : req.body.job_title,
        street_address : req.body.street_address,
        postal_code : req.body.postal_code,
        city : req.body.city,
        state_province : req.body.state_province,
        country_id : req.body.country_id,
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(location);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const location = await req.context.models.locations.destroy({
            where:{location_id : req.params.id}
        })
        return res.send('delete '+location+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from locations where location_id = :id',
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