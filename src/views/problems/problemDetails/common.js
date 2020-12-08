export default {
  findOwnNode: function(works, account) {
    for (let i = 0; i < works.length; i++) {
      let work = works[i]
      if (work.nodeState == 0 && work.dealUser == account) {
        return work
      }
    }
  },
  findLogicNode: function(logicData, nodeId) {
    logicData = JSON.parse(logicData)
    let nodes = logicData.nodes
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == nodeId) {
        return nodes[i]
      }
    }
    return null
  }
}
