import npyjs from "npyjs"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/public', express.static(path.join('/home/ubuntu/software/server', 'public')));

// const create_one_model1 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/000.png', '/home/ubuntu/software/data/pcd_with_png/000.npy');
// `;
// const create_one_model2 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/001.png', '/home/ubuntu/software/data/pcd_with_png/001.npy');
// `;
// const create_one_model3 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/002.png', '/home/ubuntu/software/data/pcd_with_png/002.npy');
// `;
// const create_one_model4 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/003.png', '/home/ubuntu/software/data/pcd_with_png/003.npy');
// `;
// const create_one_model5 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/004.png', '/home/ubuntu/software/data/pcd_with_png/004.npy');
// `;
// const create_one_model6 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/005.png', '/home/ubuntu/software/data/pcd_with_png/005.npy');
// `;
// const create_one_model7 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/006.png', '/home/ubuntu/software/data/pcd_with_png/006.npy');
// `;
// const create_one_model8 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/007.png', '/home/ubuntu/software/data/pcd_with_png/007.npy');
// `;
// const create_one_model9 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/008.png', '/home/ubuntu/software/data/pcd_with_png/008.npy');
// `;
// const create_one_model10 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/009.png', '/home/ubuntu/software/data/pcd_with_png/009.npy');
// `;
// const create_one_model11 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/010.png', '/home/ubuntu/software/data/pcd_with_png/010.npy');
// `;
// const create_one_model12 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/011.png', '/home/ubuntu/software/data/pcd_with_png/011.npy');
// `;
// const create_one_model13 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/012.png', '/home/ubuntu/software/data/pcd_with_png/012.npy');
// `;
// const create_one_model14 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/013.png', '/home/ubuntu/software/data/pcd_with_png/013.npy');
// `;
// const create_one_model15 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/014.png', '/home/ubuntu/software/data/pcd_with_png/014.npy');
// `;
// const create_one_model16 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/015.png', '/home/ubuntu/software/data/pcd_with_png/015.npy');
// `;
// const create_one_model17 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/016.png', '/home/ubuntu/software/data/pcd_with_png/016.npy');
// `;
// const create_one_model18 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/017.png', '/home/ubuntu/software/data/pcd_with_png/017.npy');
// `;
// const create_one_model19 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/018.png', '/home/ubuntu/software/data/pcd_with_png/018.npy');
// `;
// const create_one_model20 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/019.png', '/home/ubuntu/software/data/pcd_with_png/019.npy');
// `;
// const create_one_model21 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/020.png', '/home/ubuntu/software/data/pcd_with_png/020.npy');
// `;
// const create_one_model22 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/021.png', '/home/ubuntu/software/data/pcd_with_png/021.npy');
// `;
// const create_one_model23 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/022.png', '/home/ubuntu/software/data/pcd_with_png/022.npy');
// `;
// const create_one_model24 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/023.png', '/home/ubuntu/software/data/pcd_with_png/023.npy');
// `;
// const create_one_model25 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/024.png', '/home/ubuntu/software/data/pcd_with_png/024.npy');
// `;
// const create_one_model26 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/025.png', '/home/ubuntu/software/data/pcd_with_png/025.npy');
// `;
// const create_one_model27 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/026.png', '/home/ubuntu/software/data/pcd_with_png/026.npy');
// `;
// const create_one_model28 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/027.png', '/home/ubuntu/software/data/pcd_with_png/027.npy');
// `;
// const create_one_model29 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/028.png', '/home/ubuntu/software/data/pcd_with_png/028.npy');
// `;
// const create_one_model30 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/029.png', '/home/ubuntu/software/data/pcd_with_png/029.npy');
// `;
// const create_one_model31 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/030.png', '/home/ubuntu/software/data/pcd_with_png/030.npy');
// `;
// const create_one_model32 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/031.png', '/home/ubuntu/software/data/pcd_with_png/031.npy');
// `;
// const create_one_model33 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/032.png', '/home/ubuntu/software/data/pcd_with_png/032.npy');
// `;
// const create_one_model34 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/033.png', '/home/ubuntu/software/data/pcd_with_png/033.npy');
// `;
// const create_one_model35 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/034.png', '/home/ubuntu/software/data/pcd_with_png/034.npy');
// `;
// const create_one_model36 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/035.png', '/home/ubuntu/software/data/pcd_with_png/035.npy');
// `;
// const create_one_model37 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/036.png', '/home/ubuntu/software/data/pcd_with_png/036.npy');
// `;
// const create_one_model38 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/037.png', '/home/ubuntu/software/data/pcd_with_png/037.npy');
// `;
// const create_one_model39 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/038.png', '/home/ubuntu/software/data/pcd_with_png/038.npy');
// `;
// const create_one_model40 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/039.png', '/home/ubuntu/software/data/pcd_with_png/039.npy');
// `;
// const create_one_model41 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/040.png', '/home/ubuntu/software/data/pcd_with_png/040.npy');
// `;
// const create_one_model42 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/041.png', '/home/ubuntu/software/data/pcd_with_png/041.npy');
// `;
// const create_one_model43 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/042.png', '/home/ubuntu/software/data/pcd_with_png/042.npy');
// `;
// const create_one_model44 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/043.png', '/home/ubuntu/software/data/pcd_with_png/043.npy');
// `;
// const create_one_model45 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/044.png', '/home/ubuntu/software/data/pcd_with_png/044.npy');
// `;
// const create_one_model46 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/045.png', '/home/ubuntu/software/data/pcd_with_png/045.npy');
// `;
// const create_one_model47 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/046.png', '/home/ubuntu/software/data/pcd_with_png/046.npy');
// `;
// const create_one_model48 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/047.png', '/home/ubuntu/software/data/pcd_with_png/047.npy');
// `;
// const create_one_model49 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/048.png', '/home/ubuntu/software/data/pcd_with_png/048.npy');
// `;
// const create_one_model50 = `
// INSERT INTO models_in_repository (preview_picture_path, model_path) VALUES ('/home/ubuntu/software/data/pcd_with_png/049.png', '/home/ubuntu/software/data/pcd_with_png/049.npy');
// `;

// db.query(create_one_model1, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model2, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model3, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model4, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model5, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model6, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model7, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model8, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model9, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model10, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model11, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model12, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model13, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model14, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model15, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model16, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model17, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model18, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model19, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model20, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model21, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model22, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model23, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model24, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model25, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model26, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model27, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model28, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model29, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model30, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model31, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model32, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model33, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model34, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model35, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model36, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model37, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model38, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model39, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model40, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model41, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model42, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model43, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model44, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model45, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model46, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model47, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model48, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model49, (err, result) => {
//     if (err) throw err;
// });
// db.query(create_one_model50, (err, result) => {
//     if (err) throw err;
// });
// console.log('finish create model');

