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

app.get('/jobs',(req,res)=>{
    pool.query('select * from jobs',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/jobs/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from jobs where job_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    );
});

app.post(`/jobs`, (req, res) => {
    const { job_id, job_title, min_salary, max_salary } = req.body;
    pool.query(`INSERT INTO jobs values($1, $2, $3, $4)`,
      [job_id, job_title, min_salary, max_salary],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result.rowCount);
      });
})


app.put('/jobs/:id',(req,res)=> {
    const {id} = req.params
    const { job_id, job_title, min_salary, max_salary } = req.body;
    pool.query('update jobs set job_title=$1, min_salary=$2, max_salary=$3 where job_id=$4',
    [job_title, min_salary, max_salary, id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/jobs/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from jobs where job_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})