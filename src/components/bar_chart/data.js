let JSON = {
   "ebutler": {
      "header": {
         "_status": "success"
      },
      "body": {
         "graph": {
            "consumption": {
               "bar": [
                  {
                     "_value": "79.98",
                     "_label": "00:00",
                     "_time": "2017-02-20T00:00:00"
                  },
                  {
                     "_value": "41.34",
                     "_label": "01:00",
                     "_time": "2017-02-20T01:00:00"
                  },
                  {
                     "_value": "38.88",
                     "_label": "02:00",
                     "_time": "2017-02-20T02:00:00"
                  },
                  {
                     "_value": "67.61",
                     "_estimated": "1",
                     "_label": "03:00",
                     "_time": "2017-02-20T03:00:00"
                  },
                  {
                     "_value": "149.0",
                     "_label": "04:00",
                     "_time": "2017-02-20T04:00:00"
                  },
                  {
                     "_value": "204.1",
                     "_label": "05:00",
                     "_time": "2017-02-20T05:00:00"
                  },
                  {
                     "_value": "266.0",
                     "_label": "06:00",
                     "_time": "2017-02-20T06:00:00"
                  },
                  {
                     "_value": "614.4",
                     "_label": "07:00",
                     "_time": "2017-02-20T07:00:00"
                  },
                  {
                     "_value": "507.9",
                     "_label": "08:00",
                     "_time": "2017-02-20T08:00:00"
                  },
                  {
                     "_value": "168.8",
                     "_label": "09:00",
                     "_time": "2017-02-20T09:00:00"
                  },
                  {
                     "_value": "240.1",
                     "_label": "10:00",
                     "_time": "2017-02-20T10:00:00"
                  },
                  {
                     "_value": "206.4",
                     "_label": "11:00",
                     "_time": "2017-02-20T11:00:00"
                  },
                  {
                     "_value": "138.5",
                     "_label": "12:00",
                     "_time": "2017-02-20T12:00:00"
                  },
                  {
                     "_value": "144.8",
                     "_label": "13:00",
                     "_time": "2017-02-20T13:00:00"
                  },
                  {
                     "_value": "260.4",
                     "_label": "14:00",
                     "_time": "2017-02-20T14:00:00"
                  },
                  {
                     "_value": "386.2",
                     "_label": "15:00",
                     "_time": "2017-02-20T15:00:00"
                  },
                  {
                     "_value": "374.0",
                     "_label": "16:00",
                     "_time": "2017-02-20T16:00:00"
                  },
                  {
                     "_value": "181.5",
                     "_estimated": "1",
                     "_label": "17:00",
                     "_time": "2017-02-20T17:00:00"
                  },
                  {
                     "_value": "",
                     "_label": "18:00",
                     "_time": "2017-02-20T18:00:00"
                  },
                  {
                     "_value": "",
                     "_label": "19:00",
                     "_time": "2017-02-20T19:00:00"
                  },
                  {
                     "_value": "",
                     "_label": "20:00",
                     "_time": "2017-02-20T20:00:00"
                  },
                  {
                     "_value": "",
                     "_label": "21:00",
                     "_time": "2017-02-20T21:00:00"
                  },
                  {
                     "_value": "",
                     "_label": "22:00",
                     "_time": "2017-02-20T22:00:00"
                  },
                  {
                     "_value": "",
                     "_label": "23:00",
                     "_time": "2017-02-20T23:00:00"
                  }
               ],
               "_top": "2893",
               "_average": "371.3",
               "_unit": "Wh",
               "_heading": "El, Energiforbrug",
               "_unit_id": "5",
               "_scope": "0",
               "_period": "20/02/2017",
               "_aggregation_method": "sum"
            },
            "overlays": ""
         }
      },
      "_client_name": "eb_web",
      "_client_version": "0",
      "_lockdown": "0"
   }
}

let consumption = JSON["ebutler"]['body']['graph']['consumption']
let data = consumption['bar']

data.reverse();

export { consumption, data }
