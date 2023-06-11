import dotenv from 'dotenv'
import express from 'express'
import departments from '../schema/departments'

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

app.get('/employee',(req,res)=>{
    pool.query('select * from employees',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/employee/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from employees where employee_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/employee',(req,res)=> {
    const {employee_id, first_name, last_name, email, phone_number, hire_date, salary, commision_pct, job_id, manager_id, department_id, xemp_id} = req.body
    pool.query('insert into employees (region_name) values ($1, $2, $3, $4, $5, %6, $7, $8, $9, $10, $11, $12)',
    [employee_id, first_name, last_name, email, phone_number, hire_date, salary, commision_pct, job_id, manager_id, department_id, xemp_id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/employee/:id',(req,res)=> {
    const {id} = req.params
    const {first_name, last_name, email, phone_number, hire_date, salary, commision_pct, job_id, manager_id, department_id, xemp_id} = req.body
    pool.query('update employees set first_name=$1, last_name=$2, email=$3, phone_number=$4, hire_date=$5, salary=$6, commision_pct=$7, job_id=$8, manager_id=$9, department_id=$10, xemp_id=$11 where employee_id=$12',
    [first_name, last_name, email, phone_number, hire_date, salary, commision_pct, job_id, manager_id, department_id, xemp_id, id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/employee/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from employees where employee_id = ${id}`,
    [],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})