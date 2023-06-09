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

app.get('/region',(req,res)=>{
    pool.query('select * from regions',
    [],
    (error,result)=> {
        if(error){
            throw error
        }
        res.json(result.rows)
    })
})

app.get('/region/:id',(req,res)=> {
    const {id} = req.params
    pool.query('select * from regions where region_id = $1',
    [id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rows)
    }
    )
})

app.post('/region',(req,res)=> {
    const {name} = req.body
    pool.query('insert into regions (region_name) values ($1)',
    [name],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.put('/region/:id',(req,res)=> {
    const {id} = req.params
    const {name} = req.body
    pool.query('update regions set region_name=$2 where region_id=$1',
    [id,name],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})

app.delete('/region/:id',(req,res)=> {
    const {id} = req.params
    pool.query(`delete from regions where region_id = ${id}`,
    [],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
})