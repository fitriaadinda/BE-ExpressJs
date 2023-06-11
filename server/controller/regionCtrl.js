import { sequelize } from "../models/init-models";

const findAll = async (req, res) => {
  try {
    const region = await req.context.models.regions.findAll();
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const findOne = async (req, res) => {
  try {
    const region = await req.context.models.regions.findOne({
      where: { region_id: req.params.ids },
    });
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const create = async (req, res) => {
  try {
    const region = await req.context.models.regions.create({
      region_name: req.body.name,
    });
    return res.send(region);
  } catch (error) {
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const region = await req.context.models.regions.update(
      {
        region_name: req.body.name,
      },
      { returning: true, where: { region_id: req.params.id } }
    );
    return res.send(region);
  } catch (error) {
    return res.send(error)
  }
};

const deleted = async(req,res) => {
    try {
        const region = await req.context.models.regions.destroy({
            where:{region_id : req.params.id}
        })
        return res.send('delete '+region+' row')
    } catch (error) {
        return res.send(error)
    }
}

const querySQL = async(req,res) => {
    try {
        await sequelize.query('select * from regions where region_id = :id',
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