const storage = multer.diskStorage({
  //图片保存路径
  destination: function(req, file, cb){
    cb(null, '/home/ubuntu/software/data/photo')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload_avatar = multer({storage: storage})

const temp_picture_storage = multer.diskStorage({
  //图片保存路径
  destination: function(req, file, cb){
    cb(null, '/home/ubuntu/software/data/temp_picture')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload_temp_picture = multer({storage: temp_picture_storage})

const model_storage = multer.diskStorage({
  //图片保存路径
  destination: function(req, file, cb){
    cb(null, '/home/ubuntu/software/data/model')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload_model = multer({storage: model_storage})

const preview_picture_storage = multer.diskStorage({
  //图片保存路径
  destination: function(req, file, cb){
    cb(null, '/home/ubuntu/software/data/preview_picture')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload_preview_picture = multer({storage: preview_picture_storage})

// 创建MySQL连接
const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '20030415', // MySQL密码
  database: 'user' // 数据库名称
});

// 连接到MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});


//注册
app.post('/api/register', (req, res) => {
    const{username,password,confirmPassword} = req.body
    if(username.length < 2 || username.length > 10){
      res.json("username length wrong")
      console.log("username length wrong")
    }
    else if(password.length < 8 || password.length > 15){
      res.json("password length wrong")
      console.log("password length wrong")
    }
    else if(password != confirmPassword){
      res.json("different password")
      console.log("different password")
    }
    else{
      const sql_search = "select * from userInfo where username=?"
      db.query(sql_search,[username],(err,result)=>{
        if(err){
          res.json("数据库查询失败")
          console.log("数据库查询失败")
        }
        else if(result.length>0){
          res.json("用户被占用")
          console.log("用户被占用")
        }
        else{
          const sql_insert = 'INSERT INTO userInfo SET ?';
          db.query(sql_insert, {username:username,password:password,avatarPath:"/home/ubuntu/software/data/photo/default-avatar.jpg"}, (err, result) => {
            if(err){
              res.json("数据库插入失败")
              console.log("数据库插入失败")
              return
            }
            res.json("成功创建用户")
            console.log("成功创建用户")
          })
        }
      })
      
    }
});

//登录
app.post('/api/login', async(req, res) => {
  const{username,password} = req.body
  const sql_search = "select * from userInfo where username=?"

  db.query(sql_search,[username],(err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(result.length<=0){
      res.json("该用户未注册")
      console.log("该用户未注册")
      return
    }
    else if(password != result[0].password){
      res.json("密码错误！")
      console.log("密码错误！")
      return
    }
    else{
      res.json("登录成功！")
      console.log("登录成功！")
      return
    }
  })
});

//个人主页数字信息获取
app.get('/api/mypagenumber/:username', async(req, res) => {

  const username = req.params.username
  const sql_search = "select * from userInfo where username = ?"
  db.query(sql_search,[username],(err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(result.length<=0){
      res.json("该用户不存在")
      console.log("该用户不存在")
      return
    }
    else{
      const user = result[0]
      res.json({
        attention_num: user.attentions_num,
        store_num: user.stores_num, 
        transmit_num: user.transmits_num
      });
      console.log("个人主页数字信息查询成功")
      return
    }
  })

});

//个人主页头像信息获取
app.get('/api/mypageavatar/:username', async(req, res) => {
  const username = req.params.username
  const sql_search = "select * from userInfo where username = ?"
  db.query(sql_search,[username],(err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(result.length<=0){
      res.json("该用户不存在")
      console.log("该用户不存在")
      return
    }
    else{
      const avatarPath = result[0].avatarPath;
      res.sendFile(avatarPath);
      console.log("个人主页头像信息查询成功")
      return
    }
  })

});

//更改头像
app.post('/api/change-avatar/:username',upload_avatar.single('avatar'), async(req, res) => {
  const username = req.params.username
  const avatarPath = req.file.path;
  const changeAvatar = 'UPDATE userInfo SET avatarPath = ? WHERE username = ?'
  db.query(changeAvatar, [avatarPath, username], (err, result) => {
    if (err) {
      res.json("数据库头像路径更新失败")
      console.log("数据库头像路径更新失败")
      return
    }
    else{
      res.json("修改头像成功")
      console.log("修改头像成功")
      return
    }
  });
});

//修改用户名
app.get('/api/change-username/:username/:newUsername', async(req, res) => {
  const username = req.params.username
  const newUsername = req.params.newUsername
  if(newUsername.length < 2 || newUsername.length > 10){
      res.json("username length wrong")
      console.log("username length wrong")
      return
  }
  const sql_search = "select * from userInfo where username = ?"
  db.query(sql_search,[newUsername],(err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(result.length>0){
      res.json("用户被占用")
      console.log("用户被占用")
      return
    }
    else{
      const changeUsername = 'UPDATE userInfo SET username = ? WHERE username = ?'
      db.query(changeUsername, [newUsername, username], (err, result) => {
        if (err) {
          res.json("数据库更新失败")
          console.log("数据库更新失败")
          return
        }
        else{
          res.json("成功修改用户名")
          console.log("成功修改用户名")
          return
        }
      }) 
    }});
  }
);

//修改密码
app.post('/api/change-password', async(req, res) => {
  const{ username, password, newPassword} = req.body
  const sql_search = "select * from userInfo where username=?"

  db.query(sql_search,[username],(err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(password != result[0].password){
      res.json("密码错误！")
      console.log("密码错误！")
      return
    }
    else if(newPassword.length < 8 || newPassword.length > 15){
      res.json("password length wrong")
      console.log("password length wrong")
      return
    }
    else{
      const changePassword = 'UPDATE userInfo SET password = ? WHERE username = ?'
      db.query(changePassword, [newPassword, username], (err, result) => {
        if (err) {
          res.json("数据库更新失败")
          console.log("数据库更新失败")
          return
        }
        else{
          res.json("成功修改密码")
          console.log("成功修改密码")
          return
        }
      }) 
    }
  })
});

function suanshu(currentPage,ordinal){
  const tem = (parseInt(currentPage) - 1) * 6 + parseInt(ordinal) - 1;
  return tem
}


function changeString(Search_String){
  if (Search_String === undefined || Search_String === null){
    return ""
  }
  else{
    return Search_String
  }
}

function changeOrder(select_Bar_State){
  if(select_Bar_State === "点赞最多"){
    return "like_num"
  }
  else if(select_Bar_State === "收藏最多"){
    return "store_num"
  }
  else{
    return "post_time"
  }
}

//发现页面帖子数量获取
app.get('/api/discover-postnum', async(req, res) => {
  const Search_String = req.query.Search_String
  const temString = await changeString(Search_String)
  const countQuery = 'SELECT COUNT(*) as totalPosts FROM posts WHERE post_text LIKE ?'
  
  db.query(countQuery, [`%${temString}%`], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else{
      const totalPosts = result[0].totalPosts;
      res.json({
        totalPosts: totalPosts,
      });
      console.log("帖子总数量获取成功")
      return
    }
  })
});


//发现页面帖子头像获取
app.get('/api/discover-postavatar/:currentPage/:ordinal', async(req, res) => {
  const select_Bar_State = req.query.select_Bar_State
  const Search_String = req.query.Search_String
  const currentPage = req.params.currentPage
  const ordinal = req.params.ordinal

  // console.log(select_Bar_State)
  // console.log(Search_String)
  // console.log(currentPage)
  // console.log(ordinal)

  const temString = await changeString(Search_String)
  const num = await suanshu(currentPage,ordinal);
  const order_by = await changeOrder(select_Bar_State)

  // console.log(order_by)
  // console.log(num)
  // console.log(temString)
  const query = 'SELECT userInfo.avatarPath FROM posts JOIN userInfo ON posts.author_id = userInfo.id WHERE post_text LIKE ? ORDER BY ?? DESC LIMIT 1 OFFSET ?'
  
  db.query(query, [`%${temString}%`, order_by, num], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      console.log(err)
      return
    }
    else if(result.length<=0){
      res.json("该条帖子不存在1")
      console.log("该条帖子不存在1")
      return
    }
    else{
      const avatarPath = result[0].avatarPath;
      res.sendFile(avatarPath);
      console.log("现页面帖子头像获取成功")
      return
    }
  })

});




//发现页面帖子预览图获取
app.get('/api/discover-postpicture/:currentPage/:ordinal', async(req, res) => {
  const select_Bar_State = req.query.select_Bar_State
  const Search_String = req.query.Search_String
  const currentPage = req.params.currentPage
  const ordinal = req.params.ordinal
  // console.log(req.params.ordinal)
  const num = await suanshu(currentPage,ordinal);
  // console.log(num)
  // console.log(select_Bar_State)
  // console.log(Search_String)
  // console.log(currentPage)

  const temString = await changeString(Search_String)
  const order_by = changeOrder(select_Bar_State)
  // console.log(order_by)
  // console.log(temString)
  const query = 'SELECT * FROM posts WHERE post_text LIKE ? ORDER BY ?? DESC LIMIT 1 OFFSET ?'
  
  db.query(query, [`%${temString}%`, order_by, num], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(result.length<=0){
      res.json("该条帖子不存在2")
      console.log("该条帖子不存在2")
      return
    }
    else{
      const preview_picture_path = result[0].preview_picture_path;
      res.sendFile(preview_picture_path);
      console.log("现页面帖子预览图获取成功")
      return
    }
  })

});

//发现页面帖子string信息获取
app.get('/api/discover-poststring/:currentPage/:ordinal', async(req, res) => {
  const select_Bar_State = req.query.select_Bar_State
  const Search_String = req.query.Search_String
  const currentPage = req.params.currentPage
  const ordinal = req.params.ordinal

  // console.log(select_Bar_State)
  // console.log(Search_String)
  // console.log(currentPage)
  // console.log(ordinal)

  const temString = await changeString(Search_String)
  const num = await suanshu(currentPage,ordinal);
  const order_by = await changeOrder(select_Bar_State)

  const query = 'SELECT posts.id, posts.post_text, posts.like_num , userInfo.username FROM posts JOIN userInfo ON posts.author_id = userInfo.id WHERE post_text LIKE ? ORDER BY ?? DESC LIMIT 1 OFFSET ?'
  db.query(query, [`%${temString}%`, order_by, num], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else if(result.length<=0){
      res.json("该条帖子不存在3")
      console.log("该条帖子不存在3")
      return
    }
    else{
      const post = result[0]
      res.json({
        post_id: post.id,
        author_name: post.username,
        post_text: post.post_text, 
        like_num: post.like_num
      });
      console.log("现页面帖子string获取成功")
      return
    }
  })

});

function setQueryNumber(mode){
  if(mode === "发帖"){
    return 'SELECT COUNT(p.author_id) AS post_count FROM userInfo u JOIN posts p ON u.id = p.author_id WHERE u.username = ?'
  }
  else if(mode === "收藏"){
    return 'SELECT COUNT(p.post_id) AS post_count FROM userInfo u JOIN user_post_store p ON u.id = p.user_id WHERE u.username = ?'
  }
  else{ //转发
    return 'SELECT COUNT(p.post_id) AS post_count FROM userInfo u JOIN user_post_transmit p ON u.id = p.user_id WHERE u.username = ?'
  }
}


//我的页面下栏帖子数量获取
app.get('/api/MyListNumber/:username/:mode', async(req, res) => {
  const username = req.params.username
  const mode = req.params.mode
  let query = await setQueryNumber(mode)

  db.query(query, [username], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else{
      const totalPosts = result[0].post_count;
      console.log(totalPosts)
      res.json({
        totalPosts: totalPosts,
      });
      console.log("帖子总数量获取成功")
      return
    }
  })
});


function setQueryAvatar(mode){
  if(mode === "发帖"){
    return 'SELECT u.avatarPath FROM userInfo u WHERE u.username = ?'
  }
  else if(mode === "收藏"){
    return 'SELECT u2.avatarPath FROM userInfo u JOIN user_post_store s ON u.id = s.user_id JOIN posts p ON s.post_id = p.id JOIN userInfo u2 ON p.author_id = u2.id WHERE u.username = ? ORDER BY s.store_time DESC LIMIT 1 OFFSET ?'
  }
  else{ //转发
    return 'SELECT u2.avatarPath FROM userInfo u JOIN user_post_transmit s ON u.id = s.user_id JOIN posts p ON s.post_id = p.id JOIN userInfo u2 ON p.author_id = u2.id WHERE u.username = ? ORDER BY s.transmit_time DESC LIMIT 1 OFFSET ?'
  }
}

//我的页面下栏帖子头像获取
app.get('/api/MyListAvatar/:username/:mode/:ordinal', async(req, res) => {
  const username = req.params.username
  const mode = req.params.mode
  const ordinal = req.params.ordinal
  const new_ordinal = ordinal - 1;
  let query = await setQueryAvatar(mode)
  
  if(mode === "发帖"){
    db.query(query, [username], (err,result)=>{
      if(err){
        res.json("数据库查询失败")
        console.log("数据库查询失败")
        console.log(err)
        return
      }
      else if(result.length<=0){
        res.json("该条帖子不存在1")
        console.log("该条帖子不存在1")
        return
      }
      else{
        const avatarPath = result[0].avatarPath;
        res.sendFile(avatarPath);
        console.log("我的页面下栏帖子头像获取成功")
        return
      }
    })
  }
  else{
    db.query(query, [username, new_ordinal], (err,result)=>{
      if(err){
        res.json("数据库查询失败")
        console.log("数据库查询失败")
        console.log(err)
        return
      }
      else if(result.length<=0){
        res.json("该条帖子不存在1")
        console.log("该条帖子不存在1")
        return
      }
      else{
        const avatarPath = result[0].avatarPath;
        res.sendFile(avatarPath);
        console.log("我的页面下栏帖子头像获取成功")
        return
      }
    })
  }
});

function setQueryPicture(mode){
  if(mode === "发帖"){
    return 'SELECT p.preview_picture_path FROM userInfo u JOIN posts p ON u.id = p.author_id WHERE u.username = ? ORDER BY p.post_time DESC LIMIT 1 OFFSET ?'
  }
  else if(mode === "收藏"){
    return 'SELECT p.preview_picture_path FROM userInfo u JOIN user_post_store s ON u.id = s.user_id JOIN posts p ON s.post_id = p.id WHERE u.username = ? ORDER BY s.store_time DESC LIMIT 1 OFFSET ?'
  }
  else{ //转发
    return 'SELECT p.preview_picture_path FROM userInfo u JOIN user_post_transmit s ON u.id = s.user_id JOIN posts p ON s.post_id = p.id WHERE u.username = ? ORDER BY s.transmit_time DESC LIMIT 1 OFFSET ?'
  }
}

//我的页面下栏帖子图片获取
app.get('/api/MyListPicture/:username/:mode/:ordinal', async(req, res) => {
  const username = req.params.username
  const mode = req.params.mode
  const ordinal = req.params.ordinal
  const new_ordinal = ordinal - 1;
  let query = await setQueryPicture(mode)
  
  db.query(query, [username, new_ordinal], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      console.log(err)
      return
    }
    else if(result.length<=0){
      res.json("该条帖子不存在2")
      console.log("该条帖子不存在2")
      return
    }
    else{
      const preview_picture_path = result[0].preview_picture_path;
      res.sendFile(preview_picture_path);
      console.log("我的页面下栏帖子预览图获取成功")
      return
    }
  })
  
});

function setQueryString(mode){
  if(mode === "发帖"){
    return 'SELECT u.username, p.post_text, p.like_num, p.id FROM userInfo u JOIN posts p ON u.id = p.author_id WHERE u.username = ? ORDER BY p.post_time DESC LIMIT 1 OFFSET ?'
  }
  else if(mode === "收藏"){
    return 'SELECT u2.username, p.post_text, p.like_num, p.id FROM userInfo u JOIN user_post_store s ON u.id = s.user_id JOIN posts p ON s.post_id = p.id JOIN userInfo u2 ON p.author_id = u2.id WHERE u.username = ? ORDER BY s.store_time DESC LIMIT 1 OFFSET ?'
  }
  else{ //转发
    return 'SELECT u2.username, p.post_text, p.like_num, p.id FROM userInfo u JOIN user_post_transmit s ON u.id = s.user_id JOIN posts p ON s.post_id = p.id JOIN userInfo u2 ON p.author_id = u2.id WHERE u.username = ? ORDER BY s.transmit_time DESC LIMIT 1 OFFSET ?'
  }
}

//我的页面下栏帖子string获取
app.get('/api/MyListString/:username/:mode/:ordinal', async(req, res) => {
  const username = req.params.username
  const mode = req.params.mode
  const ordinal = req.params.ordinal
  const new_ordinal = ordinal - 1;
  let query = await setQueryString(mode)
  
  db.query(query, [username, new_ordinal], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      console.log(err)
      return
    }
    else if(result.length<=0){
      res.json("该条帖子不存在3")
      console.log("该条帖子不存在3")
      return
    }
    else{
      const post = result[0]
      res.json({
        author_name: post.username,
        post_text: post.post_text, 
        like_num: post.like_num,
        post_id: post.id
      });
      console.log("我的页面下栏帖子string获取成功")
      return
    }
  })
});

