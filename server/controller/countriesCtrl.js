import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const country = await req.context.models.countries.findAll();
    return res.send(country);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const country = await req.context.models.countries.findOne({
      where: { country_id: req.params.ids },
    });
    return res.send(country);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const country = await req.context.models.countries.create({
      country_id: req.body.id,
      country_name: req.body.name,
      region_id: req.body.id_region,
    });
    return res.send(country);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const country = await req.context.models.countries.update(
      {
        country_name: req.body.name,
        region_id: req.body.id_region,
      },
      { returning: true, where: { country_id: req.params.id } }
    );
    return res.send(country);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const country = await req.context.models.countries.destroy({
            where:{country_id : req.params.id}
        })
        return res.send('delete '+country+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from countries where country_id = :id',
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