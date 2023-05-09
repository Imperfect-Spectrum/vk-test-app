import { useState } from 'react';

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import { DateTime } from 'luxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
  const [data, setData] = useState({ floor: '', number: '' });

  const [startTime, setStartTime] = useState<DateTime | null>(null);
  const [endTime, setEndTime] = useState<DateTime | null>(null);

  const handleStartTimeChange = (newStartTime: DateTime | null) => {
    setStartTime(newStartTime);
    if (newStartTime && endTime && newStartTime >= endTime) {
      setEndTime(newStartTime.plus({ minutes: 60 }));
    }
  };

  const handleEndTimeChange = (newEndTime: DateTime | null) => {
    if (newEndTime && startTime && newEndTime <= startTime) {
      setEndTime(startTime.plus({ minutes: 60 }));
    } else {
      setEndTime(newEndTime);
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box
      sx={{
        bgcolor: 'yellow',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px',
      }}
    >
      <Typography variant="h3">Бронирование переговорной</Typography>
      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <InputLabel>Этаж</InputLabel>
        <Select
          name="floor"
          value={data.floor}
          label="Этаж"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataFloor.map((flor) => (
            <MenuItem key={flor} value={flor}>
              {flor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <InputLabel>Номер</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          name="number"
          value={data.number}
          label="Номер"
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
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            label="Начало"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <TimePicker
            label="Окончание"
            value={endTime}
            onChange={handleEndTimeChange}
            minTime={
              startTime ? DateTime.fromJSDate(startTime.toJSDate()) : undefined
            }
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