//我的关注用户数量获取
app.get('/api/AttentionListNumber/:username', async(req, res) => {
  const username = req.params.username
  const query = 'SELECT COUNT(*) AS num_following FROM userInfo u JOIN user_attention_user a ON u.id = a.user_id WHERE u.username = ?'

  db.query(query, [username], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else{
      const num_following = result[0].num_following;
      res.json({
        num_following: num_following,
      });
      console.log("关注用户总数量获取成功")
      return
    }
  })
});

//我的关注用户头像获取
app.get('/api/AttentionListAvatar/:username/:ordinal', async(req, res) => {
  const username = req.params.username
  const ordinal = req.params.ordinal
  const query = 'SELECT u2.avatarPath FROM userInfo u JOIN user_attention_user s ON u.id = s.user_id JOIN userInfo u2 ON s.attentioned_user_id = u2.id WHERE u.username = ? ORDER BY s.attention_time DESC LIMIT 1 OFFSET ?'

  db.query(query, [username, ordinal - 1], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else{
      const avatarPath = result[0].avatarPath;
      res.sendFile(avatarPath);
      console.log("关注用户头像获取成功")
      return
    }
  })
});

//我的关注用户用户名获取
app.get('/api/AttentionListUsername/:username/:ordinal', async(req, res) => {
  const username = req.params.username
  const ordinal = req.params.ordinal
  const query = 'SELECT u2.username FROM userInfo u JOIN user_attention_user s ON u.id = s.user_id JOIN userInfo u2 ON s.attentioned_user_id = u2.id WHERE u.username = ? ORDER BY s.attention_time DESC LIMIT 1 OFFSET ?'

  db.query(query, [username, ordinal - 1], (err,result)=>{
    if(err){
      res.json("数据库查询失败")
      console.log("数据库查询失败")
      return
    }
    else{
      const username = result[0].username;
      res.json({
        username: username
      });
      console.log("关注用户用户名获取成功")
      return
    }
  })
});



// 帖子内部发送者头像获取
app.get('/api/postcontentavatar/:postid', async(req, res) => {
    const postid = req.params.postid

    const sql_search = "select u.avatarPath from posts p join userInfo u on p.author_id = u.id where p.id = ?"
    db.query(sql_search,[postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            const user = result[0]
            res.sendFile(user.avatarPath)
            console.log("帖子内部发送者头像获取成功")
            return
        }
    })
});


// 帖子内部预览图获取
app.get('/api/postcontentpicture/:postid', async(req, res) => {
    const postid = req.params.postid

    const sql_search = "select preview_picture_path from posts where id = ?"
    db.query(sql_search,[postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            const post = result[0]
            res.sendFile(post.preview_picture_path)
            console.log("帖子内部预览图获取")
            return
        }
    })
});


