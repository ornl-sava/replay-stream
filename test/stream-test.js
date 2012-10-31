var ReplayStream = require('../replay-stream.js')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , tester = require('stream-tester')
  , should = require('should')
  , moment = require('moment')

describe('replay stream Tests', function() {

  before(function(done) {
    var outPath = path.join('test', 'output')
    fs.exists(outPath, function(exists) {
      if (exists) {
        fs.readdir(outPath, function(err, files) {
          if ( files && files.length ) {
            for (var i = 0 ; i < files.length ; i++ ) {
              fs.unlink( path.join(outPath, files[i]), function(err) {
                if ( err )
                  throw err
              }) 
            }
          }
          done()
        })
      }
      else {
        fs.mkdir(outPath, 755, function(err) {
          done()
        })
      }
    })
  })

  describe('# simple stream test', function(){
    it('should pass pause-unpause stream tests', function(){
      pauseUnpauseStream()
    })
  })


  describe('# simple timestamp test', function(){
    it('should pass simple timestamp reading', function(done){
      simpleReplay(done)
    })
  })

}) 

//TODO - test invalid code, blank lines at end, etc.

var pauseUnpauseStream = function () {
  tester.createRandomStream(10000) //10k random numbers
    .pipe(tester.createUnpauseStream())
    .pipe(new ReplayStream())
    .pipe(tester.createPauseStream())  
}

var simpleReplay = function (done) {
  // define the test data and output file
  var inFile = path.join('test', 'input', 'timestampReplayData.txt')
    , outFile = path.join('test', 'output', 'timestampReplayOutput.txt')
    , outStream = fs.createWriteStream(outFile, {encoding:'utf8'})
    , timeFormatter = "YYYY-MM-DD HH-MM-SS-Z"
    , opts = {
        "relativeTime" : false ,
        "startTime" : 0 ,
        "endTime" : moment('2013/01/01 07:07:07+0000', timeFormatter).valueOf() ,
        "timestampName" : "timestamp", 
        "timestampType" : "moment" ,
        "timestampFormat" : timeFormatter ,
        "stringifyOutput" : true
      }
//TODO use this for testing different input/output format combinations
/*
    , expected = [
        { timestamp: moment('2012/07/25 10:00:00+0000', timeFormatter).valueOf(), line: 'First line' }
      , { timestamp: moment('2012/07/25 14:14:14+0000', timeFormatter).valueOf(), line: 'Second line' }
      , { timestamp: moment('2012/07/26 07:00:00+0000', timeFormatter).valueOf(), line: 'Third line' }
      , { timestamp: moment('2012/07/26 07:07:07+0000', timeFormatter).valueOf(), line: 'Fourth line' }
      ]*/
    , expected = [
        { timestamp: '2012/07/25 10:00:00+0000', data: 'First line' }
      , { timestamp: '2012/07/25 14:14:14+0000', data: 'Second line' }
      , { timestamp: '2012/07/26 07:00:00+0000', data: 'Third line' }
      , { timestamp: '2012/07/26 07:07:07+0000', data: 'Fourth line' }
      ]

  var replayStream = new ReplayStream(opts)

  replayStream.pipe(outStream)

  fs.readFile(inFile, function (err, data) {
    if (err) throw err
    data = JSON.parse(data)

    for(var i=0; i< data.length; i++){
      if(data[i] !== ""){
        replayStream.write(JSON.stringify(data[i]))
      }
    }

    setTimeout(function () {
        replayStream.end()
        outStream.end()
      }, 500)
  })

  outStream.on('close', function() {
    fs.readFile(outFile, function (err, data) {
      if (err) throw err
      //do a little cleanup of the data - this is fine, just putting it back into an array since we sent items individually above.
      data = ''+data
      data = data.split('}{').join('},{')
      data = '[' + data + ']'
      //console.log(data)
      JSON.parse(data).should.eql(expected)
      done()
    })
  })
    
}
