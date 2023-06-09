import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'hr-db',
    port : 5432
})

const app = express()

app.use(express.json())

const port = process.env.PORT || 3003

app.listen(port,()=> {console.log('Server listening on port '+port)})

app.get('/countries',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/countries/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from countries where country_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    );
});

app.post(`/countries`, (req, res) => {
    const { country_id, country_name, region_id } = req.body;
    pool.query(`INSERT INTO countries values($1, $2, $3)`,
      [country_id, country_name, region_id],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result.rowCount);
      });
})


app.put('/countries/:id', (req, res) => {
    const { id } = req.params;
    const { country_name, region_id } = req.body;
    pool.query(
      'UPDATE countries SET country_name = $1, region_id = $2 WHERE country_id = $3',
      [country_name, region_id, id],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result.rowCount);
      }
    );
});
  

app.delete('/countries/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from countries where country_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})