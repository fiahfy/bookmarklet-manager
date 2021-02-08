import {
  AppBar,
  Button,
  CssBaseline,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import { Close, Delete, Edit } from '@material-ui/icons'
import React from 'react'

const usePreventPopupClose = () => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
      }
    }
    document.body.addEventListener('keydown', listener)
    return () => {
      document.body.removeEventListener('keydown', listener)
    }
  }, [])
}

const Popup: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  usePreventPopupClose()

  return (
    <div style={{ width: 800 }}>
      <CssBaseline />
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <Button
          color="primary"
          disableElevation
          onClick={() => setOpen(true)}
          variant="contained"
        >
          Add Script
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Trigger</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(100)
              .fill(1)
              .map((v, i) => (
                <TableRow key={i}>
                  <TableCell>Name</TableCell>
                  <TableCell>Trigger</TableCell>
                  <TableCell></TableCell>
                  <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditDialog onClose={() => setOpen(false)} open={open} />
    </div>
  )
}

export default Popup

const EditDialog: React.FC<{ open: boolean; onClose: () => void }> = (
  props
) => {
  const { open, onClose } = props

  const [formValues, setFormValues] = React.useState({
    name: '',
    trigger: 'manual',
    active: false,
    code: '',
  })
  const theme = useTheme()

  const handleChangeTrigger = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setFormValues((formValues) => ({
      ...formValues,
      trigger: e.target.value as string,
    }))
  }

  const handleChangeActive = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setFormValues((formValues) => ({
      ...formValues,
      active: checked,
    }))
  }

  const handleChangeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues((formValues) => ({
      ...formValues,
      code: e.target.value,
    }))
  }

  return (
    <Dialog fullScreen onClose={onClose} open={open}>
      <AppBar style={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            aria-label="close"
            color="inherit"
            edge="start"
            onClick={onClose}
          >
            <Close />
          </IconButton>
          <Typography
            style={{ flexGrow: 1, marginLeft: theme.spacing(2) }}
            variant="h6"
          >
            Sound
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <FormGroup row style={{ margin: theme.spacing(2) }}>
        <TextField
          label="Name"
          style={{ flexGrow: 1 }}
          value={formValues.name}
        />
        <FormControl style={{ marginLeft: theme.spacing(2) }}>
          <InputLabel>Trigger</InputLabel>
          <Select onChange={handleChangeTrigger} value={formValues.trigger}>
            <MenuItem value="manual">Manual</MenuItem>
            <MenuItem value="automatic">Automatic</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch checked={formValues.active} onChange={handleChangeActive} />
          }
          disabled={formValues.trigger !== 'automatic'}
          label="Active"
          style={{ marginLeft: theme.spacing(2) }}
        />
      </FormGroup>
      <TextField
        label="Code"
        multiline
        onChange={handleChangeCode}
        style={{ margin: theme.spacing(2) }}
        value={formValues.code}
        variant="outlined"
      />
    </Dialog>
  )
}
