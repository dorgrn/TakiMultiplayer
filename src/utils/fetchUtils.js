const UPDATE_INTERVAL = 500;

function getData(path) {
  return fetch(path, { method: "GET", credentials: "include" }).then(
    response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }
  );
}

function postData(path, body) {
  return fetch(path, { method: "POST", credentials: "include", body: body}).then(
    response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    }
  );
}

module.exports = {
    UPDATE_INTERVAL,
  getData,
  postData
};
