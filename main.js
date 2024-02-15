//유저가 값을 입력한다.
//+버튼을 누르면 할 일이 추가된다.
//delete버튼을 누르면 할 일이 삭제된다.
//check 버튼을 누르면 할일이 끝나는 것으로 밑줄 친다.
//check 버튼을 누르면 true - 밑줄, false - 밑줄 없음

//진행중, 끝남, 탭을 누르면 언더바가 이동한다.
//끝남탭은 끝난 아이템만, 진핸중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all"; //초기값
let filterList = [];

tabs.forEach((menu) =>
  menu.addEventListener("click", (e) => horizontalIndicator(e))
);
addButton.addEventListener("click", addTask);

function horizontalIndicator(e) {
  underLine.style.width = e.target.offsetWidth + "px";
  underLine.style.left = e.target.offsetLeft + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}
//아이템의 길이를 offsetWidth와 offsetHeight으로 표현
//아이템의 위치를 offsetTop과 offsetLeft로 표현 위와 왼쪽을 기준으로 얼마큼 떨어져 있는지

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  //부른 함수의 매개변수가 존재하면 function()에도 매개변수 넣어주기??
  //addEventListener가 event를 받아옴
}

function addTask() {
  //if (taskInput.value === ""){ return alert("할 일을 입력해주세요")};
  let task = {
    //여러개의 정보가 필요하면 객체 활용
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false, //기본값 설정
  };
  taskList.push(task);
  console.log(taskList);
  render();
}
function render() {
  //목록들을 그리는 함수
  // 내가 선택한 탭에 따라서(if/mode) 리스트를 달리 보여준다.
  let resultHTML = "";
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div id="task1">
        <div class="task-done">${list[i].taskContent}</div>
      <div class="button">
        <button id="reply" onclick="toggleComplete('${list[i].id}')">
        <img id ="reply-icon" src="images/reply-solid.svg" alt="" width="20px" padding-bottom:8px >
        </button> 
        <button class="delete" onclick="deleteTask('${list[i].id}')">
        <img class="icon-delete" src="images/background.svg" alt=""></img>
        </button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div id="task2">
          <div class="content">${list[i].taskContent}</div>
          <div class="button">
            <button id="check" onclick="toggleComplete('${list[i].id}')">
            <img id="check-icon" src="images/check-solid.svg" alt="" width="20px" hight="55px"></img>
            </button>
            <button class="delete" onclick="deleteTask('${list[i].id}')">
            <img class="icon-delete"src="images/background.svg" alt=""></img>
            </button>
          </div>
        </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML; //textContent와 다름
}
function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    //list 내의 i 전부를 계속 확인(i개)
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; //! - 반대의 값을 가져오게 함(스위치 처럼)
      break;
    }
  }
  filter();
}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id) {
  //아이디에 맞는 값 지우기
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter(); //값을 업데이트를 하면 ui도 업데이트하기 - 자동으로 해주는 리액트!
}

function filter(event) {
  mode = event.target.id;
  console.log("filter", event.target.id);
  //querySelectorAll과 addEventListener로 3가지의 경우를 가지고 왔고 target으로 지정해줌
  if (mode === "all") {
    render(); //전체 리스트 보여주기
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      //taskList 전체를 돌면서~
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      //taskList 전체를 돌면서~
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
//불린형은 =, ==까지만 ===없음

function event() {
  if (event == undefined) {
    render();
  }
}
