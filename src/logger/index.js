const single = (message, type = "info") => {

  var color = "";

  if ( type === "info" ) color = singleInfo;
  if ( type === "error" ) color = singleError;

  console.log("%c " + message + " ", color);

  if ( type === "error" ) {
    console.log(("%c " + message), errorStyle);
  }

}

const double = (title, message, type = "info") => {

  var color = "";

  if ( type === "info" ) color = doubleInfo;
  if ( type === "error" ) color = doubleError;
  
  console.log(
    "%c " + title + ": %c  " + message + "  ", 
    color,
    doubleContent
  );
  
}

const table = (data) => {
  console.table(data);
}

const singleInfo = [
  "background: #27C13A",
  "color: #2b2b2b",
  "line-height: 20px",
  "border-radius: 20px"
  ].join(";");

const singleError = [
  "background: #C12727",
  "color: #cccccc",
  "line-height: 20px",
  "border-radius: 20px"
  ].join(";");

const doubleInfo = [
  "background: #3598FE",
  "color: #2b2b2b",
  "line-height: 20px",
  "border-radius: 20px"
  ].join(";");

const doubleError = [
  "background: #C12727",
  "color: #cccccc",
  "line-height: 20px",
  "border-radius: 20px"
  ].join(";");

const doubleContent = [
  "background: #111111",
  "color: #cccccc",
  "line-height: 20px",
  "border-radius: 20px"
  ].join(";");

const errorStyle = [
  "background-image: url('https://i.giphy.com/XKCdA6ERnXp6M.webp')",
  "background-size: 280px 200px",
  "background-repeat: no-repeat",
  "color: #000000",
  "padding: 0px 75px 0 0",
  "line-height: 200px"
  ].join(";");

let ConsoleLog = {};
    ConsoleLog.single = single;
    ConsoleLog.double = double;
    ConsoleLog.table = table;

export default ConsoleLog;