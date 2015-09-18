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
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var imgRoutes = require('./routes/imagens');
var loginRoutes = require('./routes/login');
//var users = require('./routes/users');
var methodOverride = require('method-override')

var app = express();

mongoose.connect("mongodb://localhost/restful");

//para autenticacao
// grab the things we need
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});



var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', UserSchema);
//end para autenticacao

// create a new user
/*var admin = new User({
  name: 'admin2',
  username: 'admin2',
  password: '123456'
});

admin.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});*/



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
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy({
    // set the field name here
    usernameField: 'username',
    passwordField: 'password'
  },
  function(p_username, p_password, done) {
    /* get the username and password from the input arguments of the function */

    // query the user from the database
    // don't care the way I query from database, you can use
    // any method to query the user from database
    User.findOne( { username: p_username}, function(err, user) {
      if (err) return done(err);
      if(!user)
        return done(null, false, {message: "The user is not exist"});
      else
        user.comparePassword(p_password, function(err, isMatch){
          if(err) return done(err);
          if(isMatch){
            return done(null, user);
          }else{
            return done(null, false, {message: "Wrong password"});
          }
        })
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  // query the current user from database
  User.findById(id, function(err, user) {
    if (err) done(new Error('User ' + id + ' does not exist'));;
    done(null, user);
  });
});

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

Imagem.register(app, '/api/imagens');

app.use('/', routes);
app.use('/', loginRoutes);
app.use('/imagens', imgRoutes);


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


function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    req.session.messages = "You need to login to view this page";
    res.redirect('/login');
  }
  next();
}

module.exports = app;
