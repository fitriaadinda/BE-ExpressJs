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

app.get('/departments',(req,res)=>{
    pool.query('select * from departments',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/departments/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from departments where department_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    );
});

app.post(`/departments`, (req, res) => {
    const { department_id, department_name, manager_id, location_id } = req.body;
    pool.query(`INSERT INTO departments values($1, $2, $3, $4)`,
      [department_id, department_name, manager_id, location_id],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result.rowCount);
      });
})


app.put('/departments/:id',(req,res)=> {
    const {id} = req.params
    const { department_name, manager_id, location_id } = req.body;
    pool.query('update departments set department_name=$1, manager_id=$2, location_id=$3 where department_id=$4',
    [department_name, manager_id, location_id, id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/departments/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from departments where department_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})