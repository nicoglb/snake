const callAPISnake = async (url, parameters, data) => {
  let _parameters = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: ''// body data type must match "Content-Type" header
  };
  _parameters = Object.assign(_parameters, parameters);
  _parameters.body = JSON.stringify(data);
  console.log(url, _parameters.body, _parameters);
  const respuesta = await fetch(url, _parameters);
  console.log('luego del fetch' + JSON.stringify(respuesta));
  return respuesta;

}

let user_login
let usuario;
let score;
let lastScore;

const getUsersById = async (user) => {
  const url = "http://localhost:3000/v1/users/" + user;
  const parameters = {};
  const res = await callAPISnake(url, parameters);
  const data = await res.json();//abro la promesa, y espero que se resuelva en res
  console.log('data :' + JSON.stringify(data));
  data.forEach(element => {
    usuario = {
      username: element.username,
      fullname: element.fullname,
      email: element.email,
      password: element.password
    }
  });
  console.log('fetch ' + usuario.fullname);
  return usuario;
}
const createUser = async (user) => {
  console.log('Dentro del create');
  const url = 'http://localhost:3000/v1/users/new';
  const parameters = { method: 'POST', body: user };
  const res = await callAPISnake(url, parameters, user);
  const data = await res.json();
  console.log('data :' + JSON.stringify(data));
  return data;
}

const getUsers = async () => {
  const url = "http://localhost:3000/v1/users/";
  const parameters = {};
  const res = await callAPISnake(url, parameters);
  const data = await res.json();//abro la promesa, y espero que se resuelva en res
  return data;
}

const editUser = async (user) => {
  const url = "http://localhost:3000/v1/users/update/" + user.username;
  const parameters = { method: 'PUT', body: user };
  const res = await callAPISnake(url, parameters, user);
  const data = await res.json();
  console.log('data :' + JSON.stringify(data));
  return data;
}

const deleteUser = async (user) => {
  const url = "http://localhost:3000/v1/users/delete/" + user.username;
  const parameters = { method: 'DELETE', body: user };
  const res = await callAPISnake(url, parameters, user);
  const data = await res.json();
  console.log('data :' + JSON.stringify(data));
  return data;
}

const getMaxUserScore = async (user) => {
  const url = "http://localhost:3000/v1/score/max/" + user;
  const parameters = {};
  const res = await callAPISnake(url, parameters);
  const data = await res.json();//abro la promesa, y espero que se resuelva en res

  console.log('data Score:' + JSON.stringify(data));
  data.forEach(element => {
    score = {
      score: element.score,
      date: element.dare,
      username: element.username
    }
  });
  return score.score;
}

const getLastUserScore = async (user) => {
  const url = "http://localhost:3000/v1/score/last/" + user;
  const parameters = {};
  const res = await callAPISnake(url, parameters);
  const data = await res.json();//abro la promesa, y espero que se resuelva en res

 // console.log('data last Score:' + JSON.stringify(data));
  //return data.score;
  return data;
}

const saveScoreUser = async (user) => {
  console.log('Dentro del create score');
  const url = "http://localhost:3000/v1/score/new/";
  const parameters = { method: 'POST', body: user};
  const res = await callAPISnake(url, parameters, user);
  const data = await res.json();
 // console.log('data :' + JSON.stringify(data));
  return data;
}

const getRankingScore = async () => {
  const url = "http://localhost:3000/v1/score/ranking/";
  const parameters = {};
  const res = await callAPISnake(url, parameters);
  const data = await res.json();//abro la promesa, y espero que se resuelva en res

  //console.log('data ranking Score:' + JSON.stringify(data));
  return JSON.stringify(data);
}



export { createUser, getUsers, getUsersById, editUser, deleteUser, getMaxUserScore, getLastUserScore, saveScoreUser, getRankingScore };