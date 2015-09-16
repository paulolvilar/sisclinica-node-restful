//todo: alterar estrategia de armazenamento de sessao express-session
//todo: alterar 'keyboard cat'
//todo: rever resave: true
//todo: incluir login com passportjs http://passportjs.org/docs
//todo: colocar https

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var flash = require('connect-flash')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var restful = require('node-restful');

var routes = require('./routes/index');
//var users = require('./routes/users');
var methodOverride = require('method-override')

var app = express();

mongoose.connect("mongodb://localhost/restful");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(session({ path: '/', httpOnly: true, secure: false, maxAge: null ,  genid: function(req) {
    return require('crypto').randomBytes(48).toString('hex');
  },resave: true,saveUninitialized:false,secret: 'keyboard cat'}));
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));





// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//     return filename+Date.now();
//   },
// onFileUploadStart: function (file) {
//   console.log(file.originalname + ' is starting ...')
// },
// onFileUploadComplete: function (file) {
//   console.log(file.fieldname + ' uploaded to  ' + file.path)
//   done=true;
// }
// }));




/*
var hashPassword = function(req, res, next) {
  if (!req.body.password)
    return next({ status: 400, err: "No password!" }); // We can also throw an error from a before route
  req.body.password = bcrypt.hashSync(req.body.password, 10); // Using bcrypt
  return next(); // Call the handler
}

var sendEmail = function(req, res, next) {
  // We can get the user from res.bundle and status code from res.status and
  // trigger an error by calling next(err) or populate information that would otherwise be miggins
  next(); // I'll just pass though
}
*/

var Paciente = restful.model( "paciente", mongoose.Schema({
    nome: 'string',
    email: 'string',
    sexo: 'string',
    dtNascimento: 'string',
    estadoCivil: 'string',
    profissao: 'string',
    naturalidade: 'string',
    endereco: 'string',
    telefones: 'string',
    email: 'string',
    convenio: 'string',
    prontuario:{
      dataAdmissao: 'string',
      historiaClinica:{
        queixaPrincipal: 'string',
        historiaDoencaAtual: 'string',
        doencasAnteriores: 'string',
        tratamentos: 'string',
        alergias: 'string',
        vacinacao: 'string',
        outros: 'string'
      },
      exameFisico: 'string',
      diagnostico: 'string',
      conduta: 'string',
      evolucao:[{
        data: 'string',
        texto: 'string'
      }]
    }
  }))
  .methods(['get', 'put', 'delete', 'post']);

Paciente.register(app, '/api/pacientes'); // Register the user model at the localhost:3000/paciente

var Imagem = restful.model( "imagem", mongoose.Schema({
    filename: 'string',
    date: 'string',
    paciente_id: 'string'
})).methods(['get', 'put', 'delete', 'post']);

Imagem.register(app, '/api/imagem');

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
