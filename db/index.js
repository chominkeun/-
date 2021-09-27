const mdbConn = require('./mariadb_test.js') 
const express = require('express'); 
const app = express(); 


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors정책을 피하기 위한 모듈
const cors = require('cors')
app.use(cors());

const port = process.env.PORT || 3000; 

app.get('/users', (req, res) => {

    mdbConn.getUserList(req).then((rows) => { 
        console.log('USERS : ', rows);
        res.send(rows); 
    }).catch((errMsg) => { console.log(errMsg); }); 
})

// app.get('/products', (req, res) => {
//     mdbConn.getprtlist(req).then((rows) => { 
//         console.log('USERS : ', rows);
//         res.send(rows); 
//     }).catch((errMsg) => { console.log(errMsg); }); 
// })

app.post('/addproduct', (req, res) => {
    mdbConn.addproduct(req).then((rows) => {
        console.log(rows); 
        if (rows.affectedRows === 1) {
            res.send('OK');
        }
    }).catch((errMsg) => { console.log(errMsg); }); 
    
});

app.post('/modproduct', (req, res) => {
    mdbConn.modproduct(req).then((rows) => {
        console.log(rows); 
        if (rows.affectedRows === 1) {
            res.send('OK');
        }
    }).catch((errMsg) => { console.log(errMsg); });   
});

app.post('/delproduct', (req, res) => {
    mdbConn.delproduct(req).then((row) => {
        res.send(row);
    })
})

app.get('/product/:prt_name', (req, res) => {
    mdbConn.oneproduct(req).then((row) => {
        res.send(row);
    })
})

app.get('/category/:prt_category', (req, res) => {
    mdbConn.sortproduct(req).then((row) => {
        res.send(row);
    })
})

app.get('/allproduct', (req, res) => {
    mdbConn.allproduct(req).then((row) => {
        res.send(row);
    })
})

app.get('/refreshPRT', (req, res) => {
    mdbConn.allproduct(req).then((row) => {
        res.send(row);
    })
})

app.get('/allorder', (req, res) => {
    mdbConn.allorder(req).then((row) => {
        res.send(row);
    })
})


app.get('/order/:order_num', (req, res) => {
    mdbConn.orderdetail(req).then((row) => {
        res.send(row);
    })
})

app.post('/modorderstate', (req, res) => {
    mdbConn.modorderstate(req).then((rows) => {
        console.log(rows); 
        if (rows.affectedRows === 1) {
            res.send('OK');
        }
    }).catch((errMsg) => { console.log(errMsg); });   
});

app.listen(port, () => { 
    console.log(`listening on ${port}`); 
});

//query 사용시 참고사항..
// Connection.query(
// 	{ namedPlaceholders: true, sql: "INSERT INTO someTable VALUES (:id, :img, :db)" },
// 	{ id: 1, img: Buffer.from("c327a97374", "hex"), db: "mariadb" }
// );
