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
let tabs = document.querySelectorAll(".task-tabs div")
addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++) {
  tabs[i].addEventListener("click", function(event){filter(event)});
  //부른 함수의 매개변수가 존재하면 function()에도 매개변수 넣어주기??
  //addEventListener가 event를 받아옴
} 

function addTask() {
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
function render() { //목록들을 그리는 함수
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div id="task1">
        <div class="task-done">${taskList[i].taskContent}</div>
      <div class="button">
        <button id="reply" onclick="toggleComplete('${taskList[i].id}')">
        <img id ="reply-icon" src="images/reply-solid.svg" alt="" width="20px" padding-bottom:8px >
        </button> 
        <button class="delete" onclick="deleteTask('${taskList[i].id}')">
        <img class="icon-delete" src="images/background.svg" alt=""></img>
        </button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div id="task2">
          <div class="content">${taskList[i].taskContent}</div>
          <div class="button">
            <button id="check" onclick="toggleComplete('${taskList[i].id}')">
            <img id="check-icon" src="images/check-solid.svg" alt="" width="20px" hight="55px"></img>
            </button>
            <button class="delete" onclick="deleteTask('${taskList[i].id}')">
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
  render();
  console.log(taskList);
}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id) {
  //아이디에 맞는 값 지우기
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render(); //값을 업데이트를 하면 ui도 업데이트하기 - 자동으로 해주는 리액트!
}

function filter(event){
  console.log(filter,event.target.id);
  let mode = event.target.id
  let filterList = []
  if(mode === "all") {
    render();
  }else if(mode === "ongoing") {
    for(let i=0; taskList.length; i++) { //taskLisk 전체를 돌면서~
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if(mode === "done") {

  }
  //querySelectorAll과 addEventListener로 3가지의 경우를 가지고 왔고 target으로 지정해줌

}


