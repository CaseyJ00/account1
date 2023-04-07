// import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useState, forwardRef } from 'react'
//import ReactDOM from 'react-dom'
import TreeItem from '@mui/lab/TreeItem'
import { Popover, TextField, Typography, InputAdornment } from '@mui/material'
import clsx from 'clsx'
import { TreeView, useTreeItem } from '@mui/lab'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import { useMediaQuery } from '@mui/material'

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
    // console.log('handleExpansionClick event : ', event.currentTarget)
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

export default function RichObjectTreeView({ formik, edit, data, title }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [equipmentItem, setEquipmentItem] = useState('')
  const [equipmentId, setEquipmentId] = useState('')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    //console.log('event.currentTarget: ', event.currentTarget)
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

  return (
    <>
      <TextField
        margin="normal"
        required
        label={title}
        fullWidth
        // select
        name="unitItem"
        id="unitItem"
        defaultValue={equipmentItem}
        value={equipmentItem}
        className="w-100"
        inputProps={{ readOnly: !edit }}
        onClick={handleClick}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ArrowRightIcon />
            </InputAdornment>
          ),
        }}
        placeholder="소속 부서를 선택해주세요"
      />

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
          // expanded={['1']}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          onNodeSelect={(e, id) => {
            setEquipmentId(id)
            setEquipmentItem(e.target.innerText)
          }}
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

// const App = () => {
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: prefersDarkMode ? 'dark' : 'light',
//         },
//       }),
//     [prefersDarkMode]
//   )
//   return (
//     <ThemeProvider theme={theme}>
//       <RichObjectTreeView />
//     </ThemeProvider>
//   )
// }

// ReactDOM.render(<App />, document.getElementById("root"));
