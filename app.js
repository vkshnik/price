const { text } = require('body-parser');
var express = require('express');
var session = require('express-session');
const cookieParser = require('cookie-parser');
const ExcelJS = require('exceljs');
var app = express();
var Database = require('better-sqlite3');
const SqliteStore = require("better-sqlite3-session-store")(session);
const sess = new Database("sessions.db" /*,  {  verbose : console . log  } */);

const db = new Database('lastprojects.db');
var fs = require('fs');

var users = JSON.parse(fs.readFileSync("users.json"))
var handlebars = require('express-handlebars');
const { isArray } = require('util');


app.engine('.hbs', handlebars.engine({ extname: '.hbs' }));

app.set('view engine', '.hbs');

var hbs = handlebars.create({});


app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json({ limit: '50mb' }));

app.set('port', process.env.PORT || 7000);


// First step is the authentication of the client
app.use(session({
  store: new SqliteStore({ client: sess, expired: { clear: true, intervalMs: 14 * 60 * 1000 /*minutes * 60 * 1000 */ } }),
  secret: " keyboard cat ",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 15 * 60 * 1000 /*minutes * 60 * 1000 */ }

}))
app.use(express.static(__dirname + '/public'));
//app.use(cookieParser());

db.exec("CREATE TABLE IF NOT EXISTS lastprojects (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT NOT NULL, nameProject TEXT NOT NULL, dataProject BLOB NOT NULL, dateProject TEXT NOT NULL)");


app.get('/login', function (req, res, next) {
  res.render('login', {
  });
});

app.post('/login', function (req, res, next) {
  req.session.user = req.body.username;
  req.session.pass = req.body.password;

  for (let i = 0; i < users.length; i++) {
    if (req.session.user == users[i].username && req.session.pass == users[i].password) {
      req.session.role = users[i].role;


    }
  }
  if (req.session.role) {
    res.redirect('/');
  }
  else {
    res.render('login', {
      msg: 'Неверный логин или пароль'
    });
  }

});



function auth(req, res, next) {
  if (req.session.role) {
    next()
  }
  else {

    res.redirect('/login');
  }
}
app.use(auth);


app.get("/session", (req, res) => {
  res.json({ expiresAt: req.session.cookie.expires });
});


app.get('/', function (req, res, next) {
  let myAdmin = '';
  let myUser = '';
  let clock = `<div id = "clock" class = "dropdown" hidden>${req.session.cookie.expires}</div>`

  

  const rows = db.prepare("SELECT * FROM lastprojects ").all();

  rows.forEach(function (row) {


    myAdmin += `
   
    <div class="recPros" id=${row.id}>
      <div> 
          <div><button><img src = '/open.svg' id=${row.id} class='open'></button></div>
          <div><button><img src = '/delete.svg' class = "delete" id=${row.id}></button></div>
      </div>
      <div class = "clipText" title= "${row.nameProject}"> ${row.nameProject}</div>
      <div> ${row.user}</div>
      <div> ${new Date(row.dateProject).toLocaleDateString('ru')} <br> ${new Date(row.dateProject).toLocaleTimeString('ru')}</div>
      
    </div>
    `
      ;
    myUser += `
    <div class="recPros" id=${row.id}>
      <div>
          <div><button><img src = '/open.svg' id=${row.id} class='open'></button></div>
      </div>
      <div class = "clipText" title= "${row.nameProject}"> ${row.nameProject}</div>
      <div> ${row.user}</div>
      <div> ${new Date(row.dateProject).toLocaleDateString('ru')} <br> ${new Date(row.dateProject).toLocaleTimeString('ru')}</div>
      
    </div>
    `
      ;
  });


  if (req.session.role == 'admin') {
    res.render('index', {
      user: req.session.user,
      projects: `
        <div class="dropdown">
          <button class="btn_menu" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Файл
          </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

              <li><input class="dropdown-item" id="555" type="button" onclick="createFile()" value="Создать проект"></li>
              <li><input class="dropdown-item" id="666" type="button" onclick="uploadFile()" value="Сохранить проект в БД"> </li>
              <hr>
              <li><label for="777" class="dropdown-item" >Открыть проект из файла</label><input class="form-control" id="777"
                  type="file" onclick="openLocalFile()" accept=".kp" hidden ></li>
              <li><input class="dropdown-item" id="666" type="button" onclick="saveLocalFile()" value="Сохранить проект в файл"> </li>
            </ul>
      </div>`,
      pro: myAdmin,
      clock: clock

    });
  }
  else if (req.session.role == 'user') {
    res.render('index', {
      user: req.session.user,
      projects: `
        <div class="dropdown">
      <button class="btn_menu" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Проекты
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

        <li><input class="dropdown-item" id="555" type="button" onclick="createFile()" value="Создать проект"></li>
        <li><input class="dropdown-item" id="666" type="button" onclick="uploadFile()" value="Сохранить проект в БД"> </li>
        <hr>
        <li><label for="777" class="dropdown-item" >Открыть проект из файла</label><input class="form-control" id="777"
            type="file" onclick="openLocalFile()" accept=".kp" hidden ></li>
        <li><input class="dropdown-item" id="666" type="button" onclick="saveLocalFile()" value="Сохранить проект в файл"> </li>
      </ul>
      </div>`,
      pro: myUser,
      clock: clock
    })

  }

});




app.post('/', function (req, res, next) {
  res.render('index', {
  })
});

app.post('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});


app.get('/project/add', (req, res) => {
  res.redirect('/')
});

app.post('/project/add', (req, res) => {
  let currentUser = req.body.currentUser;
  let nameProject = req.body.nameProject;
  let dataProject = req.body.dataProject;
  let dateProject = req.body.dateProject;
  const rows = db.prepare("SELECT * FROM lastprojects WHERE nameProject = ?").get(nameProject);

  if (rows == undefined) {
    db.prepare("INSERT INTO lastprojects (user, nameProject, dataProject, dateProject) VALUES (?,?,?,?)").run([currentUser, nameProject, dataProject, dateProject]);
  }
  else {
    db.prepare("UPDATE lastprojects SET user = ?, dataProject = ?,  dateProject = ? WHERE nameProject = ?").run(currentUser, dataProject, dateProject, nameProject);
  }

  res.redirect('/')
});

app.post('/delete/:id(\\d+)', (req, res) => {
  let id = req.params.id;
  if (req.body.pass == req.session.pass) {
    db.prepare("DELETE FROM lastprojects WHERE id =?").run(id);
  }

  res.redirect('/')
});

app.get('/open/:id(\\d+)', (req, res) => {
  let id = req.params.id;
  const rows = db.prepare("SELECT * FROM lastprojects WHERE id =?").get(id);
  res.json(rows);



});

app.listen(app.get('port'), function () {
  console.log('Express запущен на http://localhost:' +
    app.get('port') + '; нажмите Ctrl+C для завершения.');
});
