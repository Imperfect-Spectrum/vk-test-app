import { ChangeEvent, useState } from 'react';

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from '@mui/material';

import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';

export function MainForm() {
  const dataFloor = ['A', 'B'];
  const dataNumberFlor = [
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
  ];
  const dataMeetingRoom = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  interface DataState {
    tower: string;
    floor: string;
    meetingRoom: string;
    startTime: string | null;
    endTime: string | null;
    day: string | null;
    comment: string;
  }

  const [data, setData] = useState<DataState>({
    tower: '',
    floor: '',
    meetingRoom: '',
    startTime: '',
    endTime: '',
    day: '',
    comment: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartTimeChange = (newStartTime: DateTime | null) => {
    const formattedStartTime = newStartTime?.toFormat('hh:mm a') ?? null;
    const endTime = data.endTime
      ? DateTime.fromFormat(data.endTime, 'hh:mm a')
      : null;
    const newData = {
      ...data,
      startTime: formattedStartTime,
      endTime:
        newStartTime && endTime && newStartTime >= endTime
          ? newStartTime.plus({ minutes: 60 }).toFormat('hh:mm a')
          : data.endTime,
    };
    setData(newData);
  };

  const handleEndTimeChange = (newEndTime: DateTime | null) => {
    const formattedEndTime = newEndTime?.toFormat('hh:mm a') ?? null;
    const startTime = data.startTime
      ? DateTime.fromFormat(data.startTime, 'hh:mm a')
      : null;
    const newData = {
      ...data,
      endTime:
        newEndTime && startTime && newEndTime <= startTime
          ? startTime.plus({ minutes: 60 }).toFormat('hh:mm a')
          : formattedEndTime,
    };
    setData(newData);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeСomment = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      comment: event.target.value,
    }));
  };

  const handleDayChange = (date: DateTime | null) => {
    const formattedDate = date ? date.toFormat('yyyy-MM-dd') : null;
    setData((prevData) => ({
      ...prevData,
      day: formattedDate,
    }));
  };

  const handleSubmit = () => {
    let hasEmptyField = false;

    for (const key in data) {
      if (
        data[key as keyof DataState] === '' ||
        data[key as keyof DataState] === null
      ) {
        hasEmptyField = true;
        setData((prevData) => ({
          ...prevData,
          [key]: '',
        }));
      }
    }

    if (hasEmptyField) {
    } else {
      console.log(JSON.stringify(data));
    }

    setIsSubmitted(true);
  };

  const handleClear = () => {
    setData({
      tower: '',
      floor: '',
      meetingRoom: '',
      startTime: '',
      endTime: null,
      day: null,
      comment: '',
    });
    setIsSubmitted(false);
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        display: 'flex',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '30px',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3">Бронирование переговорной</Typography>
      </Box>
      <FormControl
        sx={{ m: 1, minWidth: 260 }}
        error={isSubmitted && data.tower === ''}
      >
        <InputLabel>Башня</InputLabel>
        <Select
          name="tower"
          value={data.tower}
          label="Башня"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataFloor.map((tower) => (
            <MenuItem key={tower} value={tower}>
              {tower}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 260 }}
        error={isSubmitted && data.floor === ''}
      >
        <InputLabel>Этаж</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          name="floor"
          value={data.floor}
          label="Этаж"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataNumberFlor.map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{ m: 1, minWidth: 260 }}
        error={isSubmitted && data.meetingRoom === ''}
      >
        <InputLabel>Номер</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          name="meetingRoom"
          value={data.meetingRoom}
          label="Комната"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataMeetingRoom.map((meetingRoom) => (
            <MenuItem key={meetingRoom} value={meetingRoom}>
              {meetingRoom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DatePicker
            sx={
              isSubmitted && data.day === ''
                ? {
                    '& .MuiInputLabel-root': {
                      color: 'red',
                    },
                    '& .MuiInputBase-input': {
                      color: 'red',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                    },
                  }
                : {}
            }
            label="Выберите дату"
            minDate={DateTime.local().startOf('day')}
            onChange={(date) => handleDayChange(date)}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            sx={
              isSubmitted && data.startTime === ''
                ? {
                    '& .MuiInputLabel-root': {
                      color: 'red',
                    },
                    '& .MuiInputBase-input': {
                      color: 'red',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                    },
                  }
                : {}
            }
            label="Начало"
            value={
              data.startTime
                ? DateTime.fromFormat(data.startTime, 'hh:mm a')
                : null
            }
            onChange={handleStartTimeChange}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            sx={
              isSubmitted && data.endTime === ''
                ? {
                    '& .MuiInputLabel-root': {
                      color: 'red',
                    },
                    '& .MuiInputBase-input': {
                      color: 'red',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'red',
                      },
                    },
                  }
                : {}
            }
            label="Окончание"
            value={
              data.endTime ? DateTime.fromFormat(data.endTime, 'hh:mm a') : null
            }
            onChange={handleEndTimeChange}
            minTime={
              data.startTime
                ? DateTime.fromFormat(data.startTime, 'hh:mm a')
                : undefined
            }
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <TextField
          error={isSubmitted && data.comment === ''}
          fullWidth
          multiline
          label="Комментарий"
          value={data.comment}
          onChange={handleChangeСomment}
        />
      </FormControl>

      <Button
        variant="contained"
        color="warning"
        sx={{ minWidth: 260 }}
        onClick={handleClear}
      >
        Clear fields
      </Button>
      <Button
        variant="contained"
        sx={{ minWidth: 260, marginTop: 1 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}
