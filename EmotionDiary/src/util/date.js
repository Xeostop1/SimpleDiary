export const getStrDate = (date) => {
  //날짜의 객체의 값을 String하여서 불러오고 slice0~9자리까지 str로 리턴함
  //return date.toISOString().slice(0, 10);

  //toISOString 문제때문에 변경
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  //let houre = date.getHours();
  //let min = date.getMinutes();
  //let ss = date.getSeconds();

  //let KoDay = date.getDay();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  // console.log(`${year}-${month}-${day}(${getDayKorea(KoDay)})`);
  // return `${year}-${month}-${day}(${getDayKorea(KoDay)})`;
  // return `${year}-${month}-${day} ${houre}:${min}:${ss}`;
  return `${year}-${month}-${day}`;
};
