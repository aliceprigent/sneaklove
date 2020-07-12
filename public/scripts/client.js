
console.log('hello')
const btn = document.getElementById("btn_new_tag");
const input = document.getElementById("new_tag_name");
const form = document.getElementById("tags")

function sendTag() {
  axios
    .post("/tag-add", {
      label: input.value,
    })
    .then((apiResponse) => {
      console.log(apiResponse.data)
      console.log("send");
      form.innerHTML += `<option value="{{this._id}}">${apiResponse.data.label}</option>`
    })
    .catch((error) => console.log(error));
}

btn.onclick = sendTag;


//







