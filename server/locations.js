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

app.get('/locations',(req,res)=>{
    pool.query('select * from locations',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/locations/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from locations where location_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    );
});

app.post(`/locations`, (req, res) => {
    const { location_id, street_address, postal_code, city, state_province, country_id } = req.body;
    pool.query(`INSERT INTO locations values($1, $2, $3, $4, $5, $6)`,
      [location_id, street_address, postal_code, city, state_province, country_id],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result.rowCount);
      });
})


app.put('/locations/:id',(req,res)=> {
    const {id} = req.params
    const { street_address, postal_code, city, state_province, country_id } = req.body;
    pool.query('update locations set street_address=$1, postal_code=$2, city=$3, state_province=$4, country_id=$5 where location_id=$6',
    [street_address, postal_code, city, state_province, country_id, id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/locations/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from locations where location_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})