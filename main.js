const fs = require('fs');
const htmlparser2 = require('htmlparser2');

function createABIJson(nodeAbi) {
  var ws = fs.createWriteStream(__dirname+'/nodeabi.json');
  ws.end(JSON.stringify(nodeAbi));
}

module.exports = function() {
  fs.readFile(__dirname+'/versions-list', function(err, data) {
    var startTr;
    var startTd;
    var colIdx = 0;
    var nodeVer = [];
    var nodeABI = [];
    var results = {};
    var isArgon = false;
    parser = new htmlparser2.Parser({
      onopentag: function(name, attr) {
        if(name == 'tr') {
          colIdx = 0;
          startTr = true;
          isArgon = false;
        }
        else if(name == 'td') {
          startTd = true;
        }
      },
      ontext: function(text) {
        if(startTd) {
          if(colIdx == 0) {
            var verPattern = /.* (.*)/;
            var result = verPattern.exec(text.trim())[1];
            nodeVer.push(result);
          }
          else if(colIdx == 1) {
            if(text.trim() == 'Argon') {
              isArgon = true;
            }
            else {
              isArgon = false;
            }
          }
          else if(colIdx == 5) {
            if(text.trim().indexOf('.') < 0 && isArgon) {
              nodeABI.push(text.trim());
            }
          }
          else if(colIdx == 4) {
            if(text.trim().indexOf('.') < 0)
              nodeABI.push(text.trim());
          }
          colIdx++;
        }
      },
      onclosetag: function(name) {
        if(name == 'tr') {
          startTr = false;
          colIdx = 0;
        }
        else if(name == 'td') {
          startTd = false;
        }
        else if(name == 'tbody') {
          for(var i in nodeVer) {
            var ver = nodeVer[i];
            var abi = nodeABI[i];
            if(parseInt(abi)) {
              results[ver] = abi;
            }
          }
          createABIJson(results);
        }
      }
    }, {
      decodeEntities: true
    });
    //
    parser.write(data.toString());
    parser.end();
  });
  var NodeABIVersionMap = require('./nodeabi.json');
  return {
    getABIVersion: function() {
      return NodeABIVersionMap[process.version.replace(/[a-z]/g, '')];
    }
  };
}();