const fs = require('fs');
const path = require('path');
const xmlParser = require('xml-node-parser');

function createABIJson(nodeAbi, callback) {
  var filePath = path.resolve('./nodeabi.json');
  var data = JSON.stringify(nodeAbi);
  fs.writeFile(filePath, data, function(err) {
    if(err) {
      callback(err);
    } else {
      callback(null, nodeAbi);
    }
  });
}

module.exports = {
  parse: function(callback) {
    var nodeAbiMap = {};
    xmlParser.parseFromFile(path.resolve('./versions-list'))
    .then((nodes) => {
      nodes[0].forEach(function(trNode) {
        var key, value;
        trNode.forEach(function(tdNode, index) {
          if(index === 0) {
            key = tdNode.value.replace(/[a-zA-Z\.]*\s/g, '');
          } else if(index === 5) {
            value = tdNode.value;
            nodeAbiMap[key] = value;
            key = '';
            value = '';
          }
        });
      });
      createABIJson(nodeAbiMap, callback);
    }, (err) => {
      callback(err);
    });
  }
};

if(module.id === '.') {
  var api = module.exports;
  api.parse(function(err, abiVersionsMap) {
    console.log(err, abiVersionsMap);
  });
}