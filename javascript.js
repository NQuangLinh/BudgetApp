document
  .querySelector(".btn-budget")
  .addEventListener("click", function(event) {
    var budget = parseFloat(document.querySelector("[name='budget']").value);
    if (Number.isNaN(budget) == true) {
      document.querySelector(".error").classList.add("show");
    } else {
      window.localStorage.setItem("budget", budget);
      document.querySelector(
        ".budget"
      ).innerText = `$ ${window.localStorage.getItem("budget")}`;
      calculateBalance();
      document.querySelector(".error").classList.remove("show");
      document.querySelector("[name='budget']").value = null;
    }
  });

function load() {
  if (window.localStorage.getItem("budget") == null) {
    window.localStorage.setItem("budget", 0);
  }

  if (window.localStorage.getItem("expense") == null) {
    window.localStorage.setItem("expense", 0);
  }
  document.querySelector(
    ".budget"
  ).innerText = `$ ${window.localStorage.getItem("budget")}`;

  document.querySelector(
    ".expense"
  ).innerText = `$ ${window.localStorage.getItem("expense")}`;
  calculateBalance();

  var recordList = JSON.parse(localStorage.getItem("recordList"));
  if (recordList !== null) {
    recordList.forEach(element => {
      createRecord(element["expenseName"], element["amount"]);
    });
  } else {
    localStorage.setItem("recordList", JSON.stringify([]));
  }

  // var iconDeleteList = Array.from(document.querySelectorAll(".fa-trash-alt"));
  // if (iconDeleteList !== null) {
  //   iconDeleteList.forEach((element, index) => {
  //     element.addEventListener("click", function(event) {
  //       recordList.splice(index, 1);
  //       localStorage.setItem("recordList",JSON.stringify(recordList));
  //     });
  //   });
  // }
}

var recordArr = new Array();
document
  .querySelector(".btn-expense")
  .addEventListener("click", function(event) {
    var expenseName = document.querySelector("[name='expense']").value;
    var amount = parseFloat(document.querySelector("[name='amount']").value);

    if (expenseName == null || Number.isNaN(amount) == true) {
      document
        .querySelector(".infomation")
        .querySelector(".error")
        .classList.add("show");
    } else {
      recordArr.push(new Record(expenseName, amount));
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(
          JSON.parse(localStorage.getItem("recordList")).concat(recordArr)
        )
      );

      createRecord(expenseName, amount);

      var expense = parseFloat(window.localStorage.getItem("expense"));
      document.querySelector(".expense").innerText = `$ ${expense + amount}`;
      window.localStorage.setItem("expense", expense + amount);
      document.querySelector("[name='expense']").value = null;
      document.querySelector("[name='amount']").value = null;
      document
        .querySelector(".infomation")
        .querySelector(".error")
        .classList.remove("show");
      calculateBalance();
    }
  });

function calculateBalance() {
  window.localStorage.setItem(
    "balance",
    parseFloat(window.localStorage.getItem("budget")) -
      parseFloat(window.localStorage.getItem("expense"))
  );
  document.querySelector(
    ".balance"
  ).innerText = `$ ${window.localStorage.getItem("balance")}`;
}

function Record(expenseName, amount) {
  this.expenseName = expenseName;
  this.amount = amount;
}

function createRecord(expenseName, amount) {
  var tr = document.createElement("tr");
  var tdTitle = document.createElement("td");
  tdTitle.innerText = `- ${expenseName}`;
  var tdValue = document.createElement("td");
  tdValue.innerText = amount;
  var tdIcon = document.createElement("td");
  var iEdit = document.createElement("i");
  iEdit.setAttribute("id", "edit");
  iEdit.classList.add("fas", "fa-edit");
  var iDelete = document.createElement("i");
  iDelete.classList.add("fas", "fa-trash-alt");
  iDelete.addEventListener("click",function(event){
    localStorage.setItem(
      "recordList",
      JSON.stringify(
        JSON.parse(localStorage.getItem("recordList")).splice(index, 1)
      )
    );
  })
  tdIcon.append(iEdit, iDelete);
  tr.append(tdTitle, tdValue, tdIcon);
  document.querySelector("tbody").append(tr);
}
