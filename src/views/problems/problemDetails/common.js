import myConst from '@/utils/const'

export default {
  findPreNodeId(logicData, nodeId) {
    let pre = []
    let edges = logicData.edges
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i]
      if (edge.target == nodeId) {
        pre.push(edge.source)
      }
    }
    return pre
  },
  findNextNodeId(logicData, nodeId) {
    let next = []
    let edges = logicData.edges
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i]
      if (edge.source == nodeId) {
        next.push(edge.target)
      }
    }
    return next
  },
  nodeValidate: function(orderData, re) {
    let nodeState = re.nodeState
    let nodeType = re.nodeType
    let works = orderData.works
    let logicData = JSON.parse(orderData.logicData)
    let nodes = logicData.nodes
    let edges = logicData.edges
    if (nodeState == myConst.GD_NODE_STATE.NOT) {
      if (nodeType == myConst.GD_NODE_TYPE.shenhe) {
        let preNodeIds = this.findPreNodeId(logicData, re.nodeId)
        for (let i = 0; i < preNodeIds.length; i++) {
          let id = preNodeIds[i]
          for (let j = 0; j < works.length; j++) {
            let work = works[j]
            if (id == work.nodeId && work.nodeState == myConst.GD_NODE_STATE.BACK) {
              return false
            }
          }
        }
      }
      if (nodeType == myConst.GD_NODE_TYPE.kaishi || nodeType == myConst.GD_NODE_TYPE.chuli || nodeType == myConst.GD_NODE_TYPE.tianbao) {
        for (let i = 0; i < works.length; i++) {
          let work = works[i]
          if (re.nodeId == work.nodeId && work.nodeState == myConst.GD_NODE_STATE.BACK) {
            return false
          }

        }
      }

    }
    return true
  },
  findCheckNodeId: function(logicData, curNode) {
    let curNodeId = curNode.nodeId
    logicData = JSON.parse(logicData)
    let edges = logicData.edges
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i]
      if (edge.target == curNodeId) {
        return edge.source
      }
    }
  },
  findWorkByNodeId: function(works, nodeId) {
    for (let i = 0; i < works.length; i++) {
      let work = works[i]
      if (work.nodeId == nodeId) {
        return work
      }
    }
    return null
  },
  findWorkByUser: function(works, account) {
    let re = []
    for (let i = 0; i < works.length; i++) {
      let work = works[i]
      if (work.dealUser == account) {
        re.push(work)
      }
    }
    return re
  },
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
