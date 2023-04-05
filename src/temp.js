{
    unitHierarchy.map((each) => {
      
      if(unitCodeLng < each.unitCode.length){
        return (<TreeItem nodeId={each.unitCode} label={each.unitName}>)
      }
      else if(unitCodeLng === each.unitCode.length){
        return (</TreeItem> 
        <TreeItem nodeId={each.unitCode} label={each.unitName}>)
      }

      else{
        return (</TreeItem> 
        </TreeItem>
        <TreeItem nodeId={each.unitCode} label={each.unitName}>)
      }       
    }
    )
}

<TreeView
                aria-label="unit hierarchy navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  height: 240,
                  flexGrow: 1,
                  maxWidth: 400,
                  overflowY: 'auto',
                }}
              >
                {unitHierarchy.map((each) => {
                  let tmpNum = each.unitCode.length
                  //console.log(tmpNum)
                  if (unitCodeLng < tmpNum) {
                    unitCodeLng = tmpNum
                    return (
                      <TreeItem nodeId={each.unitCode} label={each.unitName} />
                    )
                  } else if (unitCodeLng === tmpNum) {
                    unitCodeLng = tmpNum
                    return (
                      <TreeItem nodeId={each.unitCode} label={each.unitName} />
                    )
                  } else {
                    unitCodeLng = tmpNum
                    return (
                      <TreeItem nodeId={each.unitCode} label={each.unitName} />
                    )
                  }
                })}
              </TreeView>