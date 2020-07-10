console.log("hello");

const tagAPI = new APIHandler("http://localhost:3003");

function displayTags(tag) {
    document.querySelector(
      ".characters-container"
    ).innerHTML += `<input id="input_{{$this._id}}" type="checkbox" data-tag-id="{{this._id}}" class="checkbox" />
    <label for="input_{{this._id}}">{{this.name}}</label>`
  }

createOneRegister(tag) {
    return axios.post(`${this.BASE_URL}//`, tag);
  }
document
  .getElementById("btn_new_tag")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const tag = document.getElementById("new_tag_name").value;
    const tag = {
      tag: tag,
    };
    console.log(tag);
    tagAPI
      .create(tag)
      .then((tag) => {
        display(tag.data);
      })
      .catch((err) => console.log(err));
  });