// 帖子内部文字信息获取
app.get('/api/postcontentstring/:postid', async(req, res) => {
    const postid = req.params.postid

    const sql_search = "select p.model_id, u.username, p.can_edit, p.post_text from posts p join userInfo u on p.author_id = u.id where p.id = ?"
    db.query(sql_search,[postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            const info = result[0]
            res.json({
                model_id: info.model_id,
                author_name : info.username,
                can_edit : info.can_edit,
                post_text : info.post_text
            })
            console.log("帖子内部文字信息获取成功")
            return
        }
    })
});


// 帖子是否是我发的
app.get('/api/postcontentwhetherIpost/:postid/:myname', async(req, res) => {
    const postid = req.params.postid
    const myname = req.params.myname

    const sql_search = "SELECT posts.* FROM posts JOIN userInfo ON posts.author_id = userInfo.id WHERE userInfo.username = ? AND posts.id = ?"
    db.query(sql_search,[myname, postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length <= 0){
            res.json({
                whether_I_post : 0
            })
            console.log("该帖子不是我发的")
            return
        }
        else{
            res.json({
                whether_I_post : 1
            })
            console.log("该帖子是我发的")
            return
        }
    })
});


// 帖子是否被我点赞
app.get('/api/postcontentwhetherlike/:postid/:myname', async(req, res) => {
    const postid = req.params.postid
    const myname = req.params.myname

    const sql_search = "SELECT l.* FROM user_post_like l JOIN userInfo u ON l.user_id = u.id WHERE u.username = ? AND l.post_id = ?"
    db.query(sql_search,[myname, postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length <= 0){
            res.json({
                whether_like : 0
            })
            console.log("该帖子没被我点赞过")
            return
        }
        else{
            res.json({
                whether_like : 1
            })
            console.log("该帖子被我点赞过")
            return
        }
    })
});


// 帖子是否被我收藏
app.get('/api/postcontentwhetherstore/:postid/:myname', async(req, res) => {
    const postid = req.params.postid
    const myname = req.params.myname

    const sql_search = "SELECT s.* FROM user_post_store s JOIN userInfo u ON s.user_id = u.id WHERE u.username = ? AND s.post_id = ?"
    db.query(sql_search,[myname, postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length <= 0){
            res.json({
                whether_store : 0
            })
            console.log("该帖子没被我收藏过")
            return
        }
        else{
            res.json({
                whether_store : 1
            })
            console.log("该帖子被我收藏过")
            return
        }
    })
});


// 我是否关注了作者
app.get('/api/postcontentwhetherattention/:postid/:myname', async(req, res) => {
    const postid = req.params.postid
    const myname = req.params.myname

    const sql_search = "SELECT a.* FROM user_attention_user a JOIN posts p ON a.attentioned_user_id = p.author_id JOIN userInfo u ON u.id = a.user_id WHERE u.username = ? AND p.id = ?"
    db.query(sql_search,[myname, postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length <= 0){
            res.json({
                whether_attention : 0
            })
            console.log("我没关注作者")
            return
        }
        else{
            res.json({
                whether_attention : 1
            })
            console.log("我关注了作者")
            return
        }
    })
});

// 帖子内部所有评论id获取
app.get('/api/postcontentcommentnumber/:postid', async(req, res) => {
    const postid = req.params.postid

    const sql_search = "SELECT id FROM comments WHERE post_id = ?"
    db.query(sql_search,[postid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("id数据库查询失败")
            return
        }
        else{
            const id_array = result.map(result_one => result_one.id)
            console.log(id_array)
            res.json({
                id_array: id_array
            })
            console.log("帖子内部所有评论id获取成功")
            return
        }
    })
});


// 帖子内部评论头像获取
app.get('/api/postcontentcommentavatar/:postid/:ordinal', async(req, res) => {
    const postid = req.params.postid
    const ordinal = req.params.ordinal

    const sql_search = "SELECT u.avatarPath FROM comments c JOIN userInfo u ON u.id = c.comment_person_id WHERE c.id = ?"
    db.query(sql_search,[ordinal],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("评论头像数据库查询失败")
            return
        }
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            const user = result[0]
            res.sendFile(user.avatarPath)
            console.log("帖子内部评论总数获取成功")
            return
        }
    })
});


// 帖子内部评论string信息获取
app.get('/api/postcontentcommentstring/:postid/:ordinal', async(req, res) => {
    const postid = req.params.postid
    const ordinal = req.params.ordinal

    const sql_search = "SELECT u.username, c.comment_text FROM comments c JOIN userInfo u ON u.id = c.comment_person_id WHERE c.id = ?"
    db.query(sql_search,[ordinal],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
      
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            res.json({
                username : result[0].username,
                comment_text : result[0].comment_text
            })
            console.log("帖子内部评论string信息获取成功")
            return
        }
    })
});


// 帖子内部评论刷新时头像获取
app.get('/api/postcontentrefreshcommentavatar/:commentid', async(req, res) => {
    const commentid = req.params.commentid

    const sql_search = "SELECT u.avatarPath FROM comments c JOIN userInfo u ON u.id = c.comment_person_id WHERE c.id = ?"
    db.query(sql_search,[commentid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            const user = result[0]
            res.sendFile(user.avatarPath)
            console.log("帖子内部评论刷新时头像获取成功")
            return
        }
    })
});


// 帖子内部评论刷新时string信息获取
app.get('/api/postcontentrefreshcommentstring/:commentid', async(req, res) => {
    const commentid = req.params.commentid

    const sql_search = "SELECT u.username, c.comment_text FROM comments c JOIN userInfo u ON u.id = c.comment_person_id WHERE c.id = ?"
    db.query(sql_search,[commentid],(err,result)=>{
        if(err){
            res.json("数据库查询失败")
            console.log("数据库查询失败")
            return
        }
        else if(result.length<=0){
            res.json("该帖子不存在")
            console.log("该帖子不存在")
            return
        }
        else{
            res.json({
                username : result[0].username,
                comment_text : result[0].comment_text
            })
            console.log("帖子内部评论刷新时string信息获取成功")
            return
        }
    })
});


// 发评论
app.post('/api/postcomment', async(req, res) => {
  const{comment_text, postid, username} = req.body
  console.log(comment_text, postid, username)
  const sql_insert = 'INSERT INTO comments (comment_text, post_id, comment_person_id) VALUES (?, ?, (SELECT id FROM userInfo WHERE username = ?))'
  db.query(sql_insert, [comment_text, postid, username], (err, result) => {
    if (err) {
      res.json("数据库发评论失败")
      console.log("数据库发评论失败")
      return
    }
    else{
      res.json("发评论成功")
      console.log("发评论成功")
      return
    }
  });
});

//请求一个模型的预览图
app.get('/api/fnyGetModelPreviewPicture/:model_id', async(req, res) => {
  const model_id = req.params.model_id
  const sql_search_model = "select * from models_in_repository where id = ?"
  db.query(sql_search_model,[model_id],(err,result)=>{
      if(err){
          res.json("unexpected error")
          console.log("fny:查找模型预览图出错")
          return
      }
      else if(result.length<=0){
          res.json("model not exist")
          console.log("fny:未找到指定预览图")
          console.log(model_id)
          return
      }
      else{
          const preview_picture_path = result[0].preview_picture_path
          console.log(preview_picture_path)
          res.sendFile(preview_picture_path)
          console.log("fny:成功发送指定预览图")
          console.log(model_id)
          return
      }
  })
});

//给出用户，返回其所有私有库的列表
app.post('/api/fnyGetUserModel', async(req, res) => {
  const{username} = req.body

  let userID=-1
  //先根据用户名找到用户ID
  const sql_search_username = "select * from userInfo where username = ?"
  db.query(sql_search_username,[username],(err,result)=>{
      if(err){
          res.json({text:"error when finding user"})
          console.log("fny:意外情况：查找用户出错")
          return
      }
      else if(result.length<=0){
          res.json({text:"user not found"})
          console.log("fny:意外情况：找不到用户")
          return
      }
      else{
          userID = result[0].id
          console.log("fny:用户ID查询成功")
          console.log(userID)
          const sql_search_models = "select * from user_model_repository where user_id = ? order by repository_time desc"
          db.query(sql_search_models,[userID],(err,result)=>{
            if(err){
              res.json({text:"error when searching models"})
              console.log("fny:意外情况：查找私有模型列表出错")
              return
            }
            else{
              res.json({
                text: "successful",
                model_list: result.map((item) => {
                  return item.model_id
                })
              })
            console.log(result.map((item) => {
            return item.model_id
          }))
          console.log("fny:私有模型查询成功")
      }
  })
      }
  })

  
});

