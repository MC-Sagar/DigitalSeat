var csv = require('csvtojson')
var fs = require('fs')
var connection = require('./connection.js')

module.exports = function(app){

    app.get('/',function(req,res){
        res.render('index')
    })


    app.post('/',function(req,res){
        if(req.files){
            //console.log(req.files)
            var file = req.files.filename
            var filename = file.name
            file.mv("./"+filename,function(err){
                if(err){
                    console.log(err)
                    res.send("error occured")
                }
                else{
                    var csvFilePath=filename
                csv().fromFile(csvFilePath).then((jsonObj)=>{
                    console.log(jsonObj)
                    jsonObj.forEach(function(item){
                    console.log(item.usn)
                    var query = 'UPDATE exam SET course_id = ?, block_id = ?, room_name = ?, seat = ? , display = 1 WHERE usn=?'
                    connection.query(query,[item.course_id , item.block_id , item.room, item.seat , item.usn ] , function (error, result, rows, fields) {
                        if (error) throw err;
                        })
                    })
                    fs.unlink('upload.csv')
                })
                    res.send('done!')
                }
            })
        }
    })


}