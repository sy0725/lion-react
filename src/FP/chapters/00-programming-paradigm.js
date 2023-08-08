// --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
// --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// 명령형 프로그래밍

const courses = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

const updateCourses = [...courses];

// console.log('변형된데이터\n' , updateCourses);

// [전개구문(spread syntax)(...)]을 사용하면 배열을 복사할 수 있다.
// 개구문은 얕은 복사 / 참조에의한복사로 인해 얕는 복사다 
// 객체 복사는 어떻게 ? 배열도 객체도 복사가가능하다.
// [전개구문(spread syntax)(...)]을 사용한다.
// 원시값은 변하지 않는 immutable data
// 배열과 객체 함수는 mutable data 로 변할 수 있다.


// 기능 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
// 명령형으로 프로그래밍 한다.
// C, JAVA 문법
// for문

for(let i = 0, l=updateCourses.length; i<l; i = i + 1){
  const course = {...updateCourses[i]};
  course.name = course.name.trim()
  updateCourses[i] = course
}


// 기능 2. 과정 배열을 순환하여 각 과정 이름 대문자화
for(let i = 0, l=updateCourses.length; i<l; ++i){
  const course = updateCourses[i]
  course.name = course.name.toUpperCase()
}


// 기능 3. 배열 원소의 `name` 속성의 공백을 밑줄(__)로 변경하는 기능 추가
// 명령형 프로그래밍 방식으로

for(let i = 0, l=updateCourses.length; i<l; ++i){
  const course = updateCourses[i]
  course.name = course.name.replace(/\s+/g, '_')
}

// console.log(`업데이트 데이터\n` , updateCourses);

// --------------------------------------------------------------------------
// 선언형 프로그래밍

const subjects = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

// 1. 객체 이름(name) 속성 좌우 공백 제거 함수 선언

function toTrim(object){
  const o = {...object}
  o.name = o.name.trim()
  return o;
}

// console.log(toTrim(subjects[0]));
// console.log(toTrim(subjects[1]));

// 2. 객체 이름(name) 속성 대문자화 함수 선언

function toUpperCase(object){
  const o = {...object}
  o.name = o.name.toUpperCase()
  return o;
}
// console.log(toUpperCase(subjects[0]));
// console.log(toUpperCase(subjects[1]));


// 3. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성
// ES5의 map을 사용해야 한다.
// 조건 1. 새로운 배열 반환
// 조건 2. 배열 순환 후, 기능 처리(적용)


// const updateSubjects = subjects.map(subject => {
//   const copySubject = toTrim(subject);
//   return copySubject
// }).map(subject=> {
//   const copySubject = toUpperCase(subject)
//   return copySubject
// })

// => 리팩토링
// const updateSubjects = subjects.map(toTrim).map(toUpperCase)

// console.log('업데이트 데이터\n' , updateSubjects);


// 4. 배열 원소의 `name` 속성의 공백을 밑줄(_)로 변경하는 기능 추가
// 선언형 프로그래밍 방식으로

function toUnderscore(object) {
  const o = {...object}
  o.name = o.name.replace(/\s+/g, '_')
  return o
}

const updateSubjects = subjects.map(toTrim).map(toUpperCase).map(toUnderscore)
// console.log(updateSubjects);


// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 함수(function)를 사용해 구현합니다.

function createCountUpButton(container, { count : initialCount = 0, step = 1 , max = 20} = {}) {
  if (!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error('container는 문서의 요소가 아닙니다.');
  }


  let count = initialCount;

  const countUpButton = document.createElement('button');

  const render = (newCount) => {
    countUpButton.textContent = String(newCount);
  }

  const handleCountUp = (e) => {
    if(count >= max){
      alert('더 이상 누를 수가 없습니다');
    } else {
      count += step;
      render(count);
    }
  }
  
  countUpButton.setAttribute('type', 'button');
  countUpButton.classList.add('CountUpButton')
  countUpButton.addEventListener('click', handleCountUp);

  render(count);

  container.append(countUpButton);
}


//  const demoContainer =  document.getElementById('demo')


// 재사용을 목적으로 하는 컴포넌트(함수로 표현)
// 기본옵션 :  {count : 0 , step : 1}
// 과제 : 기본옵션 :  {count : 0 , step : 1 , max = 10 }
// 'max' prop을 추가하고, count 값이 max보다 커지면 사용자가 더 이상 버튼을 누를 수 없도록 막는다.
// 'max' prop을 추가하고 , count 값이 max보다 커지면 화면의 카운트는 버튼을 눌러도 max 값에 머무른다.

//  createCountUpButton(demoContainer)
//  createCountUpButton(demoContainer, { count: 1 })
//  createCountUpButton(demoContainer, { count: 2 })
//  createCountUpButton(demoContainer, { count: 3, step : 1 , max : 20})



// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)


// 붕어빨틀(생성자함수 : 클래스) -> 붕어빵(객체 : 인스턴스)

// 붕어빨틀(생성자함수 : 클래스)
class CountUpButton {
  static version = '0.0.1-alpha'


  #count
  // 라이프 사이클 메서드
  // 생성(constructor) 시점
  constructor(props){
  //   console.log({props});
  this.#count = props.count ?? 0;
  }

  // 랜더
  render(){
    const button = document.createElement('button')
    button.setAttribute('type' , 'button')
    button.textContent = String(this.#count)
    return button
  }

  // 마운트(mount) 시점
  mount(container){
    container?.append(this.render())
  }
  // 성장(update) 시점
  // 소멸(unmount) 시점
  unmount(){
    console.log('소멸 시점');
  }
}


// 새로운(new) 붕어빵(객체: 인스턴스) 생성
const firstCountUp = new CountUpButton({count : 1});
const secondCountUp = new CountUpButton({count : 2});
const thirdCountUp = new CountUpButton({count : 3});


globalThis.firstCountUp = firstCountUp

console.log(firstCountUp);

const demoContainer = document.getElementById('demo');

firstCountUp.mount(demoContainer)
secondCountUp.mount(demoContainer)
thirdCountUp.mount(demoContainer)


// demoContainer.append(firstCountUp.render());



// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)

