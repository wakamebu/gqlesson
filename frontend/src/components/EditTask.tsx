import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../types/task';
import { TaskStatus } from '../types/taskStatus';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../mutations/taskMutations';
import { GET_TASKS } from '../queries/taskQueries';
import { useNavigate } from 'react-router-dom';

export default function EditTask({ task, userId }: { task: Task; userId: number }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(task.name);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description);
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidDueDate, setIsInvalidDueDate] = useState(false);
  const navigate = useNavigate();

  const [updateTask] = useMutation<{updateTask: Task}>(UPDATE_TASK);

  const resetState = () => {
    setName(task.name);
    setDueDate(task.dueDate);
    setStatus(task.status);
    setDescription(task.description);
    setIsInvalidName(false);
    setIsInvalidDueDate(false);
  };

  const handleEditTask = async () => {
    let canEdit = true;

    if (name.length === 0) {
      canEdit = false;
      setIsInvalidName(true);
    } else {
      setIsInvalidName(false);
    }

    if (!Date.parse(dueDate)) {
      canEdit = false;
      setIsInvalidDueDate(true);
    } else {
      setIsInvalidDueDate(false);
    }

    if (canEdit) {
      const updateTaskInput = { id: task.id, name, dueDate, description, status };
      try {
        await updateTask({
          variables: { updateTaskInput },
          refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
        });
        resetState();
        setOpen(false);
      } catch (err: any) {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token');
          alert('tokenの有効期限が切れました');
          navigate('/signin');
          return;
        }

        alert('タスク編集に失敗しました');
      }
    }

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="編集">
        <IconButton onClick={handleClickOpen}>
          <EditIcon color="action" />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>EditTask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="Task Name"
            fullWidth
            aria-required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={isInvalidName}
            helperText={isInvalidName && 'タスク名を入力してください'}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="due-date"
            label="Due Date"
            placeholder="yyyy-mm-dd"
            fullWidth
            aria-required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={isInvalidDueDate}
            helperText={isInvalidDueDate && '日付を正しく入力してください'}
          />
          <FormControl fullWidth={true} margin='normal'>
            <InputLabel id='task-status-label'>Status</InputLabel>
            <Select
              labelId='task-status-label'
              id='task-status'
              label='Status'
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <MenuItem value={'NOT_STARTED'}>Not Started</MenuItem>
              <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
              <MenuItem value={'COMPLETED'}>Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            required
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditTask}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