//给出用户和模型ID，从用户的私有列表里删去这个模型
app.post('/api/fnyDeleteOneUserModel', async(req, res) => {
  const{username,modelID} = req.body

  let userID=-1
  //先根据用户名找到用户ID
  const sql_search_username = "select * from userInfo where username = ?"
  db.query(sql_search_username,[username],(err,result)=>{
      if(err){
          res.json("error when finding user")
          console.log("fny:意外情况：查找用户出错")
          return
      }
      else if(result.length<=0){
          res.json("user not found")
          console.log("fny:意外情况：找不到用户")
          return
      }
      else{
          userID = result[0].id
          console.log("fny:用户ID查询成功")
          console.log(userID)
          const sql_delete_one_model = 'delete from user_model_repository where user_id= ? and model_id = ?'
          db.query(sql_delete_one_model,[userID,modelID], (err, result) => {
            if(err){
              res.json("unexpected error")
              console.log("fny:删除私有模型失败")
              return
            }
            res.json("successful")
            console.log("fny:成功删除私有模型")
          })
      }
  })
});

//两个模型的拼接
//请求一个模型的点云文件
app.post('/api/fnyGetFileOfOneModel/:modelId', async(req, res) => {
  const model_id = req.params.modelId
  console.log("fny:backend id:"+model_id)
  const sql_search_model = "select * from models_in_repository where id = ?"
  db.query(sql_search_model,[model_id],(err,result)=>{
      if(err){
          res.json({text:"unexpected error"})
          console.log("fny:查找指定模型出错")
          return
      }
      else if(result.length<=0){
          res.json({text:"model not exist"})
          console.log("fny:未找到指定模型")
          return
      }
      else{
          let output_string=''
          const modelPath = result[0].model_path
          const { spawn } = require('child_process');
          new Promise((resolve, reject) => {
            const process = spawn('python', ['./read_npy.py',modelPath]);
            process.stdout.on('data',(data)=>{
              output_string+=data
              // res.json({
              //   text: "successful",
              //   array: data
              // })
            })
            process.stderr.on('data',(data)=>{
              console.log("fny:python stderr: "+data);
              res.json({text: "unexpected error in python"})
              return
            })
            process.on('close',(code)=>{
              if(code===0){
                console.log("fny:python quit with code: "+code);
                res.json({
                  text: "successful",
                  array: output_string
                })
                return
              }
            })
          });
          console.log("fny:退出Python")
          return
      }
  })
});

//创建新模型(发送点云文件)
app.post('/api/fnyAddNewModel', async(req, res) => {  //post的路径需要修改
	const{username,model_path,preview_path} = req.body

    console.log("fny:进入创建模型函数")
    let userID=-1
	let modelID=-1

    //先根据用户名找到用户ID
    const sql_search_username = "select * from userInfo where username = ?"
    db.query(sql_search_username,[username],(err,result)=>{
        if(err){
            res.json({text:"error when finding user"})
            console.log("fny:意外情况：查找发帖用户出错")
            return
        }
		else if(result.length<=0){
            res.json({text:"user not found"})
            console.log("fny:意外情况：找不到发帖用户")
            return
        }
        else{
            userID = result[0].id
            console.log("fny:发帖用户ID查询成功")

            const sql_insert_model = 'INSERT INTO models_in_repository SET ?';
            db.query(sql_insert_model, {model_path:'/home/ubuntu/software/data/'+model_path,preview_picture_path:'/home/ubuntu/software/data/'+preview_path}, (err, result) => {
                if(err){
                    res.json({text:"error when inserting new model"})
                    console.log("fny:数据库插入新模型失败")
                    return
                }
                modelID=result.insertId
                console.log("fny:成功加入新模型")

                const sql_insert_user_model = 'INSERT INTO user_model_repository SET ?';
                db.query(sql_insert_user_model, {model_id:modelID,user_id:userID}, (err, result) => {
                    if(err){
                        res.json({text:"error when creating user_model"})
                        console.log("fny:数据库新建用户-模型关系失败")
						return
                    }
                    res.json({
                        text: "successful",
                        modelID: modelID
                    })
                    console.log("fny:成功新建用户-模型对应关系")
					return
                })

            })
        }
    })
});

// //创建新模型(发送点云文件)
// app.post('/api/fnyAddNewModel/:username',upload_model.single('model'), async(req, res) => {  //post的路径需要修改
//     const username = req.params.username
//     const model_Path = req.file.path

//     console.log("fny:进入创建模型函数")
//     console.log(req.file.originalname)
//     let userID=-1
//     let modelID=-1
//     if(model_Path==null){
//         res.json({text:"model wrong"})
//         console.log("fny:model wrong")
//         return
//     }
//     else{
//         //先根据用户名找到用户ID
//         const sql_search_username = "select * from userInfo where username = ?"
//         db.query(sql_search_username,[username],(err,result)=>{
//             if(err){
//                 res.json({text:"error when finding user"})
//                 console.log("fny:意外情况：查找发帖用户出错")
//                 return
//             }
//             else if(result.length<=0){
//                 res.json({text:"user not found"})
//                 console.log("fny:意外情况：找不到发帖用户")
//                 return
//             }
//             else{
//                 userID = result[0].id
//                 console.log("fny:发帖用户ID查询成功")

//                 const sql_insert_model = 'INSERT INTO models_in_repository SET ?';
//                 db.query(sql_insert_model, {model_path:model_Path,preview_picture_path:""}, (err, result) => {
//                     if(err){
//                         res.json({text:"error when inserting new model"})
//                         console.log("fny:数据库插入新模型失败")
//                         return
//                     }
//                     modelID=result.insertId
//                     console.log("fny:成功加入新模型")

//                     const sql_insert_user_model = 'INSERT INTO user_model_repository SET ?';
//                     db.query(sql_insert_user_model, {model_id:modelID,user_id:userID}, (err, result) => {
//                         if(err){
//                             res.json({text:"error when creating user_model"})
//                             console.log("fny:数据库新建用户-模型关系失败")
//                             return
//                         }
//                         res.json({
//                             text: "successful",
//                             modelID: modelID
//                         })
//                         console.log("fny:成功新建用户-模型对应关系")
//                         return
//                     })
//                 })
//             }
//         })  
//     }
// });
// //再发送预览图
// app.post('/api/fnyUplodeModelPreviewPicture/:modelID',upload_preview_picture.single('preview_picture'), async(req, res) => {  //post的路径需要修改
//     const modelID = req.params.modelID
//     const preview_Picture_Path = req.file.path
  
//     const changePicturePath = 'UPDATE models_in_repository SET preview_picture_path = ? WHERE id = ?'
//     db.query(changePicturePath, [preview_Picture_Path, modelID], (err, result) => {
//         if (err) {
//             res.json("update preview picture path failed")
//             console.log("fny:错误：模型存储预览图失败")
//             return
//         }
//         else{
//             res.json("successful")
//             console.log("fny:成功存储模型预览图")
//             return
//         }
//     });
// });

//发布帖子
app.post('/api/fnyReleasePost', async(req, res) => {  //post的路径需要修改
  
	 const{username,modelID,text,canEdit} = req.body
  	let userID=-1
  	//先根据用户名找到用户ID
    const sql_search_username = "select * from userInfo where username = ?"
    db.query(sql_search_username,[username],(err,result)=>{
        if(err){
            res.json("error when finding user")
            console.log("fny:意外情况：查找发帖用户出错")
            return
        }
        else if(result.length<=0){
            res.json("user not found")
            console.log("fny:意外情况：找不到发帖用户")
            return
        }
        else{
            userID = result[0].id
            console.log("fny:发帖用户ID查询成功")

			let temp_model_path=""
			let temp_preqiew_picture_path=""
			const sql_search_model = "select * from models_in_repository where id = ?"
			db.query(sql_search_model,[modelID],(err,result)=>{
				if(err){
					res.json("unexpected error")
					console.log("fny:意外情况：查找模型出错")
					return
				}
				else if(result.length<=0){
					res.json("error when finding model")
					console.log("fny:意外情况：发帖的模型不存在")
					return
				}
				else{
					temp_preqiew_picture_path = result[0].preview_picture_path
					temp_model_path=result[0].model_path
					console.log("fny:发帖模型查询成功")

					const sql_insert_post = 'INSERT INTO posts SET ?';
                    db.query(sql_insert_post, {preview_picture_path:temp_preqiew_picture_path, model_path:temp_model_path, post_text:text, author_id:userID,can_edit:canEdit,model_id:modelID}, (err, result) => {
                        if(err){
                            res.json("unexpected error")
                            console.log("fny:数据库插入帖子失败")
                            return
                        }
                        res.json("successful")
                        console.log("fny:成功发帖")
                    })
				}
			})
        }
    })    
});


function setQueryLike(likeClicked){
  if(likeClicked === 0){
    return 'INSERT INTO user_post_like (user_id, post_id) VALUES (?, ?)'
  }
  else{
    return 'DELETE FROM user_post_like WHERE user_id = ? AND post_id = ?'
  }
}

