import React, { useState, forwardRef } from 'react'
import TreeItem from '@mui/lab/TreeItem'
import { Popover, TextField, Typography, InputAdornment } from '@mui/material'
import clsx from 'clsx'
import { TreeView, useTreeItem } from '@mui/lab'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import styled from '@emotion/styled'

const CustomContent = forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId)

  const icon = iconProp || expansionIcon || displayIcon

  const handleMouseDown = (event) => {
    preventSelection(event)
  }

  const handleExpansionClick = (event) => {
    handleExpansion(event)
  }

  const handleSelectionClick = (event) => {
    handleSelection(event)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions

    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
      style={{ padding: '3px 0' }}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  )
})

const CustomTreeItem = (props) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
)

export default function RichObjectTreeView({edit, data, title, selCallback, placeholder, size, fontControl}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [equipmentItem, setEquipmentItem] = useState('')
  const [equipmentId, setEquipmentId] = useState('')
  const [expanded, setExpanded] = useState(['1'])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const renderTree = (nodes) => (
    <CustomTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  )

  const handleSelection = (e, id) => {
    setEquipmentId(id)
    setEquipmentItem(e.target.innerText)
    setAnchorEl(null)
    selCallback(id, e.target.innerText)
  }

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds)
  }

  const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input':{fontSize: 14}
  })

  return (
    <>
      {!fontControl && <TextField size={size} required label={title} fullWidth name="unitItem" id="unitItem"
        value={equipmentItem} 
        className="w-100"   inputProps={{ readOnly: !edit }}
        onClick={handleClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ArrowRightIcon />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
      />}

      {!!fontControl && <StyledTextField size={size} required label={title} fullWidth name="unitItem" id="unitItem"
        value={equipmentItem} 
        className="w-100"   inputProps={{ readOnly: !edit }}
        onClick={handleClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ArrowRightIcon />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
      />}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <TreeView
          aria-label="icon expansion"
          defaultSelected={equipmentId}
          selected={equipmentId}
          expanded={expanded}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          onNodeSelect={(e, id) => handleSelection(e, id)}
          onNodeToggle={handleToggle}
          sx={{
            height: 200,
            flexGrow: 1,
            minWidth: '200px',
            overflowY: 'auto',
          }}
        >
          {data.map((item, i) => renderTree(item))}
        </TreeView>
      </Popover>
    </>
  )
}
