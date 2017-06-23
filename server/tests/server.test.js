const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');
var {ObjectID} = require('mongodb');
const{todos,populateTodos,users, populateUsers} = require('./seed/seed');

//Sets database to a known state before testing starts
beforeEach(populateUsers);
beforeEach(populateTodos);

//POST testing
describe('POST/todos', () => {
  //succesfull posting of todo
  it('it should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err) return done(err);
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });
  //shouldn't post todos
  it('should not create todo with invalid body data',(done) => {
    var text = '';

    request(app)
    .post('/todos')
    .send({text})
    .expect(400)
    .end((err, res) => {
      if(err) return done(err);
      Todo.find().then((todos) =>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

//GET testing all todos
describe('GET/todos', () => {
  //successfully return all todos
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  })
});

//GET testing individual id
describe('GET/todos/:id', () => {
  //success
  it('should return todo doc', (done) => {
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      }).end(done);
  });
//not found
it('should return 404 if todo not found', (done) => {
  var id = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
});
//invalid
it('should return 404 if todo ID is invalid', (done) => {
  request(app)
  .get(`/todos/123`)
  .expect(404)
  .end(done);
});

});

describe('DELETE/todos/:id', () => {
  it('should remove the todo requested', (done) => {
    request(app)
    .delete(`/todos/${todos[1]._id.toHexString()}`).
    expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[1].text);
    }).end((err, res) => {
      if(err) return done(err);
      Todo.findById(todos[1]._id.toHexString()).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if id is invalid', (done) =>{
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });

  it('should return 404 if id not found', (done) => {
    var id = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${id}`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH/todos/:id', () => {
  it('should update a todos text and completed boolean', (done) => {
    var id = todos[0]._id.toHexString();
    var sender = {
      text: "updated text here",
      completed: true
    }
    request(app)
    .patch(`/todos/${id}`)
    .send(sender)
    .expect(200)
    .expect((res) => {
        expect(res.body.todo.text).toBe(sender.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
    }).end(done);
  });

  it('should update text, change completed to false and set completedAt to null', (done) =>{
    var id = todos[1]._id.toHexString();
    var sender = {
      text: "updated text here",
      completed: "false",
      completedAt: 123
    }
    request(app)
    .patch(`/todos/${id}`)
    .send(sender)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(sender.text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});

describe('GET/users/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      }).end(done);
    });

    it('should return 401 if not authenticated', (done) => {
      request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
    });
});


describe('/POST/users', () => {
  it('should create a new user in database', (done) => {
    var use = {
      email: 'wer@sdfg.com',
      password: 'wefgy65'
    }
    request(app)
    .post('/users')
    .send(use)
    .expect(200)
    .expect((res) => {
      expect(res.body.email).toExist();
      expect(res.body._id).toExist();
      expect(res.header['x-auth']).toExist();
    })
    .end((err) => {
      if(err) return done();
      User.findOne({email: use.email}).then((user) => {
        expect(user).toExist();
        expect(user.password).toNotBe(use.password);
        done();
      }).catch((err) => done(err));
    });
  });

  it('should return validation errors if data is invalid', (done) => {
    var use = {
      email: 'wer',
      password: 'wey65'
    }
    request(app)
    .post('/users')
    .send(use)
    .expect(400)
    .end(done);
  });

  it('should not create account if email is in use', (done) => {
    var use = {
      email: 'dummy@dummy.com',
      password: 'ww2dey65'
    }
    request(app)
    .post('/users')
    .send(use)
    .expect(400)
    .end(done);
  });
});

describe('/POST/users/login', () => {
  it('should send back the user if a valid request is sent', (done) => {
    var body = users[1];
    request(app)
    .post('/users/login')
    .send(body)
    .expect(200)
    .expect((res) => {
      expect(res.body.email).toBe(users[1].email);
      expect(res.header['x-auth']).toExist();
    })
    .end((err,res) => {
      if(err) return done(err);

      User.findById(users[1]._id).then((user) => {
        expect(user.tokens[0]).toInclude({
          access:'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch((err) => done(err));
    });
  });

  it('should deny login if credentials aren\'t valid', (done) => {
    var user = {
      email: users[1].email,
      password: users[1].password + '1'
    }
    request(app)
    .post('/users/login')
    .send(user)
    .expect(400)
    .expect((res) => {
      expect(res.headers['x-auth']).toNotExist();
    })
    .end((err,res) => {
      if(err) return done(err);
      User.findById(users[1]._id).then((user) => {
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });
});


describe('/DELETE/users/me/login', () => {
  it('should logout a logged in user',(done) => {
    request(app)
    .delete('/users/me/token')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .end((err,res) => {
      if(err) return done(err);
      User.findById(users[0]._id).then((user) => {
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });

});
