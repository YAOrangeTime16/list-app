export const createUrl = () =>{
  const randomUrl1 = Math.random().toString(36).substr(2, 10);
  const randomUrl2 = Math.random().toString(36).substr(2, 8);
  return randomUrl1 + "-" + randomUrl2;
}