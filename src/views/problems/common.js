import myConst from '@/utils/const'

export default {
  findAllPreNodeId(logicData, nodeId) {
    let all = []
    let edges = logicData.edges
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i]
      if (edge.target == nodeId) {
        all.push(edge.source)
      }
    }
    let findOut = []
    while (all && all.length) {
      let preId = all.pop()
      findOut.push(preId)
      for (let i = 0; i < edges.length; i++) {
        let edge = edges[i]
        if (edge.target == preId) {
          all.push(edge.source)
        }
      }
    }
    return findOut.reverse()
  },

  findNextNodeId(logicData, curNode) {
    let curNodeId = curNode.nodeId
    logicData = JSON.parse(logicData)
    let edges = logicData.edges
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i]
      if (edge.source == curNodeId) {
        return edge.target
      }
    }
  },
  findPreNodeId: function(logicData, curNode) {
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

  findLogicNode: function(logicData, nodeId) {
    logicData = JSON.parse(logicData)
    let nodes = logicData.nodes
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == nodeId) {
        return nodes[i]
      }
    }
    return null
  },
  combineImgField(imgs, works) {
    if (imgs && imgs.length && works && works.length) {
      for (let i = 0; i < imgs.length; i++) {
        let ii = imgs[i]
        let fieldName = ii.fieldName
        let img = ii.img
        let imgUrl = `${myConst.gdIp}/profile/${img}`
        let workId = ii.workId
        for (let j = 0; j < works.length; j++) {
          let work = works[j]
          if (work.id == workId) {
            let workData = JSON.parse(work.workData)
            let formData = workData.formData
            if (!formData[fieldName]) {
              formData[fieldName] = []
            }
            formData[fieldName].push({ url: imgUrl })
            work.workData = JSON.stringify(workData)
          }
        }


      }

    }
    // if (imgs && imgs.length) {
    //   let imgsObj = {}
    //   for (let i = 0; i < imgs.length; i++) {
    //     let ii = imgs[i]
    //     let fieldName = ii.fieldName
    //     let thumbnail = ii.thumbnail
    //     let img = ii.img
    //     let imgUrl = `${myConst.gdIp}/profile/${img}`
    //     if (!imgsObj[fieldName]) {
    //       imgsObj[fieldName] = []
    //     }
    //     // imgsObj[fieldName].push(imgUrl)
    //     imgsObj[fieldName].push({ url: imgUrl })
    //   }
    //   for (let j = 0; j < works.length; j++) {
    //     let work = works[j]
    //     if (work.workData) {
    //       let workData = JSON.parse(work.workData)
    //       let formDesc = workData.formDesc
    //       let formData = workData.formData
    //       let imgsObjKeys = Object.keys(imgsObj)
    //       let formDescKeys = Object.keys(formDesc)
    //       for (let k = 0; k < imgsObjKeys.length; k++) {
    //         let key = imgsObjKeys[k]
    //         if (formDescKeys.indexOf(key) != -1) {
    //           formData[key] = imgsObj[key]
    //         }
    //       }
    //       work.workData = JSON.stringify(workData)
    //       debugger
    //
    //     }
    //   }
    // }
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
  findPreNodeIdById(logicData, nodeId) {
    let pre = []
    let edges = logicData.edges
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i]
      if (edge.target == nodeId) {
        pre.push(edge.source)
      }
    }
    return pre
  }
}
