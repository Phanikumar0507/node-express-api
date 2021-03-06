import express from "express";
import { RequestModel } from "./RequestModel";
import { ResponseModel } from "./ResponseModel";
import { V1_API_PATH, V2_API_PATH } from "./constants";

var app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get("/", function (request: express.Request, response: express.Response) {
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.write(
    "<h1 style='font-family:monospace;text-align:center;font-size:72px'><br/><br/><br/><br/><br/>API is Ready! </h1>"
  );
  return response.end();
});

// below are the both api's created by Phani Kumar pandiri
app.post(
  V1_API_PATH,
  function (request: express.Request, response: express.Response) {
    const requestModal: RequestModel = request.body;
    let data = requestModal.data;

    const fourZerosIndex: number = data.indexOf("0000");
    const firstName: string = data.substring(0, fourZerosIndex + 4);
    data = data.substring(fourZerosIndex + 4, data.length);

    const threeZerosIndex: number = data.indexOf("000");
    var lastName: string = data.substring(0, threeZerosIndex + 3);

    var clientId: string = data.substring(threeZerosIndex + 3, data.length);

    const responseData: ResponseModel = {
      statusCode: 200,
      data: {
        firstName: firstName,
        lastName: lastName,
        clientId: clientId,
      },
    };
    response.json(responseData);
  }
);

// below are the both api's created by Phani Kumar pandiri
app.post(
  V2_API_PATH,
  function (request: express.Request, response: express.Response) {
    const requestModal: RequestModel = request.body;
    let data = requestModal.data;

    const fourZerosIndex: number = data.indexOf("0000");
    var firstName: string = data.substring(0, fourZerosIndex);
    data = data.substring(fourZerosIndex + 4, data.length);

    const threeZerosIndex: number = data.indexOf("000");
    const lastName: string = data.substring(0, threeZerosIndex);
    data = data.substring(threeZerosIndex + 3, data.length);

    const clientId: string = `${data.substring(
      0,
      data.length - 3
    )}-${data.substring(3, data.length)}`;

    const responseData: ResponseModel = {
      statusCode: 200,
      data: {
        firstName: firstName,
        lastName: lastName,
        clientId: clientId,
      },
    };
    response.json(responseData);
  }
);

app.listen(app.get("port"), function () {
  console.log("Node app is running at localhost:" + app.get("port"));
});

export default app;