module.exports = function() {
  var NodeABIVersionMap = require('./nodeabi.json');
  return {
    getABIVersion: function() {
      console.log(process.version.replace(/[a-z]/g, ''));
      return NodeABIVersionMap[process.version.replace(/[a-z]/g, '')];
    },
    getABIVersionByNodeVersion: function(nodeVersion) {
      return NodeABIVersionMap[nodeVersion.replace(/[a-z]/g, '')];
    },
    abiVersionMap: NodeABIVersionMap
  };
}();

console.log(module.exports.abiVersionMap);