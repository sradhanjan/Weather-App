const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile  = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal, orgVal) => {
	let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
	temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
	temperature = temperature.replace("{%tempmax%}",orgVal.main.humidity);
	temperature = temperature.replace("{%location%}",orgVal.name);
	temperature = temperature.replace("{%country%}",orgVal.sys.country);
	temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
	return temperature;
};
const server = http.createServer((req,res) => {
	if(req.url = "/")
	{
		requests(
			"http://api.openweathermap.org/data/2.5/weather?q=MUMBAI&units=metric&appid=5df7c2e3da81238603e8264995964b1b"
		)
		.on("data",(chunk) => {
			const objData = JSON.parse(chunk);
			const arrData = [objData];
			const RealTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");
		    res.write(RealTimeData)
			//console.log(RealTimeData);
		})
		.on("end",(err) => {
			if(err)
			return console.log("connection error failed due to",err);
			res.end();
		});
	}
});

server.listen(8000, "127.0.0.1");