app.post('/api/fnyAddOrDeleteLike', async(req, res) => {  //点赞
  const{add_or_delete, postID, username} = req.body
  //先根据用户名找到用户ID
  const sql1 = "select * from userInfo where username = ?"
  db.query(sql1,[username],(err,result)=>{
      if(err){
          res.json("error when finding user")
          console.log("fny:意外情况：查找点赞用户出错")
          return
      }
      else if(result.length<=0){
          res.json("user not found")
          console.log("fny:意外情况：找不到点赞用户")
          return
      }
      else{
          const userID = result[0].id
          console.log("fny:点赞用户ID查询成功")

          //中间表更改
          const sql2 = setQueryLike(add_or_delete)
          db.query(sql2, [userID, postID], (err, result) => {
            if(err){
              res.json("unexpected error")
              console.log("fny:点赞中间表更改失败")
              return
            }
            else{
              console.log("fny:点赞中间表更改成功")

              //先获得帖子信息
              const sql3 = "select like_num from posts where id = ?"
              db.query(sql3,[postID],(err,result)=>{
                if(err){
                    res.json("error when finding post")
                    console.log("fny:意外情况：查找帖子失败")
                    return
                }
                else if(result.length<=0){
                    res.json("post not found")
                    console.log("fny:意外情况：找不到帖子")
                    return
                }
                else{
                    console.log("fny:获得帖子信息成功")

                    // 帖子点赞数变化
                    const new_post_like_num = result[0].like_num
                    const newPostNum = setNum(new_post_like_num, add_or_delete)

                    const sql4 = 'UPDATE posts SET like_num = ? WHERE id = ?'
                    db.query(sql4, [newPostNum, postID], (err, result) => {
                      if (err) {
                          res.json("update post like num failed")
                          console.log("fny:更新帖子点赞数失败")
                          return
                      }
                      else{
                          res.json("successful")
                          console.log("fny:更新帖子点赞数成功")
                      }
                    });
                }
              })
            }
          })
      }
  })
});


function setQueryStore(storeClicked){
  if(storeClicked === 0){
    return 'INSERT INTO user_post_store (user_id, post_id) VALUES (?, ?)'
  }
  else{
    return 'DELETE FROM user_post_store WHERE user_id = ? AND post_id = ?'
  }
}

function setNum(num, add_or_delete){
  if(add_or_delete === 0){
    return parseInt(num) + 1
  }
  else{
    return parseInt(num) - 1
  }
}

app.post('/api/fnyAddOrDeleteStore', async(req, res) => {  //收藏
  const{add_or_delete, postID, username} = req.body
  //先根据用户名找到用户ID
  const sql1 = "select * from userInfo where username = ?"
  db.query(sql1,[username],(err,result)=>{
      if(err){
          res.json("error when finding user")
          console.log("fny:意外情况：查找收藏用户出错")
          return
      }
      else if(result.length<=0){
          res.json("user not found")
          console.log("fny:意外情况：找不到收藏用户")
          return
      }
      else{
          const userID = result[0].id
          const userStoreNum = result[0].stores_num
          console.log("fny:收藏用户ID查询成功")

          //中间表更改
          const sql2 = setQueryStore(add_or_delete)
          db.query(sql2, [userID, postID], (err, result) => {
            if(err){
              res.json("unexpected error")
              console.log("fny:收藏中间表更改失败")
              return
            }
            else{
              console.log("fny:收藏中间表更改成功")

              //用户收藏数变化
              const newUserNum = setNum(userStoreNum, add_or_delete)

              const sql3 = 'UPDATE userInfo SET stores_num = ? WHERE id = ?'
              db.query(sql3, [newUserNum, userID], (err, result) => {
                if (err){
                    res.json("update user store num failed")
                    console.log("fny:更新用户收藏数失败")
                    return
                }
                else{
                    console.log("fny:更新用户收藏数成功")

                    //先获得帖子信息
                    const sql4 = "select store_num from posts where id = ?"
                    // console.log(postID)
                    db.query(sql4,[postID],(err,result)=>{
                      if(err){
                          res.json("error when finding post")
                          console.log("fny:意外情况：查找帖子失败")
                          return
                      }
                      else if(result.length<=0){
                          res.json("post not found")
                          console.log("fny:意外情况：找不到帖子")
                          return
                      }
                      else{
                          console.log("fny:获得帖子信息成功")

                          // 帖子收藏数变化
                          const new_post_store_num = result[0].store_num
                          const newPostNum = setNum(new_post_store_num, add_or_delete)

                          const sql5 = 'UPDATE posts SET store_num = ? WHERE id = ?'
                          db.query(sql5, [newPostNum, postID], (err, result) => {
                            if (err) {
                                res.json("update post store num failed")
                                console.log("fny:更新帖子收藏数失败")
                                return
                            }
                            else{
                                res.json("successful")
                                console.log("fny:更新帖子收藏数成功")
                            }
                          });
                      }
                    })

                }
              });
            }
          })
      }
  })
});


app.post('/api/fnyTransmit', async(req, res) => { //转发
  const{postID, username} = req.body
  //先根据用户名找到用户ID
  const sql1 = "select * from userInfo where username = ?"
  db.query(sql1,[username],(err,result)=>{
      if(err){
          res.json("error when finding user")
          console.log("fny:意外情况：查找转发用户出错")
          return
      }
      else if(result.length<=0){
          res.json("user not found")
          console.log("fny:意外情况：找不到转发用户")
          return
      }
      else{
        const userID = result[0].id
        const userTransmitNum = result[0].transmits_num
        console.log("fny:转发用户ID查询成功")

        //中间表更改
        const sql2 = 'INSERT INTO user_post_transmit (user_id, post_id) VALUES (?, ?)'
        db.query(sql2, [userID, postID], (err, result) => {
          if(err){
            res.json("unexpected error")
            console.log("fny:转发中间表更改失败")
            return
          }
          else{
            console.log("fny:转发中间表更改成功")

            //用户转发数变化
            const newUserNum = parseInt(userTransmitNum) + 1

            const sql3 = 'UPDATE userInfo SET transmits_num = ? WHERE id = ?'
            db.query(sql3, [newUserNum, userID], (err, result) => {
              if (err){
                  res.json("update user transmit num failed")
                  console.log("fny:更新用户转发数失败")
                  return
              }
              else{
                  console.log("fny:更新用户转发数成功")
                  res.json("successful")
              }
            });
          }
        });
      }
  });
});


function setQueryAttention(storeClicked){
  if(storeClicked === 0){
    return 'INSERT INTO user_attention_user (user_id, attentioned_user_id) VALUES ((SELECT id FROM userInfo WHERE username = ?), (SELECT author_id FROM posts WHERE id = ?))'
  }
  else{
    return 'DELETE user_attention_user FROM user_attention_user JOIN posts ON user_attention_user.attentioned_user_id = posts.author_id JOIN userInfo ON user_attention_user.user_id = userInfo.id WHERE userInfo.username = ? AND posts.id = ?'
  }
}


app.post('/api/fnyAttention', async(req, res) => {  //关注
  const{add_or_delete, postID, username} = req.body
  //先根据用户名找到用户ID
  const sql1 = "select * from userInfo where username = ?"
  db.query(sql1,[username],(err,result)=>{
      if(err){
          res.json("error when finding user")
          console.log("fny:意外情况：查找关注用户出错")
          return
      }
      else if(result.length<=0){
          res.json("user not found")
          console.log("fny:意外情况：找不到关注用户")
          return
      }
      else{
          const userID = result[0].id
          const userAttentionNum = result[0].attentions_num
          console.log("fny:关注用户ID查询成功")

          //中间表更改
          const sql2 = setQueryAttention(add_or_delete)
          db.query(sql2, [username, postID], (err, result) => {
            if(err){
              res.json("unexpected error")
              console.log("fny:关注中间表更改失败")
              return
            }
            else{
              console.log("fny:关注中间表更改成功")

              //用户关注数变化
              const newUserNum = setNum(userAttentionNum, add_or_delete)

              const sql3 = 'UPDATE userInfo SET attentions_num = ? WHERE id = ?'
              db.query(sql3, [newUserNum, userID], (err, result) => {
                if (err){
                    res.json("update user attention num failed")
                    console.log("fny:更新用户关注数失败")
                    return
                }
                else{
                    console.log("fny:更新用户关注数成功")
                    res.json("successful")
                    return
                }
              });
            }
          })
      }
  })
});


