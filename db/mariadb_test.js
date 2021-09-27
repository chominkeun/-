const mariadb = require('mariadb'); 
const vals = require('./consts.js'); 
const pool = mariadb.createPool(
    { 
        host: vals.DBHost, 
        port:vals.DBPort, 
        user: vals.DBUser, 
        password: vals.DBPass,
        database: vals.DBUse, 
        connectionLimit: 5 });

async function GetUserList(req){ 
    let conn, rows; 
    try{
         conn = await pool.getConnection(); 
         rows = await conn.query('SELECT * FROM USER');
         console.log(rows); 
         console.log('END ROWS...........')
    } catch(err){ 
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return rows[0]; 
    } 
}

//상품관리 새메뉴 추가
async function addProduct(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        datas = req.body;
        //req.query
        query_str = `INSERT INTO STORE_PRT(PRT_ID, PRT_CATEGORY_ID, PRT_NAME, PRICE, PRT_DESC, CREATE_ID, CREATE_DT, LST_ID, LST_DT) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
        console.log(query_str);
        console.log([datas.name, 
            Number(datas.price),
            datas.Desc,
            'SYS000',
            new Date(),
            'SYS000',
            new Date()
          ]);
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        insert_cnt = await conn.query(query_str, [datas.num,
                                                  datas.Category_id,
                                                  datas.name, 
                                                  Number(datas.price),
                                                  datas.Desc,
                                                  'SYS000',
                                                  new Date(),
                                                  'SYS000',
                                                  new Date()
                                                ]);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return insert_cnt; 
    } 

}

//상품 정보 수정
async function modProduct(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        var name = req.body.name;
        var price = req.body.price;
        var Desc = req.body.Desc
        var Category_id = req.body.Category_id;
        var num = req.body.num;
        //req.query
        query_str = `UPDATE STORE_PRT SET PRT_CATEGORY_ID = ?, PRT_NAME = ?, PRICE = ?, PRT_DESC = ? WHERE PRT_ID = ?`
        console.log(query_str);
        console.log([name, 
            Number(price),
            Desc,
            'SYS000',
            new Date(),
            'SYS000',
            new Date()
          ]);
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        insert_cnt = await conn.query(query_str, [Category_id,
                                                  name,
                                                  Number(price),
                                                  Desc,
                                                  num,
                                                ]);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return insert_cnt; 
    } 
}

//상품 삭제
async function delProduct(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        var num = req.body.num;

        //req.query
        query_str = `DELETE FROM STORE_PRT WHERE PRT_ID = ?`
        console.log(num)
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        a_row = await conn.query(query_str, [num]);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return insert_cnt; 
    } 

}
//상품 상세정보 조회
async function OneProduct(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        prt_name = req.params.prt_name;

     
        //req.query
        query_str = `select * from STORE_PRT WHERE PRT_NAME = ?`
        console.log(query_str);
     
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        a_row = await conn.query(query_str, [prt_name]);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return a_row[0]; 
    } 
}
//제품 카테고리별 정렬
async function SortProduct(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        prt_category = req.params.prt_category;

     
        //req.query
        query_str = `select * from STORE_PRT WHERE PRT_CATEGORY_ID = ?`
        console.log(query_str);
     
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        a_row = await conn.query(query_str, [prt_category]);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{
        console.log(a_row);
        if (conn) conn.end(); 
        return a_row;
        
    } 
}
//전체 제품 정렬
async function AllProduct(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        //req.query
        query_str = `select * from STORE_PRT`
        console.log(query_str);
     
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        a_row = await conn.query(query_str);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{
        console.log(a_row);
        if (conn) conn.end(); 
        return a_row;
        
    } 
}


async function GetPRTList(req){ 
    let conn, rows; 
    try{
         conn = await pool.getConnection(); 
         rows = await conn.query('SELECT * FROM STORE_PRT');
         console.log(rows); 
         console.log('END ROWS...........')
    } catch(err){ 
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return rows[0]; 
    } 
}
//주문조회
async function AllOrder(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        //req.query
        query_str = `select * from STORE_ORDER`
        console.log(query_str);
     
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        a_row = await conn.query(query_str);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{
        console.log(a_row);
        if (conn) conn.end(); 
        return a_row;
        
    } 
}

//주문 상세정보 조회
async function orderDetail(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        order_num = req.params.order_num;

     
        //req.query
        query_str = `SELECT STORE_ORDER.CUST_NM ,STORE_ORDER.PRICE_SUM ,STORE_ORDER.ORDER_TIME ,STORE_ORDER.ORDER_NUM , LINE_ITEM.ORDER_ID, LINE_ITEM.ORDER_QTY, LINE_ITEM.ORDER_PRICE, STORE_PRT.PRT_NAME
        FROM LINE_ITEM, STORE_PRT, STORE_ORDER
        WHERE LINE_ITEM.PRT_ID = STORE_PRT.PRT_ID
        AND LINE_ITEM.ORDER_ID = STORE_ORDER.ORDER_ID 
        AND LINE_ITEM.ORDER_ID = ?;`
        console.log(query_str);
     
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        a_row = await conn.query(query_str, [order_num]);
        console.log(a_row[0])
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return a_row; 
    } 
}

//주문 상태 수정
async function modOrderState(req){
    let conn, insert_cnt;
    try{
        conn = await pool.getConnection(); 
        var state = req.body.state;
        var num = req.body.num;
        //req.query
        query_str = `UPDATE STORE_ORDER SET ORDER_STATE = ? WHERE ORDER_NUM = ?`
        console.log(query_str);
        console.log(num);
        console.log(state);
          //params 1 : query_str
          //params 2 : [](?의 대한 값 순서)
        insert_cnt = await conn.query(query_str, [state, num]);
    } catch(err){ 
        console.log(err);
        throw err; 
    } finally{ 
        if (conn) conn.end(); 
        return insert_cnt; 
    } 
}

//메소드 만들때마다 추가해주기
module.exports = { getUserList: GetUserList,
                   getprtlist: GetPRTList, 
                   addproduct: addProduct,
                   modproduct: modProduct,
                   delproduct: delProduct,
                   sortproduct: SortProduct,
                   allproduct: AllProduct,
                   oneproduct: OneProduct,
                   allorder: AllOrder,
                   orderdetail: orderDetail,
                   modorderstate: modOrderState}
