// let date1 = new Date(1999, 10 - 1, 25);
// let date2 = new Date().setDate(1).toString();
// let date3 = new Date().setDate();
// let date4 = new Date(13);
// let date5 = new Date();

// const MAXDATE = (date) => {
//   const now = new Date();
//   const curYear = parseInt(String(now.getFullYear())) - 13;
//   const curDay = String(now.getDate());
//   const curMonth = String(now.getMonth());
//   return new Date(curYear, curMonth, curDay);
// };

// const test = MAXDATE(new Date());
// console.log(date1);
// console.log(date2);
// console.log(date3);
// console.log(date4);
// console.log(date5);
// console.log(test);

function testFunc(str) {
  const arr = str.split('');
  const regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // return arr.split('').includes(`\ /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/g`);
  console.log(regx.test(str));
  return regx;
}

console.log(testFunc('test1@Rtest'));