//公共库挪进自己的
app.post('/api/fnyAddToPrivateModel', (req, res) => {
  const{username,model_id} = req.body

  let userID=-1
  //先根据用户名找到用户ID
  const sql_search_username = "select * from userInfo where username = ?"
  db.query(sql_search_username,[username],(err,result)=>{
      if(err){
          res.json("error when finding user")
          console.log("fny:意外情况：查找用户出错")
          return
      }
      else if(result.length<=0){
          res.json("user not found")
          console.log("fny:意外情况：找不到用户")
          return
      }
      else{
          userID = result[0].id
          console.log("fny:用户ID查询成功")

          let old_preview_picture_path=''
          let old_model_path=''
          const sql_search_model = "select * from models_in_repository where id = ?"
          db.query(sql_search_model,[model_id],(err,result)=>{
          if(err){
            console.log("fny:意外情况：查找模型失败")
            return
          }
          else if(result.length<=0){
            console.log("fny:意外情况：找不到模型")
            return
          }
          else{
            old_preview_picture_path=result[0].preview_picture_path
            old_model_path=result[0].model_path
            console.log("fny:获取模型相关信息")

            let new_id=-1
            const sql_insert_model = 'INSERT INTO models_in_repository SET ?';
            db.query(sql_insert_model, {preview_picture_path:old_preview_picture_path,model_path:old_model_path}, (err, result) => {
              if(err){
                res.json("insert error")
                console.log("fny:复制模型失败")
                return
              }
              console.log("fny:复制模型成功")

              new_id=result.insertId

              const sql_insert_user_model = 'INSERT INTO user_model_repository SET ?';
              console.log("fny:fny")
              console.log(userID)
              db.query(sql_insert_user_model, {user_id:userID,model_id:new_id}, (err, result) => {
              if(err){
                res.json("insert error")
                console.log("fny:模型添加到私有库失败")
                return
              }
              res.json("successful")
              console.log("fny:模型添加到私有库成功")
              })
            })
          }
          })
      }
  })
});



app.post('/api/fnyGetLastChatMessage', async(req, res) => {  //我会返回一个已经排好序的列表（发送时间从早到晚），直接显示即可
  	//列表的每个元素是一个字典，其中send_or_receive为0表示发送，为1表示接收到的；content表示消息内容
  	const{username,ano_username} = req.body

  	let userID=-1
  	let anoUserID=-1
	  let array1=[]
	  let array2=[]
  	//先根据用户名找到用户ID
  	const sql_search_username = "select * from userInfo where username = ?"
  	db.query(sql_search_username,[username],(err,result)=>{
      	if(err){
          	res.json({text:"error when finding user"})
          	console.log("fny:意外情况：查找用户出错")
          	return
      	}
      	else if(result.length<=0){
          	res.json({text:"user not found"})
          	console.log("fny:意外情况：找不到用户")
          	return
      	}
      	else{
          	userID = result[0].id
          	console.log("fny:用户ID查询成功")

            db.query(sql_search_username,[ano_username],(err,result)=>{
              if(err){
                res.json({text:"error when finding user"})
                console.log("fny:意外情况：查找另一个用户出错")
                return
              }
              else if(result.length<=0){
                res.json("user not found")
                console.log("fny:意外情况：找不到另一个用户")
                return
              }
              else{
                anoUserID = result[0].id
                console.log("fny:另一个用户ID查询成功")

                const sql_search_chat_message = "select * from chat_messages where sender_user_id =? and receiver_user_id = ?"
                db.query(sql_search_chat_message,[userID,anoUserID],(err,result)=>{
                  if(err){
                    res.json({text:"error when searching chat message"})
                    console.log("fny:意外情况：查找发送聊天记录错误")
                    return
                  }
                  else{
                    array1 = result
                    console.log(array1)
                    console.log("fny:发送聊天记录查询成功")

                    db.query(sql_search_chat_message,[anoUserID,userID],(err,result)=>{
                      if(err){
                        res.json({text:"error when searching chat message"})
                        console.log("fny:意外情况：查找接收聊天记录错误")
                        return
                      }
                      else{
                        array2 = result
                        console.log(anoUserID)
                        console.log("fny:接收聊天记录查询成功")

                        //先整理一下聊天记录，只保留收发和内容
                        array1= array1.map((item) => {
                          return {
                            send_or_receive: 0,  //0表示发，1表示收
                            content:item.message_content,
                            send_time:item.send_time
                          }
                        })
                        
                        array2= array2.map((item) => {
                          return {
                            send_or_receive: 1,  //0表示发，1表示收
                            content:item.message_content,
                            send_time:item.send_time
                          }
                        })
                        
                        let total_array=array1.concat(array2)
                        total_array.sort((a, b) => {  return a.send_time - b.send_time;})
                        if(total_array.length > 0){
                          res.json({
                            text: "successful",
                            chat_message: total_array[total_array.length - 1]
                          })
                        }
                        else{
                          res.json({
                            text: "successful",
                            chat_message: ''
                          })
                        }
                        return
                      }
                    })
                  }
                })
              }
            })
      	}
  	})
});

//聊天
app.post('/api/fnyGetChatMessages', async(req, res) => {  //我会返回一个已经排好序的列表（发送时间从早到晚），直接显示即可
  	//列表的每个元素是一个字典，其中send_or_receive为0表示发送，为1表示接收到的；content表示消息内容
  	const{username,ano_username} = req.body

  	let userID=-1
  	let anoUserID=-1
	  let array1=[]
	  let array2=[]
  	//先根据用户名找到用户ID
  	const sql_search_username = "select * from userInfo where username = ?"
  	db.query(sql_search_username,[username],(err,result)=>{
      	if(err){
          	res.json({text:"error when finding user"})
          	console.log("fny:意外情况：查找用户出错")
          	return
      	}
      	else if(result.length<=0){
          	res.json({text:"user not found"})
          	console.log("fny:意外情况：找不到用户")
          	return
      	}
      	else{
          	userID = result[0].id
          	console.log("fny:用户ID查询成功")

            db.query(sql_search_username,[ano_username],(err,result)=>{
              if(err){
                res.json({text:"error when finding user"})
                console.log("fny:意外情况：查找另一个用户出错")
                return
              }
              else if(result.length<=0){
                res.json("user not found")
                console.log("fny:意外情况：找不到另一个用户")
                return
              }
              else{
                anoUserID = result[0].id
                console.log("fny:另一个用户ID查询成功")

                const sql_search_chat_message = "select * from chat_messages where sender_user_id =? and receiver_user_id = ?"
                db.query(sql_search_chat_message,[userID,anoUserID],(err,result)=>{
                  if(err){
                    res.json({text:"error when searching chat message"})
                    console.log("fny:意外情况：查找发送聊天记录错误")
                    return
                  }
                  else{
                    array1 = result
                    console.log(array1)
                    console.log("fny:发送聊天记录查询成功")

                    db.query(sql_search_chat_message,[anoUserID,userID],(err,result)=>{
                      if(err){
                        res.json({text:"error when searching chat message"})
                        console.log("fny:意外情况：查找接收聊天记录错误")
                        return
                      }
                      else{
                        array2 = result
                        console.log(anoUserID)
                        console.log("fny:接收聊天记录查询成功")

                        //先整理一下聊天记录，只保留收发和内容
                        array1= array1.map((item) => {
                          return {
                            send_or_receive: 0,  //0表示发，1表示收
                            content:item.message_content,
                            send_time:item.send_time
                          }
                        })
                        
                        array2= array2.map((item) => {
                          return {
                            send_or_receive: 1,  //0表示发，1表示收
                            content:item.message_content,
                            send_time:item.send_time
                          }
                        })
                        
                        let total_array=array1.concat(array2)
                        total_array.sort((a, b) => {  return a.send_time - b.send_time;})
                        res.json({
                          text: "successful",
                          chat_message: total_array
                        })
                        return
                      }
                    })
                  }
                })
              }
            })
      	}
  	})
});

// //赞
// app.post('/api/fnyGetLikeStorePostList', async(req, res) => {  //收藏
//   const{username} = req.body

//   let userID=-1
//   //先根据用户名找到用户ID
//   const sql_search_username = "select * from userInfo where username = ?"
//   db.query(sql_search_username,[username],(err,result)=>{
//       if(err){
//           res.json({text:"error when finding user"})
//           console.log("fny:意外情况：查找用户出错")
//           return
//       }
//       else if(result.length<=0){
//           res.json({text:"user not found"})
//           console.log("fny:意外情况：找不到用户")
//           return
//       }
//       else{
//           userID = result[0].id
//           userStoreNum = result[0].stores_num
//           console.log("fny:用户ID查询成功")
//       }
//   })

//   const sql_search_posts = "select * from posts where author_id = ? order by post_time desc"
//   db.query(sql_search_posts,[userID],(err,result)=>{
//       if(err){
//           res.json({text:"error when finding posts"})
//           console.log("fny:意外情况：查找用户已发帖子出错")
//           return
//       }
//       else{
//           let returnArray = result.map((one_post) => { 
//               return {
//                   post_id: one_post.id,
//                   like_num: one_post.like_num,
//                   store_num: one_post.store_num
//               };
//           });
//           res.json({
//               text: "successful",
//               array: returnArray
//           })
//           console.log("fny:用户ID查询成功")
//       }
//   })
// });

//增加一条聊天记录
app.post('/api/fnyAddChatMessage', async(req, res) => {  //我会返回一个已经排好序的列表（发送时间从早到晚），直接显示即可
  	//列表的每个元素是一个字典，其中send_or_receive为0表示发送，为1表示接收到的；content表示消息内容
  	const{username,ano_username,text} = req.body

  	let userID=-1
  	let anoUserID=-1
  	//先根据用户名找到用户ID
  	const sql_search_username = "select * from userInfo where username = ?"
  	db.query(sql_search_username,[username],(err,result)=>{
      	if(err){
        	res.json({text:"error when finding user"})
          	console.log("fny:意外情况：查找用户出错")
          	return
      	}
      	else if(result.length<=0){
        	res.json({text:"user not found"})
          	console.log("fny:意外情况：找不到用户")
          	return
      	}
      	else{
          	userID = result[0].id
          	console.log("fny:用户ID查询成功")

			db.query(sql_search_username,[ano_username],(err,result)=>{
				if(err){
					res.json({text:"error when finding user"})
					console.log("fny:意外情况：查找另一个用户出错")
					return
				}
				else if(result.length<=0){
					res.json("user not found")
					console.log("fny:意外情况：找不到另一个用户")
					return
				}
				else{
					anoUserID = result[0].id
					console.log("fny:另一个用户ID查询成功")

					const sql_insert_chat_message = 'INSERT INTO chat_messages SET ?';
					db.query(sql_insert_chat_message, {sender_user_id:userID,receiver_user_id:anoUserID,message_content:text}, (err, result) => {
						if(err){
							res.json("insert error")
							console.log("fny:添加聊天记录失败")
							return
						}
						res.json("successful")
						console.log("fny:添加聊天记录成功")
					})
				}
			})
      	}
  	})
});

//给出用户，返回所有与其互关的人
app.post('/api/fnyGetTwoSideAttentionList', async(req, res) => {
	const{username} = req.body
  
	let userID=-1
	//先根据用户名找到用户ID
	const sql_search_username = "select * from userInfo where username = ?"
	db.query(sql_search_username,[username],(err,result)=>{
		if(err){
			res.json({text:"error when finding user"})
			console.log("fny:意外情况：查找用户出错")
			return
		}
		else if(result.length<=0){
			res.json({text:"user not found"})
			console.log("fny:意外情况：找不到用户")
			return
		}
		else{
			userID = result[0].id
			console.log("fny:用户ID查询成功")
			
			let attention_user_list=[]
			const sql_search_attention_users = "select * from user_attention_user where user_id = ?"
			db.query(sql_search_attention_users,[userID],(err,result)=>{
			  	if(err){
					res.json({text:"error when searching Attentioned users"})
					console.log("fny:意外情况：查找当前用户关注人出错")
					return
			  	}
			  	else{
					attention_user_list=result.map((item) => {
						return item.attentioned_user_id
					})
					console.log(attention_user_list)

					let who_attention_me_list=[]
					const sql_search_who_attention_me = "select * from user_attention_user where attentioned_user_id = ?"
					db.query(sql_search_who_attention_me,[userID],(err,result)=>{
						if(err){
						  res.json({text:"error when searching Attentioned users"})
						  console.log("fny:意外情况：查找谁关注当前用户出错")
						  return
						}
						else{
						  	who_attention_me_list=result.map((item) => {
								return item.user_id
						  	})
						  	console.log(who_attention_me_list)

							let two_side_attention_list_id=attention_user_list.filter((item)=>{
								return who_attention_me_list.includes(item);
							})

							let two_side_attention_list_username=[]
							const sql_search_uesrname_with_id="select * from userInfo where id = ?"
              let finish=false
							if(two_side_attention_list_id.length==0){
								res.json({
									text: "successful",
									two_side_attention_list: []
								})
								console.log(two_side_attention_list_username)
								return
							}
							else{
							for(let i=0;i<two_side_attention_list_id.length;i++){
                console.log(i)
								db.query(sql_search_uesrname_with_id,[two_side_attention_list_id[i]],(err,result)=>{
									if(err){
									  	res.json({text:"error when searching Attentioned users"})
									  	console.log("fny:意外情况：用id查用户名出错")
									  	return
									}
									else{
                    console.log(result[0].username)
										two_side_attention_list_username.push(result[0].username)
                    if(i===two_side_attention_list_id.length-1){
                      res.json({
                        text: "successful",
                        two_side_attention_list: two_side_attention_list_username
                    })
                    console.log(two_side_attention_list_username)
                    return
                    }
									}
								})
							}  
            }
		}
				  })
				}
			})
		}
	})
});

//用户上传一个图片，由此生成模型，放到它的私有库里
app.post('/api/fnyPictureToModel/:username',upload_temp_picture.single('temp_picture'), async(req, res) => {
    const username = req.params.username
    const avatarPath = req.file.path;

    const { spawn } = require('child_process');

    // 调用Shell脚本
    const child = spawn('./genpcd.sh', ['fny.png'], { cwd: '/root/3D/Wonder3D' });

    // 监听标准输出流
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    // 监听标准错误流
    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // 监听子进程退出事件
    child.on('close', (code) => {
        console.log(`子进程退出码：${code}`);

        if(code===0){
            const{username,model_path,preview_path} = req.body

            console.log("fny:图片转模型结束")
            let userID=-1
            let modelID=-1

            //先根据用户名找到用户ID
            const sql_search_username = "select * from userInfo where username = ?"
            db.query(sql_search_username,[username],(err,result)=>{
                if(err){
                    console.log("fny:图片转模型：意外情况：查找用户出错")
                    return
                }
                else if(result.length<=0){
                    console.log("fny:图片转模型：意外情况：找不到用户")
                    return
                }
                else{
                    userID = result[0].id
                    console.log("fny:图片转模型：用户ID查询成功")

                    const sql_insert_model = 'INSERT INTO models_in_repository SET ?';
                    db.query(sql_insert_model, {model_path:'/home/ubuntu/software/data/'+model_path,preview_picture_path:'/home/ubuntu/software/data/'+preview_path}, (err, result) => {
                        if(err){
                            console.log("fny:图片转模型：数据库插入新模型失败")
                            return
                        }
                        modelID=result.insertId
                        console.log("fny:图片转模型：成功加入新模型")

                        const sql_insert_user_model = 'INSERT INTO user_model_repository SET ?';
                        db.query(sql_insert_user_model, {model_id:modelID,user_id:userID}, (err, result) => {
                            if(err){
                                console.log("fny:图片转模型：数据库新建用户-模型关系失败")
                                return
                            }
                            console.log("fny:图片转模型：成功新建用户-模型对应关系")
                            return
                        })

                    })
                }
            })
        }
    });

    // 监听错误事件
    child.on('error', (error) => {
        console.error(`子进程启动失败：${error}`);
    });
});



app.listen(8081, () => {
  console.log(`Server is running on port 8081`);
});

/*
//发布帖子
app.post('/api/fnyReleasePost/:username/:text/:canEdit',upload_model.single('model'), async(req, res) => {  //post的路径需要修改
  const username = req.params.username
  const text = req.params.text
  const canEdit = req.params.canEdit
  const model_Path = req.file.path

  let userID=-1
  if(model_Path==null){
    res.json({text:"model wrong"})
    console.log("fny:model wrong")
    return
  }
  else{
      //先根据用户名找到用户ID
      const sql_search_username = "select * from userInfo where username = ?"
      db.query(sql_search_username,[username],(err,result)=>{
          if(err){
              res.json({text:"error when finding user"})
              console.log("fny:意外情况：查找发帖用户出错")
              return
          }
          else if(result.length<=0){
              res.json({text:"user not found"})
              console.log("fny:意外情况：找不到发帖用户")
              return
          }
          else{
              userID = result[0].id
              console.log("fny:发帖用户ID查询成功")
          }
      })

      const sql_insert = 'INSERT INTO posts SET ?';
          db.query(sql_insert, {author_id:userID,post_text:text,can_edit:canEdit,model_path:model_Path,preview_picture_path:""}, (err, result) => {
          if(err){
            res.json({text:"error when inputing new post to posts"})
            console.log("fny:数据库插入帖子失败")
            return
          }
          res.json({
              text: "successfully release post",
              postID: result.insertId
          })
          console.log("fny:成功发帖")
      })
  }
});
//发帖存预览图片
app.post('/api/fnyUplodePostPreviewPicture/:postID',upload_preview_picture.single('preview_picture'), async(req, res) => {  //post的路径需要修改
  const postID = req.params.postID
  const preview_Picture_Path = req.file.path

  
  const changeAvatar = 'UPDATE posts SET preview_picture_path = ? WHERE id = ?'
  db.query(changeAvatar, [preview_Picture_Path, postID], (err, result) => {
      if (err) {
          res.json("update preview picture path failed")
          console.log("fny:错误：存储预览图失败")
          return
      }
      else{
          res.json("update preview picture success")
          console.log("fny:成功存储预览图")
          return
      }
  });
});
*/